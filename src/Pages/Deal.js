import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import {getDoc, doc,  } from 'firebase/firestore';
import Spinner from '../Components/Spinner';
import Header from '../Components/Header';


export default function Deal() {
    const params =useParams();
    const [deal, setDeal] = useState(null);
    const [loading, setLoading] = useState(false);

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
        {deal? deal.productName :"Loading"}
    </div>
  )
}