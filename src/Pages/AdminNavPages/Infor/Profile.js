import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Header';
import SideNav from '../../SideNav';

function Profile() {
  const [adminProfile, setAdminProfile] = useState({
    name: '',
    location: '',
    email: '',
    bio: '',
    picture: '' // Assuming 'picture' is the URL to the admin's profile picture
  });
  const [editing, setEditing] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null); // To store the selected picture file

  useEffect(() => {
    // Load admin profile from local storage when component mounts
    const storedProfile = JSON.parse(localStorage.getItem('adminProfile'));
    if (storedProfile) {
      setAdminProfile(storedProfile);
    }
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Save admin profile to local storage
    localStorage.setItem('adminProfile', JSON.stringify(adminProfile));
    setEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdminProfile({
      ...adminProfile,
      [name]: value
    });
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setSelectedPicture(file);

    // Read the selected picture file and convert it to a data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      setAdminProfile({
        ...adminProfile,
        picture: event.target.result // Set the data URL as the picture
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      
      <SideNav />
      <div className="profile-container">
      <h3 className="page-title">Profile</h3>
        <div className="profile-info">
          <img src={adminProfile.picture} alt="Admin" className="profile-picture" />
          <div>
            <p className="profile-text">Name: {adminProfile.name}</p>
            <p className="profile-text">Location: {adminProfile.location}</p>
            <p className="profile-text">Email: {adminProfile.email}</p>
            <p className="profile-text">Bio: {adminProfile.bio}</p>
            {editing && (
              <>
                <input
                  type="text"
                  name="name"
                  value={adminProfile.name}
                  onChange={handleInputChange}
                  className="profile-input"
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="location"
                  value={adminProfile.location}
                  onChange={handleInputChange}
                  className="profile-input"
                  placeholder="Location"
                />
                <input
                  type="email"
                  name="email"
                  value={adminProfile.email}
                  onChange={handleInputChange}
                  className="profile-input"
                  placeholder="Email"
                />
                <textarea
                  name="bio"
                  value={adminProfile.bio}
                  onChange={handleInputChange}
                  className="profile-bio-edit"
                  placeholder="Bio"
                />
                <input
                  type="file"
                  onChange={handlePictureChange}
                />
              </>
            )}
          </div>
          <div>
            {editing ? (
              <button onClick={handleSaveClick} className="profile-save-button">Save</button>
            ) : (
              <button onClick={handleEditClick} className="profile-edit-button">Edit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
