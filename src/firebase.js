// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//Import the storage of our firebase
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGOv3hJPU-JWreMNnrCCN2pvsuv07sdrE",
  authDomain: "deal-me-f6455.firebaseapp.com",
  projectId: "deal-me-f6455",
  storageBucket: "deal-me-f6455.appspot.com",
  messagingSenderId: "402382833091",
  appId: "1:402382833091:web:75eef4981bf82b9b246976"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db=getFirestore();