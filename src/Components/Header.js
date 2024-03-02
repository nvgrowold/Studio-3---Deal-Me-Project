import React from 'react'
import LogoForHeader from './LogoForHeader';

export default function Header() {
  return (
    <div className='h-24 bg-white border-b-2 shadow-sm sticky top-0 z-50'>
      <header className='flex justify-between items-center px-3
       max-w-7xl mx-auto'>
        <div className='item-start'>
          <LogoForHeader/>
        </div>
        <div>
            <ul className='flex space-x-10'>
                <li>Home</li>
                <li>UserProfile</li>
                <li>Login/Register</li>
                <li>Contact Us</li>
            </ul>
        </div>
      </header>
    </div>
  )
}
