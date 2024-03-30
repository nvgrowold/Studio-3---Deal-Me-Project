import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import SideNav from '../SideNav';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../firebase';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalListings, setTotalListings] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalSalesRevenue, setTotalSalesRevenue] = useState(0);
  const [averageSalesRevenue, setAverageSalesRevenue] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch total users
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);
        const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTotalUsers(usersSnapshot.size);
        setUsers(usersData);

        // Fetch total listings
        const listingsRef = collection(db, "listings");
        const listingsSnapshot = await getDocs(listingsRef);
        setTotalListings(listingsSnapshot.size);

        // Fetch total orders from order items
        const orderItemsRef = collection(db, "orderitems");
        const orderItemsSnapshot = await getDocs(orderItemsRef);
        setTotalOrders(orderItemsSnapshot.size);

        // Calculate total sales revenue and average sales revenue
        let totalRevenue = 0;
        orderItemsSnapshot.forEach(doc => {
          const orderitemsData = doc.data();
          totalRevenue += orderitemsData.price * orderitemsData.quantity;
        });
        setTotalSalesRevenue(totalRevenue);
        if (orderItemsSnapshot.size > 0) {
          const averageRevenue = totalRevenue / orderItemsSnapshot.size;
          setAverageSalesRevenue(averageRevenue);
        } else {
          setAverageSalesRevenue(0);
        }

        // Fetch recent activities
        const activitiesRef = collection(db, "users");
        const activitiesSnapshot = await getDocs(activitiesRef);
        const recentActivitiesData = activitiesSnapshot.docs.map(doc => {
          const userData = doc.data();
          return {
            id: doc.id,
            name: userData.name,
            activity: userData.isLoggedIn ? 'Active' : 'Away'
          };
        });
        setRecentActivities(recentActivitiesData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <SideNav /> 
      <div className="dashboard-container" style={{ marginLeft: '13%', textAlign: 'center' }}>
        <div className="statistics-box">
          <h1 className="dashboard-heading">Dashboard</h1>
         
          <div className="card statistics-item">
            <h2>Total Users</h2>
            <p>{loading ? 'Loading...' : totalUsers}</p>
          </div>
          <div className="card statistics-item">
            <h2>Total Listings</h2>
            <p>{loading ? 'Loading...' : totalListings}</p>
          </div>
          <div className="card statistics-item">
            <h2>Total Orders</h2>
            <p>{loading ? 'Loading...' : totalOrders}</p>
          </div>
          {/* <div className="card statistics-item">
            <h2>Total Sales Revenue</h2>
            <p>{loading ? 'Loading...' : totalSalesRevenue}</p>
          </div>
          <div className="card statistics-item">
            <h2>Average Sales Revenue</h2>
            <p>{loading ? 'Loading...' : averageSalesRevenue}</p>
          </div>
          {/* Add more statistics items as needed */}
        </div>
        
        <div className="activities-container">
          <h2 className="activities-heading">Recent Activities</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="activities-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{activity.name}</td>
                    <td>{activity.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="users-container">
          <h2 className="users-heading">Users</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
