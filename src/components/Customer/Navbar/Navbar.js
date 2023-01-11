//import useState hook to create menu collapse state
import React, { useState,useEffect,useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,useNavigate
} from 'react-router-dom';

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaListOl} from "react-icons/fa";
import { FiHome, FiLogOut} from "react-icons/fi";
import { AiOutlineOrderedList, AiOutlineBell, AiOutlineContainer, AiOutlineDashboard, AiOutlineUserSwitch, AiOutlineHeart, AiOutlineBars, AiFillHome } from "react-icons/ai";
import { BsWallet, BsGlobe, BsTable, BsPersonFill } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineDocumentReport } from "react-icons/hi"; 
import "react-pro-sidebar/dist/css/styles.css";
import "./Navbar.css";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";


const Navbar = ({
  menuIconClick, menuCollapse
}) => {

  //create initial menuCollapse state using useState hook
  const Loggeduser =  localStorage.getItem('user');
  const BusinessUser =  localStorage.getItem('bid');
  const user_type = localStorage.getItem('user_type');
  console.log(user_type)
  let navigate = useNavigate();

  console.log(Loggeduser);

  function logout()
  {
    localStorage.removeItem('user');
    window.location.reload();    
  }


  return (
    <>
      <div id="customer">
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse} id="mynavbar">
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
            </div>

          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="menuIconClick">
            <MenuItem active={true} icon={<AiFillHome />}><Link to="/"> </Link>Home</MenuItem>
            <MenuItem active={true} icon={<FaListOl />}><Link to="/All_Listing"> </Link>All Listing</MenuItem>

            <MenuItem active={true} icon={<AiOutlineDashboard />}><Link to="/Customer_Main/dashboard"> </Link>Customer Dashboard </MenuItem>

            {BusinessUser != null
            &&
            <MenuItem active={true} icon={<AiOutlineDashboard />}><Link to="/BusinessUser/dashboard"> </Link>Vendor Dashboard </MenuItem>

            }
           

              <MenuItem active={true} icon={<AiOutlineBell />}><Link to="/Customer_Main/Notification"> </Link>Notifications </MenuItem>
              <MenuItem active={true} icon={<CgProfile />}><Link to="/Customer_Main/Profile"> </Link>Profile </MenuItem>

              <MenuItem active={true} icon={<BsWallet />}><Link to="/Customer_Main/Wallet"> </Link>Wallet </MenuItem>

              <SubMenu title="Report " icon={< HiOutlineDocumentReport/>}>
                <MenuItem><Link to="/Customer_Main/Paid_Transaction"></Link>Transaction & History</MenuItem>
                
                
              </SubMenu>
              {Loggeduser === null
             ? <>

           <MenuItem icon={<FiLogOut />}><Link to={"/login"}>Login</Link></MenuItem> </>
           
             : <>
           <MenuItem icon={<FiLogOut />}onClick={logout} >Logout</MenuItem>
         </>}
             


            </Menu>
          </SidebarContent>
        
        </ProSidebar>
      </div>
      </div>
    </>
  );
};

export default Navbar;