import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { collection, query, orderBy, where, getDocs, deleteDoc, doc,  } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import ListingItem from '../Components/ListingItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function MyPurchasedItemsPage() {

    const [listings, setListings] = useState([]); // State to store the listings
    const [loading, setLoading] = useState(true); // State to track loading status
    const auth = getAuth();
    //create the navigate by using the useNavigate hook of react
    const navigate = useNavigate();

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

    //handle onDelete event of the listed item
    async function onDelete(listingID){
        if(window.confirm("Are you sure you want to delete this item?")){
            //if user clicked ok, then will action the delete, otherwise won't trigger the following steps
            await deleteDoc(doc(db, "listings", listingID))//use deleteDoc() from the firestore to delete
            const updatedListings = listings.filter( // after deleting, need to update the array "let listings = [];"" and removed from firebase database as well
                (listing)=> listing.id !== listingID
            );
            setListings(updatedListings)
            toast.success("Successfully deleted the listing")
        }
    }
    
    //handle onEdit event of the listed item
    function onEdit(listingID){
        navigate(`/edit-listing/${listingID}`);

    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
            <Header />
            {/* ##################################################### */}
            <div className="max-w-6xl px-3 mt-10 mx-auto">
                <h2 className="text-center font-semibold mb-10 text-2xl text-sky-800">
                    My Listings
                </h2>
                {!loading && listings.length > 0 && (
                <>
                   
                    <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {listings.map((listing) => (
                        //create a component for ListingItem
                        <ListingItem
                        key={listing.id}
                        id={listing.id}
                        listing={listing.data}
                        onDelete={() => onDelete(listing.id)}
                        onEdit={() => onEdit(listing.id)}
                        />
                    ))}
                    </ul>
                </>
                )}

                {!loading && listings.length === 0 && (
                    <div className="text-center mt-10  text-sky-800">
                    <p>Oops! Your listing folder is empty...</p>
                    </div>
                )}

            </div>           
        </div>
    );
}
