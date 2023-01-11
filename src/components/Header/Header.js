import React from 'react';
import './Header.css';
import { FaBackward } from 'react-icons/fa';

import { useNavigate  } from "react-router-dom";

import profile from '../../project_images/user.png';
import logo from '../../project_images/logo.png';
import { Link } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';

const Header = () => {

  const Loggeduser =  localStorage.getItem('user');
  let navigate = useNavigate();

  console.log(Loggeduser);

  function logout()
  {
    localStorage.removeItem('user');
    window.location.reload();
    
  }
 

return (
  <div className="Header">
    
   
     <div className="row">
       <div className=''>
     <header className="biz_header">
       <div className="biz_header_top">
 <div className="biz_header_logo">
 
  <Link to={"/FirstPage"}> <a href="#">
     <img src={logo}  alt="logo" style={{ margin: 'left' }} />
   </a></Link>
 </div>
 <div className="biz_header_navbar">
   <div className="biz_header_navlink">
     <nav>
       <div className="biz_sidebar_icon" id="resp-menu">
         <a>
           <span className="slide-icon slide-icon1" />
           <span className="slide-icon slide-icon2" />
           <span className="slide-icon slide-icon3" />
         </a>
       </div>
       <ul className="menu">
         <li className="menu_hide_box menu_hide_box4">
         
           <img src={logo}  alt="logo" />
           <img
             src={logo} className="menu_close"  alt="close"
           />
         </li>
         </ul>
     </nav>
   </div>
 </div>

 
 <div className="biz_header_searchbox">

 
      

   <div className="biz_search_box">
     <a href={"/FirstPage"} className="biz_center_logo">
       <img src={logo} alt="logo" />
     </a>
     
   </div>
 </div>
 <div className="biz_header_loginbox">

 <FaBackward onClick={() => navigate(-1)}  className="header_icon"  
        />
 
   <div className="coursesbox_link _color">

  
   <img className="" style={{width: "30px"}} src={profile}/>

   
  {Loggeduser === null ? <>
   <Link to={"/Register"}>
      <a type="submit" className="btn">
       Sign Up  </a> </Link>
     
     <Link to={"/login"}>
      <a type="submit" 
      
      className="btn"> Sign </a> </Link> </>

      : <>
      
      <Link to={"/Customer_main/Dashboard"}> <a type="button"
      
      className="btn"> Dashboard </a> </Link>

       <a type="button" onClick={logout} 
      
      className="btn"> Log out </a> </>}
  </div>
 
 
 </div>
 <div></div>
       </div>
     </header>


      </div>
    

     </div> 

  
  
   </div>
   
 
)
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
