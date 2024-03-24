import React from 'react';
import Header from '../../Components/Header'
import SideNav from '../SideNav'
//import HeaderAfterLogin from '../../Components/HeaderAfterLogin';

//import './Settings.css';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
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
  );
};

export default Settings;
