import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

//****************************Customized HOOK MUST START WITH 'use'****************************************** */

export function useVerifiedUserAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists() && userDoc.data().isVerified) {
                    setLoggedIn(true);
                    setIsVerified(userDoc.data().isVerified);
                } else {
                    setLoggedIn(false);
                    setIsVerified(false);
                }
            } else {
                setLoggedIn(false);
                setIsVerified(false);
            }
            setCheckingStatus(false);
        });

        return () => unsubscribe();
    }, []);

  return { loggedIn, checkingStatus, isVerified };
}
