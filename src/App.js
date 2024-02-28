import { BrowserRouter,Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from "./Homepage/Homepage";
import Login from "./LoginPage/Login";
import ProductPage from "./ProductPage/ProductPage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Homepage/>}/>
          <Route exact path='/LoginPage/Login' element={<Login/>}/>
          <Route exact path='/ProductPage/ProductPage' element={<ProductPage/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
