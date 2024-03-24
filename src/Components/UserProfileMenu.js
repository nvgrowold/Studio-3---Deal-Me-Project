import React from 'react';
import { Link } from 'react-router-dom';

function UserProfileMenu() {
  return (
    <div>
       <section className='lg:ml-40 lg:mt-16 lg:max-w-40'>
              {/* //User Account Page */}
            <div> 
              <p className='text-2xl font-semibold  text-sky-800'>Account Detail</p>

              <div className='mt-5'>
                <p className='text-lg font-semibold text-sky-800'>Buying</p>
                    <p>
                        <Link to='/MyPurchasedItemsPage'className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
                            Items I purchased
                        </Link>
                    </p>
                <Link to='/GuestPage'className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
                  Searching an items
                </Link> 
              </div>

              <div className='mt-5'>
                <p className='text-lg font-semibold text-sky-800'>Selling</p>
                <p>
                    <Link to='/CreateListing' className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
                        Listing an item
                    </Link>  
                </p>

                <p>
                    <Link to='/MyListingsPage ' className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
                        Items I'm selling
                    </Link> 
                </p>

                <Link to='/MySoldItemsPage ' className="mr-6 cursor-pointer  hover:text-sky-950 hover:font-semibold transition duration-150 ease-in-out" style={{ textDecoration: 'none', color:'#64007D' }}>
                    Sold Items
                </Link>

              </div>
            </div>
        </section>

    </div>
  )
}

export default UserProfileMenu
