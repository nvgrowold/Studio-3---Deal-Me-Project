import React from 'react'
import HeaderAfterLogin from '../Components/HeaderAfterLogin'; 
import Dashboard from './AdminNavPages/Dashboard';
import Nav from '../Components/Nav';

export default function AdminDashboard() {
  return (
    <div>
      
      <HeaderAfterLogin/>
      <Nav/>
      <Dashboard/>
    </div>
  )
}
