import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Header from '../../Components/Header';
import SideNav from '../SideNav';



const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    // Fetch statistics data from your backend API
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      // Simulating fetching statistics data from backend
      
      const simulatedStatistics = {
        totalUsers: 1000,
        totalProducts: 500,
        totalSales: 10000,
        portfolioPerformance: 75, // percentage
        technicalSupportTickets: 25,
        monthlySales: 5000,
        totalDeposits: 25000,
        totalEmails: 2000,
        totalAccounts: 150,
      };
      setStatistics(simulatedStatistics);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
    
    <Header/>
    <SideNav/>
    <div className='page__main'>
      <h3 className="pageTitle">Dashboard</h3>
      {statistics ? (
        <div className="statistics-container">
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
          <div className="statistic-box">
            <h3>Technical Support Tickets</h3>
            <p>{statistics.technicalSupportTickets}</p>
          </div>
          <div className="statistic-box">
            <h3>Monthly Sales</h3>
            <p>${statistics.monthlySales}</p>
          </div>
          <div className="statistic-box">
            <h3>Total Deposits</h3>
            <p>${statistics.totalDeposits}</p>
          </div>
          <div className="statistic-box">
            <h3>Total Accounts</h3>
            <p>{statistics.totalAccounts}</p>
          </div>
        </div>
      ) : (
        <p>Loading statistics...</p>
      )}
    </div>
    </div>
  );
};

export default Dashboard;
