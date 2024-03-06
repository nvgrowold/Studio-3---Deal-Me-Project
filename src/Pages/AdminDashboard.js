import React from 'react'
import Dashboard from './AdminNavPages/Dashboard';
//import Nav from '../Components/Nav';
//import { Link} from 'react-router-dom';
import HeaderAfterLogin from '../Components/HeaderAfterLogin';
import SideNav from './SideNav';

export default function AdminDashboard() {
  return (
    <div>
      <HeaderAfterLogin/>     
      <Dashboard/>
      <SideNav/>
      <div>
    </div>
    </div>
  )
}
