import React, { useState } from "react";
import PropTypes from 'prop-types';
import './Main.css';
import Navbar from '../Navbar/Navbar';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Dashboard from "../dashboard/Dashboard";
import Notification from "../dashboard/Notification";
import My_booking from "../dashboard/My_booking";
import My_wishlist from "../dashboard/My_wishlist";
import Todolist from "../dashboard/Todolist";



const Main = () => {

  const [menuCollapse, setMenuCollapse] = useState(true)

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
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



        <Route exact path='/dashboard' element={< Dashboard
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>

        <Route exact path='/notification' element={< Notification
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>


        <Route exact path='/my_booking' element={< My_booking
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>

        <Route exact path='/my_wishlist' element={< My_wishlist
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>

        <Route exact path='/todolist' element={< Todolist
          menuCollapse={menuCollapse}
          menuIconClick={menuIconClick}
        />}></Route>









      </Routes>





    </div>
  )

};

Main.propTypes = {};

Main.defaultProps = {};

export default Main;
