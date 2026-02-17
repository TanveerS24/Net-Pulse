import { useState, useEffect, useRef } from 'react';
import { Play, Square, AlertCircle, CheckCircle, Activity, Gauge } from 'lucide-react';
import { serverAPI } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ServerPerformance = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [arrivalRate, setArrivalRate] = useState(5);
  const [requestsPerSecond, setRequestsPerSecond] = useState(0);
  const [queueLength, setQueueLength] = useState(0);
  const [serverUtilization, setServerUtilization] = useState(0);
  const [baseArrivalRate, setBaseArrivalRate] = useState(5);
  const [chartData, setChartData] = useState([]);
  const [currentCalculation, setCurrentCalculation] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [alert, setAlert] = useState(null);
  const simulationInterval = useRef(null);

  useEffect(() => {
    return () => {
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
      }
    };
  }, []);

  const startSimulation = () => {
    setIsSimulating(true);
    setRequestCount(0);
    setQueueLength(0);
    setServerUtilization(0);
    setChartData([]);
    setAlert({ type: 'info', message: 'Server load simulation started...' });

    let requests = 0;
    let queue = 0;
    let currentRate = baseArrivalRate;
    const data = [];

    simulationInterval.current = setInterval(() => {
      // Dynamically increase arrival rate
      currentRate = baseArrivalRate + (requests / 50);
      
      // Simulate incoming requests based on Poisson process
      const incomingRequests = Math.floor(Math.random() * currentRate) + 1;
      requests += incomingRequests;
      
      // Simulate server processing (random capacity)
      const processedRequests = Math.floor(Math.random() * 5) + 3;
      queue = Math.max(0, queue + incomingRequests - processedRequests);
      
      // Calculate utilization (0-100%)
      const utilization = Math.min(100, (queue / (requests * 0.1)) * 100 + Math.random() * 20);
      
      setRequestCount(requests);
      setArrivalRate(currentRate);
      setRequestsPerSecond(incomingRequests * 2); // Approximate RPS
      setQueueLength(queue);
      setServerUtilization(utilization);

      // Update chart data
      data.push({
        time: new Date().toLocaleTimeString(),
        requests: requests,
        arrivalRate: currentRate.toFixed(2),
        queue: queue,
        utilization: utilization.toFixed(2)
      });

      if (data.length > 20) data.shift();
      setChartData([...data]);

      // Auto-save every 50 requests
      if (requests % 50 === 0) {
        saveSimulationData(currentRate, requests, incomingRequests * 2, queue, utilization);
      }
    }, 1000);
  };

  const stopSimulation = () => {
    if (simulationInterval.current) {
      clearInterval(simulationInterval.current);
      simulationInterval.current = null;
    }
    setIsSimulating(false);
    
    if (requestCount > 0) {
      saveSimulationData(arrivalRate, requestCount, requestsPerSecond, queueLength, serverUtilization);
      setAlert({ type: 'success', message: 'Simulation stopped and data saved!' });
    }
  };

  const saveSimulationData = async (rate, count, rps, queue, utilization) => {
    try {
      const response = await serverAPI.saveSimulation({
        arrival_rate: rate,
        request_count: count,
        requests_per_second: rps,
        queue_length: queue,
        server_utilization: utilization
      });

      const data = response.data.data;
      setMetrics(data);
      setCurrentCalculation(data.poisson_calculation);
    } catch (error) {
      console.error('Error saving simulation:', error);
      setAlert({ type: 'error', message: 'Failed to save simulation data' });
    }
  };

  return (
    <div className="simulation-page">
      <header className="page-header">
        <h1 className="page-title">Predictive Server Performance Booster</h1>
        <p className="page-subtitle">Poisson Distribution Analysis</p>
      </header>

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{alert.message}</span>
        </div>
      )}

      {/* Control Panel */}
      <div className="control-panel">
        <div className="control-group">
          <label>Base Arrival Rate (λ): {baseArrivalRate} req/sec</label>
          <input
            type="range"
            min="1"
            max="20"
            value={baseArrivalRate}
            onChange={(e) => setBaseArrivalRate(Number(e.target.value))}
            disabled={isSimulating}
            className="slider"
          />
        </div>

        <div className="control-buttons">
          <button
            className="btn btn-primary"
            onClick={startSimulation}
            disabled={isSimulating}
          >
            <Play size={20} />
            Start Server Load Simulation
          </button>
          <button
            className="btn btn-danger"
            onClick={stopSimulation}
            disabled={!isSimulating}
          >
            <Square size={20} />
            Stop Simulation
          </button>
        </div>
      </div>

      {/* Live Server Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Requests Per Second</h3>
          <p className="metric-value">{requestsPerSecond}</p>
          <span className="metric-change">Current throughput</span>
        </div>

        <div className="metric-card warning">
          <h3>Arrival Rate (λ)</h3>
          <p className="metric-value">{arrivalRate.toFixed(2)}</p>
          <span className="metric-change">Dynamic rate</span>
        </div>

        <div className="metric-card danger">
          <h3>Active Queue Length</h3>
          <p className="metric-value">{queueLength}</p>
          <span className="metric-change">Pending requests</span>
        </div>

        <div className="metric-card success">
          <h3>Server Utilization</h3>
          <p className="metric-value">{serverUtilization.toFixed(1)}%</p>
          <span className="metric-change">
            {serverUtilization > 80 ? 'High Load' : serverUtilization > 50 ? 'Moderate' : 'Normal'}
          </span>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card large">
          <h3 className="chart-title">Request Arrival Histogram</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ff6b35' }} />
              <Legend />
              <Bar dataKey="requests" fill="#ff6b35" name="Total Requests" />
              <Bar dataKey="queue" fill="#ef4444" name="Queue Length" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Server Utilization Curve</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#999" />
              <YAxis stroke="#999" domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ff6b35' }} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="utilization" 
                stroke="#ff6b35" 
                strokeWidth={3}
                name="Utilization %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Calculation Display */}
      {currentCalculation && (
        <div className="calculation-card">
          <h3 className="calc-title">Poisson Distribution Calculation</h3>
          <div className="formula-display">
            <p className="formula">P(X = k) = (λ^k × e^-λ) / k!</p>
          </div>
          <pre className="calculation-steps">{currentCalculation}</pre>
        </div>
      )}

      {/* Server Boost Analyzer */}
      {metrics && (
        <div className="reliability-panel">
          <h3 className="panel-title">Server Boost Analyzer</h3>
          <div className="reliability-grid">
            <div className="reliability-item">
              <AlertCircle className="reliability-icon danger" />
              <div>
                <h4>Probability of Overload</h4>
                <p className="reliability-value">{(metrics.overload_probability * 100).toFixed(2)}%</p>
              </div>
            </div>

            <div className="reliability-item">
              <Activity className="reliability-icon warning" />
              <div>
                <h4>Expected Response Delay</h4>
                <p className="reliability-value">{metrics.expected_delay.toFixed(3)} sec</p>
              </div>
            </div>

            <div className="reliability-item">
              <Gauge className="reliability-icon" />
              <div>
                <h4>Queue Congestion Risk</h4>
                <p className="reliability-value">{metrics.congestion_risk.toFixed(2)}%</p>
              </div>
            </div>

            <div className="reliability-item">
              <CheckCircle className="reliability-icon success" />
              <div>
                <h4>Performance Boost Required</h4>
                <p className="reliability-value">{metrics.boost_percentage}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Server Boost Recommendation */}
      {metrics && (
        <div className="recommendation-panel">
          <h3 className="panel-title">Server Boost Recommendation</h3>
          <div className="scaling-grid">
            <div className="scaling-card">
              <h4>CPU Scaling</h4>
              <p className="scaling-value">{metrics.cpu_scaling}%</p>
              <span className="scaling-label">Increase required</span>
            </div>

            <div className="scaling-card">
              <h4>Instance Scaling</h4>
              <p className="scaling-value">{metrics.instance_scaling}</p>
              <span className="scaling-label">Additional instances</span>
            </div>

            <div className="scaling-card">
              <h4>Auto-Scaling Threshold</h4>
              <p className="scaling-value">{metrics.auto_scaling_threshold}%</p>
              <span className="scaling-label">Trigger point</span>
            </div>
          </div>

          <div className="recommendation-box">
            <AlertCircle size={24} className="rec-icon" />
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{metrics.boost_recommendation}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerPerformance;
