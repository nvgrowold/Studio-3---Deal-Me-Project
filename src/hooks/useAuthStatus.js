import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {getFirestore, doc, getDoc } from 'firebase/firestore';

//need to delete "default" as want to return two information, because if use default can't return 2 things
export function useAuthStatus() {
    //create two hooks: one for login status another for hold sometime to check the according information came or not 
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] =useState(true);
    const [isUser, setIsUser] = useState(false)

    //useEffect to ask firebase the person is authenticated or not
    useEffect(() => {
        //create an auth and initialize it by using getAuth()
        const auth= getAuth()
        const db = getFirestore();
        //a method from firebase
        onAuthStateChanged(auth, async(user)=> {
            if(user){
                setLoggedIn(true);
                // Check isUser from Firestore
                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setIsUser(userDoc.data().isUser);
                }
            }
            //after checking user status, change the checking status to false to stop checking, only check it once
            setCheckingStatus(false);
        })
    }, []) //add a [] here, just call the useEffect one time 
    
  return {loggedIn, checkingStatus, isUser} //return this three information to the PrivateRoute
}
