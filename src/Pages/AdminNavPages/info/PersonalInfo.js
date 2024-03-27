// PersonalInfo component
import React, { useState, useEffect } from 'react';
const PersonalInfo = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
  
    const handleSavePersonalInfo = () => {
      // Implement logic to save personal info
      const personalInfo = {
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber
      };
      console.log('Personal info saved:', personalInfo);
      // You can further validate and send this information to backend
      alert('Personal info saved successfully!');
    };
  
    return (
      <div className="personal-info-page">
        <h3 className="page-title">Personal Information</h3>
        <div className="personal-info-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              placeholder="Select your date of birth"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <button className="save-btn" onClick={handleSavePersonalInfo}>Save Personal Info</button>
        </div>
      </div>
    );
  };
  
  export default PersonalInfo;
  