import { useState, useEffect } from 'react';
import { Activity, Server, TrendingUp, AlertTriangle } from 'lucide-react';
import { trafficAPI, serverAPI } from '../services/api';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [trafficStats, setTrafficStats] = useState(null);
  const [serverStats, setServerStats] = useState(null);
  const [recentTraffic, setRecentTraffic] = useState([]);
  const [recentServer, setRecentServer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const [trafficStatsRes, serverStatsRes, trafficDataRes, serverDataRes] = await Promise.all([
        trafficAPI.getStatistics(),
        serverAPI.getStatistics(),
        trafficAPI.getAllSimulations(),
        serverAPI.getAllSimulations(),
      ]);

      setTrafficStats(trafficStatsRes.data.data);
      setServerStats(serverStatsRes.data.data);
      setRecentTraffic(trafficDataRes.data.data.slice(0, 10));
      setRecentServer(serverDataRes.data.data.slice(0, 10));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-subtitle">Probabilistic Analysis of Network Traffic and Server Performance</p>
      </header>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon traffic">
            <Activity size={28} />
          </div>
          <div className="stat-content">
            <h3>Average Reliability</h3>
            <p className="stat-value">{trafficStats?.average_reliability || 0}%</p>
            <span className="stat-label">Network Performance</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon server">
            <Server size={28} />
          </div>
          <div className="stat-content">
            <h3>Max Server Load</h3>
            <p className="stat-value">{serverStats?.max_server_load || 0}%</p>
            <span className="stat-label">Peak Utilization</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <TrendingUp size={28} />
          </div>
          <div className="stat-content">
            <h3>Peak Traffic</h3>
            <p className="stat-value">{trafficStats?.peak_traffic || 0}</p>
            <span className="stat-label">Total Packets</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">
            <AlertTriangle size={28} />
          </div>
          <div className="stat-content">
            <h3>Avg Queue Length</h3>
            <p className="stat-value">{serverStats?.average_queue_length || 0}</p>
            <span className="stat-label">Server Queue</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">Traffic Reliability Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recentTraffic}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#999"
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ff6b35' }}
                labelFormatter={(value) => new Date(value).toLocaleString()}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="reliability_score" 
                stroke="#ff6b35" 
                strokeWidth={2}
                name="Reliability %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Server Utilization History</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recentServer}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#999"
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ff6b35' }}
                labelFormatter={(value) => new Date(value).toLocaleString()}
              />
              <Legend />
              <Bar 
                dataKey="server_utilization" 
                fill="#ff6b35" 
                name="Utilization %"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Info */}
      <div className="info-section">
        <div className="info-card">
          <h3>System Status</h3>
          <div className="status-list">
            <div className="status-item">
              <span className="status-dot active"></span>
              <span>Traffic Monitoring Active</span>
            </div>
            <div className="status-item">
              <span className="status-dot active"></span>
              <span>Server Performance Tracking</span>
            </div>
            <div className="status-item">
              <span className="status-dot active"></span>
              <span>Database Connected</span>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => window.location.href = '/traffic'}>
              Start Traffic Simulation
            </button>
            <button className="action-btn" onClick={() => window.location.href = '/server'}>
              Start Server Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
