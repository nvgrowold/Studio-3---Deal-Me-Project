import React, { useState } from 'react';
import './MiniCalendar.css'; // Import CSS for styling

const MiniCalendar = () => {
  // Get current date
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // Function to handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Implement logic to handle date selection
  };

  // Function to generate days of the month
  const generateDaysOfMonth = () => {
    const days = [];
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDay = firstDayOfMonth.getDay(); // Day of the week (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
    const totalDays = lastDayOfMonth.getDate();

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      days.push(
        <div
          key={i}
          className={`day ${date.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    // Add empty slots for the days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.unshift(<div key={`empty-${i}`} className="empty"></div>);
    }

    return days;
  };

  return (
    <div className="mini-calendar">
      <div className="month">
        <span>{selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}</span>
      </div>
      <div className="days">
        <div className="day-header">Sun</div>
        <div className="day-header">Mon</div>
        <div className="day-header">Tue</div>
        <div className="day-header">Wed</div>
        <div className="day-header">Thu</div>
        <div className="day-header">Fri</div>
        <div className="day-header">Sat</div>
        {generateDaysOfMonth()}
      </div>
    </div>
  );
};

export default MiniCalendar;
