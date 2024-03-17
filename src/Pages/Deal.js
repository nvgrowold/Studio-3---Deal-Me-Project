import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import {getDoc, doc,  } from 'firebase/firestore';
import Spinner from '../Components/Spinner';
import Header from '../Components/Header';

//import react-slideshow-image
import 'react-slideshow-image/dist/styles.css';
import {Fade} from 'react-slideshow-image';


//react-slideshow-image styling the image
const divStyle = {
  display:'flex',
  alignItems: "center",
  justifyContent:"center",
  height:"400px",
  backgroundSize:'cover'
}

export default function Deal() {
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
    <div>
        <Header/>
        {deal? deal.productName :"Loading..."}
        {/* npm install react-slideshow-image */}
        <div className='slide-container'>
          {deal && deal.imgUrls && (
            <Fade>
              {deal.imgUrls.map((image,index) => (
                <div key={index}>
                  <div style={{...divStyle, backgroundImage:`url(${deal.imgUrls[index]})`}}></div>
                </div>
              ))}
            </Fade>
          )}
 
        </div>
    </div>
  )
}