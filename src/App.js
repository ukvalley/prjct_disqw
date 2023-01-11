import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Main from './components/Main/Main';
import Customer_Main from './components/Customer_Main/Customer_Main';
import Vendor_Main from './components/Vendor_Main/Vendor_Main';
import BusinessUser from './components/BusinessUser/BusienssUser'

import Login from './components/Customer/login/Login';
import Register from './components/Customer/login/Register';
import Forget  from './components/Customer/login/Forget';
import ChangePassword  from './components/Customer/login/ChangePassword';


import Vendor_Login from './components/Vendor/login/Vendor_Login';
import Vendor_Register from './components/Vendor/login/Vendor_Register';

function App() {
  const [token, setToken] = useState();

  return (

    <Router>
      <Routes>
        <Route exact path='/*' element={< Main />}></Route>  
        <Route exact path='/Customer_Main/*' element={< Customer_Main />}></Route> 
        <Route exact path='/BusinessUser/*' element={< BusinessUser />}></Route> 
        <Route exact path='/Vendor_Main/*' element={< Vendor_Main />}></Route>
        <Route exact path='/login' element={< Login />}></Route>
        <Route exact path='/Register' element={< Register />}></Route> 
        <Route exact path='/Forget' element={< Forget />}></Route> 
        <Route exact path='/ChangePassword' element={< ChangePassword />}></Route> 
        
        <Route exact path='/Vendor_Login' element={< Vendor_Login />}></Route>
        <Route exact path='/Vendor_Register' element={< Vendor_Register />}></Route> 
      </Routes>
    </Router>

  );
}

export default App;
