import React, { useState, useEffect } from 'react';
import { collection, query, where, getDoc, getDocs, doc, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export default function CommissionRanking() {
    const [usersWithCommissions, setUsersWithCommissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const number = 1;

    useEffect(() => {
        // Function to fetch users with the highest commissions
        async function fetchTopCommissionUsers() {
            // Reference to the 'listings' collection in Firestore
            const listingRef = collection(db, "listings");
            // Create a query to fetch sold listings, ordering by the sold price in descending order
            const q = query(listingRef, where("status", "==", "sold"), orderBy("soldPrice", "desc"));
            const querySnapshot = await getDocs(q);

            // Object to accumulate total commissions for each user
            let userCommissions = {};
            querySnapshot.forEach((doc) => {
                const { userRef, soldPrice } = doc.data();
                // Calculate commission for each sold item (assuming a 6% commission rate)
                const commission = soldPrice * 0.06;
                if (userCommissions[userRef]) {
                    // Add to the existing commission total for the user
                    userCommissions[userRef].commission += commission;
                } else {
                    // Initialize a new entry for the user with their first commission
                    userCommissions[userRef] = { commission, userRef };
                }
            });

            // Fetch additional details (username and email) for each user
            const usersDataPromises = Object.values(userCommissions).map(async (userData) => {
                const userDocRef = doc(db, "users", userData.userRef);
                const userSnapshot = await getDoc(userDocRef);
                if (userSnapshot.exists()) {
                    const userDoc = userSnapshot.data();
                    return {
                        userRef: userData.userRef,
                        username: userDoc.username, // Assuming these fields exist in the user document
                        email: userDoc.email,
                        totalCommission: userData.commission,
                    };
                } else {
                    // Return placeholder values if the user document doesn't exist
                    return {
                        userRef: userData.userRef,
                        username: 'Unknown',
                        email: 'Unknown',
                        totalCommission: userData.commission,
                    };
                }
            });

            // Wait for all user data promises to resolve
            const usersData = await Promise.all(usersDataPromises);
            // Sort users by total commission and take the top 3
            const sortedUsers = usersData.sort((a, b) => b.totalCommission - a.totalCommission).slice(0, 3);

            // Update state with the top 3 users and their commissions
            setUsersWithCommissions(sortedUsers);
            setLoading(false); // Update loading state
        }

        fetchTopCommissionUsers(); // Invoke the function to start data fetching process
    }, []);

    return (
        <div className="card bg-transparent w-full">
            <div className="card-header font-medium">Top Commissioned Users</div>
            <div className="card-body flex justify-center w-full max-w-4xl">
                <div className="max-w-full px-3">
                    {/* Check if data is loaded and display user data */}
                    {!loading && usersWithCommissions.length > 0 && (
                        <ul>
                            <table className="items-center ml-28 w-full">
                                 <thead>
                                   <tr>
                                     <th>Ranking</th>
                                     <th style={{ width: '40%' }}>User ID</th>
                                     <th>Username</th>
                                     <th>User Email</th>
                                     <th>Total Commission</th>
                                   </tr>
                                 </thead>
                                 <tbody>
                                 {usersWithCommissions.map((user,index) => (
                                     <tr key={user.userRef}>
                                       <td>No.{index+1}</td>
                                       <td>{user.userRef}</td>
                                       <td>{user.username}</td>
                                       <td>{user.email}</td>
                                       <td>{"$" + user.totalCommission.toFixed(2)}</td>
                                     </tr>
                                   ))}
                                 </tbody>
                               </table>
                
                        </ul>
                    )}
                    {!loading && usersWithCommissions.length === 0 && (
                        <div className="text-center mt-10 text-sky-800">
                            <p>No commission data available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
