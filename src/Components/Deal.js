import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import {getDoc, doc,  } from 'firebase/firestore';
import Spinner from './Spinner';
import Header from './Header';
//import { getAuth } from "firebase/auth";

//import react-slideshow-image
import 'react-slideshow-image/dist/styles.css';
import {Fade} from 'react-slideshow-image';


//react-slideshow-image styling the image
const divStyle = {
  display:'flex',
  alignItems: "center",
  justifyContent:"center",
  height:"450px",
  //backgroundSize:'cover'
  backgroundSize: 'contain', // Change this from 'cover' to 'contain'
  backgroundRepeat: 'no-repeat', // Ensures the image doesn't repeat
  backgroundPosition: 'center', // Centers the background image in the div
}

export default function Deal() {
    //const auth = getAuth();
    const params =useParams();
    const [deal, setDeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        //using an async function to fetch the data
        async function fetchDeal(){
            const docRef = doc(db, "listings", params.listingID);//get address of the deal using useParams()
            const docSnap = await getDoc(docRef);//get data using docSnap and getDoc() from firestore
            if(docSnap.exists()){
                setDeal(docSnap.data());
                setLoading(false);
            }
        }
        fetchDeal();

    },[params.listingID])

    if (loading){
        return <Spinner/>;
    }


  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
        <Header/>
        {/* npm install react-slideshow-image */}
        <div className='slide-container mt-6 mb-3'>
          {deal && deal.imgUrls && (
            <Fade duration={3000} // Each slide will stay for 5 seconds
            transitionDuration={1000} // Transition animation will last 1 second
            >
              {deal.imgUrls.map((image,index) => (
                <div  key={index}>
                  <div style={{...divStyle, backgroundImage:`url(${deal.imgUrls[index]})`}}></div>
                </div>
              ))}
            </Fade>
          )} 
        </div>
        
        {/* item details */}
        <div className="w-full items-start justify-items-center flex flex-col max-w-xl lg:mx-auto p-4 rounded-lg shadow-lg bg-sky-50 lg:space-x-5">
          <p className="text-2xl font-bold mb-3 text-sky-900">
            {deal.productName} - ${" "}
            {deal.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <p className="mt-3 mb-3  text-gray-900">
            <span className="font-semibold">Description - </span>
            {deal.description}
          </p>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Region - </span>
            {deal.region}
          </p>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Shipping - </span>
            {deal.shipping ? `Delivery Fee - $${deal.deliveryFee}` : "Pickup only"}
          </p>
        </div>
    </div>
  )
}