import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//****************************Customized HOOK MUST START WITH 'use'****************************************** */

export function useAdminAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUserEmail(user.email);
      } else {
        setLoggedIn(false);
        setUserEmail("");
      }
      setCheckingStatus(false);
    });
  }, []);

  return { loggedIn, checkingStatus, userEmail };
}
