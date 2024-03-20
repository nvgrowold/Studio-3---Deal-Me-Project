import { useEffect, useState } from 'react';
import React from 'react';
import LogoForHeader from './LogoForHeader';
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth';



export default function Header() {
  //onClick to navigate to other pages by using the useNavigate() of react-router-dom
  const navigate = useNavigate();

  //hook for Log in button to be dynamic
  const [pageState, setPageState] = useState("Log In");

  //update the page state based on the authentication
  const auth = getAuth();
  //useEffect to check the changes of auth
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{ //use firebase onAuthStateChange() to check
      if(user){  //if the user is authenticated set the page state to Use Profile, otherwise, set to Log In
        setPageState('User Profile')
      } else {
        setPageState('Log In')
      }
    })

  }, [auth])//each time this auth change, check auth for the dependencies
  
  return (
    <div className='h-16 bg-slate-900 border-b-2 shadow-lg sticky top-0 z-50 py-2 px-3'>
      <header className='flex justify-between items-center
       max-w-7xl mx-auto'>
        <div className='cursor-pointer'
            onClick={() => navigate("/")}>
          <LogoForHeader/>
        </div>
        <div>
            <ul className='flex space-x-12 cursor-pointer text-center font-semibold mr-5 pb-3'>
                <li className='no-underline  text-white hover:text-sky-500 hover:font-extrabold transition duration-150 ease-in-out'
                  onClick={() => navigate("/")}>Home</li>

                <li className='no-underline  text-white hover:text-sky-500 hover:font-extrabold transition duration-150 ease-in-out'
                  onClick={() => navigate("/UserProfilePage")}>{pageState}</li> 
                  {/* create a hook to make the log in button dynamic depending on if the user is auth */}

                <li className='no-underline  text-white hover:text-sky-500 hover:font-extrabold transition duration-150 ease-in-out'
                  onClick={() => navigate("/ContactUsPage")}>Contact Us</li>
            </ul>
        </div>
      </header>
    </div>
  )
}
