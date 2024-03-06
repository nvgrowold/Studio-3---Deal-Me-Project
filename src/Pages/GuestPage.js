
import Header from '../Components/Header'
import React, { useState } from 'react';
import '../Styling/StyleGuestPage.css';

const products = [
  // src/data/products.js
 
   {
     id: 1,
     name: 'Laptop',
     category: 'Computers',
     region: 'Auckland',
     price: 800,
     description: 'High-performance laptop for work and gaming. Comes with a powerful processor, ample RAM, and dedicated graphics.',
   },
   {
     id: 2,
     name: 'Camera',
     category: 'Electronics & photography',
     region: 'Wellington',
     price: 500,
     description: 'Professional DSLR camera with advanced features. Perfect for capturing high-quality photos and videos.',
   },
   {
     id: 3,
     name: 'Gaming Console',
     category: 'Gaming',
     region: 'Christchurch',
     price: 25,
     description: 'Enjoy hours of gaming with this console. Includes popular games and supports multiplayer online gaming.',
   },
   {
     id: 4,
     name: 'Skincare Set',
     category: 'Health & beauty',
     region: 'Hamilton',
     price: 15,
     description: 'Complete skincare set for a radiant complexion. Includes cleanser, toner, moisturizer, and more.',
   },
   {
     id: 5,
     name: 'Sofa',
     category: 'Home & living',
     region: 'Dunedin',
     price: 40,
     description: 'Comfortable and stylish sofa for your living room. Made with high-quality materials for durability.',
   },
   {
     id: 6,
     name: 'Wristwatch',
     category: 'Jewellery & watches',
     region: 'Tauranga',
     price: 35,
     description: 'Elegant wristwatch with a classic design. Perfect for both casual and formal occasions.',
   },
   {
     id: 7,
     name: 'Smartphone',
     category: 'Mobile phones',
     region: 'Palmerston North',
     price: 50,
     description: 'Latest smartphone with advanced features. Capture stunning photos, enjoy fast performance, and more.',
   },
   {
     id: 8,
     name: 'Musical Instrument Set',
     category: 'Music & instruments',
     region: 'Napier-Hastings',
     price: 45,
     description: 'Complete set of musical instruments for aspiring musicians. Includes guitar, keyboard, and more.',
   },
   {
     id: 9,
     name: 'Pet Care Kit',
     category: 'Pets & animals',
     region: 'Hamilton',
     price: 25,
     description: 'Essential kit for pet care. Includes grooming tools, toys, and treats for your furry friend.',
   },
   {
     id: 10,
     name: 'Sports Equipment Bundle',
     category: 'Sports',
     region: 'Auckland',
     price: 60,
     description: 'Stay active with this sports equipment bundle. Includes items for various sports and activities.',
   },
   {
     id: 11,
     name: 'Toy Collection',
     category: 'Toys & models',
     region: 'Wellington',
     price: 30,
     description: 'Assortment of toys for kids of all ages. Encourage creativity and play with this diverse collection.',
   },
   {
     id: 12,
     name: 'Vintage Collectibles',
     category: 'Trade Me Marketplace listings',
     region: 'Christchurch',
     price: 20,
     description: 'Unique vintage collectibles from various sellers on Trade Me Marketplace. Discover hidden treasures.',
   },
   // Add more products as needed
 ];
 
 
 
   // Your product data

export default function GuestPage  ({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    const allCategories = [...new Set(products.map(product => product.category))];
    const allRegions = [...new Set(products.map(product => product.region))];
  
    const handleCategoryChange = (e) => {
      setSelectedCategory(e.target.value);
    };
  
    const handleRegionChange = (e) => {
      setSelectedRegion(e.target.value);
    };
  
    const handleMinPriceChange = (e) => {
      setMinPrice(e.target.value);
    };
  
    const handleMaxPriceChange = (e) => {
      setMaxPrice(e.target.value);
    };
  
    const handleSearchKeywordChange = (e) => {
      setSearchKeyword(e.target.value);
    };
  
    const handleFilterClick = () => {
      const newFilteredProducts = products.filter(product => (
        (selectedCategory === '' || product.category === selectedCategory) &&
        (selectedRegion === '' || product.region === selectedRegion) &&
        (minPrice === '' || parseFloat(product.price) >= parseFloat(minPrice)) &&
        (maxPrice === '' || parseFloat(product.price) <= parseFloat(maxPrice)) &&
        (searchKeyword === '' || product.name.toLowerCase().includes(searchKeyword.toLowerCase()))
      ));
  
      setFilteredProducts(newFilteredProducts);
    };
  return (
    <div className='dealsBody'>
      <Header/>
      <h1>GuestPage</h1>
      <p>Harikash testing</p>
      <div className="filter-section">
          <div>
            <label>Filter by Category:</label>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
  
          <div>
            <label>Filter by Region:</label>
            <select value={selectedRegion} onChange={handleRegionChange}>
              <option value="">All Regions</option>
              {allRegions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
  
          <div>
            <label>Price Range:</label>
            <input type="number" placeholder="Min Price" value={minPrice} onChange={handleMinPriceChange} />
            <span>-</span>
            <input type="number" placeholder="Max Price" value={maxPrice} onChange={handleMaxPriceChange} />
          </div>
  
          <div>
            <label>Search by Keyword:</label>
            <input type="text" placeholder="Enter keyword" value={searchKeyword} onChange={handleSearchKeywordChange} />
          </div>
  
          <button onClick={handleFilterClick}>Filter</button>
        </div>
  
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Region: {product.region}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
    </div>

  )
}
