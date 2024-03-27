<<<<<<< Updated upstream
import React, { useState } from 'react';
import Header from '../../Components/Header';
import SideNav from '../SideNav';
import '../../Styling/settings.css' // Import your custom CSS for Settings

const Settings = () => {
  // State variables for managing settings
  const [appName, setAppName] = useState('');
  const [timezone, setTimezone] = useState('utc');
  const [language, setLanguage] = useState('en'); // Example: language setting
  const [dateFormat, setDateFormat] = useState('dd/mm/yyyy'); // Example: date format setting
  const [userSettings, setUserSettings] = useState({});
  const [theme, setTheme] = useState('light'); // Example: user settings object

  // Function to handle saving settings
  const saveSettings = () => {
    // Implement saving settings logic here
    console.log('Settings saved!');
  };

  // Function to handle saving user settings
  const saveUserSettings = () => {
    // Implement saving user settings logic here
    console.log('User settings saved!');
  };

  // Function to handle saving email settings
  const saveEmailSettings = () => {
    // Implement saving email settings logic here
    console.log('Email settings saved!');
  };

  // Function to handle saving security settings
  const saveSecuritySettings = () => {
    // Implement saving security settings logic here
    console.log('Security settings saved!');
  };

  // Function to handle saving notification settings
  const saveNotificationSettings = () => {
    // Implement saving notification settings logic here
    console.log('Notification settings saved!');
  };

  // Function to handle saving theme settings
  const saveThemeSettings = () => {
    // Implement saving theme settings logic here
    console.log('Theme settings saved!');
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <SideNav />

        <div className="settings-page">
          <h1>Settings</h1>
          <div className="settings-form">
            <div className="setting-group">
              <h2>General Settings</h2>
              <label>Application Name:</label>
              <input 
                type="text" 
                placeholder="Enter application name" 
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
              />
              <label>Timezone:</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                <option value="utc">UTC</option>
                <option value="gmt">GMT</option>
                {/* Add more timezone options */}
              </select>
              <label>Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                {/* Add more language options */}
              </select>
              <label>Date Format:</label>
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
              >
                <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                {/* Add more date format options */}
              </select>
              {/* Add more general settings options */}
              <button onClick={saveSettings}>Save General Settings</button>
            </div>
            <div className="setting-group">
              <h2>User Settings</h2>
              {/* User settings options */}
              <button onClick={saveUserSettings}>Save User Settings</button>
            </div>
            <div className="setting-group">
              <h2>Email Settings</h2>
              {/* Email settings options */}
              <button onClick={saveEmailSettings}>Save Email Settings</button>
            </div>
            <div className="setting-group">
              <h2>Security Settings</h2>
              {/* Security settings options */}
              <button onClick={saveSecuritySettings}>Save Security Settings</button>
            </div>
            <div className="setting-group">
              <h2>Notification Settings</h2>
              {/* Notification settings options */}
              <button onClick={saveNotificationSettings}>Save Notification Settings</button>
            </div>
            <div className="setting-group">
              <h2>Theme Settings</h2>
              <label>Select Theme:</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                {/* Add more theme options */}
              </select>
            </div>
        </div>
=======
// Inside the Settings component
import React, { useState, useEffect } from 'react';
import Profile from './info/Profil'; // Assuming you have a Profile component
import PersonalInfo from './info/PersonalInfo'; // Assuming you have a PersonalInfo component
import PasswordChange from './info/PasswordChange'; // Assuming you have a PasswordChange component
import MyAccount from './info/MyAccount'; // Assuming you have a MyAccount component
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
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default Settings;