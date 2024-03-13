import { useState } from "react";
import { Link} from 'react-router-dom';
import Header from "../Components/Header";
import GoogleSignIn from "../Components/GoogleSignIn";

//import eye icons
import { AiFillEye , AiFillEyeInvisible } from "react-icons/ai";
//import getAuth method for user authentication
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {db} from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
//navigate user to another page after successful register
import { useNavigate } from "react-router-dom";
//import toastify error notifications from react-toastify
import {toast} from "react-toastify";




function Register(){
    //Hook state for user input data object
    const [formData, setFormData] = useState({
        name:"",
        username:"",
        email: "",
        password:"",
    });
    //Hook for show password, the initial state is false not showing
    const[showPassword, setShowPassword] = useState(false);
    
    //destructure the email and password from the form
    const {name, username, email, password} = formData;

    //initialize the imported userNavigate
    const navigate  = useNavigate();

    //function to handle onChange of input
    function handleChange(e){
        setFormData((prevState) => ({
        ...prevState,
        [e.target.id]:e.target.value,
        }))
    }

    //function to handle onSubmit event
   async function onSubmit(e){
        // use this method to prevent refresh the page while clicking Register button with empty input
        e.preventDefault()
        // then go to Firebase Authentication web to import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
        try {
            // put method here
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            updateProfile(auth.currentUser,{
                displayName:name,
            });

            const user = userCredential.user;
            //console.log(user);
            const formDataCopy = {...formData};
            //for security issue to prevent hacking, delete the password
            delete formDataCopy.password;
            //adding the time that user registered
            formDataCopy.timestamp = serverTimestamp();
            
            //save data to firebase
            await setDoc(doc(db, "users", user.uid), formDataCopy);
            toast.success("Sign up was successful");

            //after adding the new user to the database, navigate them to another page
            navigate("/UserProfilePage");
        } catch (error) {
            // put errors here  
            //console.log(error);
            toast.error("Something went wrong with the registration");
        }
    }
    
    return(
    <div>
        <Header/>
        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto mt-16">
            <div className="md:w-[60%] lg:w-[45%] mb-12 md:mb-6">
                <img src="https://plus.unsplash.com/premium_photo-1681488350342-19084ba8e224?q=80&w=2888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="/" 
                className="w-full rounded-2xl"/>
            </div>
            <div className="w-full md:w-[60%] lg:w-[45%] lg:ml-20">
                {/* click Register button to submit register information, need a function to handle this event */}
                <form onSubmit={onSubmit}> 
                    <input type="text" id="name" value={name}
                    onChange={handleChange} placeholder="Full Name"
                    className="mb-6 w-full px-4 py-2 text-base text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />  

                    <input type="text" id="username" value={username}
                                        onChange={handleChange} placeholder="Username"
                                        className="mb-6 w-full px-4 py-2 text-base text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />  

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
                            Have an account?
                            <Link to="/Login" className="no-underline cursor-pointer text-yellow-600 hover:text-yellow-900 transition duration-200 ease-in-out ml-1">Login</Link>
                        </p>
                        {/* <p>
                            <Link to="/ForgotPassword" className="no-underline cursor-pointer text-sky-700  hover:text-red-900 transition duration-200 ease-in-out">Forgot password?</Link>
                        </p> */}
                    </div>
                    <button className="w-full bg-sky-700 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900"
                        type="submit">Register
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

export default Register;