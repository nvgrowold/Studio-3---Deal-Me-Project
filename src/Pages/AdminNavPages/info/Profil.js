// Profile component
import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
  
    const handleSaveProfile = () => {
      // Implement logic to save profile info
      const profileInfo = {
        username,
        email,
        bio
      };
      console.log('Profile info saved:', profileInfo);
      // You can further validate and send this information to backend
      alert('Profile info saved successfully!');
    };
  
    return (
      <div className="profile-page">
        <h3 className="page-title">Profile</h3>
        <div className="profile-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short bio"
              rows="4"
            ></textarea>
          </div>
          <button className="save-btn" onClick={handleSaveProfile}>Save Profile</button>
        </div>
      </div>
    );
  };
  
  export default Profile;
   