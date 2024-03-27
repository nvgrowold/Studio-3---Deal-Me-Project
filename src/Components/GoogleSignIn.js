import React from 'react'
//import google icon
import { FcGoogle } from "react-icons/fc";
//import toastify error notifications from react-toastify
import {toast} from "react-toastify";
//import getAuth method for user authentication, GoogleAuthProvider and SignInWithPopup for sign in with google pop up screen
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

//import userNavigate to navigate user to another page after login/signup
import {useNavigate} from "react-router-dom";



export default function GoogleSignIn() {
  // initialize the useNavigate hook first
  const navigate = useNavigate();

    //handling click Google SignIn/SignUp button
  async function onGoogleClick(){
    try{
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      // getting the result from the google sign in pop up
      const result = await signInWithPopup(auth, provider);
      //connect the result to the user
      const user = result.user
      console.log(user);
      //add the user to database
      //check if user already exist or not
      // docRef to hold the reference which is the address of the user id, by using the doc() method from firebase firestore
      //use doc()method to get 3 things: database, user, user id
      const docRef = doc(db, "users", user.uid);
      //create a const to hold the returning doc snapshot
      const docSnap = await getDoc(docRef);
    
      //check if available now
      if(!docSnap.exists()){
        await setDoc(docRef,{
          name: user.displayName,
          email: user.email,
          //username: user.username,
          timestamp: serverTimestamp(),
        })
      }
      navigate("/UserProfilePage");
    } catch (error){
      toast.error("Could not authorize with Google");
      console.log(error);
    }
  }

  return (
    // change button type to "button" will avoid the default button type onSubmit in forms, which triggering form validation
    <button type="button" onClick={onGoogleClick} className='flex item-center justify-center mb-10 w-full bg-slate-500 rounded text-white px-7 py-2 uppercase text-sm font-medium shadow-lg hover:bg-slate-700 transition duration-150 ease-in-out hover:shadow-xl active:bg-slate-800'>
       <FcGoogle className='text-xl bg-white rounded-full mr-2'/>
       Continue with Google
    </button>
  )
}
