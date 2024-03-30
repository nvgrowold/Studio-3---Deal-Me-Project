<<<<<<< HEAD
// Inside the Settings component
import React, { useState, useEffect } from 'react';
import Profile from '../AdminNavPages/Infor/Profile'; // Assuming you have a Profile component
import PersonalInfo from '../AdminNavPages/Infor/PersonalInfo'; // Assuming you have a PersonalInfo component
import PasswordChange from '../AdminNavPages/Infor/PasswordChange'; // Assuming you have a PasswordChange component
import MyAccount from '../AdminNavPages/Infor/MyAccount'; // Assuming you have a MyAccount component
import Header from '../../Components/Header';
import SideNav from '../SideNav';
import '../AdminNavPages/Settings.css';
=======
import React from 'react';
import Header from '../../Components/Header'
import SideNav from '../SideNav'
//import HeaderAfterLogin from '../../Components/HeaderAfterLogin';

//import './Settings.css';
>>>>>>> main

const Settings = () => {
  // State to manage which page is currently active
  const [activePage, setActivePage] = useState('profile');

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
<<<<<<< HEAD
      <Header />
      <div className='flex'>
          <div className="w-1/6 min-h-screen shadow-lg">
              <SideNav />
          </div>
          <div className="w-5/6 p-8">
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
            </div>
    </div>
=======
    <Header/>
    <SideNav/>
    
    <div className='pageTitle'>
      <h1>Settings</h1>
      <div className="settings-form">
        <div className="setting-group">
          <h2>General Settings</h2>
          <label>Application Name:</label>
          <input type="text" placeholder="Enter application name" />
          <label>Timezone:</label>
          <select>
            <option value="utc">UTC</option>
            <option value="gmt">GMT</option>
            {/* Add more timezone options */}
          </select>
          {/* Add more general settings options */}
        </div>
        <div className="setting-group">
          <h2>User Settings</h2>
          {/* Add user settings options */}
        </div>
        <div className="setting-group">
          <h2>Email Settings</h2>
          {/* Add email settings options */}
        </div>
        {/* Add more setting groups for security, notifications, theme, etc. */}
      </div>
    </div>
    </div>
>>>>>>> main
  );
};

export default Settings;