import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import OrderHistory from '../Components/OrderHistory';
//import { useNavigate } from 'react-router-dom';

export default function MyPurchasedItemsPage() {

    const [orders, setOrders] = useState([]); // State to store the orders
    const [loading, setLoading] = useState(true); // State to track loading status
    const auth = getAuth();
    //create the navigate by using the useNavigate hook of react
    //const navigate = useNavigate();


    //*************************************************************** */

    //########################################

    //need to create indexes that need to be used to power compound queries in firestore
    useEffect(() => {
        async function fetchOrders() {
        const ordersRef = collection(db, "orderitems");
        const q = query(ordersRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        let orders = [];
        querySnapshot.forEach((doc) => {
            return orders.push({
            id:doc.id,
            data:doc.data(),
            });
        });
        setOrders(orders); // Update the listings state with the fetched data
        setLoading(false);
        }
        fetchOrders();
    }, [auth.currentUser.uid]); // Dependency array includes auth.currentUser.uid to refetch when it changes

   // setInterval(console.log("liman"), 1000);

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
            <Header />
            {/* ##################################################### */}
            <div className="max-w-6xl px-3 mt-10 mx-auto">
                <h2 className="text-center font-semibold mb-10 text-2xl sticky text-sky-800">
                    My Purchase
                </h2>
                {!loading && orders.length > 0 && (
                <>
                   
                    <ul className="sm:grid xl:grid-cols-2 2xl:grid-cols-5">
                    {orders.map((order) => (
                        //create a component for PurchasedItem
                        <OrderHistory
                        key={order.id}
                        id={order.id}
                        order={order.data}
                        />
                    ))}
                    </ul>
                </>
                )}

                {!loading && orders.length === 0 && (
                    <div className="text-center mt-10  text-sky-800">
                    <p>Oops! Your order history is empty...</p>
                    </div>
                )}

            </div>           
        </div>
    );
}
