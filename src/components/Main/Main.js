import React, { useState,useEffect,useRef } from "react";
import './Main.css';

//import Navbar from '../Navbar/Navbar';
//import Header from "../Header/Header";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Header from '../Customer/Header/Header';
import Navbar from '../Customer/Navbar/Navbar';
import Footer from '../Header/footer';
import FirstPage from '../FirstPage/FirstPage';
import ViewCategroy from '../ViewCategroy/ViewCategroy';
import Trendy_Details from '../Trendy_Details/Trendy_Details';
import Products_details from '../Products_details/Products_details';
import  Blog_Content from '../Blog_Content/Blog_Content';
import  All_Blog from '../All_Blog/All_Blog';
import  All_Categroy from '../All_Categroy/All_Categroy';
import Child_Categroy_Details from '../Child_Categroy_Details/Child_Categroy_Details';
import All_Listing from '../All_Listing/All_Listing';
import ContactUs from'../ContactUs/ContactUs';
import Privacy_Policy from'../Privacy_Policy/Privacy_Policy';
import Terms_Condtion from'../Terms_Condtion/Terms_Condtion';
import About_us from'../About_us/About_us';





const Main = () => {
  
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
   
    if ( !document.getElementById('mynavbar').contains(eve.target)&& !document.getElementById('threedot').contains(eve.target)) {
      console.log('a');
      setMenuCollapse(true)
     
    }
  };



  return (

    <div className="Main">   
    <Header
      menuCollapse={menuCollapse}
      menuIconClick={menuIconClick}
      />

    <Navbar
      menuCollapse={menuCollapse}
      menuIconClick={menuIconClick}
      />
      
<Routes>    

<Route path='/' element={< FirstPage
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>

      <Route path='/Privacy_Policy' element={< Privacy_Policy
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Terms_Condtion' element={< Terms_Condtion
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>

 <Route path='/About_us' element={< About_us
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
       <Route path='/FirstPage' element={< FirstPage
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        <Route path='/ContactUs' element={< ContactUs
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        
        <Route path='/ViewCategroy' element={<ViewCategroy
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>

        <Route path='/Trendy_Details/:id' element={<Trendy_Details
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        
        <Route path='/Products_details/:id' element={<Products_details
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        <Route path='/Blog_Content/:id' element={<Blog_Content
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>

       <Route path='/All_Blog' element={<All_Blog
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        <Route path='/All_Categroy/:id' element={<All_Categroy
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
         <Route path='/Child_Categroy_Details/:id' element={<Child_Categroy_Details
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>
        <Route path='/All_Listing' element={<All_Listing
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>

     
        
        
</Routes >


<Footer
      menuCollapse={menuCollapse}
      menuIconClick={menuIconClick}
      />

      
    </div>
  )

};

Main.propTypes = {};

Main.defaultProps = {};

export default Main;
