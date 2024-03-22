import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; // Import if you haven't already for auth
import { getAuth } from 'firebase/auth';
 
const FetchingOrders = () => {
    const [orders, setOrders] = useState([]);
    const auth = getAuth();
   
    useEffect(() => {
        const fetchOrders = async () => {
        const db = firebase.firestore();
        const auth = firebase.auth(); // Assuming you have firebase auth initialized
       
        if (auth.currentUser) {
            const ordersRef = db.collection('orderitems');
            // Query for orders by current user and order by timestamp
            const q = firebase.firestore.query(
            ordersRef,
            firebase.firestore.where("userRef", "==", auth.currentUser.uid),
            firebase.firestore.orderBy("timestamp", "desc")
            );
   
            const querySnapshot = await firebase.firestore().getDocs(q);
            const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrders(ordersList);
        }
        };
   
        fetchOrders();
    }, [auth.currentUser.uid]);
 
  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order, index) => (
        <div key={index}>
          <h3>Order {index + 1}</h3>
          <h4>User Information</h4>
          <p>First Name: {order.userInfo.firstName}</p>
          <p>Last Name: {order.userInfo.lastName}</p>
          {/* Repeat for other user info fields */}
 
          <h4>Purchased Items</h4>
          {order.purchasedItems.map((item, itemIndex) => (
            <div key={itemIndex}>
              <p>Product Name: {item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              {/* Repeat for other item details */}
            </div>
          ))}
 
          {/* Optionally, display other order details like total price */}
        </div>
      ))}
    </div>
  );
};
 
export default FetchingOrders;