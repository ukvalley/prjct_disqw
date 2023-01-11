import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,useNavigate
} from 'react-router-dom';


//import react pro sidebar components
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
import { FaList, FaPeopleArrows,FaRegHeart, FaListOl } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BiGitBranch, BiArch } from "react-icons/bi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsGeo, BsBoxSeam, BsDiagram3, BsBank, BsQuestionOctagon ,BsWallet} from "react-icons/bs";
import { AiOutlineDashboard,AiOutlineContainer ,AiFillHome,AiOutlineUserSwitch,AiOutlineBell} from "react-icons/ai";
import { FiGlobe, FiPenTool } from "react-icons/fi";

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Navbar.css";


const Navbar = ({
  menuIconClick, menuCollapse
}) => {

  const Loggeduser =  localStorage.getItem('bid');
  const user_type = localStorage.getItem('user_type');
  let navigate = useNavigate();


  function logout()
  {
    localStorage.removeItem('bid');
    window.location.reload();    
  }
  //create initial menuCollapse state using useState hook




  return (
    <>
    <div id="vendor">
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
           
            <MenuItem active={true} icon={<AiOutlineDashboard />}><Link to="/BusinessUser/dashboard"> </Link>Dashboard </MenuItem>

            <SubMenu title="Bussiness " icon={<BsGeo />}>
       
        <MenuItem><Link to="/BusinessUser/EditBusiness"> </Link>   Edit Bussiness  </MenuItem>
      </SubMenu>

      <SubMenu title=" Product " icon={<BsBoxSeam/>}>
        <MenuItem><Link to="/BusinessUser/Product"> </Link>Add Product</MenuItem>
        <MenuItem><Link to="/BusinessUser/ViewProduct"> </Link>View Products </MenuItem>
     </SubMenu>

     
     <SubMenu title="Branch " icon={<BiGitBranch/>}>
        <MenuItem><Link to="/BusinessUser/Add_Branch"> </Link>Add Branch </MenuItem>
        <MenuItem><Link to="/BusinessUser/Branch"> </Link>View Branch </MenuItem>
      </SubMenu>

      <SubMenu title=" Bank Accounts " icon={<BsBank />}>
        <MenuItem><Link to="/BusinessUser/Add_Bank"> </Link>  Add Bank Accounts    </MenuItem>
        <MenuItem><Link to="/BusinessUser/Accounts"> </Link>   View Bank Accounts  </MenuItem>
      </SubMenu>

      <SubMenu title=" Report " icon={<HiOutlineDocumentReport />}>
        <MenuItem><Link to="/BusinessUser/Report"> </Link>  Transaction and History </MenuItem>
      </SubMenu>

      <SubMenu title=" FAQ's " icon={<BsQuestionOctagon />}>
        <MenuItem><Link to="/BusinessUser/Addfaq"> </Link>  Add FAQ's    </MenuItem>
        <MenuItem><Link to="/BusinessUser/Viewfaq"> </Link>   View FAQ's  </MenuItem>
      </SubMenu>

      <SubMenu title="Social Links" icon={<FiGlobe />}>
        <MenuItem><Link to="/BusinessUser/Addsocial"> </Link>  Add Social Links </MenuItem>
        <MenuItem><Link to="/BusinessUser/Viewsocial"> </Link>   View Social Links</MenuItem>
      </SubMenu>

      <MenuItem active={true} icon={<FiPenTool />}><Link to="/BusinessUser/Viewreviews"> </Link>View Reviews</MenuItem>
      <MenuItem active={true} icon={<FaPeopleArrows />}><Link to="/BusinessUser/Enquiry"> </Link>Enquiry</MenuItem>
      {Loggeduser === null
     ? <>

   <MenuItem icon={<FiLogOut />}><Link to={"/Vendor_Login"}>Login</Link></MenuItem>  </>
   
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