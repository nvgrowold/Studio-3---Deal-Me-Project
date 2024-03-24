import React, { useEffect, useState } from 'react';
import { getInventoryData } from './Api';

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    getInventoryData()
      .then(data => setInventoryData(data))
      .catch(error => console.error('Error fetching inventory data:', error));
  }, []);

  return (
    <div>
      <h2>Inventory Management Report</h2>
      {/* Display inventory data */}
    </div>
  );
};

export default Inventory;
