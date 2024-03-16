import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import ListingItem from '../Components/ListingItem';

export default function MyListingsPage() {

    const [listings, setListings] = useState([]); // State to store the listings
    const [loading, setLoading] = useState(true); // State to track loading status
    const auth = getAuth();

    //########################################

    //need to create indexes that need to be used to power compound queries in firestore
    useEffect(() => {
        async function fetchUserListings() {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        let listings = [];
        querySnapshot.forEach((doc) => {
            return listings.push({
            id:doc.id,
            data:doc.data(),
            });
        });
        setListings(listings); // Update the listings state with the fetched data
        setLoading(false);
        }
        fetchUserListings();
    }, [auth.currentUser.uid]); // Dependency array includes auth.currentUser.uid to refetch when it changes



    return (
        <div>
            <Header />

            {/* ##################################################### */}
            <div>
                <div className="max-w-6xl px-3 mt-10 mx-auto">
                    {!loading && listings.length > 0 && (
                    <>
                        <h2 className="text-center font-semibold mb-10 text-2xl text-sky-800">
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
        </div>
    );
}
