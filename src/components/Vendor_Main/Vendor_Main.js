import React, { useState,useEffect,useRef } from "react";
import {BrowserRouter as Router, Routes,Route, useNavigate} from 'react-router-dom';

import Header from '../Vendor/Header/Header';
import Navbar from '../Vendor/Navbar/Navbar';
import Dashboard from '../Vendor/dashboard/Dashboard';
import Viewlist from '../Vendor/dashboard/Viewlist';
import Addfaq from '../Vendor/dashboard/Addfaq';
import Addsocial from '../Vendor/dashboard/Addsocial';
import Branch from '../Vendor/dashboard/Branch';
import Viewsocial from '../Vendor/dashboard/Viewsocial';
import Profile_doc from '../Vendor/dashboard/Profile_doc';
import Viewfaq from '../Vendor/dashboard/Viewfaq';
import Viewreviews from '../Vendor/dashboard/Viewreviews';
import Bussiness_Registration from '../Vendor/Bussiness_Registration/Bussiness_Registration';
import Add_Bank from '../Vendor/Bank/Add_Bank';
import Product from '../Vendor/Product/Product';
import ViewProduct from '../Vendor/ViewProduct/ViewProduct';
import Accounts from '../Vendor/Bank/Accounts';
import Edit_Business from '../Vendor/dashboard/Edit_Business';
import Profile from '../Vendor/Profile/Profile';
import EditProducts from '../Vendor/EditProducts/EditProducts';
import Edit_Bank from '../Vendor/Edit_Bank/Edit_Bank';
import Edit_Faq from '../Vendor/Edit_Faq/Edit_Faq';
import Edit_Social from '../Vendor/Edit_Social/Edit_Social';
import Add_Branch from '../Vendor/Add_Branch/Add_Branch';
import Edit_Branch from '../Vendor/Edit_Branch/Edit_Branch';
import Enquiry from '../Vendor/Enquiry/Enquiry';
import Report from '../Vendor/Report/Report';
import Payment_Details from '../Vendor/Payment_Details/Payment_Details';


const Vendor_Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();             
  }, []);

  
  const checkUser = () => {
    //condition checking to change state from true to false and vice versa
    const vid = localStorage.getItem('user');
    if(vid === null)
    {
      navigate('/Vendor_Login')
    }
  };
  

  const [menuCollapse, setMenuCollapse] = useState(true)

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

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



  return (

    <div className="Vendor_Main dashboard">   

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

          <Route path='/Viewlist' element={<Viewlist
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>

        <Route path='/Profile_doc' element={<Profile_doc
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>



      <Route path='/Bussiness_Registration' element={<Bussiness_Registration
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>

      <Route path='/Add_Bank' element={<Add_Bank
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        <Route path='/Product' element={<Product
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        
        <Route path='/Add_Branch' element={<Add_Branch
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        <Route path='/Branch' element={<Branch
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Edit_Branch/:id' element={<Edit_Branch
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Payment_Details/:id' element={<Payment_Details
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        
        
        <Route path='/ViewProduct' element={<ViewProduct
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/EditProducts/:id' element={<EditProducts
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        
         <Route path='/Accounts' element={<Accounts
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
      <Route path='/Edit_Business/:id' element={<Edit_Business
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
          <Route path='/Report' element={<Report
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Addfaq' element={<Addfaq
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Addsocial' element={<Addsocial
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Profile/:id' element={<Profile
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Edit_Bank/:id' element={<Edit_Bank
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        <Route path='/Viewfaq' element={<Viewfaq
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Viewreviews' element={<Viewreviews
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Viewsocial' element={<Viewsocial
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        
        <Route path='/Edit_Faq/:id' element={<Edit_Faq
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Edit_Social/:id' element={<Edit_Social
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
      <Route path='/Enquiry' element={<Enquiry
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>




</Routes >

      
    </div>
  )

};

Vendor_Main.propTypes = {};

Vendor_Main.defaultProps = {};

export default Vendor_Main;
