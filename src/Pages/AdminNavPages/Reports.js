 import React, { useEffect,useRef, useState } from 'react';
import Header from '../../Components/Header'
import SideNav from '../SideNav'
import Chart from'chart.js/auto'
const Reports = () => {

  const [totalSales, setTotalSales] = useState(0);
  const [numOrders, setNumOrders] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchSalesData = async () => {
      // Example data, replace with your actual data fetching logic
      const salesData = {
        totalSales: 5000,
        numOrders: 100
      };

      setTotalSales(salesData.totalSales);
      setNumOrders(salesData.numOrders);

      if (chartRef.current !== null) {
        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Sales Trend',
              data: [1000, 1500, 2000, 2500, 3000, 3500],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    };
    fetchSalesData();
  }, []);
  
  return (
    <>
    <Header/>
    <SideNav/>
    <div className='pageTitle'>
        <h1> Reports</h1>
        <h2>Sales Report</h2>
      <p>Total Sales: ${totalSales}</p>
      <p>Number of Orders: {numOrders}</p>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
    </>
  )
}

export default Reports;