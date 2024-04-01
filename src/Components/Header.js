import { useEffect, useState } from 'react';
import React from 'react';
import LogoForHeader from './LogoForHeader';
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
//import { FaL } from 'react-icons/fa6';
import { db } from "../firebase";
import { doc, getDoc} from "firebase/firestore";



export default function Header() {
  //onClick to navigate to other pages by using the useNavigate() of react-router-dom
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //fetch data for users collection
  const [userInfo, setUserInfo] = useState({});

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage hamburger menu visibility

  //update the page state based on the authentication
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserInfo({ email: user.email, ...userDoc.data() });
        }
      } else {
        setIsLoggedIn(false);
        setUserInfo({});
      }
    });
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  
  // Toggle function for mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isAdmin = userInfo.isAdmin && userInfo.email === 'dealmeadmin@gmail.com';

  // //event listener auto log out user when user close the website
  // useEffect(() => {
  //   const handleBeforeUnload = async () => {
  //     // Check if the user is logged in before trying to log out
  //     if (isLoggedIn) {
  //       try {
  //         await signOut(auth);
  //         // You can also perform other cleanup tasks here
  //       } catch (error) {
  //         console.error("Logout Error on Window Close:", error);
  //       }
  //     }
  //   };
  
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  
  //   // Cleanup the event listener on component unmount
  //   return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  //}, [isLoggedIn, auth]); // Depend on isLoggedIn and auth to ensure the effect is updated appropriately

  return (
    <div className='h-16 bg-slate-900 border-b-2 shadow-lg sticky top-0 z-50 py-2 px-3'>
      <header className='flex justify-between items-center
       max-w-7xl mx-auto'>
        <div className='cursor-pointer'
            onClick={() => navigate("/")}>
          <LogoForHeader/>
        </div>
        <div className='hidden lg:flex'>
            <ul className='flex space-x-12 cursor-pointer text-center font-semibold mr-5 pb-3'>
                <li className='no-underline  text-white hover:text-sky-500 hover:font-extrabold transition duration-150 ease-in-out'
                  onClick={() => navigate("/")}>Home</li>

                <li className='no-underline  text-white hover:text-sky-500 hover:font-extrabold transition duration-150 ease-in-out'
                  onClick={() => navigate("/GuestPage")}>MarketPlace</li>
            
                <li className='no-underline  text-white hover:text-sky-500 hover:font-extrabold transition duration-150 ease-in-out'
                      onClick={() => navigate("/ContactUsPage")}>Contact Us</li>
        
                {isLoggedIn && (
                        <li className={`cursor-pointer text-white hover:text-sky-500 hover:font-extrabold transition duration-150 ease-in-out ${isAdmin ? 'text-red-500' : ''}`}
                            onClick={() => navigate(isAdmin ? "/AdminDashboard" : "/UserProfilePage")}>
                            {isAdmin ? 'AdminDashboard' : 'My DealMe'}
                        </li>
                    )}

                    {isLoggedIn ? (
                        <div className='flex flex-col -mt-3'>
                            <li className='cursor-pointer text-purple-100 hover:text-purple-300 hover:font-extrabold transition duration-150 ease-in-out'
                              onClick={() => navigate("/UserProfilePage")}>Hi, {userInfo.username || 'User'}</li>
                            <li className='cursor-pointer text-sm text-teal-100 hover:text-teal-300 hover:font-extrabold transition duration-150 ease-in-out'
                              onClick={handleLogout}>Logout</li>
                        </div>
                    ) : (
                        <li className='cursor-pointer text-white hover:text-sky-500 hover:font-extrabold transition duration-150 ease-in-out'
                          onClick={() => navigate("/Login")}>Log In</li>
                )}           
            </ul>
        </div>
        <div className='lg:hidden flex items-center'>
          {/* Hamburger menu icon here */}
          <button onClick={toggleMenu} className='-mt-10 p-2 bg-gradient-to-r from-purple-300 to-teal-300 text-slate-800'>
              {/* Hamburger icon */}
              <span className='hamburger-icon'>☰</span>
          </button>
          {isMenuOpen && (
            <ul className='absolute top-full rounded-xl right-0 w-auto flex flex-col space-y-2 cursor-pointer text-right pr-4 py-3 font-semibold text-slate-800 bg-purple-50'>
              <li className='no-underline hover:text-sky-500 hover:font-extrabold transition duration-150 ease-in-out'
                onClick={() => navigate("/")}>Home</li>

              <li className='no-underline hover:text-sky-500 hover:font-extrabold transition duration-150 ease-in-out'
                onClick={() => navigate("/GuestPage")}>MarketPlace</li>
          
              <li className='no-underline hover:text-sky-500 hover:font-extrabold transition duration-150 ease-in-out'
                    onClick={() => navigate("/ContactUsPage")}>Contact Us</li>
      
              {isLoggedIn ? (
                <>
                <li className='cursor-pointer hover:text-sky-500 hover:font-extrabold transition duration-150 ease-in-out'
                    onClick={() => navigate("/UserProfilePage")}>My DealMe</li>
                <div className='flex flex-col -mt-3'>
                    <li className='cursor-pointer text-purple-800 hover:text-purple-900 hover:font-extrabold transition duration-150 ease-in-out'
                      onClick={() => navigate("/UserProfilePage")}>Hi, {userInfo.username || 'User'}</li>
                    <li className='cursor-pointer text-sm text-teal-700 hover:text-teal-800 hover:font-extrabold transition duration-150 ease-in-out'
                      onClick={handleLogout}>Logout</li>
                </div>
                </>
                  ) : (
                <li className='text-white hover:text-sky-500 transition duration-150 ease-in-out'
                  onClick={() => navigate("/Login")}>Log In</li>
              )}           
            </ul>
          )}
        </div>
      </header>
    </div>
  )
}
