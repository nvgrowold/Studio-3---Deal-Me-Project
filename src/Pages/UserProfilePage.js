import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Header from '../Components/Header'; 
import { FaCircleUser } from "react-icons/fa6";

// ####################################
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc, getDoc} from "firebase/firestore";
import { toast } from "react-toastify";
// db object used to interact with Firestore database
import { db } from "../firebase";     // import db object for configuration and initialization of the database
//#############################

import profileSideImage from "../assets/profileSideImage.jpg"





export default function UserProfilePage() {
  const auth = getAuth();

  //fetch data for users collection
  //from Nikita
    const [userInfo, setUserInfo] = useState({});
    const user = auth.currentUser;
   
    useEffect(() => {
      const fetchUserData = async () => {
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
   
          if (userDoc.exists()) {
            setUserInfo(userDoc.data());
          }
        }
      };
   
      fetchUserData();
    }, [user]);
    //from Nikita



  //######################################
  //get auth from firebase for user name and email
  
  // create navigate by using the useNavigate hook of react-router-dom
  const navigate = useNavigate();

  //change detail hook, set initial value false, no change
  const [changeDetail, setChangeDetail] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email:auth.currentUser.email,
  });
  //destructure the name and email, otherwise will get error
  const {name, email} =formData;

  function handleLogout(){
    //first to deal with sign out by using the auth
    auth.signOut();
    // then navigate the person to the login page
    navigate("/");
  }

  //handle change the input content
  function handleOnChange(e){
    // get previous state, then keep the previous state, and change the target id's value
    // here the target id are name, email,...
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.id]:e.target.value,
    }))
  }

  //add the change to database
  async function onSubmit(){
    try{
      if(auth.currentUser.displayName !== name){
        //update displayname in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update the name in the firestore
        const docRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(docRef, {
          name: name,
        })
      }
      toast.success("Profile updated successfully")
    } catch (error){
      toast.error("Could not update the profile details")
    }
  }

  //########################################


  return (
    <div>
      <Header/>
      <div className='grid gap-8 md:w-auto justify-center mt-10 lg:grid-cols-3 lg:justify-start'>
        <section className='lg:ml-40 lg:mt-16 lg:max-w-40'>
              {/* //User Account Page */}
            <div> 
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
        </section>

        <section>
            {/* <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-full mx-auto mt-16 max-mt-20'>         */}
            <div className='lg:mt-10 md:min-w-96'>  
              {/* Table of account details */}
              <form className='border-transparent'>
                <div className='flex-auto max-w-lg shadow-md rounded p-6 px-10'>
                  <div className='text-lg font-semibold  text-sky-800 text-center mb-8'>
                    <div className='flex justify-center text-4xl border-none'><FaCircleUser /></div>
                    {/* <input type="text" id='username' value={username} placeholder='user name'/> */}
                    <h3>Hello {userInfo.username}</h3>
                  </div>

                  <div>
                    <div className='flex justify-between whitespace-nowrap text-xs sm:text-base'>
                      <p className='text-base font-semibold  text-sky-800'>Member number</p>
                      <p className='text-base  text-gray-400'>{user?.uid}</p>
                    </div>

                    {/*add a line  */}
                    <div className=" flex item-center mb-3 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1 after:border-gray-300"></div>

                    <div className='flex justify-between whitespace-nowrap text-xs sm:text-base'>
                      <p className='text-base font-semibold  text-sky-800'>Name</p>
                                  {/* Name Input */}
                                  {/* using "disabled" to stop from editing the value */}
                                  {/* when changeDetail is false, it's disabled. when changeDetail is true, disable is enabled */}
                                  {/* onChange to change the input */}
                      <input type='text' id='name' value={name} disabled={!changeDetail} onChange={handleOnChange} className={`text-right text-base text-gray-400
                        bg-white border-transparent rounded transition ease-in-out mr-0 p-0 ${changeDetail && "bg-red-200 focus:bg-red-200"}`}/>
                    </div>

                    {/*add a line  */}
                    <div className=" flex item-center mb-3 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1 after:border-gray-300"></div>

                    <div className='flex justify-between whitespace-nowrap text-xs sm:text-base'>
                      <p className='text-base font-semibold  text-sky-800'>Email</p>
                                  {/* Email Input */}
                                  {/* using "disabled" to stop from editing the value */}
                      <input type='email' id='email' value={email} disabled className='text-right text-base text-gray-400
                        bg-white border-transparent rounded transition ease-in-out mr-0 p-0'/>
                    </div>

                    {/*add a line  */}
                    <div className=" flex item-center mb-3 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1 after:border-gray-300"></div>          

                    <div className='flex justify-between whitespace-nowrap text-xs sm:text-base'>
                      <p className='text-base font-semibold  text-sky-800'>Member since</p>
                      <p className='text-base text-gray-400'>{user?.metadata.creationTime}</p>
                    </div>

                    {/*add a line  */}
                    <div className=" flex item-center mb-3 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1 after:border-gray-300"></div>

                    <div className='flex justify-between whitespace-nowrap text-xs sm:text-base'>
                      <p className='text-base font-semibold  text-sky-800'>Verified User</p>
                      <p className='text-base text-gray-400'>yes/no</p>
                    </div>

                    {/*add a line  */}
                    <div className=" flex item-center mb-3 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1 after:border-gray-300"></div>

                    {/* edit profile */}
                  <div className='flex justify-between whitespace-nowrap text-sm sm:text-base mb-6'>
                    <p className='flex items-center text-sky-800'>Update User Information?
                    {/* onClick: first return if changeDetail is true and call onSubmit(), and then change the detail */}
                    <span onClick={()=> {changeDetail && onSubmit(); setChangeDetail((prevState)=>!prevState);}} className='pl-1 text-yellow-600 hover:text-yellow-900 transition duration-200 ease-in-out lg:ml-1 cursor-pointer'>
                      {changeDetail ? "Apply changes" : "Edit"}
                    </span>
                    </p>
                    <p onClick={handleLogout} className='text-sky-700  hover:text-red-900 transition duration-200 ease-in-out cursor-pointer'>Sign out</p>             
                  </div>
                  </div>
                </div>
              </form>        
            </div>

        </section> 

        <section>           
          <div className="w-96 md:w-96 lg:mr-40 lg:mt-16 justify-center md:items-center lg:pl-10">
                <img src={profileSideImage} alt=""/>
          </div>            

        </section>
      </div>
       

    </div>

        
  )
  }
