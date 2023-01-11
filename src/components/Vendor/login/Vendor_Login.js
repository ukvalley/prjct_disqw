import React, { useState} from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import './login.css';
import axios from 'axios';
import { BiMobileAlt} from 'react-icons/bi';
import {RiLockPasswordFill} from 'react-icons/ri';
import logo from '../images/discountwallet.png';

const Vendor_Login = () => {

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
    f_data.append('user_id', mobile);
    f_data.append('password', password);
  
  
    axios.post("https://callistoworld.io/lara/public/api/LoginBusinessPost",f_data ,
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
        localStorage.setItem('bid',response.data.data.id)
        localStorage.setItem('user_type',response.data.data.type)
        navigate('/BusinessUser/dashboard');
     }
     else{
      alert("error");
     }
     
    
  
    
  })
  }
  
  return (
    <div className="container">
      <div class="mt-5">
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <div className="logo">
            <Link to="/">
            <img
              src={logo}
              alt=""
            />
            </Link>
          </div>
          <div className="text-center mt-4 name">Vendor Login</div>
          
            <div className="form-field d-flex mt-3 align-items-center">
              <BiMobileAlt />
              <input type="text"
               name="mobile" 
               onChange={(e) => setmobile(e.target.value)}
               id="mobile" 
               placeholder="Enter Mobile" />
            </div>
            <div className="form-field d-flex align-items-center">
              <RiLockPasswordFill/>
              <input type="password"
               name="password" 
               onChange={(e) => setpassword(e.target.value)}
               id="password" 
               placeholder="Password" />
            </div>
            <button type="submit"           
             className="btn mt-3"
             >Login</button>

          <div className="text-center mt-2 fs-6">
          <Link to="/Forget">Forget password?.</Link> or 
            <Link to="/Vendor_Register">Sign up</Link>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}






export default Vendor_Login;


