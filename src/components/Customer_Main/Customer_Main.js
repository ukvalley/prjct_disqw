import React, { useState,useEffect,useRef } from "react";
import './Customer_Main.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,useNavigate
} from 'react-router-dom';

import Header from '../Customer/Header/Header';
import Navbar from '../Customer/Navbar/Navbar';
import Dashboard from '../Customer/dashboard/Dashboard';
import My_booking from '../Customer/dashboard/My_booking';
import My_wishlist from '../Customer/dashboard/My_wishlist';
import Notification from '../Customer/dashboard/Notification';
import Todolist from '../Customer/dashboard/Todolist';
import Wallet from '../Customer/Wallet/Wallet';
import PayScanner from '../Customer/PayScanner/PayScanner';
import Payment from '../Customer/Payment/Payment';
import Customer_Venodor_Pay from '../Customer/Customer_Venodor_Pay/Customer_Venodor_Pay';
import Payment_Success from '../Customer/Payment_Success/Payment_Success';
import Payment_Failed from '../Customer/Payment_Failed/Payment_Failed';
import Paid_Transaction from '../Customer/Paid_Transaction/Paid_Transaction';
import Discount from '../Customer/Discount/Discount';
import Affiliate from '../Customer/Affiliate/Affiliate';
import Profile from '../Customer/Profile/Profile';
import Customer_Registration from '../Customer/Customer_Registration/Customer_Registration';
import Edit_Customer from '../Customer/Edit_Customer/Edit_Customer';
import Payment_Details from '../Customer/Payment_Details/Payment_Details';



const Customer_Main = () => {
  const navigate = useNavigate();

  const [menuCollapse, setMenuCollapse] = useState(true)

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
 

  useEffect(() => {
    checkUser();             
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", Clickout);
    return () => {
      document.removeEventListener("mousedown", Clickout);
    };
  }, []);

  const ref = useRef(null);

  const Clickout = (eve) => {
   
    if ( !document.getElementById('mynavbar').contains(eve.target) && !document.getElementById('threedot').contains(eve.target)) {
      console.log('a');
      setMenuCollapse(true)
     
    }
  };

  
  const checkUser = () => {
    //condition checking to change state from true to false and vice versa
    const vid = localStorage.getItem('user');
    if(vid === null)
    {      
      navigate('/Login')
    }
  };

  

  

  
  


  return (

    <div className="Customer_Main dashboard">

    <Header
      menuCollapse={menuCollapse}
      menuIconClick={menuIconClick}
      />
      
     <Navbar
      menuCollapse={menuCollapse}
      menuIconClick={menuIconClick}
      />
<Routes>    
      

      <Route path='/dashboard' element={<Dashboard
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>

        <Route path='/Wallet' element={<Wallet
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/PayScanner' element={<PayScanner
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Payment/:id' element={<Payment
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Payment_Success' element={<Payment_Success
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Payment_Failed' element={<Payment_Failed
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>

        <Route path='/Edit_Customer' element={<Edit_Customer
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        
        <Route path='/Customer_Venodor_Pay' element={<Customer_Venodor_Pay
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
      
      <Route path='/My_booking' element={<My_booking
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        <Route path='/My_wishlist' element={<My_wishlist
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        <Route path='/Notification' element={<Notification
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        <Route path='/Payment_Details/:id' element={<Payment_Details
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>


        <Route path='/Todolist' element={<Todolist
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>

     <Route path='/Paid_Transaction' element={<Paid_Transaction
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
      
      <Route path='/Discount' element={<Discount
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        <Route path='/Affiliate' element={<Affiliate
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>

        <Route path='/Profile' element={<Profile
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Customer_Registration' element={<Customer_Registration
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>


</Routes >

      
    </div>
  )

};

Customer_Main.propTypes = {};

Customer_Main.defaultProps = {};

export default Customer_Main;
