import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import ListingItem from '../Components/ListingItem';

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
            <div className="max-w-6xl px-3 mt-6 mx-auto">
                {!loading && listings.length > 0 && (
                <>
                    <h2 className="text-2xl text-center font-semibold mb-6">
                    My Listings
                    </h2>
                    <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {listings.map((listing) => (
                        //create a component for ListingItem
                        <ListingItem
                        key={listing.id}
                        id={listing.id}
                        listing={listing.data}
                        // onDelete={() => onDelete(listing.id)}
                        // onEdit={() => onEdit(listing.id)}
                        />
                    ))}
                    </ul>
                </>
                )}
            </div>            
        </div>
    );
}
