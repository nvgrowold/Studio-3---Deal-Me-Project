import React, { useEffect, useState } from 'react';
import { getSalesData } from '../AdminNavPages/Api';

const Sales = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    getSalesData()
      .then(data => setSalesData(data))
      .catch(error => console.error('Error fetching sales data:', error));
  }, []);

  return (
    <div>
      <h2>Sales Performance Report</h2>
      {/* Display sales data */}
    </div>
  );
};

export default Sales;
