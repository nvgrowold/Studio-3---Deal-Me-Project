import { BrowserRouter,Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import toastify for error notifications
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


//import all pages
import AdminDashboard from "./Pages/AdminDashboard";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import BuyerDashboard from "./Pages/BuyerDashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import GuestPage from "./Pages/GuestPage";
import SellerDashboard from "./Pages/SellerDashboard";
import Register from "./Pages/Register";
import ContactUsPage from "./Pages/ContactUsPage";
import UserProfilePage from "./Pages/UserProfilePage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Homepage/>}/>
          <Route exact path='/AdminDashboard' element={<AdminDashboard/>}/>
          <Route exact path='/BuyerDashboard' element={<BuyerDashboard/>}/>
          <Route exact path='/ContactUsPage' element={<ContactUsPage/>}/>
          <Route exact path='/ForgotPassword' element={<ForgotPassword/>}/>
          <Route exact path='/GuestPage' element={<GuestPage/>}/>
          <Route exact path='/Login' element={<Login/>}/>
          <Route exact path='/SellerDashboard' element={<SellerDashboard/>}/>
          <Route exact path='/Register' element={<Register/>}/>
          <Route exact path='/UserProfilePage' element={<UserProfilePage/>}/>
        </Routes>
      </BrowserRouter>
      {/* React-toastify for every pages, also need to import the toastify css file as well  */}
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
    </div>
  );
}

export default App;
