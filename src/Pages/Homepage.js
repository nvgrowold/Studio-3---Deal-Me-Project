// Import React Router
import { Link } from 'react-router-dom';
import Logo from "../Components/Logo";
// Import icons
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import pinkBox from '../assets/shopingCart.webm';

function Homepage() {
    return (
        <div className="relative w-full h-screen"> {/* Container with relative positioning */}
            {/* make the very very light black cover above the video to make video a bit darker for better showing the text content*/}
            <div className="overlay absolute top-0 left-0 w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,.3)' }}></div>
            <video src={pinkBox} autoPlay loop muted className='w-full h-full object-cover'/>
            <section className="absolute top-0 left-0 w-full h-full flex items-center justify-center"> {/*make this section sit on top of the video */}
                <div className='absolute right-6 top-6 pt-4 transition-shadow duration-150 ease-in-out hover:shadow-lg' title='Admin Login'>
                    <Link to='/Login'>
                        <MdOutlineAdminPanelSettings className='text-5xl' color='white'/>
                    </Link>
                </div>
                <div className="flex items-center justify-center ml-6 lg:absolute lg:top-24 lg:left-0 lg:p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-40 lg:gap-x-20 place-items-start w-full max-w-4xl p-4 rounded-lg">
                        <div className="flex justify-center">
                            <h3 className="p-10 text-center text-white cursor-pointer bg-transparent shadow-lg hover:bg-gray-200 hover:scale-110 hover:text-purple-800 transition transform duration-200 ease-in-out rounded-md w-44 h-30">
                                <Link to='/Login' className="no-underline text-white">
                                    I'm Selling..
                                </Link>
                            </h3>
                        </div>
                        <div className="flex justify-center">
                            <h3 className="p-10 text-center text-white cursor-pointer bg-transparent shadow-lg hover:bg-gray-200 hover:scale-110 hover:text-purple-800 transition transform duration-200 ease-in-out rounded-md w-44 h-30">
                                <Link to='/Login' className="no-underline text-white">
                                    I'm Buying..
                                </Link>
                            </h3>
                        </div>
                        <div className="flex justify-center">
                            <h3 className="p-10 text-center text-white cursor-pointer bg-transparent shadow-lg hover:bg-gray-200 hover:scale-110 hover:text-purple-800 transition transform duration-200 ease-in-out rounded-md w-44 h-30">
                                <Link to='/GuestPage' className="no-underline text-white">
                                    Have a peek..
                                </Link>
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Slogan */}
                <div className='flex lg:flex-col'>
                    <div className="ml-40 w-full lg:mt-6 lg:ml-20 text-wrap lg:w-1/3 ">
                        <p className="text-white text-xl md:text-2xl font-medium">
                            Find Deals, Unlock Possibilities. '<span className='text-teal-500'>Deal Me</span>' connects savvy buyers with sellers in a marketplace where every deal is an opportunity. Simple, effective, and for everyone.
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
