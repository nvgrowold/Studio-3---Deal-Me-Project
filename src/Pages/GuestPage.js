// ProductList.js


import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import '../Styling/StyleGuestPage.css';
import { collection, query, getDocs, orderBy } from 'firebase/firestore'; 
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import cart from "../assets/cart-shopping-solid.svg";
import ListingItem from '../Components/ListingItem'; 
import { getAuth } from 'firebase/auth';

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

  const auth = getAuth();

  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"));
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
    cart.push(listing);
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
    <div>
      <Header />
      <div className="filter-section">
        <label htmlFor="category">Filter by Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
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
        </select>

        <label htmlFor="region">Filter by Region:</label>
        <select id="region" value={selectedRegion} onChange={handleRegionChange}>
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

        <label htmlFor="price">Filter by Price:</label>
        <input
          type="number"
          id="price"
          value={selectedPrice}
          onChange={handlePriceChange}
          placeholder="Enter max price"
        />

        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search listings"
        />

        <button onClick={handleFilter}>Filter</button>

        <Link to="/Cart">
          <img src={cart} className='cart-logo' alt="Cart" />
          ({cartLength})
        </Link>
      </div>

      <div>
        <h2>Filtered Listings:</h2>
        {!loading && listings.length > 0 && (
          <>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {filteredListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  addToCart={() => addToCart(listing.data)}
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
