<<<<<<< Updated upstream
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
=======
import React, { useState } from 'react';
import Header from '../../Components/Header';
import SideNav from '../SideNav';
import '../AdminNavPages/Report.css';
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';

const Reports = () => {
  const [notes, setNotes] = useState({
    userActivity: '',
    sales: '',
    productInventory: '',
    customerFeedback: ''
  });
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const [date, setDate] = useState(new Date());
  const [reminder, setReminder] = useState('');
  const [reminders, setReminders] = useState([]);
  const handleNoteChange = (reportType, event) => {
    const { value } = event.target;
    setNotes(prevNotes => ({
      ...prevNotes,
      [reportType]: value
    }));
  };

  const saveNotes = () => {
    if (Object.values(notes).some(note => note === '')) {
      setShowEmptyMessage(true);
      setTimeout(() => {
        setShowEmptyMessage(false);
      }, 3000);
    } else {
      console.log('Notes saved:', notes);
      setShowSavedMessage(true);
      setTimeout(() => {
        setShowSavedMessage(false);
      }, 3000);
    }
  };
  const handleReminderChange = (event) => {
    setReminder(event.target.value);
  };

  const addReminder = () => {
    if (reminder) {
      // Logic to save reminder for selected date
      const newReminder = { date: date.toISOString().split('T')[0], note: reminder };
      setReminders([...reminders, newReminder]);
      console.log(`Reminder added for ${date.toISOString().split('T')[0]}: ${reminder}`);
      // Clear input field
      setReminder('');
    } else {
      // Show error message if reminder is not provided
      console.log('Please add a reminder');
    }
  };
  const tileContentFunction = ({ date, view }) => {
    if (view === 'month') {
      const hasReminder = reminders.some(reminder => {
        return reminder.date === date.toISOString().split('T')[0];
      });
      return hasReminder ? <div className="reminder-dot"></div> : null;
    }
  };

  return (
    <div className="admin-dashboard">
      <Header />
      <SideNav />
      <div className="main-content">
        <h2 className="page-title"></h2>
        <div className="reports-section">
          <h3 className="reports-title">Reports Section</h3>
          <div className="report-table-container">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Report Type</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User Activity Report</td>
                  <td>
                    <textarea
                      value={notes.userActivity}
                      onChange={(e) => handleNoteChange('userActivity', e)}
                      rows="4"
                      cols="50"
                      className="report-textarea"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Sales Report</td>
                  <td>
                    <textarea
                      value={notes.sales}
                      onChange={(e) => handleNoteChange('sales', e)}
                      rows="4"
                      cols="50"
                      className="report-textarea"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Product Inventory Report</td>
                  <td>
                    <textarea
                      value={notes.productInventory}
                      onChange={(e) => handleNoteChange('productInventory', e)}
                      rows="4"
                      cols="50"
                      className="report-textarea"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Customer Feedback Report</td>
                  <td>
                    <textarea
                      value={notes.customerFeedback}
                      onChange={(e) => handleNoteChange('customerFeedback', e)}
                      rows="4"
                      cols="50"
                      className="report-textarea"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button onClick={saveNotes} className="save-button">Save Notes</button>
          {showSavedMessage && <div className="popup-message">Notes saved</div>}
          {showEmptyMessage && <div className="popup-message">No notes to be saved</div>}
        </div>
        <div className="calendar-section">
        <h2>Normal Calendar</h2>
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={tileContentFunction}
          />
          <div>
            <h3>Add Reminder</h3>
            <input
              type="date"
              value={date.toISOString().split('T')[0]}
              disabled
            />
            <input
              type="text"
              placeholder="Enter reminder"
              value={reminder}
              onChange={handleReminderChange}
            />
            <button onClick={addReminder}>Add Reminder</button>
          </div>
        </div>
      </div>
    </div>
  );
};
>>>>>>> Stashed changes

export default Reports;