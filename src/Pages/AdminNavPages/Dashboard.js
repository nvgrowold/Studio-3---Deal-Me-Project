import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Header from '../../Components/Header';
import SideNav from '../SideNav';
import StatisticBox from './Infor/StatisticBox';
import CommissionRanking from '../../Components/CommissionRanking';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalListings, setTotalListings] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalSalesRevenue, setTotalSalesRevenue] = useState(0);
  const [averageSalesRevenue, setAverageSalesRevenue] = useState(0);
  const [userCounts, setUserCounts] = useState({});
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);
        const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTotalUsers(usersSnapshot.size);
        setUsers(usersData);

        const listingsRef = collection(db, "listings");
        const listingsSnapshot = await getDocs(listingsRef);
        setTotalListings(listingsSnapshot.size);

        const orderItemsRef = collection(db, "orderitems");
        const orderItemsSnapshot = await getDocs(orderItemsRef);
        setTotalOrders(orderItemsSnapshot.size);

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

        // Fetch user growth data
        const userCountsSnapshot = await getDocs(usersRef);
        const userCountsData = userCountsSnapshot.docs.map(doc => ({
          createdAt: doc.data().createdAt.toDate(), // Assuming you have a 'createdAt' field in your user documents
        }));

        // Count users per month
        const userCountsPerMonth = {};
        userCountsData.forEach(userData => {
          const monthYear = `${userData.createdAt.getMonth() + 1}/${userData.createdAt.getFullYear()}`;
          if (userCountsPerMonth[monthYear]) {
            userCountsPerMonth[monthYear]++;
          } else {
            userCountsPerMonth[monthYear] = 1;
          }
        });

        setUserCounts(userCountsPerMonth);

        // Fetch category data
        const categoryRef = collection(db, "listings");
        const categorySnapshot = await getDocs(categoryRef);
        const categoryData = {};
        categorySnapshot.forEach(doc => {
          const category = doc.data();
          categoryData[doc.id] = category.count; // Assuming you have a 'count' field in your category documents
        });
        setCategoryData(categoryData);

      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const userGrowthChartData = {
    labels: Object.keys(userCounts),
    datasets: [
      {
        label: 'User Growth Over Time',
        data: Object.values(userCounts),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const categoryChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Categories',
        data: Object.values(categoryData),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
      <Header />
      <div className='flex'>
        <div className="w-1/6 min-h-screen shadow-lg">
          <SideNav />
        </div>
        <div className="w-5/6 p-8 mt-8">
          <div className="dashboard-container" style={{ marginLeft: '2%', textAlign: 'center' }}>
            <div className="statistics-box">
              <div className="row">
                <div className="col-md-4">
                  <StatisticBox title="Total Users" value={totalUsers} loading={loading} />
                </div>
                <div className="col-md-4">
                  <StatisticBox title="Total Listings" value={totalListings} loading={loading} />
                </div>
                <div className="col-md-4">
                  <StatisticBox title="Total Orders" value={totalOrders} loading={loading} />
                </div>
                {/* <div className="col-md-3">
                  <StatisticBox title="Sales Revenue" value={`$${totalSalesRevenue.toFixed(2)}`} loading={loading} />
                </div> */}
              </div>
            </div>
            {/* <div className="chart-card" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '48%' }}>
                <ChartCard />
              </div>
              <div style={{ width: '48%' }}>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <Bar data={categoryChartData} />
                )}
              </div>
            </div> */}
            <div className="chart-card shadow-2xl mt-12 mb-12" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className='w-full bg-transparent'>
                <CommissionRanking />
              </div>
            </div>
            {/* <div className="row shadow-xl mt-30"> Adjust margin top as needed */}
              {/* <div className="col-md-6 shadow-2xl">
                <div className="activities-container" style={{ paddingRight: '10px', marginRight: '5px' }}> {/* Adjust right margin */}
                  {/* <h2 className="activities-heading text-center text-lg font-medium pt-6">Recent Activities</h2>
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <table className="activities-table items-center ml-28">
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
              </div> */}
              <div className="shadow-2xl">
                <div className="users-container" style={{ paddingLeft: '5px', marginLeft: '10px' }}> {/* Adjust left margin */}
                  <h2 className="users-heading text-center text-lg font-medium pt-6">List of Users</h2>
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <table className="w-full px-3">
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
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
