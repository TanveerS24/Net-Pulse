import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, Server, BarChart3, Menu, X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/traffic', icon: Activity, label: 'Traffic Prediction' },
    { path: '/server', icon: Server, label: 'Server Performance' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics History' },
  ];

  return (
    <>
      {!isOpen && (
        <button 
          className="sidebar-open-btn"
          onClick={() => setIsOpen(true)}
          title="Open Sidebar"
        >
          <Menu size={24} />
        </button>
      )}

      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-top">
            <button 
              className="sidebar-close-btn"
              onClick={() => setIsOpen(false)}
              title="Close Sidebar"
            >
              <X size={20} />
            </button>
            <div className="sidebar-title-group">
              <h1 className="sidebar-title">Load Sphere</h1>
              <p className="sidebar-subtitle">Probabilistic Analysis</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <p>v1.0.0</p>
          <p className="footer-text">Network & Server Analytics</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
