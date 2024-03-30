import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import "../Styling/CartPage.css";
import {toast} from "react-toastify";

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0); // Added state for delivery fee
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('+64');
    const [emailError, setEmailError] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
     // Added state variables for showing errors
     const [showFirstNameError, setShowFirstNameError] = useState(false);
     const [showLastNameError, setShowLastNameError] = useState(false);
     const [showEmailError, setShowEmailError] = useState(false);
     const [showDeliveryAddressError, setShowDeliveryAddressError] = useState(false);
     const [showMobileNumberError, setShowMobileNumberError] = useState(false);

    useEffect(() => {
        const storedCart = sessionStorage.getItem('productList');
        if (storedCart) {
            const cartItemsObject = JSON.parse(storedCart);
            const cartItemsArray = Object.entries(cartItemsObject).map(([id, data]) => ({
                id,
                data
            }));
            setCartItems(cartItemsArray);
        }        
    }, []);

    useEffect(() => {
        calculateTotalPrice(cartItems);
    }, [cartItems]);

    const calculateTotalPrice = (items) => {
        let total = 0;
        let deliveryTotal = 0;
        items.forEach(item => {
            const price = parseFloat(item.data.price) || 0;
            const quantity = parseInt(item.data.quantity) || 0;
            const deliveryFee = parseInt(item.data.delivery) || 0;
            total += price * quantity;
            deliveryTotal += deliveryFee * quantity;
        });
        setTotalPrice(total);
        setDeliveryFee(deliveryTotal);
    };

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validateMobileNumber = (number) => /^\+64[0-9]{8,9}$/.test(number);

    const handleSave = async () => {
        setShowFirstNameError(!firstName);
        setShowLastNameError(!lastName);
        setShowEmailError(!email);
        setShowDeliveryAddressError(!deliveryAddress);
        setShowMobileNumberError(!mobileNumber);
        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return;
        } else {
            setEmailError('');
        }

        if (!validateMobileNumber(mobileNumber)) {
            setMobileNumberError('Invalid New Zealand mobile number');
            return;
        } else {
            setMobileNumberError('');
        }

        if (cartItems.length === 0) {
            toast.error("Please add items to your cart before proceeding to payment.");
            return;
        }


        // If no errors, proceed with saving user information
        if (firstName && lastName && email && deliveryAddress && mobileNumber && validateEmail(email) && validateMobileNumber(mobileNumber)) {
            try {
<<<<<<< HEAD
                const userInfo = { firstName, lastName, email, deliveryAddress, mobileNumber, cartItems, totalPrice: totalPrice + deliveryFee };
=======
                const userInfo = { firstName, lastName, email, deliveryAddress, mobileNumber, cartItems, totalPrice, deliveryFee };
>>>>>>> main
                sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                window.location.href = '/CheckoutPage';
            } catch (error) {
                console.error("Error saving user information: ", error);
<<<<<<< HEAD
                toast.error("Please input valid user information!")
=======
>>>>>>> main
            }
        }
    };

    const handleRemove = (index) => {
        const updatedItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedItems);
    };

    return (
<<<<<<< HEAD
        <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
            <Header/>
            <div className='flex flex-col w-3/4 mx-auto'>
              <div className="containercart w-full">                
                <div className="cart-products bg-transparent">
                    <h3>Cart</h3>
                    <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                    {/* <table className="w-full overflow-x-auto"> */}
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
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.data.name}</td>
                                    <td>{parseFloat(item.data.price) || 0}</td>
                                    <td>{item.data.quantity}</td>
                                    <td>{parseFloat(item.data.delivery) || 0}</td>
                                    <td>${((parseFloat(item.data.price) || 0) * (parseInt(item.data.quantity) || 0) + (parseFloat(item.data.delivery) || 0) * (parseInt(item.data.quantity) || 0)).toFixed(2)}</td>
                                    <td>
                                        <button className='bg-teal-400 hover:bg-purple-400' onClick={() => handleRemove(index)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    <p>Total Price: ${totalPrice.toFixed(2)}</p>
                    <p>Total Price Including Delivery Fee: ${(totalPrice + deliveryFee).toFixed(2)}</p>
                </div>
                <Link to="/GuestPage" className="w-full no-underline inline-block text-center bg-gradient-to-r from-purple-300 to-teal-300 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900">Back to Product page</Link>
            </div>

            <div className="user-info w-full">
                    <h3>User Information</h3>
                    <table className="w-full">
=======
        <div>
            <Header/>
            <div className="containercart">
                <h2>Cart</h2>
                <div className="user-info">
                    <h3>User Information</h3>
                    <table>
>>>>>>> main
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
<<<<<<< HEAD
                                     
=======
>>>>>>> main
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
<<<<<<< HEAD

=======
>>>>>>> main
                                    {mobileNumberError && <p className="error-message">{mobileNumberError}</p>}
                                </td>
                            </tr>
                           
                            <tr>
                                <td colSpan="2" className="text-center">
<<<<<<< HEAD
                                    <button onClick={handleSave} className='w-full  text-slate-800 bg-gradient-to-r from-purple-300 to-teal-300 px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900'>
=======
                                    <button onClick={handleSave} className="w-full bg-sky-700 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900">
>>>>>>> main
                                        Proceed To Payment Page
                                    </button>
                                    </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<<<<<<< HEAD

            </div>
            
=======
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
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.data.name}</td>
                                    <td>{parseFloat(item.data.price) || 0}</td>
                                    <td>{item.data.quantity}</td>
                                    <td>{parseFloat(item.data.delivery) || 0}</td>
                                    <td>${((parseFloat(item.data.price) || 0) * (parseInt(item.data.quantity) || 0) + (parseFloat(item.data.delivery) || 0) * (parseInt(item.data.quantity) || 0)).toFixed(2)}</td>
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
>>>>>>> main
        </div>
    );
}

export default CartPage;
