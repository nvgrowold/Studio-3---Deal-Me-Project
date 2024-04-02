import React, { useState, useEffect } from 'react';
import "../Styling/CheckoutPage.css";
import Header from '../Components/Header';
import { toast } from 'react-toastify';
import { getFirestore, collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';


const CheckoutPage = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [totalPrice, setTotalPrice] = useState(0); // State to hold total price
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrData, setQRCodeData] = useState('');


  useEffect(() => {
    // Retrieve cart from session storage
    const storedCart = sessionStorage.getItem('productList');
    const storedData = sessionStorage.getItem('userInfo');
    if (storedCart) {
      const cartItemsObject = JSON.parse(storedCart);
      // Assuming the structure is { id: { name, price, quantity, ... } }
      const cartItemsArray = Object.entries(cartItemsObject).map(([id, data]) => ({
        id,
        data
      }));
      setPurchasedItems(cartItemsArray);
    }
    if (storedData) {
      const { cartItems, totalPrice, ...userInfo } = JSON.parse(storedData);
      setTotalPrice(totalPrice); // Use the totalPrice as is, no need for parseFloat since it's already a number
    };
    // Retrieve userInfo from session storage
    const storedUserInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {};
    setUserInfo(storedUserInfo);
  }, []);

  // Function to hide QR code
  const hideQRCodeModal = () => {
    setShowQRCode(false);
  };

  // Function to handle payment and data storage
  const handlePayment = async () => {
    try {
      const auth = getAuth();
      const db = getFirestore();
     // const user = auth.currentUser; // Get the currently signed-in user
      
      // Combine user information and purchased items into a single object
      const orderData = {
        userInfo: userInfo,
        purchasedItems: purchasedItems.map(item => ({ 
          id: item.id, // Save the id as well
          name: item.data.name,
          price: item.data.price,
          quantity: item.data.quantity,
          delivery: item.data.delivery,
          // include any other item data you need to send
        })),
        userRef: auth.currentUser.uid, // Add userRef here
        timestamp: serverTimestamp(), // Optional: Add a timestamp
      };

       // Create the order in Firestore and get the generated document ID
       const orderRef = await addDoc(collection(db, 'orderitems'), orderData);
       const orderId = orderRef.id;
  
      // Store combined data in the 'orderitems' collection
      //await db.collection('orderitems').add(orderData);
     // await addDoc(collection(db, 'orderitems'), orderData);


      // After successful payment, update each item's status to 'sold'
      for (const item of purchasedItems) {
          const listingDocRef = doc(db, "listings", item.id); // Reference to the document in 'listings' collection
          await updateDoc(listingDocRef, {
              status: "sold",
              // If you also want to update the soldPrice, you can do it here
              soldPrice: item.data.price, // Example: updating the soldPrice to item's price
              soldTime: serverTimestamp(), // Record the current time as sold time
              buyerInfo: {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                mobileNumber: userInfo.mobileNumber,
                deliveryAddress: userInfo.deliveryAddress,
                orderId: orderId  // Add the orderId to each sold listing
              }
            });
      }

      // Create the order in Firestore and get the generated document ID
     // const orderRef = await addDoc(collection(db, 'orderitems'), orderData);
      //const orderId = orderRef.id;  // The unique order ID




      // Show QR code with formatted order details
      const orderSummary = {
        Name: userInfo.firstName + " " + userInfo.lastName,
        Email: userInfo.email,
        Address: userInfo.deliveryAddress,
        TotalPrice: `$${totalPrice}`,
        Items: purchasedItems.map(item => `${item.data.quantity}x ${item.data.name} at $${item.data.price} each`).join(', ')
    };

      const qrData = `**Order for: ${orderSummary.Name}\n` + `          `+
                     `**Email: ${orderSummary.Email}\n` + `           `+
                     `**Delivery Address: ${orderSummary.Address}\n` + `               `+
                     `**Total Price: ${orderSummary.TotalPrice}\n` + `                `+
                     `**Items: ${orderSummary.Items}`;

      // Show QR code with order details
      setShowQRCode(true);
      setQRCodeData(qrData);


      // Notify user about successful payment
      toast.success('Payment successful! Your order has been placed.');

      //######################################################################################## */

        // URL to redirect users to after scanning the QR code
        // Construct the URL using the order ID
        // This URL pattern depends on how your routing is set up
        //const orderUrl = `localhost:3000/order/${orderId}`;


      // setShowQRCode(true);
      // setQRCodeData(redirectUrl);
      //####################################################################################
      
  
      // Clear session storage after successful payment
      sessionStorage.removeItem('productList');
      sessionStorage.removeItem('userInfo');
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Payment failed. Please try again later.'); // Show user-friendly error message
    }

      // Function to show QR code
      const showQRCodeModal = (data) => {
        setQRCodeData(data);
        setShowQRCode(true);
      };
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
      <Header/>
      <div className={`checkout-container mt-20 ${showQRCode ? 'blur-sm' : ''}`}>

          {/* User Information Section */}
          <div className="user-info-section shadow-xl px-3">
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
          <div className="purchased-items-section shadow-xl px-3 mt-6">
            <h3>Purchased Items</h3>
            <ul className="purchased-items-list">
                {purchasedItems.map((item, index) => (
                  <li key={item.id || index} className="purchased-item">
                    <p><strong>Product Name:</strong> {item.data.name}</p>
                    <p><strong>Price:</strong> ${item.data.price}</p>
                    <p><strong>Quantity:</strong> {item.data.quantity}</p>
                    <p><strong>Delivery Fee:</strong> ${item.data.delivery ? parseFloat(item.data.delivery).toFixed(2) : 0 }</p>
                    <hr className="divider" />
                  </li> 
                ))}
            </ul>
          </div>

          {/* Display Total Price */}
          <p><strong>Total Price:</strong> ${totalPrice}</p>

          {/* Payment Button */}
          <button className="payment-button w-full bg-gradient-to-r from-purple-300 to-teal-300 text-slate-800 px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900" 
          onClick={handlePayment}>Make Payment</button>
        </div>

         {/* QRCode */}
         {showQRCode && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                <div className="text-center">
                  <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                   <div className="flex justify-center items-center mb-4">
                   <QRCode value={qrData} size={200} level={"H"} />
              </div>
              <div className="text-left">
                <p><strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Address:</strong> {userInfo.deliveryAddress}</p>
                <p><strong>Total Price:</strong> ${totalPrice}</p>
                <p><strong>Items:</strong></p>
                <ul className="list-disc pl-5">
                  {purchasedItems.map((item, index) => (
                    <li key={index}>{item.data.quantity}x {item.data.name} at ${item.data.price}</li>
                  ))}
                </ul>
              </div>
              <button onClick={hideQRCodeModal} className="w-full mt-6 cursor-pointer bg-gradient-to-r from-purple-300 to-teal-300 text-white px-7 text-sm font-medium uppercase rounded shadow-lg hover:scale-105 transition-scale transition duration-150 ease-in-out hover:shadow-xl">
                <Link to='/GuestPage' className='no-underline text-white'>
                  Continue Shopping</Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>    
  );
};

export default CheckoutPage;
