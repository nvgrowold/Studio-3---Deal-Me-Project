import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, query, where, updateDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';

export default function AdminPage() {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const db = getFirestore();
  const auth = getAuth();

  // Fetch unverified users
  useEffect(() => {
    const fetchUnverifiedUsers = async () => {
      const q = query(collection(db, "users"), where("isVerified", "==", false));
      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUnverifiedUsers(users);
    };

    fetchUnverifiedUsers();
  }, [db]);

  // Function to update user verification status
  const verifyUser = async (userId) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      isVerified: true
    }).then(() => {
      const userName = unverifiedUsers.find(user => user.id === userId)?.name || "This user";
      toast.success(`User ${userName} has been verified.`);
      // Refresh the list of unverified users
      setUnverifiedUsers(unverifiedUsers.filter(user => user.id !== userId));
    }).catch((error) => {
      console.error("Error updating document: ", error);
      console.log("Authenticated UID:", auth.currentUser?.uid);

      toast.error('Update fail')
    });
  };

  return (
    <div>
      <h1>Admin Dashboard - User Verification</h1>
      <ul>
        {unverifiedUsers.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => verifyUser(user.id)}>Verify</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
