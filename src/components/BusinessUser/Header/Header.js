import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { BackButton } from '../../Customer/BackButton';
import logo from '../../assets/dwlogo.png';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AiOutlineMenu,AiOutlineQrcode,AiOutlineLogout,AiOutlineHome} from "react-icons/ai";
import { FaQrcode} from "react-icons/fa";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,useNavigate
} from 'react-router-dom';

const Header = ({
  menuCollapse, menuIconClick
}) => { 
  
  const Loggeduser =  localStorage.getItem('user');

  return ( 
 
  <div className="main_header2">

    <img src={logo} className="project_logo1"  style={{ float: 'left' }}/>
   
   
   <i onClick={menuIconClick} id="threedot" className="material-icons"><AiOutlineMenu className="header_icon"/></i>
    <i className="material-icons" style={{ color: "#3e0707" }}>
      <Link to='/FirstPage'><AiOutlineHome className="" style={{ color: "#3e0707" }}/></Link></i>
   <i className="material-icons"><BackButton className="header_icon"/></i>
  
  </div>
)}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
