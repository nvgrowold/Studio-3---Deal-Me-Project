import React from 'react';
//import './User.css';

const Users = () => {
  // Dummy data for administrators
  const administrators = [
      { id: 1, name: 'John Doe', position: 'CEO', city: 'Auckland', picture: 'john.jpg' },
      { id: 2, name: 'Jane Smith', position: 'CTO', city: 'Wellington', picture: 'jane.jpg' },
      { id: 3, name: 'Alice Johnson', position: 'COO', city: 'Christchurch', picture: 'alice.jpg' },
      { id: 4, name: 'Michael Brown', position: 'CFO', city: 'Hamilton', picture: 'michael.jpg' },
      { id: 5, name: 'Emma Wilson', position: 'Head of HR', city: 'Tauranga', picture: 'emma.jpg' },
      { id: 6, name: 'Daniel Taylor', position: 'Marketing Manager', city: 'Dunedin', picture: 'daniel.jpg' },
      { id: 7, name: 'Olivia Anderson', position: 'Sales Director', city: 'Palmerston North', picture: 'olivia.jpg' },
      { id: 8, name: 'Liam Martin', position: 'Operations Manager', city: 'Napier', picture: 'liam.jpg' },
    
    // Add more administrators here
  ];

  return (
    <div className='page__main'>
      <h1>Users</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {administrators.map(admin => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.position}</td>
              <td>{admin.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
