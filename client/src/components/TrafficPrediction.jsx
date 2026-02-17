import { useState, useEffect, useRef } from 'react';
import { Play, Square, AlertCircle, CheckCircle, TrendingUp, Server as ServerIcon } from 'lucide-react';
import { trafficAPI } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const TrafficPrediction = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [totalPackets, setTotalPackets] = useState(0);
  const [successfulPackets, setSuccessfulPackets] = useState(0);
  const [failedPackets, setFailedPackets] = useState(0);
  const [successProbability, setSuccessProbability] = useState(0);
  const [growthRate, setGrowthRate] = useState(50);
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
    setTotalPackets(0);
    setSuccessfulPackets(0);
    setFailedPackets(0);
    setChartData([]);
    setAlert({ type: 'info', message: 'Traffic simulation started...' });

    let packets = 0;
    let successful = 0;
    let failed = 0;
    const data = [];

    simulationInterval.current = setInterval(() => {
      // Simulate packet transmission
      const packetsPerInterval = Math.floor(growthRate / 10) + 1;
      
      for (let i = 0; i < packetsPerInterval; i++) {
        packets++;
        
        // Simulate success/failure (80-95% success rate)
        const randomSuccess = Math.random();
        if (randomSuccess > 0.15) {
          successful++;
        } else {
          failed++;
        }
      }

      const probability = successful / packets;
      
      setTotalPackets(packets);
      setSuccessfulPackets(successful);
      setFailedPackets(failed);
      setSuccessProbability(probability);

      // Update chart data
      data.push({
        time: new Date().toLocaleTimeString(),
        packets: packets,
        successful: successful,
        failed: failed,
        successRate: (probability * 100).toFixed(2)
      });

      if (data.length > 20) data.shift();
      setChartData([...data]);

      // Auto-save every 100 packets
      if (packets % 100 === 0) {
        saveSimulationData(packets, successful, failed);
      }
    }, 500);
  };

  const stopSimulation = () => {
    if (simulationInterval.current) {
      clearInterval(simulationInterval.current);
      simulationInterval.current = null;
    }
    setIsSimulating(false);
    
    if (totalPackets > 0) {
      saveSimulationData(totalPackets, successfulPackets, failedPackets);
      setAlert({ type: 'success', message: 'Simulation stopped and data saved!' });
    }
  };

  const saveSimulationData = async (total, successful, failed) => {
    try {
      const response = await trafficAPI.saveSimulation({
        total_packets: total,
        successful_packets: successful,
        failed_packets: failed
      });

      const data = response.data.data;
      setMetrics(data);
      setCurrentCalculation(data.binomial_calculation);
    } catch (error) {
      console.error('Error saving simulation:', error);
      setAlert({ type: 'error', message: 'Failed to save simulation data' });
    }
  };

  return (
    <div className="simulation-page">
      <header className="page-header">
        <h1 className="page-title">Network Traffic Prediction</h1>
        <p className="page-subtitle">Binomial Distribution Analysis</p>
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
          <label>Growth Rate: {growthRate} packets/sec</label>
          <input
            type="range"
            min="10"
            max="200"
            value={growthRate}
            onChange={(e) => setGrowthRate(Number(e.target.value))}
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
            Start Traffic Simulation
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

      {/* Live Traffic Counter */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Packets (n)</h3>
          <p className="metric-value">{totalPackets.toLocaleString()}</p>
          <span className="metric-change">Total transmitted</span>
        </div>

        <div className="metric-card success">
          <h3>Successful Packets (k)</h3>
          <p className="metric-value">{successfulPackets.toLocaleString()}</p>
          <span className="metric-change">Delivered successfully</span>
        </div>

        <div className="metric-card danger">
          <h3>Failed Packets</h3>
          <p className="metric-value">{failedPackets.toLocaleString()}</p>
          <span className="metric-change">Transmission failed</span>
        </div>

        <div className="metric-card warning">
          <h3>Success Probability (p)</h3>
          <p className="metric-value">{(successProbability * 100).toFixed(2)}%</p>
          <span className="metric-change">Success rate</span>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card large">
          <h3 className="chart-title">Traffic Growth vs Success Rate</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPackets" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ff6b35" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ff6b35' }} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="packets" 
                stroke="#ff6b35" 
                fillOpacity={1} 
                fill="url(#colorPackets)"
                name="Total Packets"
              />
              <Area 
                type="monotone" 
                dataKey="successful" 
                stroke="#4ade80" 
                fillOpacity={1} 
                fill="url(#colorSuccess)"
                name="Successful"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Packet Loss Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ff6b35' }} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="failed" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Failed Packets"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Calculation Display */}
      {currentCalculation && (
        <div className="calculation-card">
          <h3 className="calc-title">Binomial Distribution Calculation</h3>
          <div className="formula-display">
            <p className="formula">P(X = k) = nCk × p^k × (1-p)^(n-k)</p>
          </div>
          <pre className="calculation-steps">{currentCalculation}</pre>
        </div>
      )}

      {/* Reliability Metrics Panel */}
      {metrics && (
        <div className="reliability-panel">
          <h3 className="panel-title">Reliability Metrics</h3>
          <div className="reliability-grid">
            <div className="reliability-item">
              <TrendingUp className="reliability-icon" />
              <div>
                <h4>Packet Success Probability</h4>
                <p className="reliability-value">{(metrics.probability * 100).toFixed(4)}%</p>
              </div>
            </div>

            <div className="reliability-item">
              <AlertCircle className="reliability-icon danger" />
              <div>
                <h4>Packet Loss Probability</h4>
                <p className="reliability-value">{(metrics.packet_loss_probability * 100).toFixed(4)}%</p>
              </div>
            </div>

            <div className="reliability-item">
              <ServerIcon className="reliability-icon warning" />
              <div>
                <h4>Retransmission Estimate</h4>
                <p className="reliability-value">{metrics.retransmission_estimate.toFixed(0)} packets</p>
              </div>
            </div>

            <div className="reliability-item">
              <CheckCircle className="reliability-icon success" />
              <div>
                <h4>Network Reliability Score</h4>
                <p className="reliability-value">{metrics.reliability_score.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scaling Recommendation */}
      {metrics && (
        <div className="recommendation-panel">
          <h3 className="panel-title">Scaling Recommendation Engine</h3>
          <div className="scaling-grid">
            <div className="scaling-card">
              <h4>Horizontal Scaling</h4>
              <p className="scaling-value">{metrics.horizontal_scaling}</p>
              <span className="scaling-label">Extra servers required</span>
            </div>

            <div className="scaling-card">
              <h4>Vertical Scaling</h4>
              <p className="scaling-value">{metrics.vertical_scaling}%</p>
              <span className="scaling-label">CPU/RAM increase</span>
            </div>
          </div>

          <div className="recommendation-box">
            <AlertCircle size={24} className="rec-icon" />
            <p>{metrics.scaling_recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrafficPrediction;
