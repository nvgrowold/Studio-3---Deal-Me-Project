import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

export default function MyListingsPage() {
    const [listings, setListings] = useState([]); // State to store the listings
    const [loading, setLoading] = useState(true); // State to track loading status
    const auth = getAuth

    useEffect(() => {
        async function fetchUserListings() {
            try {
                setLoading(true);
                const listingRef = collection(db, "listings");
                const q = query(listingRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"));
                const querySnapshot = await getDocs(q);
                const listingsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setListings(listingsArray); // Update the listings state with the fetched data
            } catch (error) {
                console.error("Error fetching listings: ", error);
                // Handle the error appropriately in your application
            } finally {
                setLoading(false); // Ensure loading is set to false when operation is complete
            }
        }
        fetchUserListings();
    }, [auth.currentUser?.uid]); // Dependency array includes auth.currentUser.uid to refetch when it changes

    return (
        <div>
            <Header />
            <p className='text-2xl text-center font-semibold text-sky-800'>My Listings</p>
            {loading ? (
                <div>Loading...</div>
            ) : (
                listings.map(listing => (
                    <div key={listing.id}>
                        {/* Render your listing details here */}
                        <p>{listing.title} - {listing.description}</p>
                    </div>
                ))
            )}
        </div>
    );
}
