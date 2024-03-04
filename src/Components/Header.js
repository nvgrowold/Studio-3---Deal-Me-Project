import React from 'react'
import { Link} from 'react-router-dom';
import LogoForHeader from './LogoForHeader';

export default function Header() {
  return (
    <div className='h-[14] bg-white border-b-2 shadow-sm sticky top-0 z-50 py-2'>
      <header className='flex justify-between items-center
       max-w-7xl mx-auto'>
        <div className='px-2'>
          <LogoForHeader/>
        </div>
        <div className='pt-3'>
            <ul className='flex space-x-10 cursor-pointer max-mt-3 text-base font-semibold mr-5'>
                <li><Link to='/' className='no-underline  text-sky-800 hover:text-yellow-900 transition duration-150 ease-in-out'>Home</Link></li>
                <li><Link to='/Login' className='no-underline  text-sky-800  hover:text-yellow-900 transition duration-150 ease-in-out'>Login/Register</Link></li>
                <li><Link to='/ContactUsPage' className='no-underline  text-sky-800  hover:text-yellow-900 transition duration-150 ease-in-out'>Contact Us</Link></li>
            </ul>
        </div>
      </header>
    </div>
  )
}
