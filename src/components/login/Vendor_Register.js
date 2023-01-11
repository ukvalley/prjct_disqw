import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,useNavigate,useParams } from 'react-router-dom';
import Loder from '../../Loder';
import { Component } from "react";
import { Link } from "react-router-dom";
import './login.css';
import axios from 'axios';
import Swal from 'sweetalert2';

import { BiUserCircle,BiMobileAlt} from 'react-icons/bi';
import {HiOutlineMail} from 'react-icons/hi';
import {RiLockPasswordFill} from 'react-icons/ri';

const vendor_Register = () => {

    const [Loader, setLoader] = useState(false);
    const [name,setName] = useState("");
    const [email, setemail]  = useState("");
    const [mobile, setmobile]  = useState("");
    const [password, setpassword]  = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();  
        RegisterPost(name,email,mobile,password);    
      }
    
      async function RegisterPost(name,email,mobile,password){

          setLoader(true);

        let f_data = new FormData();
        f_data.append('name', name);
        f_data.append('email', email);
        f_data.append('mobile', mobile);
        f_data.append('password', password);
        f_data.append('type',"vendor");
        
     await axios.post("https://callistoworld.io/lara/public/api/RegisterPost",
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
            <div class="mt-5">
                <div className="wrapper">
                    <h5>Vendor</h5>
                    <div className="logo">
                    <Link to='/FirstPage'>
                          <img                           
                            src={""}
                            alt=""
                        /></Link>
                    </div>
                    <div className="text-center mt-4 name">Vendor Register</div>

                    <form onSubmit={handleSubmit} className="p-3 mt-3">
                        <div className="form-field d-flex align-items-center">
                            <BiUserCircle/>
                            <input type="text" 
                             name="name"
                             id="name"
                             onChange={(e) => setName(e.target.value)}
                             placeholder="Name" />
                        </div>
                        <div className="form-field d-flex align-items-center">
                            <HiOutlineMail/>
                            <input type="text"
                             name="email" 
                             id="email" 
                             onChange={(e) => setemail(e.target.value)}
                             placeholder="Email" />
                        </div>
                        <div className="form-field d-flex align-items-center">
                            <BiMobileAlt />
                            <input type="text" 
                             name="mobile"
                             id="mobile"
                             onChange={(e) => setmobile(e.target.value)}
                             placeholder="10-Digit Mobile Number" />
                        </div>
                        <div className="form-field d-flex align-items-center">
                            <RiLockPasswordFill />
                            <input type="text"
                             name="password" 
                             id="Password" 
                             onChange={(e) => setpassword(e.target.value)}
                             placeholder="Password" />
                        </div>
                        <button className="btn mt-3">Vendor Register</button>
                    </form>
                    <div className="text-center fs-6">
                        <a href="#">Forget password?</a> or 
                        <Link to={"/Vendor_Main/dashboard"}><a href="#">Sign up</a></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}






export default vendor_Register;


