import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import HeaderAfterLogin from '../Components/HeaderAfterLogin'; 
import { FieldValue } from 'firebase/firestore';

// ####################################
import { getAuth } from 'firebase/auth';




//#############################

export default function UserProfilePage() {
  
  //######################################
  //get auth from firebase for user name and email
  const auth = getAuth();
  
  // create navigate by using the useNavigate hook of react-router-dom
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email:auth.currentUser.email,
  });
  //destructure the name and email, otherwise will get error
  const {name, email} =formData;

  function handleLogout(){
    //first to deal with sign out by using the auth
    auth.signOut()
    // then navigate the person to the login page
    navigate("/")
  }

  //########################################


  return (
    <div>
      <HeaderAfterLogin/>

      {/* ################################################################## */}

      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3 '>
          <form>
            {/* Name Input */}
            {/* using "disabled" to stop from editing the value */}
            <input type='text' id='name' value={name} disabled className='w-full px-4 py-2 text-xl
             text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6'/>

            {/* Name Input */}
            {/* using "disabled" to stop from editing the value */}
            <input type='email' id='email' value={email} disabled className='w-full px-4 py-2 text-xl
             text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6'/>

             {/* edit profile */}
             <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
              <p className='flex items-center'>Do you want to change your name?
              <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200ml-1 cursor-pointer'>Edit</span>
              </p>
              <p onClick={handleLogout} className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'>Sign out</p>             
             </div>


          </form>
        </div>
      </section>
      {/* ################################################################################# */}

      <div className='flex space-x-4 mt-20 gap-32'>
          {/* //User Account Page */}
        <div className='shrink w-64 flex-col ml-20 rounded p-3'> 
          <p className='text-2xl font-semibold  text-sky-800'>Account Detail</p>
          <p>
            <Link to='/GuestPage'className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
              Save for later
            </Link>
          </p>

          <div className='mt-5'>
            <p className='text-lg font-semibold text-sky-800'>Buying</p>
            <p>
              <Link to='/GuestPage'className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
                Items I purchased
              </Link>
            </p>
            <Link to='/GuestPage'className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
              Searching an items
            </Link> 
          </div>

          <div className='mt-5'>
            <p className='text-lg font-semibold text-sky-800'>Selling</p>
            <p>
              <Link to='/ListProductPage' className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
                Listing an item
              </Link>
            </p>
            <Link to='/ListProductPage ' className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
                Items I'm selling
            </Link>
          </div>
        </div>
        
        {/* Table of account details */}
        <div className='flex-auto max-w-lg shadow-md rounded p-6 px-10'>
          <div className='text-lg font-semibold  text-sky-800 text-center mb-8'>
            <h3>user icon</h3>
            <h3>user name</h3>
          </div>

          <div>
            <div className='flex justify-between whitespace-nowrap text-xs sm:text-base'>
              <p className='text-base font-semibold  text-sky-800'>Member number</p>
              <p className='text-base  text-gray-400'>number</p>
            </div> 
             {/*add a line  */}
            <div className=" flex item-center mb-3 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            </div>

            <div className='flex justify-between whitespace-nowrap text-xs sm:text-base'>
              <p className='text-base font-semibold  text-sky-800'>Name</p>
              <p className='text-base text-gray-400'>name</p>
            </div>
            {/*add a line  */}
            <div className=" flex item-center mb-3 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            </div>

            <div className='flex justify-between whitespace-nowrap text-xs sm:text-base'>
              <p className='text-base font-semibold  text-sky-800'>Email</p>
              <p className='text-base text-gray-400'>email</p>
            </div>
            {/*add a line  */}
            <div className=" flex item-center mb-3 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            </div>          

            <div className='flex justify-between whitespace-nowrap text-xs sm:text-base'>
              <p className='text-base font-semibold  text-sky-800'>Member since</p>
              <p className='text-base text-gray-400'>sign up date</p>
            </div> 
            {/*add a line  */}
            <div className=" flex item-center mb-3 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            </div>

            <div className='flex justify-between whitespace-nowrap text-xs sm:text-base'>
              <p className='text-base font-semibold  text-sky-800'>Verified User</p>
              <p className='text-base text-gray-400'>yes/no</p>
            </div> 
            {/*add a line  */}
            <div className=" flex item-center mb-3 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            </div>

          </div>

          
        </div>

        {/* Empty */}
        <div className='flex-none'>
          3
        </div>

      </div>    

      


    </div>
  )
}
