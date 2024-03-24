import React, { useEffect, useState } from 'react';
import { getUserData } from '../Api';

const User = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserData()
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching customer data:', error));
  }, []);

  return (
    <div>
      <h2>Customer Analytics Report</h2>
      {/* Display customer data */}
    </div>
  );
};

export default User;
