import React from 'react';

const Logout = () => {
  

  
  function handleLogout(){
    //first to deal with sign out by using the auth
    auth.signOut();
    // then navigate the person to the login page
    navigate("/");
  }


  return (
    <div>
      
      <p onClick={handleLogout} className='text-sky-700  hover:text-red-900 hover:font-semibold transition duration-200 ease-in-out cursor-pointer'>Sign out</p>             
    </div>
  );
};

export default Logout;
