import { Link } from "react-router-dom";
import React from 'react';

const SoldItem = ({listing, id, soldPrice, commission, buyerFirstName, buyerLastName, buyerEmail, buyerDeliveryAddress, buyerMobileNumber}) => {

    return (
        <div className="relative bg-sky-50 flex flex-col justify-between shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px] pl-3">
          <li className="relative bg-sky-50 flex flex-col justify-between shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
            <Link className="contents" to={`/category/${listing}/${id}`}>
              <img className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
                loading="lazy" src={listing.imgUrls[0]} alt="" />
            </Link>
            {/* <Moment className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg" fromNow>{listing.timestamp?.toDate()}</Moment> */}

          </li>
          <p className="font-semibold text-sky-800 m-0 pl-2 text-xl truncate">{listing.productName}</p>
            <p className="text-[#457b9d] mt-2 pl-2 font-semibold">
              {listing.deliveryFee === 0 ? "Pickup only" : `Shipping Fee: $${listing.deliveryFee}`}
            </p>
          <p className="text-[#457b9d] mt-2 pl-2 font-semibold">Sold Price: ${soldPrice}</p>
          <p className="text-[#457b9d] mt-2 pl-2 font-bold">Commission: ${commission.toFixed(2)}</p>
          <p className="text-[#457b9d] mt-2 pl-2 font-semibold">Buyer Information</p>
          <p className="text-[#457b9d] pl-2 text-sm">Full Name: {buyerFirstName} {buyerLastName}</p>
          <p className="text-[#457b9d] pl-2 text-sm">Email: {buyerEmail}</p>
          <p className="text-[#457b9d] pl-2 text-sm">Delivery Address: {buyerDeliveryAddress}</p>
          <p className="text-[#457b9d] pl-2 text-sm">Mobile Number: {buyerMobileNumber}</p>
        </div>
    );
  };
  
  export default SoldItem;