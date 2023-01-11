import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './ContactUs.css';
import Loder from '../Loder';
import axios from 'axios';
import Swal from 'sweetalert2';

import {FcPhone } from 'react-icons/fc';
import { TbMessage} from 'react-icons/tb';
import { ImLocation2 } from 'react-icons/im';

const ContactUs = () => {   
    const [Loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [HomeSetting, setHomeSetting] = useState(null);
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [email, setemail] = useState("");
    const [mobile_number, setmobile_number] = useState("");
    const [message, setmessage] = useState("");

    useEffect(() => {
        fetch_data();            
      }, []);

    async function fetch_data(){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/HomeApi/1")
        .then(res => {
    
          setHomeSetting(res.data.HomeSetting);
         
    
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }
    
 
      if (Loader == true || HomeSetting == null) {
        return (
            <></>
          )       
        }

    const handleSubmit = (event) => {
        event.preventDefault();  
        RegisterPost(first_name,last_name,email,mobile_number,message);    
      }
    
      async function RegisterPost(first_name,last_name,email,mobile_number,message){

        setLoader(true);

        let f_data = new FormData();
        f_data.append('first_name', first_name);
        f_data.append('last_name', last_name);
        f_data.append('email', email);
        f_data.append('mobile_number', mobile_number);
        f_data.append('message', message);
        
        
     await axios.post("https://callistoworld.io/lara/public/api/SubmitCForm",
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
            navigate('/FirstPage');
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
    <div className='Main'>
   <div className="container mt-5 mb-5">
  <div className="form">
    <div className="contact-info">
      <h3 className="title">Let's get in touch</h3>
      <p className="text-left">
      Discount Wallet offers best value for your money. We respect our customers and your
       happiness is our utmost priority, keeping this in mind we are continuously thriving to 
       understand your needs. We offer a variety of products and services with Pocket Friendly Deals
         on every purchase. We strongly believe in adding value to the life of everyday consumers.
         Discount Wallet is practical, promising and precisely designed to elevate your everyday needs.
          We are an innovative brand with products that'll make daily life easy, inviting and 
          enjoyable !
      </p>
      <div className="info mt-5">
        <div className="information">
          <p className='text-left'> <ImLocation2/> Office No.412 4th Floor, Signature Global Mall, Sector-3 Vaishali, Ghaziabad (Uttar Pradesh) 201010, India</p>
        </div>
        <div className="information">
          <p><TbMessage/> info@discountwallet.in</p>
        </div>
        <div className="information">
          <a href='tel:+91 8130111231'> <FcPhone/> +91 8130111231</a>
        </div>
      </div>
  
    </div>
    <div className="contact-form">
      <span className="circle one" />
      <span className="circle two" />
      <form onSubmit={handleSubmit}>
        <h3 className="title">Contact us</h3>
        <div className="">
          <input type="text" className="input"
           placeholder="First Name" 
           name="first_name"
           id="first_name"
           onChange={(e) => setfirst_name(e.target.value)}
            />
          
        </div>
        <div className="input-container">
          <input type="text" className="input"
           placeholder="Last Name" 
           name="last_name"
           id="last_name"
           onChange={(e) => setlast_name(e.target.value)}
            />
         
        </div>
        <div className="input-container">
          <input type="email" className="input"
          placeholder="Email" 
          name="email"
          id="email"
          onChange={(e) => setemail(e.target.value)}
           />
         
        </div>
        <div className="input-container">
          <input type="tel" className="input" 
           name="mobile_number"
           id="mobile_number"
           placeholder="Mobile Number" 

           onChange={(e) => setmobile_number(e.target.value)}
           />
          
        </div>
        <div className="input-container textarea">
          <textarea 
           className="input"
           name="message"
           id='message'
           placeholder="Mesaage" 
           onChange={(e) => setmessage(e.target.value)}
            defaultValue={""} />
         
        </div>
        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  </div>
</div>



      </div>
 
    
  )


};

ContactUs.propTypes = {};

ContactUs.defaultProps = {};

export default ContactUs;
