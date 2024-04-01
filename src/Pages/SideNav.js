import React from 'react';
import { Link } from 'react-router-dom';
import '../Pages/SideNav.css'; // Import CSS for styling

const SideNav = () => {
  return (
    <div className="side-nav">
      <div className="nav-item pt-10">
        <Link to='/AdminDashboard' className="nav-link">
          <span className="nav-icon">📊</span>
          Dashboard
        </Link>
      </div>
      {/* <div className="nav-item">
        <Link to='/Reports' className="nav-link">
          <span className="nav-icon">📈</span>
          Reports
        </Link>
      </div> */}
      <div className="nav-item">
        <Link to='/AdminPage' className="nav-link">
          <span className="nav-icon">👤</span>
          User Verification
        </Link>
      </div>
      {/* <div className="nav-item">
        <Link to='/Inventory' className="nav-link">
          <span className="nav-icon"> 📦</span>
          Inventory
        </Link>
      </div>
      <div className="nav-item">
        <Link to='/Settings' className="nav-link">
          <span className="nav-icon">⚙️</span>
          Settings
        </Link>
      </div>
      <div className="nav-item logout">
        <Link to='/' className="nav-link"> {/* Changed to home page route */}
          {/* <span className="nav-icon">🚪</span>
          Log out
        </Link>
      </div>  */}
    </div>
  );
};

export default SideNav;
