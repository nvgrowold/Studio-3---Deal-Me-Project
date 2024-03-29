// MyAccount component
import React from "react";
const MyAccount = () => {
    return (
      <div className="my-account-page">
        <h3 className="page-title">My Account</h3>
        <div className="account-details">
          <label>Username:</label>
          <input type="text" placeholder="Enter your username" />
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" />
          {/* Other account details */}
        </div>
        <button className="save-btn">Save</button>
      </div>
    );
  };
  
  export default MyAccount;
  