import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Header from '../../Components/Header';
import SideNav from '../SideNav';
import { db } from '../../firebase'; // Import db from your Firebase configuration file

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    id: '',
    name: '',
    email: ''
  });

  useEffect(() => {
    // Fetch statistics data from your backend API
    fetchStatistics();
    // Fetch user data from Firestore
    fetchUsers();
  }, []);

  const fetchStatistics = async () => {
    try {
      const usersSnapshot = await db.collection('users').get();
      const itemsSnapshot = await db.collection('orderitems').get();
      const salesSnapshot = await db.collection('sales').get();

      const totalUsers = usersSnapshot.size;
      const totalProducts = itemsSnapshot.size;
      const totalSales = salesSnapshot.size;

      // Calculate portfolio performance based on your business logic
      const portfolioPerformance = calculatePortfolioPerformance(totalSales, totalProducts);

      setStatistics({
        totalUsers,
        totalProducts,
        totalSales,
        portfolioPerformance
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const calculatePortfolioPerformance = (totalSales, totalProducts) => {
    // Perform calculation here based on your business logic
    return totalSales / totalProducts * 100;
  };

  const fetchUsers = async () => {
    try {
      const usersCollection = await db.collection('users').get();
      const usersData = usersCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await db.collection('users').doc(userId).delete();
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editUser = (user) => {
    setEditing(true);
    setEditedUser(user);
  };

  const saveEditedUser = async () => {
    try {
      await db.collection('users').doc(editedUser.id).update({
        name: editedUser.name,
        email: editedUser.email
      });
      setEditing(false);
      fetchUsers();
    } catch (error) {
      console.error('Error saving edited user:', error);
    }
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditedUser({
      id: '',
      name: '',
      email: ''
    });
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="content-container">
        <SideNav />
        <div className="main-content">
          <h2 className="page-title">Dashboard</h2>
          <div className="statistics-container">
            {statistics ? (
              <>
                <div className="statistic-box">
                  <h3>Total Users</h3>
                  <p>{statistics.totalUsers}</p>
                </div>
                <div className="statistic-box">
                  <h3>Total Products</h3>
                  <p>{statistics.totalProducts}</p>
                </div>
                <div className="statistic-box">
                  <h3>Total Sales</h3>
                  <p>{statistics.totalSales}</p>
                </div>
                <div className="statistic-box">
                  <h3>Portfolio Performance</h3>
                  <p>{statistics.portfolioPerformance}%</p>
                </div>
              </>
            ) : (
              <p>Loading statistics...</p>
            )}
          </div>
          <h3 className="table-title">User Table</h3>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Id</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    {editing && editedUser.id === user.id ? (
                      <input
                        type="text"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {editing && editedUser.id === user.id ? (
                      <input
                        type="text"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {editing && editedUser.id === user.id ? (
                      <>
                        <button className="save-btn" onClick={saveEditedUser}>Save</button>
                        <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="edit-btn" onClick={() => editUser(user)}>Edit</button>
                        <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
