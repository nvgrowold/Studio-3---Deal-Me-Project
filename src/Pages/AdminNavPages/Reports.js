<<<<<<< HEAD
import React, { useState } from 'react';
import Header from '../../Components/Header';
import SideNav from '../SideNav';
import { db } from '../../firebase'; // Import the Firebase instance with Firestore
import '../AdminNavPages/Report.css';
import Calendar from 'react-calendar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reports = () => {
  const [notes, setNotes] = useState({
    userActivity: '',
    sales: '',
    productInventory: '',
    customerFeedback: ''
  });
  const [date, setDate] = useState(new Date());
  const [reminder, setReminder] = useState('');
  const [reminders, setReminders] = useState([]);
=======
import React from 'react'
import Header from '../../Components/Header'
import SideNav from '../SideNav'

const Reports = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
    <Header/>
    <SideNav/>
    <div className='pageTitle'>
        <h1> Reports</h1>
        
    </div>
    </div>
  )
}
>>>>>>> main

  const handleNoteChange = (reportType, event) => {
    const { value } = event.target;
    setNotes(prevNotes => ({
      ...prevNotes,
      [reportType]: value
    }));
  };

  const saveNotes = async () => {
    // Check if any note is empty
    if (Object.values(notes).some(note => note === '')) {
      toast.error('Please fill in all the notes!');
    } else {
      try {
        // Save notes to Firestore
        await db.collection('Reports').add({
          userActivity: notes.userActivity,
          sales: notes.sales,
          productInventory: notes.productInventory,
          customerFeedback: notes.customerFeedback,
          timestamp: new Date()
        });
        toast.success('Notes saved successfully!');
        setNotes({
          userActivity: '',
          sales: '',
          productInventory: '',
          customerFeedback: ''
        });
      } catch (error) {
        toast.error('Error saving notes: ' + error.message);
      }
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
      toast.info(`Reminder added for ${date.toISOString().split('T')[0]}: ${reminder}`);
      // Clear input field
      setReminder('');
    } else {
      // Show error message if reminder is not provided
      toast.error('Please add a reminder');
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
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
      <Header />
      <div className='flex'>
          <div className="w-1/6 min-h-screen shadow-lg">
              <SideNav />
          </div>
          <div className="w-5/6 p-8">
      <div className="main-content">
        <h2 className="page-title"></h2>
        <div className="reports-section">
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
    </div>
    </div>
  );
};

export default Reports;
