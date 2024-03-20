import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import Header from '../Components/Header';
import "../Styling/CartPage.css";

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');

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
        const total = items.reduce((acc, curr) => {
            const price = parseFloat(curr.price) || 0;
            const quantity = parseInt(curr.quantity) || 0;
            return acc + (price * quantity);
        }, 0);
        setTotalPrice(total);
    };


    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validateMobileNumber = (number) => /^\+64[0-9]{8,9}$/.test(number);

    const handleSave = async () => {
        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return;
        }
        if (!validateMobileNumber(mobileNumber)) {
            setMobileNumberError('Invalid New Zealand mobile number');
            return;
        }

        try {
            

            const userInfo = { firstName, lastName, email, deliveryAddress, mobileNumber, cartItems, totalPrice };
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
            window.location.href = '/CheckoutPage';
        } catch (error) {
            console.error("Error saving user information: ", error);
        }
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
                                <td><input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></td>
                                <td><input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <input type="email" placeholder="Email" value={email} onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailError('');
                                    }} />
                                    {emailError && <p className="error-message">{emailError}</p>}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2"><input type="text" placeholder="Delivery Address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <input type="tel" placeholder="Mobile Number (+64)" value={mobileNumber} onChange={(e) => {
                                        setMobileNumber(e.target.value);
                                        setMobileNumberError('');
                                    }} />
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
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(cartItems) && cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{parseFloat(item.price) || 0}</td>
                                    <td>{parseFloat(item.quantity) || 0}</td>
                                    <td>{item.delivery}</td>
                                    <td>${((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Total Price: ${totalPrice.toFixed(2)}</p>
                </div>
                {/* <Link to="/GuestPage">Back to Product page</Link> */}
                <Link to="/GuestPage" className="w-full bg-sky-700 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900 inline-block text-center">Back to Product page</Link>


            </div>
        </div>
    );
}

export default CartPage;
