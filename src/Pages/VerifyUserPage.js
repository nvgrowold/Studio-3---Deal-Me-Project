import React, { useState } from 'react';
import Header from '../Components/Header';
import UserProfileMenu from '../Components/UserProfileMenu';
import Spinner from '../Components/Spinner';
import { toast } from 'react-toastify';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { getAuth } from 'firebase/auth';

//A UUID – that's short for Universally Unique IDentifier, by the way – is a 36-character alphanumeric string that can be used to identify information. They are often used, for example, to identify rows of data within a database table, with each row assigned a specific UUID.
import {v4 as uuidv4} from "uuid"; //https://www.npmjs.com/package/uuid
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { useNavigate } from "react-router-dom";
import profileSideImage from "../assets/profileSideImage.jpg";

export default function VerifyUser() {
    const [uploadProgress, setUploadProgress] = useState([]);

    //const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    //hook state for loading spinner, after click submit, state will change to true
    const [loading, setLoading] =useState(false);

    //hook state for delivery or pickup only button + destructure it
    const[formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email:"",
        category: "",
        images: {},
        timestamp: serverTimestamp(),
    })
    //destructuring, all these values come from formData
    const {firstName, lastName, email, category,images} = formData;

    //handle all changes in the form all-in-one here
    function onChange(e){ //e: is the event, the input
      let boolean = null; //for input with text,number, files together, need to create a boolean to handle if save the data 
      if(e.target.value === "true"){ //this is for shipping field, have the value true or false
        boolean = true;
      }
      if(e.target.value === "false"){
        boolean = false;
      }
      //for files
      if(e.target.files){ //uploading the files
        setFormData((prevState) => ({ //first, keep the previous state, keep the changes that made before
          ...prevState,  //then, return an object copy the previous state
          images:e.target.files, //set the images to e.target.files
        }))
      }

      //for text/boolean/number
      if(!e.target.files){
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: boolean ?? e.target.value, //if boolean exists, if boolean is not null, put boolean=e.target.id, else, put boolean=e.target.value
        }))                                         // using "??": if boolean is not null, consider first option(e.target.id), else if is null, consider the second option(e.target.value)
      }
    }


    //handle form submit
    async function onSubmit(e){

      e.preventDefault(); //no refreshing if click submit button with some field of empty input
      setLoading(true); //after clicking submit, setLoading to true, run the spinner. After storing to the firebase, set the loading back to false
      
      if (!auth.currentUser) {
        // Handle the case where no user is authenticated
        setLoading(false); //stop the loading process as the operation cannot proceed
        toast.error("You must be logged in to perform this action.");
        navigate("/Login");
        return; //exit the function to prevent further execution
      }
      
      
      if(images.length > 6) { //add some conditions, if not meet the condition, stop loading
        setLoading(false);
        toast.error("Maximum 6 images are allowed");
        return;
      }

            
      // Initialize the uploadProgress state with zeroes for each image
      setUploadProgress(new Array(images.length).fill(0));   
         

      //upload image one by one to storage
      //https://firebase.google.com/docs/storage/web/upload-files
      //refer to full example there
      async function storeImage(image, index) {
        return new Promise((resolve, reject) => {
          const storage = getStorage();
          const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`; //npm install uuid
          const storageRef = ref(storage, filename);
          const uploadTask = uploadBytesResumable(storageRef, image);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");

              //update loading progress
              setUploadProgress((oldProgress) => {      //This is an arrow function that takes the current state of uploadProgress as its parameter
                const newProgress = [...oldProgress];   //creates a copy of oldProgress using the spread operator (...)
                newProgress[index] = progress;         //The function then updates the element at the specified index in the newProgress array with the new progress value (progress). This index corresponds to the specific image whose upload progress is being updated. progress is a number representing the percentage of the upload that has been completed for that image.
                 return newProgress;                   //This array now represents the updated state
              })
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              // Handle unsuccessful uploads
              reject(error);
            },

            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...

              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { //The uploadTask.snapshot.ref is a reference to the file that has just been uploaded. getDownloadURL is a method provided by Firebase that, when given a reference to a file stored in Firebase Storage, returns a promise that resolves with the file's URL.

                resolve(downloadURL);
              });
            }
          );
        });
      }

      // Initialize the uploadProgress state with zeroes for each image
      setUploadProgress(new Array(images.length).fill(0));

      //uploading image to database

      const imgUrls = await Promise.all(
        [...images].map((image, index) => storeImage(image, index))
      ).catch(() => {
        setLoading(false);
        toast.error("Images not uploaded");
        return;
      });

      if (!imgUrls) return; // If imgUrls is null, stop the execution.
  
      const formDataCopy = {
        ...formData,
        imgUrls,
        timestamp: serverTimestamp(),
        //userRef: auth.currentUser.uid,
        //isVerified: true, // Add status field to distinguish sold and selling items
      };

      //delete image
      delete formDataCopy.images;
      //!formDataCopy.offer && delete formDataCopy.discountedPrice;
      await addDoc(collection(db, "users", auth.currentUser.uid, "IdentityProofs"), formDataCopy);
      setLoading(false);
      toast.success("User Verification File Submitted");
      navigate("/UserProfilePage");
      // navigate(`/category/${formDataCopy.type}/${docRef.id}`);
    }

    if(loading){ //if loading is true, render the Spinner.js component
      return <Spinner/>;
    }


  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
      <Header/>
      <div className='grid gap-8 md:w-auto justify-center mt-10 lg:w-full lg:grid-cols-3 lg:justify-start'>
      <UserProfileMenu/>
        <section>

        <div className="max-w-md px-2 mx-auto shadow-lg">      
        <h1 className='text-center pt-6 mt-6 text-2xl font-semibold  text-sky-800'>User Verification</h1>
        <h5 className='text-center mt-6 text-base font-semibold  text-sky-400'>! Please became a verified user to creating a listing</h5>
        <form onSubmit={onSubmit} className='flex-auto max-w-lg shadow-md rounded p-6 px-10'>          
          {/* Name input area */}
          <p className="text-lg font-semibold text-sky-800">First Name</p>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={onChange} //handle the input from user
            placeholder="First Name"
            required //this field is required, no form submission without this field filled
            className="w-full px-4 py-1 text-base text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-1"
          />

          {/* Name input area */}
          <p className="text-lg mt-6 font-semibold text-sky-800">Last Name</p>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={onChange} //handle the input from user
            placeholder="Last Name"
            required //this field is required, no form submission without this field filled
            className="w-full px-4 py-1 text-base text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-1"
          />

          {/* Name input area */}
          <p className="text-lg mt-6 font-semibold text-sky-800">Email Address</p>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onChange} //handle the input from user
            placeholder="example@gmail.com"
            required //this field is required, no form submission without this field filled
            className="w-full px-4 py-1 text-base text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-1"
          />

          {/* Dropdown for product category */}
          <p className="text-lg mt-6 font-semibold  text-sky-800">Proof of Identity</p>
          <select id="category" value={category} onChange={onChange}
          className='w-full px-4 py-1 text-base text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-1'>
              {/* Options here */}
              <option value="">All Categories</option>
              <option value="Passport">Passport</option>
              <option value="Driver's License">Driver's License</option>
            </select>

          {/* images */}
          <div className="mt-3">
            <p className="text-lg font-semibold  text-sky-800 mb-1">Upload Proof of Identity</p>
            <p className="text-gray-600 mb-1 text-xs">
              Max 6 Images, verification result will come back within 2 working hours.
            </p>
            <input
              type="file"
              id="identityProof"
              onChange={onChange}
              accept=".jpg,.png,.jpeg"
              multiple
              required
              className="w-full px-3 py-1 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
            />
          </div>

          <button
            type="submit"
            className='w-full bg-gradient-to-r from-purple-300 to-teal-300 text-slate-800 px-7 py-2 my-8 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900'
          >
            Submit
          </button>
        </form>
      </div>

        </section> 

        <section>           
          <div className="w-full md:w-96 lg:mr-40 lg:mt-16 justify-center md:items-center lg:pl-10">
                <img src={profileSideImage} alt=""/>
          </div>            

        </section>
      </div>
    </div>
    
  )
}
