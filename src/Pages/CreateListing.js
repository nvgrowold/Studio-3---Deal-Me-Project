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

export default function CreateListing() {
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
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
    })
    //destructuring, all these values come from formData
    const {type,productName,category, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice,discountedPrice, images} = formData;

    //handle all changes in the form all-in-one here
    function onChange(e){ //e: is the event, the input
      let boolean = null; //for input with text,number, files together, need to create a boolean to handle if save the data 
      if(e.target.value === "true"){ //this is for parking field, have the value true or false
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

      //upload image one by one to storage
      //https://firebase.google.com/docs/storage/web/upload-files
      //refer to full example there
      async function storeImage(image) {
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
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      }

      //add image to database
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

      <div className="max-w-md px-2 mx-auto">      
        <h1 className='text-3xl text-center mt-6 font-bold'>CreateListing</h1>
        <form onSubmit={onSubmit}>
          {/*dynamic sell or rent button */}
          {/* <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
          <div className="flex">
            <button
              type="button"
              id="type"
              value="sale"
              onClick={onChange}
              className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                type === "rent"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              sell
            </button>
            <button
              type="button"
              id="type"
              value="rent"
              onClick={onChange}
              className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                type === "sale"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              rent
            </button>
          </div> */}

          {/* Name input area */}
          <p className="text-lg mt-6 font-semibold">Product Name</p>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={onChange} //handle the input from user
            placeholder="Product Name"
            maxLength="32" //max length of the name character no more than 32, this is a built in validation function of HTML
            minLength="3" //min length of the name character no less than 10
            required //this field is required, no form submission without this field filled
            className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
          />

          {/* Dropdown for product category */}
          <select id="category" value={category} onChange={onChange}>
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

          {/* beds and baths section */}
          <div className="flex space-x-6 mb-6">
            <div>
              <p className="text-lg font-semibold">Beds</p>
              <input
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={onChange}
                min="1"
                max="50"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Baths</p>
              <input
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={onChange}
                min="1"
                max="50"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
            </div>
          </div>

          {/* Parking field */}
          <p className="text-lg mt-6 font-semibold">Parking spot</p>
          <div className="flex">
            <button
              type="button"
              id="parking"
              value={true}
              onClick={onChange}
              className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                !parking ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="parking"
              value={false}
              onClick={onChange}
              className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                parking ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              no
            </button>
          </div>

          {/* funiture field */}
          <p className="text-lg mt-6 font-semibold">Furnished</p>
          <div className="flex">
            <button
              type="button"
              id="furnished"
              value={true}
              onClick={onChange}
              className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              yes
            </button>
            <button
              type="button"
              id="furnished"
              value={false}
              onClick={onChange}
              className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                furnished ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              no
            </button>
          </div>

          {/* Address field */}
          <p className="text-lg mt-6 font-semibold">Address</p>
          <textarea
            type="text"
            id="address"
            value={address}
            onChange={onChange}
            placeholder="Address"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
          />

          {/* Description field */}
          <p className="text-lg font-semibold">Description</p>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={onChange}
            placeholder="Description"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
          />

          {/* Offer field */}
          <p className="text-lg font-semibold">Offer</p>
          <div className="flex mb-6">
            <button
              type="button"
              id="offer"
              value={true}
              onClick={onChange}
              className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                !offer ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              yes
            </button>
            <button
              type="button"
              id="offer"
              value={false}
              onClick={onChange}
              className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                offer ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              no
            </button>
          </div>

          {/* Regular price filed */}
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold">Regular price</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="number"
                  id="regularPrice"
                  value={regularPrice}
                  onChange={onChange}
                  min="1"
                  max="400000000"
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
                {type === "rent" && (
                  <div className="">
                    <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                  </div>
                )}
              </div>
            </div>
          </div>


          {offer && (
            <div className="flex items-center mb-6">
              <div className="">
                <p className="text-lg font-semibold">Discounted price</p>
                <div className="flex w-full justify-center items-center space-x-6">
                  <input
                    type="number"
                    id="discountedPrice"
                    value={discountedPrice}
                    onChange={onChange}
                    min="1"
                    max="400000000"
                    required={offer}
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                  />
                  {type === "rent" && (
                    <div className="">
                      <p className="text-md w-full whitespace-nowrap">
                        $ / Month
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* images */}
          <div className="mb-6">
            <p className="text-lg font-semibold">Images</p>
            <p className="text-gray-600">
              The first image will be the cover (max 6)
            </p>
            <input
              type="file"
              id="images"
              onChange={onChange}
              accept=".jpg,.png,.jpeg"
              multiple
              required
              className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
            />
          </div>
          <button
            type="submit"
            className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Create Listing
          </button>
        </form>
      </div>
    </>
    
  )
}
