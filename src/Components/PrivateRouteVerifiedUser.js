//Outlet: is to display everything inside this PrivateRoute
import { Outlet, Navigate } from "react-router-dom";
//as want to returning 2 information by destructuring loggedIn and checkingStatus, so need to put usAuthStatus into {}
import {useVerifiedUserAuthStatus} from "../hooks/useVerifiedUserAuthStatus";
import Spinner from "./Spinner";


export default function PrivateRouteVerifiedUser() {
  const { loggedIn, checkingStatus, isVerified} = useVerifiedUserAuthStatus();
  if (checkingStatus) {
    //if no spinner, it will always error, it takes time to get auth information after login
    return <Spinner />;
  }
  // return if the loggedIn is true then display everything inside this PrivateRoute, otherwise redirect to Login page
  return loggedIn&& isVerified ? <Outlet /> : <Navigate to="/Login" />; //Outlet is a component that renders the appropriate child route's 
}

// then, need to create a hook component to get the login status from firebase