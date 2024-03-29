import React  from 'react'
import Header from '../../Components/Header';
import SideNav from '../SideNav';



function DispalyingUsers() {
  
  return (
    <div>
      {/* Render Header and SideNav components if needed */}
       <Header/>
      <SideNav/> 
      <h1>Users Verification</h1>
    </div>  
      
  );
}

export default DispalyingUsers;
