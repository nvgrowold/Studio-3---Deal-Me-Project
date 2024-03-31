import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartCard = ({ frequentlyPurchasedData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    let myChart;

    if (frequentlyPurchasedData && frequentlyPurchasedData.length > 0) {
      const labels = frequentlyPurchasedData.map(item => item.itemName);
      const data = frequentlyPurchasedData.map(item => item.quantity);

      myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Quantity',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    }

    return () => {
      // Clean up chart instance when component unmounts
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [frequentlyPurchasedData]);

  return (
    <div className="card">
      <div className="card-header">Frequently Purchased Items</div>
      <div className="card-body">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ChartCard;
