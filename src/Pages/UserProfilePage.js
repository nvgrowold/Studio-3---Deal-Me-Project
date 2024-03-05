import React from 'react';
import { Link} from 'react-router-dom';
import HeaderAfterLogin from '../Components/HeaderAfterLogin'; 

export default function UserProfilePage() {
  return (
    <div>
      <HeaderAfterLogin/>
      <h1>UserProfilePage</h1>
      <Link to='/ListProductPage' className="mr-6 cursor-pointer" style={{ textDecoration: 'none', color:'#64007D' }}>
      Listing products
      </Link>
      <Link to='/GuestPage'style={{ textDecoration: 'none', color:'#64007D' }}>
      Searching products
      </Link>

    </div>
  )
}
