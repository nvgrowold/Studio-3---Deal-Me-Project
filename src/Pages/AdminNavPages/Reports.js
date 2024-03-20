import React from 'react'
import Header from '../../Components/Header'
import SideNav from '../SideNav'

const Reports = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
    <Header/>
    <SideNav/>
    <div className='pageTitle'>
        <h1> Reports</h1>
        
    </div>
    </div>
  )
}

export default Reports;