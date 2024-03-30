import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import Spinner from './Spinner';
import Header from './Header';

export default function OrderDetailPage() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrder() {
            const docRef = doc(db, "orderitems", orderId);  // Assuming 'orderitems' is the collection name
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setOrder(docSnap.data());
                setLoading(false);
            }
        }

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
            <Header />

            {/* Order details */}
            <div className="w-full items-start justify-items-center flex flex-col max-w-xl lg:mx-auto p-4 rounded-lg shadow-lg bg-sky-50 lg:space-x-5 mt-6">
                <p className="text-2xl font-bold mb-3 text-sky-900">
                    Order #{orderId}
                </p>
                <p className="mt-3 mb-3 text-gray-900">
                    <span className="font-semibold">Customer Name - </span>
                    {order.userInfo.firstName} {order.userInfo.lastName}
                </p>
                <p className="mt-3 mb-3">
                    <span className="font-semibold">Email - </span>
                    {order.userInfo.email}
                </p>
                <p className="mt-3 mb-3">
                    <span className="font-semibold">Address - </span>
                    {order.userInfo.deliveryAddress}
                </p>
                <p className="mt-3 mb-3">
                    <span className="font-semibold">Total Price - </span>
                    ${order.totalPrice}
                </p>
                <div>
                    <span className="font-semibold">Items:</span>
                    <ul>
                        {order.purchasedItems.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
