import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import '../Styling/StyleGuestPage.css';
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore'; 
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import ListingItem from '../Components/ListingItem'; 
import { FaCartShopping } from "react-icons/fa6";
import OfferSlider from '../Components/OfferSlider';

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredlistings] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef,where("status", "==", "available"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      let listings = [];
      querySnapshot.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setFilteredlistings(listings);
      setLoading(false);
    }
    fetchListings();
  }, []);

  const addToCart = (listing) => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      // Include the listing ID along with the data
    const cartItem = {
      id: listing.id, // This assumes listing includes the id. If not, adjust accordingly.
      data: listing,
     };
    cart.push(cartItem);
   // cart.push(listing);

    sessionStorage.setItem('cart', JSON.stringify(cart));
    setCartLength(cart.length);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = () => {
    const newFilteredlistings = listings.filter(listing => {
      return (
        (selectedCategory === '' || listing.data.category === selectedCategory) &&
        (selectedRegion === '' || listing.data.region === selectedRegion) &&
        (selectedPrice === '' || listing.data.price <= parseInt(selectedPrice)) &&
        (searchTerm === '' || listing.data.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

    setFilteredlistings(newFilteredlistings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
      <Header />
      <OfferSlider/>
      <div className="filter-section">
        <div>
          <label htmlFor="category" className='text-base xl:ml-10 font-semibold'>Filter by Category</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange} className='text-sm rounded-lg border-separate bg-transparent'>
          <option value="">All Categories</option>
          <option value="Computers">Computers</option>
          <option value="Electronics & Photography">Electronics & Photography</option>
          <option value="Gaming">Gaming</option>
          <option value="Health & Beauty">Health & Beauty</option>
          <option value="Home & Living">Home & Living</option>
          <option value="Jewellery & Watches">Jewellery & Watches</option>
          <option value="Mobile Phones">Mobile Phones</option>
          <option value="Music & Instruments">Music & Instruments</option>
          <option value="Pets & Animals">Pets & Animals</option>
          <option value="Sports">Sports</option>
          <option value="Toys & Models">Toys & Models</option>
          <option value="Books">Books</option>
        </select>
        </div>
        
        <div>
          <label htmlFor="region" className='text-base font-semibold'>Region</label>
        <select id="region" value={selectedRegion} onChange={handleRegionChange} className='text-sm rounded-lg  border-separate bg-transparent'>
          <option value="">All Regions</option>
          <option value="Auckland">Auckland</option>
          <option value="Christchurch">Christchurch</option>
          <option value="Palmerston North">Palmerston North</option>
          <option value="Wellington">Wellington</option>
          <option value="Tauranga">Tauranga</option>
          <option value="Hamilton">Hamilton</option>
          <option value="Dunedin">Dunedin</option>
          <option value="Napier-Hastings">Napier-Hastings</option>
        </select>
        </div>
        
        <div>
          <label htmlFor="price" className='text-base font-semibold'>Price</label>
          <input
            type="number"
            id="price"
            value={selectedPrice}
            onChange={handlePriceChange}
            placeholder="Enter max price"
            className='text-sm rounded-lg  border-separate bg-transparent'
          />
        </div>

        <div>
          <label htmlFor="search" className='text-base font-semibold'>Key Words</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search listings"
            className='text-sm rounded-lg  border-separate bg-transparent'
          />
        </div>


        <button onClick={handleFilter} className='text-base bg-teal-400 border-none font-semibold h-10 w-16 hover:scale-105 transition-scale duration-200 ease-in-out'>Filter</button>

        <div className='ml-10 mt-2 hover:scale-125 transition-scale duration-200 ease-in-out'>
          <Link to="/Cart" className='text-purple-400' style={{ fontSize: '2rem' }}>
          <FaCartShopping className='cursor-pointer' />
        </Link>
        </div>

      </div>        


      <div>
        {!loading && listings.length > 0 && (
          <>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mr-6">
              {filteredListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  addToCart={() => addToCart({id: listing.id, data: listing.data})} // Pass the entire listing object
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
