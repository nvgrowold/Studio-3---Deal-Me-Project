import React, { useState, useEffect } from 'react';
import Moment from "react-moment";

export default function OrderHistory({ order, id }) {
  return (
    <li className="relative p-6 bg-sky-50 flex flex-col justify-between shadow-sm hover:shadow-md rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      {/* Display the order ID and timestamp if available */}
      <div className="mb-2">
        <p className="text-xl font-bold">Order ID: {id}</p>
        {order.timestamp && (
          <p className="text-lg">
            <strong>Date Purchased:</strong> <Moment format="DD/MM/YYYY">{order.timestamp.toDate()}</Moment>
          </p>
        )}
      </div>

    {/* Assuming you have a list of items in each order */}
      <div>
        <h3 className="text-lg font-bold mb-2">Items Purchased:</h3>
        {order.purchasedItems.map((product, index) => (
          <div key={index}>
            <p className='font-semibold'>{product.name}</p>
            <div className="flex justify-between items-center text-sm"> 
              <p>Quantity:{product.quantity}</p>
              <p>Price: ${product.price? product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A"}</p>
              <p>Delivery Fee: ${product.delivery? product.delivery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  : 0}</p>
            </div>
          </div>
        ))}
         <div className=" flex item-center mb-3 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1 after:border-gray-300"></div>
      </div>

      <p className=" text-sky-800"><strong>Total Price:</strong> <span className="text-gray-500">${order.userInfo && order.userInfo.totalPrice ? order.userInfo.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): "N/A"}</span></p>
      
    {/* Display user info if needed */}
    {order.userInfo && (
    <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Delivery Information:</h3>
        <div className='font-semibold'>
          <p>First Name: {order.userInfo.firstName}</p>
          <p>Last Name: {order.userInfo.lastName}</p>
          <p>Email: {order.userInfo.email}</p>
          <p>Delivery Address: {order.userInfo.deliveryAddress}</p>
          <p>Mobile Number: {order.userInfo.mobileNumber}</p>
        </div>

    </div>
    )}

    {/* Total price if available */}
    {order.totalPrice && (
    <div className="mt-4">
        <p className="text-lg font-semibold">Total Price: ${order.totalPrice.toFixed(2)}</p>
    </div>
    )}


    </li>
  )
}
