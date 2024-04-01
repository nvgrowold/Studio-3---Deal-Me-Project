import React from "react";
import Profile from "./Profile";
import PersonalInfo from "./PersonalInfo";
import PasswordChange from "./PasswordChange";

const MyAccount = () => {
    return (
      <div>
        
        <Profile />
        <PersonalInfo />
        <PasswordChange/>
      </div>
    );
};

export default MyAccount;
