import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { BackButton } from '../BackButton';
import logo from '../images/discountwallet.png';
import user from '../images/user.png';
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
 
  <div className="main_header1">

    <img src={logo} className="project_logo1" style={{ float: 'left' }}/>
   
   
   <i onClick={menuIconClick} id="threedot" className="material-icons abc_qa"><AiOutlineMenu className="header_icon"/></i>
    <i className="material-icons" style={{ color: "#3e0707" }}>
      <Link to='/FirstPage'><AiOutlineHome className="abc_qa" style={{ color: "#3e0707" }}/></Link></i>
   <i className="material-icons abc_qa"><BackButton className="header_icon abc_qa"/></i>
  {Loggeduser != null
     && <>
   <Link to="/Customer_Main/PayScanner"><i className="material-icons abc_qa"><FaQrcode className="header_icon abc_qa"/></i></Link>
      </>
  }
  </div>
)}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
