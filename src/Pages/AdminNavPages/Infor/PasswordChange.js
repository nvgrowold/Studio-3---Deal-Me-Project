import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersonalInfo = () => {
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: 'dealmeadmin@gmail.com', // Default email for login
        password: ''
    });
    const [editing, setEditing] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        // Load personal info from local storage when component mounts
        const storedInfo = JSON.parse(localStorage.getItem('personalInfo'));
        if (storedInfo) {
            setPersonalInfo(storedInfo);
        }
    }, []);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSavePersonalInfo = () => {
        // Save personal info to local storage
        localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
        setEditing(false);
        toast.success('Personal info saved successfully!');
    };

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        setPersonalInfo({
            ...personalInfo,
            password: newPassword
        });
        setNewPassword('');
        setConfirmPassword('');
        toast.success('Password changed successfully');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo({
            ...personalInfo,
            [name]: value
        });
    };

    return (
        <div className="personal-info-page">
            <h3 className="page-title">Personal Information</h3>
            <div className="personal-info-display">
                <div className="info-item">
                    <label>First Name:</label>
                    <div className="info-value">{editing ? (
                        <input
                            type="text"
                            name="firstName"
                            value={personalInfo.firstName}
                            onChange={handleInputChange}
                        />
                    ) : personalInfo.firstName}</div>
                </div>
                <div className="info-item">
                    <label>Last Name:</label>
                    <div className="info-value">{editing ? (
                        <input
                            type="text"
                            name="lastName"
                            value={personalInfo.lastName}
                            onChange={handleInputChange}
                        />
                    ) : personalInfo.lastName}</div>
                </div>
                <div className="info-item">
                    <label>Date of Birth:</label>
                    <div className="info-value">{editing ? (
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={personalInfo.dateOfBirth}
                            onChange={handleInputChange}
                        />
                    ) : personalInfo.dateOfBirth}</div>
                </div>
                <div className="info-item">
                    <label>Phone Number:</label>
                    <div className="info-value">{editing ? (
                        <input
                            type="text"
                            name="phoneNumber"
                            value={personalInfo.phoneNumber}
                            onChange={handleInputChange}
                        />
                    ) : personalInfo.phoneNumber}</div>
                </div>
                <div className="info-item">
                    <label>Email:</label>
                    <div className="info-value">{personalInfo.email}</div>
                </div>
                <div className="info-item">
                    <label>Password:</label>
                    <div className="info-value">{editing ? (
                        <>
                            <input
                                type="password"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                            />
                            <button className="change-password-btn" onClick={handlePasswordChange}>Change Password</button>
                        </>
                    ) : '********'}</div>
                </div>
            </div>
            <div className="action-buttons">
                {editing ? (
                    <button className="save-btn" onClick={handleSavePersonalInfo}>Save</button>
                ) : (
                    <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                )}
            </div>
        </div>
    );
};

export default PersonalInfo;
