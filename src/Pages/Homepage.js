// Import React Router
import { Link } from 'react-router-dom';
// Import your components
import Background from "../Components/Background";
import Logo from "../Components/Logo";
// Import icons
import { MdOutlineAdminPanelSettings } from "react-icons/md";

function Homepage() {
    return (
        <>
            <div className='absolute right-6 pt-4 transition-shadow duration-150 ease-in-out hover:shadow-md' title='Admin Login'>
                <Link to='/AdminDashboard'>
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
            </div>
            <Background />
            <Logo />
        </>
    );
}

export default Homepage;
