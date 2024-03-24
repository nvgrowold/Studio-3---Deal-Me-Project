import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { collection, query, orderBy, where, getDocs, deleteDoc, doc,  } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import SoldListingItem from '../Components/SoldListingItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SoldItem from '../Components/SoldItem';

export default function MySoldItemsPage() {

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
            // Adjust query to only fetch sold listings:where("status", "==", "sold"),
            const q = query(listingRef, where("userRef", "==", auth.currentUser.uid), where("status", "==", "sold"), orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);
            let listings = [];
            querySnapshot.forEach((doc) => {
                // Include soldPrice, commission calculation, and buyerInfo in the data pushed to the listings array
                return listings.push({
                id:doc.id,
                data:doc.data(),
                commission: doc.data().soldPrice * 0.06, // Assuming a 6% commission rate
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

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
            <Header />
            {/* ##################################################### */}
            <div className="max-w-6xl px-3 mt-10 mx-auto">
                <h2 className="text-center font-semibold mb-10 text-2xl text-sky-800">
                    My Sold Items
                </h2>
                {!loading && listings.length > 0 && (
                <>
                   
                    <ul className="sm:grid grid-row-2 lg:grid-row-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {listings.map((listing) => (
                        <div>
                         <SoldListingItem
                            key={listing.id}
                            id={listing.id}
                            listing={listing.data} />
                            
                        <SoldItem // Only use the SoldItem component
                            soldPrice={listing.data.soldPrice}
                            commission={listing.commission}
                            buyerFirstName={listing.data.userInfo?.firstName}
                            buyerLastName={listing.data.userInfo?.lastName} />
                        </div>
                      ))}
                    </ul>

                </>
                )}

                {!loading && listings.length === 0 && (
                    <div className="text-center mt-10  text-sky-800">
                    <p>Oops! You haven't sold any items yet ...</p>
                    </div>
                )}

            </div>           
        </div>
    );
}
