import React from 'react'
import { Outlet } from 'react-router-dom'
//import NavAdminDashBoard from './components/NavAdminDashBoard'
//import NavAdminDashBoard from './Components/NavAdminDashBoard';
import Nav from '../../Components/Nav';

const AdminDashboardLayout = ({children}) => {
  return (
   <>
   <Nav children={children}>
    <Outlet/>
   </Nav>
   </>
  )
}

export default AdminDashboardLayout;