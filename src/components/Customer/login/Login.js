import React, { useState} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Component } from "react";
import { Link } from "react-router-dom";
import './login.css';
import axios from 'axios';

import logo from '../images/discountwallet.png';
import { BiUserCircle,BiMobileAlt} from 'react-icons/bi';
import {RiLockPasswordFill} from 'react-icons/ri';

const Login = () => {

  const [Loader, SetLoader] = useState(false);
  const [mobile, setmobile]  = useState("");
  const [password, setpassword]  = useState("");
  const navigate = useNavigate();



 const handleSubmit = (event) => {
  event.preventDefault();
  checkLogin();  
  
};

  async function checkLogin() {

    let f_data = new FormData();
    f_data.append('mobile', mobile);
    f_data.append('password', password);
  
  
    axios.post("https://callistoworld.io/lara/public/api/LoginPost",f_data ,
    { headers: {
       'accept': 'application/json',
       'Accept-Language': 'en-US,en;q=0.8',
       'Content-Type': `form-data;`,
     }})
     .then(function (response)
     {
      
     console.log(response);
  
     if(response.data.status == "true")
     {
        localStorage.setItem('user',response.data.data.id)
        localStorage.setItem('user_type',response.data.data.type)
        navigate('/Customer_Main/dashboard');
     }
     else{
      alert("User Id and Password is invalid");
     }
     
    
  
    
  })
  }
  
  return (
    <div className="container">
      <div class="">
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <div className="logo">
            <Link to={"/"}>
            <img
              src={logo}
              alt=""
            /></Link>
          </div>
          <div className="text-center mt-4 name">User Login</div>
          
            <div className="form-field d-flex mt-3 align-items-center">
              <BiMobileAlt />
              <input type="text"
               name="mobile" 
               onChange={(e) => setmobile(e.target.value)}
               id="mobile" 
               placeholder="Enter Mobile"
               required="true" />
            </div>
            <div className="form-field d-flex align-items-center">
              <RiLockPasswordFill/>
              <input type="password"
               name="password" 
               onChange={(e) => setpassword(e.target.value)}
               id="password" 
               placeholder="Password"
               required="true" />
            </div>
            <button type="submit"           
             className="btn mt-3"
             >Login</button>

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






export default Login;


