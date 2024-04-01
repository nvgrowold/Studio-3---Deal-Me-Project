import { BrowserRouter,Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import toastify for error notifications
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//All pages
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import GuestPage from "./Pages/GuestPage";
import Register from "./Pages/Register";
import ContactUsPage from "./Pages/ContactUsPage";
import UserProfilePage from "./Pages/UserProfilePage";
import VerifyUser from "./Pages/VerifyUserPage";
import MyListingsPage from "./Pages/MyListingsPage";
import CreateListing from "./Pages/CreateListing";
import EditListing from "./Pages/EditListing";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";

//import AdminDashboard stuff
import AdminPage from "./Pages/AdminPage";
import Inventory from "./Pages/AdminNavPages/Inventory";
import AdminDashboard from "./Pages/AdminDashboard";
import Reports from "./Pages/AdminNavPages/Reports";
import Settings from "./Pages/AdminNavPages/Settings";

//private route for user UserProfilePage protection
import PrivateRoute from "./Components/PrivateRoute";
import Deal from "./Components/Deal";
import MyPurchasedItemsPage from "./Pages/MyPurchasedItemsPage";
import MySoldItemsPage from "./Pages/MySoldItemsPage";
import PrivateRouteAdmin from "./Components/PrivateRouteAdmin";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* *************Guest Role, Admin Role and User role's route******************* */}
          <Route exact path='/' element={<Homepage/>}/>
          <Route exact path='/AdminDashboard' element={<AdminDashboard/>}/>
          <Route exact path='/ContactUsPage' element={<ContactUsPage/>}/>
          <Route exact path='/ForgotPassword' element={<ForgotPassword/>}/>
          <Route exact path='/GuestPage' element={<GuestPage/>}/>
          <Route exact path='/Login' element={<Login/>}/>
          <Route exact path='/Register' element={<Register/>}/>     
          <Route exact path='/category/:categoryName/:listingID' element={<Deal/>}/>
          {/* <Route exact path='/order/:orderId' element={<OrderDetailPage/>}/> */}

          {/* ************User role's private path ***************************/}
          {/* user profile protection route */}
          <Route path="/UserProfilePage" element={<PrivateRoute />}>
            <Route path="/UserProfilePage" element={<UserProfilePage />} />
          </Route>
          {/* private route for VerifyUser page, only after login could upload passport or driving lisence image for verification to be able to create listing*/}
          <Route path="/VerifyUser" element={<PrivateRoute />}>
             <Route path="/VerifyUser" element={<VerifyUser />} />
          </Route>          
          {/* private route for CreateListing, only after login could create listing*/}
          <Route path="/CreateListing" element={<PrivateRoute />}>
            <Route path="/CreateListing" element={<CreateListing />} />
          </Route>
          {/* private route for EditListing, according to listingID to target the right listing. Only after login could edit listing*/}
          <Route path="/edit-listing" element={<PrivateRoute />}>
            <Route path="/edit-listing/:listingID" element={<EditListing />} />
          </Route>
          {/* private route for MyListingsPage, only after login could view my listing*/}
          <Route path="/MyListingsPage" element={<PrivateRoute />}>
            <Route path="/MyListingsPage" element={<MyListingsPage />} />
          </Route>
          {/* private route for ItemsPurchased Page, only after login could view my listing*/}
          <Route path="/MyPurchasedItemsPage" element={<PrivateRoute />}>
            <Route path="/MyPurchasedItemsPage" element={<MyPurchasedItemsPage />} />
          </Route>
          {/* private route for Sold Items Page, only after login could view my listing*/}
          <Route path="/MySoldItemsPage" element={<PrivateRoute />}>
           <Route path="/MySoldItemsPage" element={<MySoldItemsPage />} />
          </Route>
          {/* private route for Cart Page, only after login could view my listing*/}
          <Route path="/Cart" element={<PrivateRoute />}>
           <Route path="/Cart" element={<CartPage />} />
          </Route>
          {/* private route for Cart Page, only after login could view my listing*/}
          <Route path="/CheckoutPage" element={<PrivateRoute />}>
           <Route path="/CheckoutPage" element={<CheckoutPage />} />
          </Route>

          {/**********************Admin Role: protected route for Admin Pages below *******************************************************************/}
          {/* private route for AdminDashboard, only after login could create listing*/}
          <Route path="/AdminDashboard" element={<PrivateRouteAdmin />}>
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          </Route>
          {/* private route for Report, only after login could create listing*/}
          <Route path="/Reports" element={<PrivateRouteAdmin />}>
          <Route path="/Reports" element={<Reports />} />
          </Route>
          {/* private route for AdminPage, only after login could create listing*/}
          <Route path="/AdminPage" element={<PrivateRouteAdmin />}>
          <Route path="/AdminPage" element={<AdminPage />} />
          </Route>
          {/* private route for Inventory, only after login could create listing*/}
          <Route path="/Inventory" element={<PrivateRouteAdmin />}>
          <Route path="/Inventory" element={<Inventory />} />
          </Route>
          {/* private route for Settings, only after login could create listing*/}
          <Route path="/Settings" element={<PrivateRouteAdmin />}>
          <Route path="/Settings" element={<Settings />} />
          </Route>

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
