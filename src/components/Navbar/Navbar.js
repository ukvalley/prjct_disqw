//import useState hook to create menu collapse state
import React, { useState } from "react";

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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
//import icons from react icons
import { FaList, FaRegHeart, FaHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import "react-pro-sidebar/dist/css/styles.css";
import "./Navbar.css";


const Navbar = ({
  menuIconClick, menuCollapse
}) => {

  //create initial menuCollapse state using useState hook

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}

            </div>

          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}> <Link to="/dashboard"></Link>Home </MenuItem>
              <MenuItem icon={<FiHome />}> <Link to="/Home"></Link>Home </MenuItem>

              <SubMenu title=" Branch " icon={<FaHeart />}>
                <MenuItem><Link to="/Addbranch"></Link> Add Branch    </MenuItem>
                <MenuItem><Link to="/Viewbranch"></Link>  View Branch  </MenuItem>
                <MenuItem><Link to="/Dailybalance"></Link>  Daily Balance  </MenuItem>
              </SubMenu>



              <SubMenu title=" Manage Property " icon={<FaHeart />}>
                <MenuItem>  Add Property Detail   </MenuItem>
                <MenuItem>  View Property Detail  </MenuItem>
                <MenuItem>  Add Plot Detail  </MenuItem>
                <MenuItem> View Plot Detail  </MenuItem>
              </SubMenu>


              <SubMenu title=" Sale Property " icon={<FaHeart />}>
                <MenuItem><Link to="/JoinClient"></Link> Join Client  </MenuItem>
                <MenuItem><Link to="/Clientdetails"></Link>  Client Detail  </MenuItem>
                <MenuItem><Link to="/SaleProperty"></Link> Sale Property  </MenuItem>
                <MenuItem><Link to="/ViewSaleProperty"></Link> View Sale Property  </MenuItem>
                <MenuItem><Link to="/UpdateSaleProperty"></Link> Update Sale Property  </MenuItem>
                <MenuItem><Link to="/ClientPayDetails"></Link>  Client Pay Detail  </MenuItem>
                <MenuItem><Link to="/PlotCancel"></Link>Plot Cancel   </MenuItem>
                <MenuItem><Link to="/CancelPlotList"></Link>Cancel Plot List  </MenuItem>
                <MenuItem><Link to="/DueInstallment"></Link> Due Installment</MenuItem>
              </SubMenu>

              <MenuItem icon={<FiHome />}><Link to="/DayCollection"></Link> Day Collection </MenuItem>


              <SubMenu title=" Expenditure " icon={<FaHeart />}>
                <MenuItem><Link to="/AddExpenditure"></Link>  Add Property exp   </MenuItem>
                <MenuItem><Link to="/ViewExpenditure"></Link> view Property exp  </MenuItem>
                <MenuItem><Link to="/AddOfficeExpenditure"></Link>  add office expenditure  </MenuItem>
                <MenuItem><Link to="/ViewOfficeExpenditure"></Link> view office expenditure  </MenuItem>
              </SubMenu>

              <SubMenu title=" Received " icon={<FaHeart />}>
                <MenuItem><Link to="/AddReceivedHead"></Link>  add received head   </MenuItem>
                <MenuItem><Link to="/ViewReceivedHead"></Link>  view received head  </MenuItem>
                <MenuItem><Link to="/AddOfficeExpenditureDetail"></Link>  add received  </MenuItem>
                <MenuItem><Link to="/ViewReceived"></Link> view received </MenuItem>
              </SubMenu>

              <SubMenu title=" Team " icon={<FaHeart />}>
                <MenuItem>  Tree   </MenuItem>
                <MenuItem>  Direct Members  </MenuItem>
              </SubMenu>


              <SubMenu title=" Sale Property " icon={<FaHeart />}>
                <MenuItem> MLY Commission   </MenuItem>
                <MenuItem>   Commission History    </MenuItem>
                <MenuItem>   Lapsed  History   </MenuItem>
                <MenuItem> Print Commission    </MenuItem>
                <MenuItem> Agent Business History    </MenuItem>
                <MenuItem>   Withdraw Commission    </MenuItem>
                <MenuItem>  view Withdraw    </MenuItem>
                <MenuItem>   Due TDS      </MenuItem>
                <MenuItem> TDS Statement </MenuItem>
                <MenuItem>  Due Commission  </MenuItem>
              </SubMenu>

              <SubMenu title=" Receipt " icon={<FaHeart />}>
                <MenuItem>  Receipt   </MenuItem>
                <MenuItem>   Cancel Plot Receipt </MenuItem>
              </SubMenu>

              <MenuItem icon={<FaList />}>Promotion </MenuItem>

              <SubMenu title=" Bank Account " icon={<FaHeart />}>
                <MenuItem>  Add Bank Account   </MenuItem>
                <MenuItem>   View Bank Account  </MenuItem>
                <MenuItem>   Transactions   </MenuItem>
              </SubMenu>






            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Navbar;