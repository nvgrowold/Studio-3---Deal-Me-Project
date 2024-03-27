import React, { useEffect } from 'react';
import Header from '../../Components/Header';
import SideNav from '../SideNav';
import Chart from 'chart.js/auto';
import './Analytics.css';

const Analytics = () => {
  useEffect(() => {
    // Call function to create pie chart
    createPieChart();
  }, []);

  const createPieChart = () => {
    const ctx = document.getElementById('userPieChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['New Zealand', 'Figi', 'Australia'],
        datasets: [{
          label: 'User Distribution',
          data: [500, 300, 400],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  };

  return (
    <div className="admin-dashboard">
      <Header />
      <SideNav />
      <div className="main-content">
        <h2 className="page-title">Analytics</h2>
        <div className="analytics-section">
          <div className="chart-container">
            <canvas id="userPieChart"></canvas>
          </div>
          {/* Add other charts or graphs here */}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
