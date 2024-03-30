// PasswordChange component
import React, { useState, useEffect } from 'react';
const PasswordChange = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
    const handlePasswordChange = () => {
      // Implement password change logic here
      if (newPassword === confirmNewPassword) {
        // Passwords match, proceed with changing password
        // You can add further validation and backend integration here
        alert('Password changed successfully!');
      } else {
        // Passwords don't match, show an error message
        alert('Passwords do not match. Please try again.');
      }
    };
  
    return (
      <div className="password-change-page">
        <h3 className="page-title">Change Password</h3>
        <div className="password-change-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword">Confirm New Password:</label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm your new password"
            />
          </div>
          <button className="save-btn" onClick={handlePasswordChange}>Change Password</button>
        </div>
      </div>
    );
  };
  
  export default PasswordChange;
  