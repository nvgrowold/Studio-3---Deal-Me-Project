
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavPages/Dashboard.css';
import HeaderAfterLogin from '../Components/HeaderAfterLogin';


const SideNav = () => {
  return (
    <>
    <HeaderAfterLogin/>
    

    <div className="side-nav">
      <Link to='/Dashboard' className="nav-link" style={{ textDecoration: 'none', color:'#64007D' }}>
        Dashboard
      </Link>
      <Link to='/Users' className="nav-link" style={{ textDecoration: 'none', color:'#64007D' }}>
        Users
      </Link>
      <Link to='/Deliveries' className="nav-link" style={{ textDecoration: 'none', color:'#64007D' }}>
        Reports
      </Link>
      <Link to='/Messages' className="nav-link" style={{ textDecoration: 'none', color:'#64007D' }}>
        Messages
      </Link>
      <Link to='/Settings' className="nav-link" style={{ textDecoration: 'none', color:'#64007D' }}>
        Settings
      </Link>
      

    </div>
    </>
  );
};

export default SideNav;
