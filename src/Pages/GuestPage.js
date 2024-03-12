
import Header from '../Components/Header'
import React, { useState, useEffect } from 'react';
import '../Styling/StyleGuestPage.css';
import {collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const ProductList = ({ addToCart }) => {
const [selectedCategory, setSelectedCategory] = useState('');
const [selectedRegion, setSelectedRegion] = useState('');
const [selectedPrice, setSelectedPrice] = useState('');
const [searchTerm, setSearchTerm] = useState('');
const [products, setProducts] = useState([]);
const [filteredProducts, setFilteredProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const querySnapshot = await getDocs(productsCollection);
      const productsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(productsData);
      console.log('Products fetched from Firestore successfully!');
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  fetchProducts();
}, []);

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
  const newFilteredProducts = products.filter(product => {
    return (
      (selectedCategory === '' || product.category === selectedCategory) &&
      (selectedRegion === '' || product.region === selectedRegion) &&
      (selectedPrice === '' || product.price <= parseInt(selectedPrice)) &&
      (searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  setFilteredProducts(newFilteredProducts);
};


return (
  <div>
    <Header/>
    <div className="filter-section">
      <label htmlFor="category">Filter by Category:</label>
      <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
        {/* Options here */}
        <option value="">All Categories</option>
        <option value="Computers">Computers</option>
        <option value="Electronics & photography">Electronics & Photography</option>
        <option value="Gaming">Gaming</option>
        <option value="Health & beauty">Health & Beauty</option>
        <option value="Home & living">Home & Living</option>
        <option value="Jewellery & watches">Jewellery & Watches</option>
        <option value="Mobile phones">Mobile Phones</option>
        <option value="Music & instruments">Music & Instruments</option>
        <option value="Pets & animals">Pets & Animals</option>
        <option value="Sports">Sports</option>
        <option value="Toys & models">Toys & Models</option>
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
        {/* Options here */}
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
        placeholder="Search products"
      />

      <button onClick={handleFilter}>Filter</button>
    </div>
    <div>
      <h2>Filtered Products:</h2>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Region: {product.region}</p>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
};

export default ProductList;
