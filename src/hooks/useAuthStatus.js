import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'

//need to delete "default" as want to return two information, because if use default can't return 2 things
export function useAuthStatus() {
    //create two hooks: one for login status another for hold sometime to check the according information came or not 
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] =useState(true);

    //useEffect to ask firebase the person is authenticated or not
    useEffect(() => {
        //create an auth and initialize it by using getAuth()
        const auth= getAuth()
        //a method from firebase
        onAuthStateChanged(auth, (user)=> {
            if(user){
                setLoggedIn(true)
            }
            //after checking user status, change the checking status to false to stop checking, only check it once
            setCheckingStatus(false)
        })
    }, []) //add a [] here, just call the useEffect one time 
    
  return {loggedIn, checkingStatus} //return this two information to the PrivateRoute
}
