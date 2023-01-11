import React, { useState} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './login.css';
import axios from 'axios';
import Swal from 'sweetalert2';

import logo from '../images/discountwallet.png';
import {MdEmail} from 'react-icons/md';
import {BiRefresh,BiCompass} from 'react-icons/bi';


const Forget = () => {

  const [Loader, setLoader] = useState(false);
  const [email, setemail]  = useState("");
  const [isDisplay, SetisDisplay]=useState(false);
  const [email_activation_code, setemail_activation_code]=useState("");

  const navigate = useNavigate();

  const handleSubmitOTP = (event) => {
    event.preventDefault();
    checkOTP();    
  };

  async function checkOTP() {

    let f_data = new FormData();
    f_data.append('email_activation_code', email_activation_code);
    f_data.append('email', email);

  
    axios.post("https://callistoworld.io/lara/public/api/VerifyOtp",f_data ,
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
         navigate('/ChangePassword',{ state: { email: email, email_activation_code: email_activation_code } });
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
 const handleSubmit = (event) => {
  event.preventDefault();
  checkLogin();    
};

  async function checkLogin() {

    let f_data = new FormData();
    f_data.append('email', email);
  
  
    axios.post("https://callistoworld.io/lara/public/api/ForgotPasswordInit",f_data ,
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

          SetisDisplay(true);
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
      <div class="Forget">
      <form>
        <div className="wrapper">
          <div className="logo">
            <Link to={"/"}>
            <img
              src={logo}
              alt=""
            /></Link>
          </div>
          <div className="text-center mt-4 name">Forget Password</div>
        <div className='col-md-12 mb-5'>      
         <div className="form-field d-flex mt-3 align-items-center">
              <MdEmail />
              <input type="email"
               name="email" 
               onChange={(e) => setemail(e.target.value)}
               id="email" 
               placeholder="Enter email"
               required="true"/>
          </div>

          <button type="submit" className='btn-info btn-sm' style={{float:"right"}} onClick={handleSubmit}><BiRefresh/> Send OTP</button>
          </div>
        {isDisplay === true ?
        <>
           
            <div className="form-field d-flex mt-5 align-items-center">
              <BiCompass />
              <input type="text"
               name="email_activation_code" 
               onChange={(e) => setemail_activation_code(e.target.value)}
               id="email_activation_code" 
               placeholder="Enter OTP"
               required="true"/>
          </div>
          <button type="submit"className="btn mt-5" onClick={handleSubmitOTP}>Forget Password</button>
           </>:<></>}
           

          
        </div>
        </form>
      </div>
    </div>
  );
}






export default Forget;


