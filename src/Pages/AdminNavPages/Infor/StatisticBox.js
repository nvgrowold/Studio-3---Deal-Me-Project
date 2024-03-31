// StatisticBox.js
import React from 'react';

const StatisticBox = ({ title, value, loading }) => {
  const cardTitleSize = title === 'Total Sales Revenue' ? '1.5rem' : '1.2rem';
  const cardValueSize = title === 'Total Sales Revenue' ? '1.5rem' : '1.2rem';

  return (
    <div className="card shadow-lg bg-transparent border-transparent mb-4">
      <div className="card-body">
        <h5 className="card-title text-primary fw-bold mb-4" style={{ fontSize: cardTitleSize }}>{title}</h5>
        <p className="card-text text-dark fw-bold" style={{ fontSize: cardValueSize }}>{loading ? 'Loading...' : value}</p>
      </div>
    </div>
  );
};

export default StatisticBox;
