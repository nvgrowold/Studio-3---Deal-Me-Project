
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavPages/Dashboard.css';

const SideNav = () => {
  return (
    <>
    <div className="side-nav">
      <Link to='/Dashboard' className="nav-link" style={{ textDecoration: 'none', color:'#64007D' }}>
        Dashboard
      </Link>
      <Link to='/Reports' className="nav-link" style={{ textDecoration: 'none', color:'#64007D' }}>
        Reports
      </Link>
      <Link to='/Settings' className="nav-link" style={{ textDecoration: 'none', color:'#64007D' }}>
        Settings
      </Link>
      

    </div>
    </>
  );
};

export default SideNav;
