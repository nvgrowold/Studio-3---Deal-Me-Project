import { BrowserRouter,Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

//import all pages
import AdminDashboard from "./Components/AdminDashboard";
import Homepage from "./Components/Homepage";
import Login from "./Components/Login";
import BuyerDashboard from "./Components/BuyerDashboard";
import ForgotPassword from "./Components/ForgotPassword";
import GuestPage from "./Components/GuestPage";
import SellerDashboard from "./Components/SellerDashboard";
import Register from "./Components/Register";
import ContactUsPage from "./Components/ContactUsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Homepage/>}/>
          <Route exact path='/Components/AdminDashboard' element={<AdminDashboard/>}/>
          <Route exact path='/Components/BuyerDashboard' element={<BuyerDashboard/>}/>
          <Route exact path='/Components/ContactUsPage' element={<ContactUsPage/>}/>
          <Route exact path='/Components/ForgotPassword' element={<ForgotPassword/>}/>
          <Route exact path='/Components/GuestPage' element={<GuestPage/>}/>
          <Route exact path='/Components/Login' element={<Login/>}/>
          <Route exact path='/Components/SellerDashboard' element={<SellerDashboard/>}/>
          <Route exact path='/Components/Register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
