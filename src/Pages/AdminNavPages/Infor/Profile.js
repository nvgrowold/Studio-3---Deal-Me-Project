import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Header';
import SideNav from '../../SideNav';
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore'; 
import { db } from '../../../firebase';

function Profile() {
  const [adminProfile, setAdminProfile] = useState({});
  const [editing, setEditing] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdminProfile() {
      const adminProfileRef = collection(db, "Profile");
      const q = query(adminProfileRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      let adminProfile = [];
      querySnapshot.forEach((doc) => {
        adminProfile.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setAdminProfile(adminProfile);
      setLoading(false);
    }
    fetchAdminProfile();
  }, []);

  const handleEditClick = () => {
    setEditing(true);
    setNewBio(adminProfile.bio); // Set the newBio state to the current bio for editing
  };

  const handleSaveClick = async () => {
    try {
      // Update the admin profile in Firestore with the new bio
      await db.collection('profiles').doc('admin').update({ bio: newBio });
      setAdminProfile({ ...adminProfile, bio: newBio }); // Update the local state with the new bio
      setEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating admin profile:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewBio(event.target.value);
  };

  return (
    <div>
      
      <SideNav />
      <div className="profile-container">
        <div className="profile-info">
          <img src={"C:\Users\mitch\Downloads\adminProfile.png"} alt="Admin" className="profile-picture" />
          {editing ? (
            <textarea
              value={newBio}
              onChange={handleInputChange}
              className="profile-bio-edit"
            />
          ) : (
            <p className="profile-bio">{adminProfile.bio}</p>
          )}
          {editing ? (
            <button onClick={handleSaveClick} className="profile-save-button">Save</button>
          ) : (
            <button onClick={handleEditClick} className="profile-edit-button">Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
