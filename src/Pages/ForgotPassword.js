import { useState } from "react";
import { Link, useNavigate} from 'react-router-dom';
import Header from "../Components/Header";
import GoogleSignIn from "../Components/GoogleSignIn";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {toast} from "react-toastify";
import pinkBox from '../assets/PinkBox.mp4';


function ForgotPassword(){
    //Hook state for user input data object
    const [email, setEmail] = useState("");

    //create the navigate by using the useNavigate hook of react
    const navigate = useNavigate();

    //function to handle onChange of input
    function handleChange(e){
        setEmail(e.target.value);
    }

    //handle onSubmit event
    async function onSubmit(e){
        e.preventDefault()
        const auth = getAuth();

        sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Email sent
                    toast.success("Reset email sent. Check your inbox.");
                    navigate("/Login");
                })
                .catch((error) => {
                    // Handle errors
                    switch (error.code) {//unregistered email address does not produce an error; the operation is considered successful to avoid exposing which email addresses are registered. 
                        // case 'auth/user-not-found':
                        //     toast.error("No user found with this email address.");   // this approach might compromise privacy and security by revealing whether an email is registered.
                        //     break;
                        case 'auth/invalid-email':
                            toast.error("Invalid email address.");
                            break;
                        // case 'auth/wrong-password':
                        //     toast.error("Wrong password for email.");
                        //     break;
                        default:
                            toast.error("An error occurred. Please try again.");
                    }
            });
    }
    
    return(
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
        <Header/>
        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto mt-20 max-mt-20">
            <div className="md:w-[60%] lg:w-[45%] mb-12 md:mb-6">
                <video src={pinkBox} autoPlay loop muted className='w-full h-full object-cover rounded-2xl'/>   
                {/* <img src="https://plus.unsplash.com/premium_photo-1681488350342-19084ba8e224?q=80&w=2888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="/"  */}
                {/* className="w-full h-400 rounded-2xl"/> */}
            </div>
            <div className="w-full md:w-[60%] lg:w-[45%] lg:ml-20">
                {/* this is calling onSubmit function */}
                <form onSubmit={onSubmit}>                  
                    <input type="email" id="email" value={email}
                    onChange={handleChange} placeholder="Email Address"
                    className="mb-6 w-full px-4 py-2 text-base text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />

                    {/* adding links for register and forgot password */}
                    {/* whitespace-nowrap: for responsive settings when small screen not squeezed to another line. */}
                    {/* text-sm: for small screen , sm:text-lg is for above small screen that text is large size*/}
                    <div className="flex justify-between whitespace-nowrap text-xs sm:text-base"> 
                        <p className="mb-6">
                            Don't have an account?
                            <Link to="/Register" className="no-underline cursor-pointer text-yellow-600 hover:text-yellow-900 transition duration-200 ease-in-out ml-1">Register</Link>
                        </p>
                        <p>
                            <Link to="/Login" className="no-underline cursor-pointer text-sky-700  hover:text-red-900 transition duration-200 ease-in-out">Login instead?</Link>
                        </p>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-300 to-teal-300 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900"
                        type="submit">Send reset password
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

export default ForgotPassword;
