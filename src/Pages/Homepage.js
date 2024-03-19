// Import React Router
import { Link } from 'react-router-dom';
import Logo from "../Components/Logo";
// Import icons
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import pinkBox from '../assets/shopingCart.webm';

function Homepage() {
    return (
        <>
            <div className='absolute right-6 pt-4 transition-shadow duration-150 ease-in-out hover:shadow-md' title='Admin Login'>
                <Link to='/Login'>
                    <MdOutlineAdminPanelSettings className='text-4xl'/>
                </Link>
            </div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 place-items-center w-full max-w-4xl p-4 rounded-lg md:ml-[-24rem]">
                    <div className="flex justify-center">
                        <h3 className="p-10 text-center text-white cursor-pointer bg-transparent shadow-lg hover:bg-gray-200 hover:scale-105 hover:text-purple-300 transition transform duration-200 ease-in-out rounded-md w-44 h-30">
                            <Link to='/Login' className="no-underline text-purple-700">
                                I'm Selling..
                            </Link>
                        </h3>
                    </div>
                    <div className="flex justify-center">
                        <h3 className="p-10 text-center text-white cursor-pointer bg-transparent shadow-lg hover:bg-gray-200 hover:scale-105 hover:text-purple-300 transition transform duration-200 ease-in-out rounded-md w-44 h-30">
                            <Link to='/Login' className="no-underline text-purple-700">
                                I'm Buying..
                            </Link>
                        </h3>
                    </div>
                    <div className="flex justify-center">
                        <h3 className="p-10 text-center text-white cursor-pointer bg-transparent shadow-lg hover:bg-gray-200 hover:scale-105 hover:text-purple-300 transition transform duration-200 ease-in-out rounded-md w-44 h-30">
                            <Link to='/GuestPage' className="no-underline text-purple-700">
                                Have a peek..
                            </Link>
                        </h3>
                    </div>
                </div>

                {/* Slogan */}
                <div className='flex lg:flex-col'>
                    <div className="ml-40 w-full lg:mt-6 lg:ml-20 text-wrap lg:w-1/3 ">
                        <p className="text-white text-xl md:text-2xl font-medium">
                            Find Deals, Unlock Possibilities. '<span className='text-pink-400'>Deal Me</span>' connects savvy buyers with sellers in a marketplace where every deal is an opportunity. Simple, effective, and for everyone.
                        </p>
                    </div> 
                </div>
              
                <Logo />
            </section>

            {/*<Background /> */}
            
        </div>
    );
}

export default Homepage;
