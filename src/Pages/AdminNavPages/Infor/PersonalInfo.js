import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase'; // Import the Firebase instance with Firestore
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersonalInfo = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        // Fetch personal info from Firestore when component mounts
        const fetchPersonalInfo = async () => {
            try {
                console.log("DB Object:", db); // Check the db object
                const personalInfoRef = db.collection('Profile').doc('adminReports'); // Replace 'adminID' with the actual ID of the admin
                const doc = await personalInfoRef.get();
                if (doc.exists) {
                    const data = doc.data();
                    setFirstName(data.firstName || '');
                    setLastName(data.lastName || '');
                    setDateOfBirth(data.dateOfBirth || '');
                    setPhoneNumber(data.phoneNumber || '');
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };

        fetchPersonalInfo();
    }, []);

    const handleSavePersonalInfo = async () => {
        // Save personal info to Firestore
        try {
            console.log("DB Object:", db); // Check the db object
            const personalInfoRef = db.collection('Profile').doc('adminReports'); // Replace 'adminID' with the actual ID of the admin
            await personalInfoRef.set({
                firstName,
                lastName,
                dateOfBirth,
                phoneNumber
            });
            toast.success('Personal info saved successfully!');
        } catch (error) {
            console.error('Error saving personal info:', error);
            toast.error('Error saving personal info');
        }
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
