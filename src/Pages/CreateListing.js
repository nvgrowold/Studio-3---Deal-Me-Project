import React, { useState } from 'react';
import Header from '../Components/Header';
import Spinner from '../Components/Spinner';
import { toast } from 'react-toastify';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { getAuth } from 'firebase/auth';
import {v4 as uuidv4} from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import profileSideImage from "../assets/profileSideImage.jpg";

export default function CreateListing() {
    //a hook to track image uploading progress
    const [uploadProgress, setUploadProgress] = useState([]);

    //const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    //hook state for loading spinner, after click submit, state will change to true
    const [loading, setLoading] =useState(false);

    //hook state for sell or rent button + destructure it
    //hook state to hold name/bedrooms/baths value + destructure it
    const[formData, setFormData] = useState({
        // type: "rent",
        productName: "",
        category: "",
        region: "",
        shipping: false,
        deliveryFee:0,
        description: "",
        regularPrice: 0,
        images: {},
    })
    //destructuring, all these values come from formData
    const {productName,category, region, shipping, deliveryFee, description, regularPrice, images} = formData;

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
        [...images].map((image) => storeImage(image))
      ).catch((error) => {
        setLoading(false);
        toast.error("Images not uploaded");
        return;
      });
  
      const formDataCopy = {
        ...formData,
        imgUrls,
        timestamp: serverTimestamp(),
        userRef: auth.currentUser.uid,
      };

      //delete image
      delete formDataCopy.images;
      !formDataCopy.offer && delete formDataCopy.discountedPrice;
      const docRef = await addDoc(collection(db, "listings"), formDataCopy);
      setLoading(false);
      toast.success("Listing created");
      navigate("/UserProfilePage");
      // navigate(`/category/${formDataCopy.type}/${docRef.id}`);
    }

    if(loading){ //if loading is true, render the Spinner.js component
      return <Spinner/>;
    }


  return (
    <>
      <Header/>
      <div className='grid gap-8 md:w-auto justify-center mt-10 lg:grid-cols-3 lg:justify-start'>
        <section className='lg:ml-40 lg:mt-16 lg:max-w-40'>
              {/* //User Account Page */}
            <div> 
              <p className='text-2xl font-semibold  text-sky-800'>Account Detail</p>
              <p>
                <Link to=''className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
                  Save for later
                </Link>
              </p>

              <div className='mt-5'>
                <p className='text-lg font-semibold text-sky-800'>Buying</p>
                <p>
                  <Link to=''className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
                    Items I purchased
                  </Link>
                </p>
                <Link to='/GuestPage'className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
                  Searching an items
                </Link> 
              </div>

              <div className='mt-5'>
                <p className='text-lg font-semibold text-sky-800'>Selling</p>
                <p>
                  <Link to='/CreateListing' className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
                    Listing an item
                  </Link>
                </p>
                <Link to='/MyListingsPage ' className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
                    Items I'm selling
                </Link>
              </div>
            </div>
        </section>

        <section>

        <div className="max-w-md px-2 mx-auto">      
        <h1 className='text-center mt-6 text-2xl font-semibold  text-sky-800'>Listing An Item</h1>
        <form onSubmit={onSubmit} className='flex-auto max-w-lg shadow-md rounded p-6 px-10'>          
          {/* Name input area */}
          <p className="text-lg mt-6 font-semibold text-sky-800">Product Name</p>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={onChange} //handle the input from user
            placeholder="Product Name"
            maxLength="32" //max length of the name character no more than 32, this is a built in validation function of HTML
            minLength="3" //min length of the name character no less than 10
            required //this field is required, no form submission without this field filled
            className="w-full px-4 py-1 text-base text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-1"
          />

          {/* Dropdown for product category */}
          <p className="text-lg mt-6 font-semibold  text-sky-800">Product Category</p>
          <select id="category" value={category} onChange={onChange}
          className='w-full px-4 py-1 text-base text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-1'>
              {/* Options here */}
              <option value="">All Categories</option>
              <option value="Computers">Computers</option>
              <option value="Electronics & photography">Electronics & Photography</option>
              <option value="Gaming">Gaming</option>
              <option value="Health & beauty">Health & Beauty</option>
              <option value="Home & living">Home & Living</option>
              <option value="Jewellery & watches">Jewellery & Watches</option>
              <option value="Mobile phones">Mobile Phones</option>
              <option value="Music & instruments">Music & Instruments</option>
              <option value="Pets & animals">Pets & Animals</option>
              <option value="Sports">Sports</option>
              <option value="Toys & models">Toys & Models</option>
            </select>

          {/* Dropdown for Region */}
          <p className="text-lg mt-6 font-semibold text-sky-800">Region</p>
          <select id="region" value={region} onChange={onChange}
          className='w-full px-4 py-1 text-base text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-1'>
              {/* Options here */}
              <option value="">All Regions</option>
              <option value="Auckland">Auckland</option>
              <option value="Christchurch">Christchurch</option>
              <option value="Palmerston North">Palmerston North</option>
              <option value="Wellington">Wellington</option>
              <option value="Tauranga">Tauranga</option>
              <option value="Hamilton">Hamilton</option>
              <option value="Dunedin">Dunedin</option>
              <option value="Napier-Hastings">Napier-Hastings</option>
            </select>

          {/* Shipping method */}
          <p className="text-lg mt-6 font-semibold text-sky-800">Shipping Method</p>
          <div className="flex">
            <button
              type="button"
              id="shipping"
              value={true}
              onClick={onChange}
              className={`mr-3 px-7 py-2 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                !shipping ? "bg-white text-gray-500" : "bg-slate-600 text-white"
              }`}
            >
              Delivery
            </button>
            <button
              type="button"
              id="shipping"
              value={false}
              onClick={onChange}
              className={`ml-3 px-7 py-2 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                shipping ? "bg-white text-gray-500" : "bg-slate-600 text-white"
              }`}
            >
              Pickup Only
            </button>
          </div>

          {shipping && (
          <div className="flex items-center mt-3 mb-1">
            <div className="">
              <p className="text-lg font-semibold  text-sky-800">Delivery Fee</p>
              <div className="flex w-full justify-center items-center space-x-6">
              <div className="">
                  <p className="text-sm align-middle text-gray-500 w-full whitespace-nowrap">
                    NZ$
                  </p>
                </div> 
              <input
                type="number"
                id="deliveryFee"
                value={deliveryFee}
                onChange={onChange}
                min="0"
                max="400000000"
                required={shipping}
                className="w-full px-4 py-1 text-base text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center mb-1"
              />
             
              </div>
            </div>
          </div>
        )}

          {/* Description field */}
          <p className="text-lg font-semibold mt-6  text-sky-800">Description</p>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={onChange}
            placeholder="Description"
            required
            className="w-full px-4 py-1 text-base text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-1"
          />

          {/* Regular price filed */}
          <div className="flex items-center mt-3">
            <div className="">
              <p className="text-lg font-semibold  text-sky-800">Price</p>
              <div className="flex w-full justify-center items-center space-x-6">
                  <div className="">
                    <p className="text-sm text-gray-500 w-full whitespace-nowrap">NZ$</p>
                  </div>
                <input
                  type="number"
                  id="regularPrice"
                  value={regularPrice}
                  onChange={onChange}
                  min="1"
                  max="400000000"
                  required
                  className="w-full px-4 py-1 text-base text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center mb-1"
                />
              </div>
            </div>
          </div>

          {/* images */}
          <div className="mt-3">
            <p className="text-lg font-semibold  text-sky-800 mb-1">Images</p>
            <p className="text-gray-600 mb-1">
              The first image will be the cover (max 6)
            </p>
            <input
              type="file"
              id="images"
              onChange={onChange}
              accept=".jpg,.png,.jpeg"
              multiple
              required
              className="w-full px-3 py-1 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
            />
            {/* Display upload progress here */}
            {/* ###################### not working well################## */}
            <div className="mt-4">
                {uploadProgress.map((progress, index) => (
                    <div key={index}>
                        <p>Uploading image {index + 1}: {progress.toFixed(2)}%</p>
                        {/* add a progress bar */}
                        <div className="bg-red-200 rounded h-2">
                            <div className="bg-sky-600 h-2 rounded" style={{width: `${progress}%`}}></div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
          <button
            type="submit"
            className="mt-8 w-full px-7 py-2 bg-sky-700 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-sky-900 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Create Listing
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
    </>
    
  )
}
