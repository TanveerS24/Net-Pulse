import { useState, useEffect } from 'react';
import { Trash2, Eye, RefreshCw } from 'lucide-react';
import { trafficAPI, serverAPI } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Analytics = () => {
  const [trafficHistory, setTrafficHistory] = useState([]);
  const [serverHistory, setServerHistory] = useState([]);
  const [selectedTraffic, setSelectedTraffic] = useState(null);
  const [selectedServer, setSelectedServer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('traffic');

  useEffect(() => {
    fetchHistoricalData();
  }, []);

  const fetchHistoricalData = async () => {
    try {
      setLoading(true);
      const [trafficRes, serverRes] = await Promise.all([
        trafficAPI.getAllSimulations(),
        serverAPI.getAllSimulations(),
      ]);

      setTrafficHistory(trafficRes.data.data);
      setServerHistory(serverRes.data.data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTrafficSimulation = async (id) => {
    if (window.confirm('Are you sure you want to delete this simulation?')) {
      try {
        await trafficAPI.deleteSimulation(id);
        fetchHistoricalData();
      } catch (error) {
        console.error('Error deleting simulation:', error);
      }
    }
  };

  const deleteServerSimulation = async (id) => {
    if (window.confirm('Are you sure you want to delete this simulation?')) {
      try {
        await serverAPI.deleteSimulation(id);
        fetchHistoricalData();
      } catch (error) {
        console.error('Error deleting simulation:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Analytics...</p>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <header className="page-header">
        <h1 className="page-title">Historical Analytics</h1>
        <p className="page-subtitle">Past Simulation Data & Comparisons</p>
        <button className="btn btn-secondary" onClick={fetchHistoricalData}>
          <RefreshCw size={18} />
          Refresh Data
        </button>
      </header>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'traffic' ? 'active' : ''}`}
          onClick={() => setActiveTab('traffic')}
        >
          Traffic Simulations ({trafficHistory.length})
        </button>
        <button
          className={`tab ${activeTab === 'server' ? 'active' : ''}`}
          onClick={() => setActiveTab('server')}
        >
          Server Simulations ({serverHistory.length})
        </button>
      </div>

      {/* Traffic Analytics */}
      {activeTab === 'traffic' && (
        <>
          {/* Traffic Comparison Chart */}
          <div className="chart-card large">
            <h3 className="chart-title">Traffic Reliability Comparison</h3>
            <p className="chart-description">
              <strong>X-axis:</strong> Total Packets Transmitted | <strong>Y-axis:</strong> Reliability Score (%)
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trafficHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="total_packets" 
                  name="Total Packets" 
                  stroke="#999"
                />
                <YAxis 
                  dataKey="reliability_score" 
                  name="Reliability %" 
                  stroke="#999"
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ff6b35' }}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Legend />
                <Bar 
                  dataKey="reliability_score"
                  name="Reliability %" 
                  fill="#ff6b35"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic History Table */}
          <div className="table-card">
            <h3 className="table-title">Traffic Simulation History</h3>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Total Packets</th>
                    <th>Successful</th>
                    <th>Failed</th>
                    <th>Reliability</th>
                    <th>Scaling</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trafficHistory.map((sim) => (
                    <tr key={sim._id}>
                      <td>{new Date(sim.timestamp).toLocaleString()}</td>
                      <td>{sim.total_packets.toLocaleString()}</td>
                      <td className="success-text">{sim.successful_packets.toLocaleString()}</td>
                      <td className="danger-text">{sim.failed_packets.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${sim.reliability_score >= 90 ? 'success' : sim.reliability_score >= 70 ? 'warning' : 'danger'}`}>
                          {sim.reliability_score.toFixed(2)}%
                        </span>
                      </td>
                      <td>H: {sim.horizontal_scaling} / V: {sim.vertical_scaling}%</td>
                      <td>
                        <button 
                          className="icon-btn" 
                          onClick={() => setSelectedTraffic(sim)}
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="icon-btn danger" 
                          onClick={() => deleteTrafficSimulation(sim._id)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Traffic Detail Modal */}
          {selectedTraffic && (
            <div className="modal-overlay" onClick={() => setSelectedTraffic(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-title">Traffic Simulation Details</h3>
                <div className="modal-body">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Total Packets:</strong>
                      <span>{selectedTraffic.total_packets.toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Successful:</strong>
                      <span className="success-text">{selectedTraffic.successful_packets.toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Failed:</strong>
                      <span className="danger-text">{selectedTraffic.failed_packets.toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Success Probability:</strong>
                      <span>{(selectedTraffic.probability * 100).toFixed(4)}%</span>
                    </div>
                    <div className="detail-item">
                      <strong>Reliability Score:</strong>
                      <span>{selectedTraffic.reliability_score.toFixed(2)}%</span>
                    </div>
                    <div className="detail-item">
                      <strong>Packet Loss:</strong>
                      <span>{(selectedTraffic.packet_loss_probability * 100).toFixed(4)}%</span>
                    </div>
                  </div>

                  <div className="calculation-section">
                    <h4>Binomial Calculation</h4>
                    <pre className="calculation-text">{selectedTraffic.binomial_calculation}</pre>
                  </div>

                  <div className="recommendation-section">
                    <h4>Scaling Recommendation</h4>
                    <p>{selectedTraffic.scaling_recommendation}</p>
                  </div>
                </div>
                <button className="btn btn-secondary" onClick={() => setSelectedTraffic(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Server Analytics */}
      {activeTab === 'server' && (
        <>
          {/* Server Comparison Chart */}
          <div className="chart-card large">
            <h3 className="chart-title">Server Utilization vs Queue Length</h3>
            <p className="chart-description">
              <strong>X-axis:</strong> Simulation Timestamp | <strong>Y-axis:</strong> Utilization % & Queue Length
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serverHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="timestamp" 
                  name="Timestamp" 
                  stroke="#999"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis 
                  dataKey="server_utilization" 
                  name="Utilization %" 
                  stroke="#999"
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ff6b35' }}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Legend />
                <Bar 
                  dataKey="server_utilization"
                  name="Utilization %" 
                  fill="#ff6b35"
                />
                <Bar 
                  dataKey="queue_length"
                  name="Queue Length" 
                  fill="#ef4444"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Server History Table */}
          <div className="table-card">
            <h3 className="table-title">Server Simulation History</h3>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Arrival Rate (λ)</th>
                    <th>Requests</th>
                    <th>Queue</th>
                    <th>Utilization</th>
                    <th>Boost %</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {serverHistory.map((sim) => (
                    <tr key={sim._id}>
                      <td>{new Date(sim.timestamp).toLocaleString()}</td>
                      <td>{sim.arrival_rate.toFixed(2)}</td>
                      <td>{sim.request_count.toLocaleString()}</td>
                      <td className="warning-text">{sim.queue_length}</td>
                      <td>
                        <span className={`badge ${sim.server_utilization >= 80 ? 'danger' : sim.server_utilization >= 60 ? 'warning' : 'success'}`}>
                          {sim.server_utilization.toFixed(1)}%
                        </span>
                      </td>
                      <td>{sim.boost_percentage}%</td>
                      <td>
                        <button 
                          className="icon-btn" 
                          onClick={() => setSelectedServer(sim)}
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="icon-btn danger" 
                          onClick={() => deleteServerSimulation(sim._id)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Server Detail Modal */}
          {selectedServer && (
            <div className="modal-overlay" onClick={() => setSelectedServer(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-title">Server Simulation Details</h3>
                <div className="modal-body">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Arrival Rate (λ):</strong>
                      <span>{selectedServer.arrival_rate.toFixed(4)}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Request Count:</strong>
                      <span>{selectedServer.request_count.toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <strong>RPS:</strong>
                      <span>{selectedServer.requests_per_second}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Queue Length:</strong>
                      <span className="warning-text">{selectedServer.queue_length}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Utilization:</strong>
                      <span>{selectedServer.server_utilization.toFixed(2)}%</span>
                    </div>
                    <div className="detail-item">
                      <strong>Overload Probability:</strong>
                      <span className="danger-text">{(selectedServer.overload_probability * 100).toFixed(2)}%</span>
                    </div>
                  </div>

                  <div className="calculation-section">
                    <h4>Poisson Calculation</h4>
                    <pre className="calculation-text">{selectedServer.poisson_calculation}</pre>
                  </div>

                  <div className="recommendation-section">
                    <h4>Performance Boost Recommendation</h4>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{selectedServer.boost_recommendation}</pre>
                  </div>
                </div>
                <button className="btn btn-secondary" onClick={() => setSelectedServer(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Analytics;
