import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, query, where, updateDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import SideNav from './SideNav';
import Header from "../Components/Header";

export default function AdminPage() {
    const [unverifiedUsers, setUnverifiedUsers] = useState([]);
    const [verifiedUsers, setVerifiedUsers] = useState([]);
    const db = getFirestore();
    const auth = getAuth();

    // Function to fetch users based on verification status
    const fetchUsers = async (isVerified, setState) => {
        const q = query(collection(db, "users"), where("isVerified", "==", isVerified));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setState(users);
    };

    // Fetch unverified users
    useEffect(() => {
        fetchUsers(false, setUnverifiedUsers);
    }, [db]);

    // Fetch verified users
    useEffect(() => {
        fetchUsers(true, setVerifiedUsers);
    }, [db]);

    // Function to update user verification status
    const verifyUser = async (userId) => {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { isVerified: true })
            .then(() => {
                const userName = unverifiedUsers.find(user => user.id === userId)?.name || "This user";
                toast.success(`${userName} has been verified.`);
                fetchUsers(false, setUnverifiedUsers);
                fetchUsers(true, setVerifiedUsers);
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
                toast.error('Update failed');
            });
    };

    // Function to ban user
    const banUser = async (userId) => {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { isVerified: false })
            .then(() => {
                const userName = verifiedUsers.find(user => user.id === userId)?.name || "This user";
                toast.success(`${userName} has been banned.`);
                fetchUsers(true, setVerifiedUsers);
                fetchUsers(false, setUnverifiedUsers);
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
                toast.error('Update failed');
            });
    };

    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
            <Header />
            <div className='flex'>
                <div className="w-1/6 min-h-screen shadow-lg">
                    <SideNav />
                </div>

                <div className="w-5/6 p-8">
                    <div className="bg-transparent shadow rounded p-6 mb-6">
                        <h1 className="text-2xl font-semibold mb-4 ml-8">User Verification</h1>
                        <ul>
                            {unverifiedUsers.map((user) => (
                                <li key={user.id} className="flex justify-between items-center border-b py-2">
                                    <span>{user.name} - {user.email}</span>
                                    <button 
                                        onClick={() => verifyUser(user.id)}
                                        className="w-20 h-12 bg-teal-300 hover:bg-teal-600 text-white font-bold py-1 px-3 mr-12 rounded"
                                    >
                                        Verify
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-transparent shadow rounded p-6">
                        <h1 className="text-2xl font-semibold mb-4 ml-8">Verified Users</h1>
                        <ul>
                            {verifiedUsers.map((user) => (
                                <li key={user.id} className="flex justify-between items-center border-b py-2">
                                    <span>{user.name} - {user.email}</span>
                                    <button 
                                        onClick={() => banUser(user.id)}
                                        className="w-20 h-12 bg-purple-300 hover:bg-purple-600 text-white font-bold py-1 px-3 mr-12 rounded"
                                    >
                                        Ban
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
