import React, { useState} from 'react';
import { useParams,useNavigate,useLocation } from 'react-router-dom';
import { Component } from "react";
import { Link } from "react-router-dom";
import './login.css';
import axios from 'axios';
import Swal from 'sweetalert2';

import logo from '../images/discountwallet.png';
import {BiMobileAlt} from 'react-icons/bi';
import {RiLockPasswordFill} from 'react-icons/ri';

const ChangePassword = () => {

    const [Loader, setLoader] = useState(false);
    const [mobile, setmobile]  = useState("");
    const [password, setpassword]  = useState("");
    const [C_password, setC_password]  = useState("");
    const navigate = useNavigate();
    const {state} = useLocation();
    const { email, email_verification_code } = state; // Read values passed on state



 const handleSubmit = (event) => {
  event.preventDefault();
  if(password == C_password)
  {
    checkLogin();  

  }else{
    Swal.fire({
        title: 'Validation Error',
        text: 'Enter Proper Password',
        icon: 'error',
        confirmButtonText: 'Okay'
    })
}
};

  async function checkLogin() {

    let f_data = new FormData();
    f_data.append('password', password);
    f_data.append('email', email);
    f_data.append('otp', email_verification_code);
  
    axios.post("https://callistoworld.io/lara/public/api/update_password",f_data ,
    { headers: {
       'accept': 'application/json',
       'Accept-Language': 'en-US,en;q=0.8',
       'Content-Type': `form-data;`,
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
                navigate('/login');
           
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
  
  return (
    <div className="container">
      <div class="ChangePassword">
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <div className="logo">
            <Link to={"/"}>
            <img
              src={logo}
              alt=""
            /></Link>
          </div>
          <div className="text-center mt-4 name">Change Password</div>
          
            <div className="form-field d-flex mt-3 align-items-center">
              <BiMobileAlt />
              <input type="text"
               name="number" 
               onChange={(e) => setpassword(e.target.value)}
               id="password" 
               placeholder="Enter Password"
               required="true" />
            </div>
            <div className="form-field d-flex align-items-center">
              <RiLockPasswordFill/>
              <input type="password"
               name="C_password" 
               onChange={(e) => setC_password(e.target.value)}
               id="C_password" 
               placeholder="Confirm Password"
               required="true" />
            </div>
            <button type="submit"           
             className="btn mt-3"
             >Change Password</button>

          <div className="text-center mt-2 fs-6">
            <Link to="/Forget">Forget password?.</Link> or 
            <Link to="/Register">Sign up</Link><br/>
            <Link to="/Vendor_Register">Vendor Partner Register?</Link><br/>
            <Link to="/Vendor_Login">Vendor Partner Login?</Link>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}






export default ChangePassword;


