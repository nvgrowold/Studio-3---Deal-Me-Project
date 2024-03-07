import React from 'react'
import { Outlet } from 'react-router-dom'
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