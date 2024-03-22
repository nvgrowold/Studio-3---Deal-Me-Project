// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { collection, addDoc } from 'firebase/firestore';
// // import { db } from '../firebase'; 
// // import Header from '../Components/Header';

// // function CartPage() {
// //     const [cartItems, setCartItems] = useState([]);
// //     const [totalPrice, setTotalPrice] = useState(0);
// //     const [deliveryFee, setDeliveryFee] = useState(0);
// //     const [firstName, setFirstName] = useState('');
// //     const [lastName, setLastName] = useState('');
// //     const [email, setEmail] = useState('');
// //     const [deliveryAddress, setDeliveryAddress] = useState('');
// //     const [mobileNumber, setMobileNumber] = useState('');
// //     const [emailError, setEmailError] = useState('');
// //     const [mobileNumberError, setMobileNumberError] = useState('');
// //     const [showFirstNameError, setShowFirstNameError] = useState(false);
// //     const [showLastNameError, setShowLastNameError] = useState(false);
// //     const [showEmailError, setShowEmailError] = useState(false);
// //     const [showDeliveryAddressError, setShowDeliveryAddressError] = useState(false);
// //     const [showMobileNumberError, setShowMobileNumberError] = useState(false);

// //     useEffect(() => {
// //         const storedItems = sessionStorage.getItem('productList');
// //         if (storedItems) {
// //             const parsedItems = JSON.parse(storedItems);
// //             const itemsArray = Object.keys(parsedItems).map(key => parsedItems[key]);
// //             setCartItems(itemsArray);
// //         }
    
// //     },[]);
// //     useEffect(() => {
// //         const storedCartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
// //         setCartItems(storedCartItems);
// //     }, []);

// //     useEffect(() => {
// //         calculateTotalPrice(cartItems);
// //     }, [cartItems]);

// //     const calculateTotalPrice = (items) => {
// //         if (!Array.isArray(items)) {
// //             items = [];
// //         }
// //         const total = items.reduce((acc, curr) => {
// //             const price = parseFloat(curr.price) || 0;
// //             const quantity = parseInt(curr.quantity) || 0;
// //             return acc + (price * quantity);
// //         }, 0);
// //         setTotalPrice(total);
// //        // setDeliveryFee(deliveryTotal);
// //     };


// //     const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
// //     const validateMobileNumber = (number) => /^\+64[0-9]{8,9}$/.test(number);

// //     const handleSave = async () => {
// //         if (!firstName) {
// //             setShowFirstNameError(true);
// //         }
// //         if (!lastName) {
// //             setShowLastNameError(true);
// //         }
// //         if (!email) {
// //             setShowEmailError(true);
// //         }
// //         if (!deliveryAddress) {
// //             setShowDeliveryAddressError(true);
// //         }
// //         if (!mobileNumber) {
// //             setShowMobileNumberError(true);
// //         }

// //         if (!firstName || !lastName || !email || !deliveryAddress || !mobileNumber) {
// //             return;
// //         }

// //         if (!validateEmail(email)) {
// //             setEmailError('Invalid email address');
// //             return;
// //         }
// //         if (!validateMobileNumber(mobileNumber)) {
// //             setMobileNumberError('Invalid New Zealand mobile number');
// //             return;
// //         }

// //         if (cartItems.length === 0) {
// //             alert("Please add items to your cart before proceeding to payment.");
// //             return;
// //         }

// //         try {
// //             const userInfo = { firstName, lastName, email, deliveryAddress, mobileNumber, cartItems, totalPrice, deliveryFee };
// //             sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
// //             window.location.href = '/CheckoutPage';
// //         } catch (error) {
// //             console.error("Error saving user information: ", error);
// //         }
// //     const removeFromCart = (index) => {
// //         const updatedCartItems = [...cartItems];
// //         updatedCartItems.splice(index, 1);
// //         setCartItems(updatedCartItems);
// //         sessionStorage.setItem('cart', JSON.stringify(updatedCartItems));
// //     };

// //     const handleQuantityChange = (index, quantity) => {
// //         const updatedCartItems = [...cartItems];
// //         if (quantity <= 0) {
// //             removeFromCart(index);
// //         } else {
// //             updatedCartItems[index].quantity = quantity;
// //             setCartItems(updatedCartItems);
// //             sessionStorage.setItem('cart', JSON.stringify(updatedCartItems));
// //         }
// //     };

// //     const handleIncrement = (index) => {
// //         const updatedItems = [...cartItems];
// //         updatedItems[index].quantity++;
// //         setCartItems(updatedItems);
// //     };

// //     const handleDecrement = (index) => {
// //         const updatedItems = [...cartItems];
// //         if (updatedItems[index].quantity > 1) {
// //             updatedItems[index].quantity--;
// //             setCartItems(updatedItems);
// //         }
// //     };

// //     const handleRemove = (index) => {
// //         const updatedItems = cartItems.filter((_, i) => i !== index);
// //         setCartItems(updatedItems);
// //     };

// //     return (
// //         <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
// //             <Header/>
// //             <div className="containercart">
// //                 <h2>Cart</h2>
// //                 <div className="user-info">
// //                     <h3>User Information</h3>
// //                     <table>
// //                         <tbody>
// //                             <tr>
// //                                 <td>
// //                                     <input 
// //                                         type="text" 
// //                                         placeholder="First Name" 
// //                                         value={firstName} 
// //                                         onChange={(e) => {
// //                                             setFirstName(e.target.value);
// //                                             setShowFirstNameError(false);
// //                                         }} 
// //                                     />
// //                                     {showFirstNameError && <p className="error-message">Please fill the required field</p>}
// //                                 </td>
// //                                 <td>
// //                                     <input 
// //                                         type="text" 
// //                                         placeholder="Last Name" 
// //                                         value={lastName} 
// //                                         onChange={(e) => {
// //                                             setLastName(e.target.value);
// //                                             setShowLastNameError(false);
// //                                         }} 
// //                                     />
// //                                     {showLastNameError && <p className="error-message">Please fill the required field</p>}
// //                                 </td>
// //                             </tr>
// //                             <tr>
// //                                 <td colSpan="2">
// //                                     <input
// //                                         type="email" 
// //                                         placeholder="Email" 
// //                                         value={email} 
// //                                         onChange={(e) => {
// //                                             setEmail(e.target.value);
// //                                             setShowEmailError(false);
// //                                             setEmailError('');
// //                                         }} 
// //                                     />
// //                                     {showEmailError && <p className="error-message">Please fill the required field</p>}
// //                                     {emailError && <p className="error-message">{emailError}</p>}
// //                                 </td>
// //                             </tr>
// //                             <tr>
// //                                 <td colSpan="2">
// //                                     <input 
// //                                         type="text" 
// //                                         placeholder="Delivery Address" 
// //                                         value={deliveryAddress} 
// //                                         onChange={(e) => {
// //                                             setDeliveryAddress(e.target.value);
// //                                             setShowDeliveryAddressError(false);
// //                                         }} 
// //                                     />
// //                                     {showDeliveryAddressError && <p className="error-message">Please fill the required field</p>}
// //                                 </td>
// //                             </tr>
// //                             <tr>
// //                                 <td colSpan="2">
// //                                     <input 
// //                                         type="tel" 
// //                                         placeholder="Mobile Number (+64)" 
// //                                         value={mobileNumber.startsWith('+64') ? mobileNumber : '+64'} 
// //                                         onChange={(e) => {
// //                                             const enteredNumber = e.target.value;
// //                                             if (/^\+64[0-9]*$/.test(enteredNumber) && enteredNumber.length <= 12) {
// //                                                 setMobileNumber(enteredNumber);
// //                                                 setShowMobileNumberError(false);
// //                                             } else {
// //                                                 setShowMobileNumberError(true);
// //                                                 setMobileNumberError('Invalid New Zealand mobile number');
// //                                             }
// //                                         }} 
// //                                     />
// //                                     {showMobileNumberError && <p className="error-message">Please fill the required field</p>}
// //                                     {mobileNumberError && <p className="error-message">{mobileNumberError}</p>}
// //                                 </td>
// //                             </tr>
// //                             <tr>
// //                                 <td colSpan="2" className="text-center">
// //                                     <button onClick={handleSave} className="w-bg-sky-700 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900">
// //                                         Proceed To Payment Page
// //                                     </button>
// //                                     </td>
// //                             </tr>
// //                         </tbody>
// //                     </table>
// //                 </div>
// //                 <div className="cart-products">
// //                     <h3>Cart Products</h3>
// //                     <table>
// //                         <thead>
// //                             <tr>
// //                                 <th>Product Name</th>
// //                                 <th>Price</th>
// //                                 <th>Quantity</th>
// //                                 <th>Delivery Fee</th>
// //                                 <th>Sub-Total</th>
// //                                 <th>Actions</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {Array.isArray(cartItems) && cartItems.map((item, index) => (
// //                                 <tr key={index}>
// //                                     <td>{item.name}</td>
// //                                     <td>{parseFloat(item.price) || 0}</td>
// //                                     <td>
// //                                         <button onClick={() => handleDecrement(index)}>-</button>
// //                                         {/* {item.quantity} */}
// //                                         <button onClick={() => handleIncrement(index)}>+</button>
// //                                     </td>
// //                                     <td>{parseFloat(item.delivery) || 0}</td>
// //                                     <td>${((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0) + (parseFloat(item.delivery) || 0) * (parseInt(item.quantity) || 0)).toFixed(2)}</td>
// //                                     <td>
// //                                         <button onClick={() => handleRemove(index)}>Remove</button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                     <p>Total Price: ${totalPrice.toFixed(2)}</p>
// //                     <p>Total Price Including Delivery Fee: ${(totalPrice + deliveryFee).toFixed(2)}</p>
// //                 </div>
// //                 <Link to="/GuestPage" className="w-full bg-sky-700 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900 inline-block text-center">Back to Product page</Link>


// //             </div>
// //         </div>
        
// //           );
// //                             }                           
// // }
    
// // export default CartPage;
// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { collection, addDoc } from 'firebase/firestore';
// // import { db } from '../firebase'; 
// // import Header from '../Components/Header';
// // import "../Styling/CartPage.css";

// // function CartPage() {
// //     const [cartItems, setCartItems] = useState([]);
// //     const [totalPrice, setTotalPrice] = useState(0);
// //     const [firstName, setFirstName] = useState('');
// //     const [lastName, setLastName] = useState('');
// //     const [email, setEmail] = useState('');
// //     const [deliveryAddress, setDeliveryAddress] = useState('');
// //     const [mobileNumber, setMobileNumber] = useState('');
// //     const [emailError, setEmailError] = useState('');
// //     const [mobileNumberError, setMobileNumberError] = useState('');

// //     useEffect(() => {
// //         const storedItems = sessionStorage.getItem('productList');
// //         if (storedItems) {
// //             const parsedItems = JSON.parse(storedItems);
// //             const itemsArray = Object.keys(parsedItems).map(key => parsedItems[key]);
// //             setCartItems(itemsArray);
// //         }
// //     }, []);

// //     useEffect(() => {
// //         calculateTotalPrice(cartItems);
// //     }, [cartItems]);

// //     const calculateTotalPrice = (items) => {
// //         if (!Array.isArray(items)) {
// //             items = [];
// //         }
// //         const total = items.reduce((acc, curr) => {
// //             const price = parseFloat(curr.price) || 0;
// //             const quantity = parseInt(curr.quantity) || 0;
// //             return acc + (price * quantity);
// //         }, 0);
// //         setTotalPrice(total);
// //     };


// //     const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
// //     const validateMobileNumber = (number) => /^\+64[0-9]{8,9}$/.test(number);

// //     const handleSave = async () => {
// //         if (!validateEmail(email)) {
// //             setEmailError('Invalid email address');
// //             return;
// //         }
// //         if (!validateMobileNumber(mobileNumber)) {
// //             setMobileNumberError('Invalid New Zealand mobile number');
// //             return;
// //         }

// //         try {
            

// //             const userInfo = { firstName, lastName, email, deliveryAddress, mobileNumber, cartItems, totalPrice };
// //             sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
// //             window.location.href = '/CheckoutPage';
// //         } catch (error) {
// //             console.error("Error saving user information: ", error);
// //         }
// //     };

// //     return (
// //         <div>
// //             <Header/>
// //             <div className="containercart">
// //                 <h2>Cart</h2>
// //                 <div className="user-info">
// //                     <h3>User Information</h3>
// //                     <table>
// //                         <tbody>
// //                             <tr>
// //                                 <td><input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></td>
// //                                 <td><input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} /></td>
// //                             </tr>
// //                             <tr>
// //                                 <td colSpan="2">
// //                                     <input type="email" placeholder="Email" value={email} onChange={(e) => {
// //                                         setEmail(e.target.value);
// //                                         setEmailError('');
// //                                     }} />
// //                                     {emailError && <p className="error-message">{emailError}</p>}
// //                                 </td>
// //                             </tr>
// //                             <tr>
// //                                 <td colSpan="2"><input type="text" placeholder="Delivery Address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} /></td>
// //                             </tr>
// //                             <tr>
// //     <td colSpan="2">
// //         <input 
// //             type="tel" 
// //             placeholder="Mobile Number (+64)" 
// //             value={mobileNumber.startsWith('+64') ? mobileNumber : '+64'} // Set default value to +64
// //             onChange={(e) => {
// //                 const enteredNumber = e.target.value;
// //                 // Allow only numbers and limit the length to 12 characters including the country code
// //                 if (/^\+64[0-9]*$/.test(enteredNumber) && enteredNumber.length <= 12) {
// //                     setMobileNumber(enteredNumber);
// //                     setMobileNumberError('');
// //                 } else {
// //                     setMobileNumberError('Invalid New Zealand mobile number');
// //                 }
// //             }} 
// //         />
// //         {mobileNumberError && <p className="error-message">{mobileNumberError}</p>}
// //     </td>
// // </tr>

                           
// //                             <tr>
// //     <td colSpan="2" className="text-center">
// //         <button onClick={handleSave} className="w-full bg-sky-700 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900">
// //             Proceed To Payment Page
// //         </button>
// //     </td>
// // </tr>

// //                         </tbody>
// //                     </table>
// //                 </div>
// //                 <div className="cart-products">
// //                     <h3>Cart Products</h3>
// //                     <table>
// //                         <thead>
// //                             <tr>
// //                                 <th>Product Name</th>
// //                                 <th>Price</th>
// //                                 <th>Quantity</th>
// //                                 <th>Delivery Fee</th>
// //                                 <th>Sub-Total</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {Array.isArray(cartItems) && cartItems.map((item, index) => (
// //                                 <tr key={index}>
// //                                     <td>{item.name}</td>
// //                                     <td>{parseFloat(item.price) || 0}</td>
// //                                     <td>{parseFloat(item.quantity) || 0}</td>
// //                                     <td>{item.delivery}</td>
// //                                     <td>${((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)).toFixed(2)}</td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                     <p>Total Price: ${totalPrice.toFixed(2)}</p>
// //                 </div>
// //                 {/* <Link to="/GuestPage">Back to Product page</Link> */}
// //                 <Link to="/GuestPage" className="w-full bg-sky-700 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900 inline-block text-center">Back to Product page</Link>


// //             </div>
// //         </div>
// //     );
// // }

// // export default CartPage;



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Header from '../Components/Header';
// import "../Styling/CartPage.css";

// function CartPage() {
//     const [cartItems, setCartItems] = useState([]);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [deliveryAddress, setDeliveryAddress] = useState('');
//     const [mobileNumber, setMobileNumber] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [mobileNumberError, setMobileNumberError] = useState('');
//     const [showFirstNameError, setShowFirstNameError] = useState(false);
//     const [showLastNameError, setShowLastNameError] = useState(false);
//     const [showEmailError, setShowEmailError] = useState(false);
//     const [showDeliveryAddressError, setShowDeliveryAddressError] = useState(false);
//     const [showMobileNumberError, setShowMobileNumberError] = useState(false);
    

//     useEffect(() => {
//         const storedItems = sessionStorage.getItem('productList');
//         if (storedItems) {
//             const parsedItems = JSON.parse(storedItems);
//             const itemsArray = Object.keys(parsedItems).map(key => parsedItems[key]);
//             setCartItems(itemsArray);
//         }
//     }, []);

//     useEffect(() => {
//         calculateTotalPrice(cartItems);
//     }, [cartItems]);

//     const calculateTotalPrice = (items) => {
//         if (!Array.isArray(items)) {
//             items = [];
//         }
//         const total = items.reduce((acc, curr) => {
//             const price = parseFloat(curr.price) || 0;
//             const quantity = parseInt(curr.quantity) || 0;
//             return acc + (price * quantity);
//             const delivery = parseFloat(curr.delivery) || 0; // Add this line to get the delivery fee of each product
//         return acc + (price * quantity) + (delivery * quantity); // Modify the calculation to include delivery fee
//         }, 0);
//         setTotalPrice(total);
//     };


//     const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
//     const validateMobileNumber = (number) => /^\+64[0-9]{8,9}$/.test(number);

//     const handleSave = async () => {
//         if (!firstName) {
//             setShowFirstNameError(true);
//         }
//         if (!lastName) {
//             setShowLastNameError(true);
//         }
//         if (!email) {
//             setShowEmailError(true);
//         }
//         if (!deliveryAddress) {
//             setShowDeliveryAddressError(true);
//         }
//         if (!mobileNumber) {
//             setShowMobileNumberError(true);
//         }

//         if (!firstName || !lastName || !email || !deliveryAddress || !mobileNumber) {
//             return;
//         }

//         if (!validateEmail(email)) {
//             setEmailError('Invalid email address');
//             return;
//         }
//         if (!validateMobileNumber(mobileNumber)) {
//             setMobileNumberError('Invalid New Zealand mobile number');
//             return;
//         }

//         try {
//             const userInfo = { firstName, lastName, email, deliveryAddress, mobileNumber, cartItems, totalPrice };
//             sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
//             window.location.href = '/CheckoutPage';
//         } catch (error) {
//             console.error("Error saving user information: ", error);
//         }
//     };

//     return (
//         <div>
//             <Header/>
//             <div className="containercart">
//                 <h2>Cart</h2>
//                 <div className="user-info">
//                     <h3>User Information</h3>
//                     <table>
//                         <tbody>
//                             <tr>
//                                 <td>
//                                     <input 
//                                         type="text" 
//                                         placeholder="First Name" 
//                                         value={firstName} 
//                                         onChange={(e) => {
//                                             setFirstName(e.target.value);
//                                             setShowFirstNameError(false);
//                                         }} 
//                                     />
//                                     {showFirstNameError && <p className="error-message">Please fill the required field</p>}
//                                 </td>
//                                 <td>
//                                     <input 
//                                         type="text" 
//                                         placeholder="Last Name" 
//                                         value={lastName} 
//                                         onChange={(e) => {
//                                             setLastName(e.target.value);
//                                             setShowLastNameError(false);
//                                         }} 
//                                     />
//                                     {showLastNameError && <p className="error-message">Please fill the required field</p>}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="2">
//                                     <input 
//                                         type="email" 
//                                         placeholder="Email" 
//                                         value={email} 
//                                         onChange={(e) => {
//                                             setEmail(e.target.value);
//                                             setShowEmailError(false);
//                                             setEmailError('');
//                                         }} 
//                                     />
//                                     {showEmailError && <p className="error-message">Please fill the required field</p>}
//                                     {emailError && <p className="error-message">{emailError}</p>}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="2">
//                                     <input 
//                                         type="text" 
//                                         placeholder="Delivery Address" 
//                                         value={deliveryAddress} 
//                                         onChange={(e) => {
//                                             setDeliveryAddress(e.target.value);
//                                             setShowDeliveryAddressError(false);
//                                         }} 
//                                     />
//                                     {showDeliveryAddressError && <p className="error-message">Please fill the required field</p>}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="2">
//                                     <input 
//                                         type="tel" 
//                                         placeholder="Mobile Number (+64)" 
//                                         value={mobileNumber.startsWith('+64') ? mobileNumber : '+64'} 
//                                         onChange={(e) => {
//                                             const enteredNumber = e.target.value;
//                                             if (/^\+64[0-9]*$/.test(enteredNumber) && enteredNumber.length <= 12) {
//                                                 setMobileNumber(enteredNumber);
//                                                 setShowMobileNumberError(false);
//                                             } else {
//                                                 setShowMobileNumberError(true);
//                                                 setMobileNumberError('Invalid New Zealand mobile number');
//                                             }
//                                         }} 
//                                     />
//                                     {showMobileNumberError && <p className="error-message">Please fill the required field</p>}
//                                     {mobileNumberError && <p className="error-message">{mobileNumberError}</p>}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="2" className="text-center">
//                                     <button onClick={handleSave} className="w-full bg-sky-700 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900">
//                                         Proceed To Payment Page
//                                     </button>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="cart-products">
//                     <h3>Cart Products</h3>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Product Name</th>
//                                 <th>Price</th>
//                                 <th>Quantity</th>
//                                 <th>Delivery Fee</th>
//                                 <th>Sub-Total</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {Array.isArray(cartItems) && cartItems.map((item, index) => (
//                                 <tr key={index}>
//                                     <td>{item.name}</td>
//                                     <td>{parseFloat(item.price) || 0}</td>
//                                     <td>{parseFloat(item.quantity) || 0}</td>
//                                     <td>{item.delivery}</td>
//                                     <td>${((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)).toFixed(2)}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     <p>Total Price: ${totalPrice.toFixed(2)}</p>
//                 </div>
//                 <Link to="/GuestPage" className="w-full bg-sky-700 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900 inline-block text-center">Back to Product page</Link>
//             </div>
//         </div>
//     );
// }

// export default CartPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import "../Styling/CartPage.css";

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
    const [showFirstNameError, setShowFirstNameError] = useState(false);
    const [showLastNameError, setShowLastNameError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showDeliveryAddressError, setShowDeliveryAddressError] = useState(false);
    const [showMobileNumberError, setShowMobileNumberError] = useState(false);

    useEffect(() => {
        const storedItems = sessionStorage.getItem('productList');
        if (storedItems) {
            const parsedItems = JSON.parse(storedItems);
            const itemsArray = Object.keys(parsedItems).map(key => parsedItems[key]);
            setCartItems(itemsArray);
        }
    }, []);

    useEffect(() => {
        calculateTotalPrice(cartItems);
    }, [cartItems]);

    const calculateTotalPrice = (items) => {
        if (!Array.isArray(items)) {
            items = [];
        }
        let total = 0;
        let deliveryTotal = 0;
        items.forEach(item => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            const delivery = parseFloat(item.delivery) || 0;
            total += (price * quantity);
            deliveryTotal += (delivery * quantity);
        });
        setTotalPrice(total);
        setDeliveryFee(deliveryTotal);
    };

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validateMobileNumber = (number) => /^\+64[0-9]{8,9}$/.test(number);

    const handleSave = async () => {
        if (!firstName) {
            setShowFirstNameError(true);
        }
        if (!lastName) {
            setShowLastNameError(true);
        }
        if (!email) {
            setShowEmailError(true);
        }
        if (!deliveryAddress) {
            setShowDeliveryAddressError(true);
        }
        if (!mobileNumber) {
            setShowMobileNumberError(true);
        }

        if (!firstName || !lastName || !email || !deliveryAddress || !mobileNumber) {
            return;
        }

        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return;
        }
        if (!validateMobileNumber(mobileNumber)) {
            setMobileNumberError('Invalid New Zealand mobile number');
            return;
        }

        if (cartItems.length === 0) {
            alert("Please add items to your cart before proceeding to payment.");
            return;
        }

        try {
            const userInfo = { firstName, lastName, email, deliveryAddress, mobileNumber, cartItems, totalPrice, deliveryFee };
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
            window.location.href = '/CheckoutPage';
        } catch (error) {
            console.error("Error saving user information: ", error);
        }
    };

    const handleIncrement = (index) => {
        const updatedItems = [...cartItems];
        updatedItems[index].quantity++;
        setCartItems(updatedItems);
    };

    const handleDecrement = (index) => {
        const updatedItems = [...cartItems];
        if (updatedItems[index].quantity > 1) {
            updatedItems[index].quantity--;
            setCartItems(updatedItems);
        }
    };

    const handleRemove = (index) => {
        const updatedItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedItems);
    };

    return (
        <div>
            <Header/>
            <div className="containercart">
                <h2>Cart</h2>
                <div className="user-info">
                    <h3>User Information</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <input 
                                        type="text" 
                                        placeholder="First Name" 
                                        value={firstName} 
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                            setShowFirstNameError(false);
                                        }} 
                                    />
                                    {showFirstNameError && <p className="error-message">Please fill the required field</p>}
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        placeholder="Last Name" 
                                        value={lastName} 
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                            setShowLastNameError(false);
                                        }} 
                                    />
                                    {showLastNameError && <p className="error-message">Please fill the required field</p>}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <input
                                        type="email" 
                                        placeholder="Email" 
                                        value={email} 
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setShowEmailError(false);
                                            setEmailError('');
                                        }} 
                                    />
                                    {showEmailError && <p className="error-message">Please fill the required field</p>}
                                    {emailError && <p className="error-message">{emailError}</p>}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <input 
                                        type="text" 
                                        placeholder="Delivery Address" 
                                        value={deliveryAddress} 
                                        onChange={(e) => {
                                            setDeliveryAddress(e.target.value);
                                            setShowDeliveryAddressError(false);
                                        }} 
                                    />
                                    {showDeliveryAddressError && <p className="error-message">Please fill the required field</p>}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <input 
                                        type="tel" 
                                        placeholder="Mobile Number (+64)" 
                                        value={mobileNumber.startsWith('+64') ? mobileNumber : '+64'} 
                                        onChange={(e) => {
                                            const enteredNumber = e.target.value;
                                            if (/^\+64[0-9]*$/.test(enteredNumber) && enteredNumber.length <= 12) {
                                                setMobileNumber(enteredNumber);
                                                setShowMobileNumberError(false);
                                            } else {
                                                setShowMobileNumberError(true);
                                                setMobileNumberError('Invalid New Zealand mobile number');
                                            }
                                        }} 
                                    />
                                    {showMobileNumberError && <p className="error-message">Please fill the required field</p>}
                                    {mobileNumberError && <p className="error-message">{mobileNumberError}</p>}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="text-center">
                                    <button onClick={handleSave} className="w-full bg-sky-700 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900">
                                        Proceed To Payment Page
                                    </button>
                                    </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="cart-products">
                    <h3>Cart Products</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Delivery Fee</th>
                                <th>Sub-Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(cartItems) && cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{parseFloat(item.price) || 0}</td>
                                    <td>
                                        <button onClick={() => handleDecrement(index)}>-</button>
                                        {/* {item.quantity} */}
                                        <button onClick={() => handleIncrement(index)}>+</button>
                                    </td>
                                    <td>{parseFloat(item.delivery) || 0}</td>
                                    <td>${((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0) + (parseFloat(item.delivery) || 0) * (parseInt(item.quantity) || 0)).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => handleRemove(index)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Total Price: ${totalPrice.toFixed(2)}</p>
                    <p>Total Price Including Delivery Fee: ${(totalPrice + deliveryFee).toFixed(2)}</p>
                </div>
                <Link to="/GuestPage" className="w-full bg-sky-700 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900 inline-block text-center">Back to Product page</Link>
            </div>
        </div>
    );
}

export default CartPage;
