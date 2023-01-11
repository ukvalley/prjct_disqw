import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Swal from 'sweetalert2'
import './dash.min.css';
import Wallet from '../Wallet/Wallet'
import { FaMoneyBillAlt} from "react-icons/fa";
import { BsBank,BsFillShareFill} from "react-icons/bs";
import { BiMoney} from "react-icons/bi";
import { FcPaid,FcMoneyTransfer} from "react-icons/fc";
import {GiMoneyStack,GiTakeMyMoney} from "react-icons/gi";
import {BrowserRouter as Router, Routes,Route,Link, useNavigate} from 'react-router-dom';

import Loder from '../Loder';
import { type } from "@testing-library/user-event/dist/type";





const Dashboard = () => {

  const [Dashboard_data, SetDashboard_data] = useState(null);
  const [name, setName] = useState('');
  const [Search_data, setSearch_Data] = useState(null);
  const [c_Wallet, setc_Wallet] = useState(null);
  const [Loader, setLoader] = useState(false);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const [type, settype]  = useState("");

  const [mobile, setmobile]  = useState("");
  const [password, setpassword]  = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const uid = localStorage.getItem('user');
  const vid = localStorage.getItem('user');
  const user_type = localStorage.getItem('user_type');


  useEffect(() => {
    fetch_data();
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.length > 0) 
    {
      search_data(name);
    }
    else {
      Swal.fire({
        title: 'Search Query is blank',
        text: 'Enter Again',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
    }
  }

  async function search_data(name) {

    setLoader(true);
    await axios.get("https://nonstopmoney.live/sweekar_landmark/api/SearchData/" + name)
      .then(res => {

        setSearch_Data(res.data)
        setLoader(false);
      }).catch(error => {
        console.log('errr', error)
        setLoader(false);
      })
  }

  


  async function fetch_data() {
    setLoader(true);

  await axios.get("https://callistoworld.io/lara/public/api/fetchWallet/"+uid)
  .then(res => {
  
    setc_Wallet(res.data.Wallet);       
     console.log(res.data);
   

     setLoader(false);
}).catch(error => {
    console.log('errr', error)
    setLoader(false);
})


  }


  const handleSubmitVendor = (e) => 
  {
    e.preventDefault()
    ProfileUpdate(type);
  }

  async function ProfileUpdate(){

    setLoader(true);

  let f_data = new FormData();
  f_data.append('type',"vendor");
 

  await axios.post("https://callistoworld.io/lara/public/api/UserUpdate/"+vid,
  f_data ,
{ headers: {
  'accept': 'application/json',
  'Accept-Language': 'en-US,en;q=0.8',
  'Content-Type': `multipart/form-data;`,
}})
 .then(function (response)
  {
  console.log(response);
  setLoader(false);
  if (response.data.status == "true") {
      Swal.fire({
          title: response.data.message,
          text: 'Data Added Successfully',
          icon: 'success',
          confirmButtonText: 'Okay'
      })

      localStorage.setItem('user_type',"vendor")
      //navigate('/Vendor_Main/Viewlist')
  }

  else {
      setLoader(false);
      Swal.fire({
          title: response.data.message,
          text: 'Data Add failed',
          icon: 'error',
          confirmButtonText: 'Okay'
      })
  }
})
.catch(function (error) {
  setLoader(false);
  console.log(error);
  Swal.fire({
      title: error.message,
      text: 'Data Add failed',
      icon: 'error',
      confirmButtonText: 'Okay'
  })
});
}

  if (Loader == true) {
    return (
       <Loder /> )       
    }


  return (


    <main>
      <div className="Dashboard">
       <div id="main">
        <div>   
        {user_type != "vendor" &&              
               <Link to="/Vendor_Register">
               <button className="btn btn-primary">Apply for Vendor</button>
             </Link>
          }      
          
        </div>
       <div className="Payment_Details">
            <div className="container  mt-5">
            
            {c_Wallet != null
                     ?
                    <>      
            <div className="card"  style={{ padding: 11 }}>
               <div className="col-12">
               <td>
                  <BsBank className="bnk_v1 mt-3"/>
              </td>  
              <td>
                  <h5 className="set_l">DW Wallet</h5>                    
                  <h6 className="text-left set_ll">₹ {c_Wallet.main_wallet}</h6>
              </td> 
                  
                   
               </div> 
                <hr/>

               <div className="col-12">
                {/* <h5 className="text-left">To</h5>  */}
                <div className="">
                   <td>
                    <FaMoneyBillAlt className="bnk_v1 mt-3"/>
                   </td>  
                   <td >
                    <lable className="set_l">Total Income</lable>
                    <p className="text-left set_l">₹ {parseFloat(c_Wallet.cashback)+parseFloat(c_Wallet.referral)}</p>
                   </td>      
                  <hr/>    
                </div>
                <div className="">
                   <td>
                    <BiMoney className="bnk_v1 mt-3"/>
                   </td>  
                   <td >
                    <lable className="set_l">Cashback</lable>
                    <p className="text-left set_l">₹ {c_Wallet.cashback}</p>
                   </td>      
                  <hr/>    
                </div>
                <div className="">
                   <td>
                    <BsFillShareFill className="bnk_v1 mt-3"/>
                   </td>  
                   <td >
                    <lable className="set_l">Referral</lable>
                    <p className="text-left set_l">₹ {c_Wallet.referral}</p>
                   </td>      
                  <hr/>    
                </div>
                <div className="">
                   <td>
                    <GiMoneyStack className="bnk_v1 mt-3"/>
                   </td>  
                   <td >
                    <lable className="set_l">Total Paid</lable>
                    <p className="text-left set_l">₹ {c_Wallet.total_paid}</p>
                   </td>      
                  <hr/>    
                </div>
                <div className="">
                   <td>
                    <GiTakeMyMoney className="bnk_v1 mt-3"/>
                   </td>  
                   <td >
                    <lable className="set_l">Total Deposit</lable>
                    <p className="text-left set_l">₹ {c_Wallet.total_deposit}</p>
                   </td>      
                  <hr/>    
                </div>
               </div> 
             
               
             
            </div>
            </> :<></>}
          
            <Wallet />
            </div>
          </div>
       
        </div>
      </div>
    </main>
  )





};

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
