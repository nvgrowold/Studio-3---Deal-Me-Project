import { Outlet, Navigate } from "react-router-dom";
import { useAdminAuthStatus } from "../hooks/useAdminAuthStatus";  // Adjust the path as necessary
import Spinner from "./Spinner";

export default function PrivateRouteAdmin() {
  const { loggedIn, checkingStatus, userEmail } = useAdminAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  // Check if the logged-in user's email is the admin's email
  const isAdmin = userEmail.toLowerCase() === 'dealmeadmin@gmail.com';
  return loggedIn && isAdmin ? <Outlet /> : <Navigate to="/Login" />;
}

