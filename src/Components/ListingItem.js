import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function ListingItem({ listing, id, onEdit, onDelete }) {
  const [quantity, setQuantity] = useState(0); // Initial state set to 0

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateProductInSessionStorage(id, {
      name: listing.productName,
      price: listing.regularPrice,
      delivery: listing.deliveryFee,
      quantity: newQuantity
      
    }); // Update product in sessionStorage
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateProductInSessionStorage(id, {
        name: listing.productName,
        price: listing.regularPrice,
        delivery: listing.deliveryFee,
        quantity: newQuantity
      }); // Update product in sessionStorage
    }
  };

  useEffect(() => {
    const storedProduct = getProductFromSessionStorage(id);
    if (storedProduct !== null) {
      setQuantity(storedProduct.quantity);
    }
  }, [id]);

  const updateProductInSessionStorage = (id, product) => {
    const productList = JSON.parse(sessionStorage.getItem('productList')) || {};
    productList[id] = product;
    sessionStorage.setItem('productList', JSON.stringify(productList));
  };

  const getProductFromSessionStorage = (id) => {
    const productList = JSON.parse(sessionStorage.getItem('productList')) || {};
    return productList[id] || null;
  };

  return (
    <li className="relative bg-sky-50 flex flex-col justify-between shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link className="contents" to={`/category/${listing}/${id}`}>
        <img className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy" src={listing.imgUrls[0]} alt="" />
      </Link>
      <Moment className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg" fromNow>{listing.timestamp?.toDate()}</Moment>
      <p className="font-semibold text-sky-800 m-0 pl-2 text-xl truncate">{listing.productName}</p>
      <p className="text-[#457b9d] mt-2 pl-2 font-semibold">
        Price: NZ${listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </p>
      <p className="text-[#457b9d] mt-2 pl-2 font-semibold">
        Region: {listing.region}
      </p>
      <p className="text-[#457b9d] mt-2 pl-2 font-semibold">
  {listing.deliveryFee === 0 ? "Pickup only" : `Shipping Fee: $${listing.deliveryFee}`}
</p>

      {/* Quantity Counter */}
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center">
          <button onClick={decrementQuantity} className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded-l">
            -
          </button>
          <span className="mx-2">{quantity}</span>
          <button onClick={incrementQuantity} className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded-r">
            +
          </button>
        </div>

        {/* Delete and Edit Icons */}
        {onDelete && (
          <FaTrash
            className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
            onClick={() => onDelete(listing.id)} //when click, will call the onDelete function
          />
        )}
        {onEdit && (
          <MdEdit
            className="absolute bottom-2 right-7 h-4 cursor-pointer "
            onClick={() => onEdit(listing.id)} //when click, will call the onEdit function
          />
        )}
      </div>
    </li>
  )
}
