import React from 'react'
//import google icon
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignIn() {
  return (
    <button className='flex item-center justify-center mb-10 w-full bg-slate-500 rounded text-white px-7 py-2 uppercase text-sm font-medium shadow-lg hover:bg-slate-700 transition duration-150 ease-in-out hover:shadow-xl active:bg-slate-800'>
       <FcGoogle className='text-xl bg-white rounded-full mr-2'/>
       Continue with Google
    </button>
  )
}
