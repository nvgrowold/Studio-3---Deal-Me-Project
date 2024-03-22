

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "../Styling/CheckoutPage.css";
import Header from '../Components/Header';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGOv3hJPU-JWreMNnrCCN2pvsuv07sdrE",
  authDomain: "deal-me-f6455.firebaseapp.com",
  projectId: "deal-me-f6455",
  storageBucket: "deal-me-f6455.appspot.com",
  messagingSenderId: "402382833091",
  appId: "1:402382833091:web:75eef4981bf82b9b246976"
};

// Initialize Firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const CheckoutPage = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [totalPrice, setTotalPrice] = useState(0); // State to hold total price

  useEffect(() => {
    // Retrieve productList from session storage
    const productList = JSON.parse(sessionStorage.getItem('productList')) || {};
    // Convert productList object to an array of products
    const products = Object.values(productList);
    setPurchasedItems(products);

    // Calculate total price including delivery fee
    let totalPrice = 0;
    products.forEach(product => {
        totalPrice += (product.price * product.quantity);
    });

    // Retrieve userInfo from session storage
    const storedUserInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {};
    const deliveryFee = storedUserInfo.deliveryFee || 0;
    totalPrice += deliveryFee;

    setTotalPrice(totalPrice);
    setUserInfo(storedUserInfo);
}, []);



  // Function to handle payment and data storage
  const handlePayment = async () => {
    try {
      const db = firebase.firestore();
  
      // Combine user information and purchased items into a single object
      const orderData = {
        userInfo: userInfo,
        purchasedItems: purchasedItems
      };
  
      // Store combined data in the 'orderitems' collection
      await db.collection('orderitems').add(orderData);
  
      // Notify user about successful payment
      alert('Payment successful! Your order has been placed.');
  
      // Clear session storage after successful payment
      sessionStorage.removeItem('productList');
      sessionStorage.removeItem('userInfo');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again later.'); // Show user-friendly error message
    }
  };
  
  return (
    <div>
      <Header/>
      <div className="checkout-container">
      <h2 className="checkout-heading">Checkout</h2>

      {/* User Information Section */}
      <div className="user-info-section">
        <h3>User Information</h3>
        <div className="user-info">
          <p><strong>First Name:</strong> {userInfo.firstName}</p>
          <p><strong>Last Name:</strong> {userInfo.lastName}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Delivery Address:</strong> {userInfo.deliveryAddress}</p>
          <p><strong>Mobile Number:</strong> {userInfo.mobileNumber}</p>
        </div>
      </div>

      {/* Purchased Items Section */}
      <div className="purchased-items-section">
        <h3>Purchased Items</h3>
        <ul className="purchased-items-list">
          {purchasedItems.map((product, index) => (
            <li key={index} className="purchased-item">
              <p><strong>Product Name:</strong> {product.name}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
             
              <hr className="divider" />
            </li>
          ))}
        </ul>
      </div>

      {/* Display Total Price */}
      <p><strong>Total Price:</strong> ${totalPrice}</p>

      {/* Payment Button */}
      <button className="payment-button" onClick={handlePayment}>Make Payment</button>
    </div>
    </div>
    
  );
};

export default CheckoutPage;
