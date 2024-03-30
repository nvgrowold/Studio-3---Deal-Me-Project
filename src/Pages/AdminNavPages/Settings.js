// Inside the Settings component
import React, { useState, useEffect } from 'react';
import Profile from '../AdminNavPages/Infor/Profile'; // Assuming you have a Profile component
import PersonalInfo from '../AdminNavPages/Infor/PersonalInfo'; // Assuming you have a PersonalInfo component
import PasswordChange from '../AdminNavPages/Infor/PasswordChange'; // Assuming you have a PasswordChange component
import MyAccount from '../AdminNavPages/Infor/MyAccount'; // Assuming you have a MyAccount component
import Header from '../../Components/Header';
import SideNav from '../SideNav';
import '../AdminNavPages/Settings.css';

const Settings = () => {
  // State to manage which page is currently active
  const [activePage, setActivePage] = useState('profile');

  return (
    <div className="admin-dashboard">
      <Header/>
      <SideNav/>
      {/* Header and SideNav components */}
      <div className="main-content">
        <h2 className="page-title"></h2>

        {/* Navigation Links as Top Inline Navbar */}
        <div className="top-navbar">
          <ul className="nav-list">
            <li className={activePage === 'profile' ? 'active' : ''} onClick={() => setActivePage('profile')}>Profile</li>
            <li className={activePage === 'personalInfo' ? 'active' : ''} onClick={() => setActivePage('personalInfo')}>Personal Info</li>
            <li className={activePage === 'passwordChange' ? 'active' : ''} onClick={() => setActivePage('passwordChange')}>Password Change</li>
            <li className={activePage === 'myAccount' ? 'active' : ''} onClick={() => setActivePage('myAccount')}>My Account</li>
          </ul>
        </div>

        {/* Render the selected page */}
        <div className="page-content">
          {activePage === 'profile' && <Profile />}
          {activePage === 'personalInfo' && <PersonalInfo />}
          {activePage === 'passwordChange' && <PasswordChange />}
          {activePage === 'myAccount' && <MyAccount />}
        </div>

      </div>
    </div>
  );
};

export default Settings;