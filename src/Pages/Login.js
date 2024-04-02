import { useState } from "react";
import { Link, useNavigate} from 'react-router-dom';
import Header from "../Components/Header";
import { getFirestore, doc, getDoc } from "firebase/firestore";


//import eye icons
import { AiFillEye , AiFillEyeInvisible } from "react-icons/ai";
import GoogleSignIn from "../Components/GoogleSignIn";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import {toast} from "react-toastify";

import pinkBox from '../assets/PinkBox.mp4';



function Login(){
    //Hook state for user input data object
    const [formData, setFormData] = useState({
        email: "",
        password:"",
    });
    
    //Hook for show password, the initial state is false not showing
    const[showPassword, setShowPassword] = useState(false);
    
    //destructure the email and password from the form
    const {email, password} = formData;

    //create the navigate by using the useNavigate hook of react
    const navigate = useNavigate();

    //function to handle onChange of input
    function handleChange(e){
        setFormData((prevState) => ({
        ...prevState,
        [e.target.id]:e.target.value,
        }))
    }

    //function handle onSubmit event
    async function onSubmit(e){
        // prevent refresh the page
        e.preventDefault()
        
        // using try - catch to sign in the user and catch the error
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Querying Firestore to get the user role
            const db = getFirestore();
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const isAdmin = userData.isAdmin;  // Access the isAdmin attribute
    
                toast.success("Login successful!");
    
                if (isAdmin) {
                    navigate("/AdminDashboard");
                } else {
                    navigate("/UserProfilePage");
                }
            } else {
                console.log("No user data found");
            }
        } catch (error) {
            const errorMessage = error.message;
            // Display a more specific error message to the user
            toast.error(errorMessage || "Login failed, please try again.");
        }
    }
    
    return(
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
        <Header/>
        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto mt-20 max-mt-20">
            <div className="md:w-[60%] lg:w-[45%] mb-12 md:mb-6">
                <video src={pinkBox} autoPlay loop muted className='w-full h-full object-cover rounded-2xl'/>
                {/* <img src="https://plus.unsplash.com/premium_photo-1681488350342-19084ba8e224?q=80&w=2888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="/"  */}
                {/* className="w-full rounded-2xl"/> */}
            </div>
            <div className="w-full md:w-[60%] lg:w-[45%] lg:ml-20">
                <form onSubmit={onSubmit}>                  
                    <input type="email" id="email" value={email}
                    onChange={handleChange} placeholder="Email Address"
                    className="mb-6 w-full px-4 py-2 text-base text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />

                    {/* change position of this div to relative and eye icon to be absolute and right-3, then the eye icon could go into the right corner of password input*/}
                    <div className="relative">
                        {/**Make a condition, if the showPassword is true,then type is text, otherwise is password */}
                        <input type={showPassword ? "text" : "password"} id="password" value={password}
                        onChange={handleChange} placeholder="Password"
                        className="mb-6 w-full px-4 py-2 text-base text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" /> 
                        {/* react icons: eye show or hide password under conditions */}
                        {showPassword ? (
                            <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer" 
                            onClick={() => setShowPassword ((prevState)=>!prevState)} />
                        ): (<AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword ((prevState)=>!prevState)}/>)}
                    </div>

                    {/* adding links for register and forgot password */}
                    {/* whitespace-nowrap: for responsive settings when small screen not squeezed to another line. */}
                    {/* text-sm: for small screen , sm:text-lg is for above small screen that text is large size*/}
                    <div className="flex justify-between whitespace-nowrap text-xs sm:text-base"> 
                        <p className="mb-6">
                            Don't have an account?
                            <Link to="/Register" className="no-underline cursor-pointer text-yellow-600 hover:text-yellow-900 transition duration-200 ease-in-out ml-1">Register</Link>
                        </p>
                        <p>
                            <Link to="/ForgotPassword" className="no-underline cursor-pointer text-sky-700  hover:text-red-900 transition duration-200 ease-in-out">Forgot password?</Link>
                        </p>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-300 to-teal-300 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900"
                        type="submit">Sign In
                    </button>
                    <div className=" flex item-center my-0 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
                        <p className="text-center font-semibold mx-4 mt-0 text-sm">OR</p>
                    </div>
                    <GoogleSignIn/>               
                </form>

            </div>
        </div>
    </div> 

    ) 
}

export default Login;