import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Styling/CartPage.css"; // Import CSS file for styling

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedCartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCartItems(storedCartItems);
    }, []);

    useEffect(() => {
        calculateTotalPrice(cartItems);
    }, [cartItems]);

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, curr) => {
            const price = parseFloat(curr.price) || 0;
            const quantity = parseInt(curr.quantity) || 0;
            return acc + (price * quantity);
        }, 0);
        setTotalPrice(total);
    };

    const removeFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        sessionStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const handleQuantityChange = (index, quantity) => {
        const updatedCartItems = [...cartItems];
        if (quantity <= 0) {
            removeFromCart(index);
        } else {
            updatedCartItems[index].quantity = quantity;
            setCartItems(updatedCartItems);
            sessionStorage.setItem('cart', JSON.stringify(updatedCartItems));
        }
    };

    return (
        <div className="containercart">
            <h2>Cart</h2>
            <div className="user-info">
                <h3>User Information</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><input type="text" placeholder="First Name" /></td>
                            <td><input type="text" placeholder="Last Name" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="email" placeholder="Email" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="text" placeholder="Delivery Address" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="tel" placeholder="Mobile Number" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button>Save</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="cart-products">
                <h3>Cart Products</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{parseFloat(item.price) || 0}</td>
                                <td>
                                    <button className="remove-btn" onClick={() => handleQuantityChange(index, Math.max(0, item.quantity - 1))}>-</button>
                                    {item.quantity || 0}
                                    <button className="add-btn" onClick={() => handleQuantityChange(index, (item.quantity || 0) + 1)}>+</button>
                                </td>
                                <td>${((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)).toFixed(2)}</td>
                                <td><button onClick={() => removeFromCart(index)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            <Link to="/GuestPage">Back to Product page</Link>
        </div>
    );
}

export default CartPage;
