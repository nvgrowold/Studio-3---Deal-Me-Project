import React from 'react';

//import './App.css';

//Calling Bootstrap 4.5 css
//import 'bootstrap/dist/css/bootstrap.min.css';

//Calling Firebase config setting to call the data
import firebase from './firebase';


class App extends React.Component {

constructor(props) {
    
    super(props);
   
    this.state = {users : []}
    }
    
  componentDidMount() {
   
   
     
      firebase.database().ref("users").on("value", snapshot => {
        let users = [];
        snapshot.forEach(snap => {
            // snap.val() is the dictionary with all your keys/values from the 'students-list' path
            users.push(snap.val());
        });
        this.setState({ users: users });
      });
    
    
 }
  
  render(){
  return (
    
      <div className="container">
          <table id="example" class="display table">
            <thead class="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {this.state.users.map(data => {
                
                return (
                    <tr>     
                    <td>{data.firstName}</td>
                    <td>{data.lastName}</td>
                    <td>{data.email}</td>
                    <td>{data.mobileNumber}</td>
                    </tr>
                    
                );
               
                })}
        
               
            </tbody>
            
         </table>
          
     </div>
    
  );
}
}
export default App;