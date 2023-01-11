import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profile from '../../project_images/user.png';
import logo from '../../project_images/discountwallet.png';
import { Link } from 'react-router-dom';
import { FaTelegram,FaLessThan,FaGreaterThan } from 'react-icons/fa';
import {AiFillLinkedin} from 'react-icons/ai';
import {TiSocialYoutube ,TiSocialInstagram} from 'react-icons/ti';
import {BsFacebook } from 'react-icons/bs';
import {FiArrowRightCircle } from 'react-icons/fi';
import {MdOutlineKeyboardArrowRight } from 'react-icons/md';


import Loder from '../Loder';
import './Header.css';



const Footer = () => {

    const [HomeSetting, setHomeSetting] = useState(null);
    const [Loader, setLoader] = useState(false);
    const [email, setemail] = useState("");

    const handleSubmit =(event)=>{
      event.preventDefault();  
        SubscribePost(email);    
      }
    
      async function SubscribePost(email){

        setLoader(true);

        let f_data = new FormData();
      
        f_data.append('email', email);
     
        
        
     await axios.post("https://callistoworld.io/lara/public/api/SubmitSubscriber",
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
       
    })
    .catch(function (error) {
        setLoader(false);
        console.log(error);
        
    });
    }
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
    
return (
    <>
    <div className="space-small bg-default text-white">
    <div className="container">
<div className="row">
<div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" style={{textAlign:"initial"}}>
 <h2 className="text-white font_set">Submit your Listing Right Now!</h2>
 <p className="p_font_set">Join us on a journey of connecting two souls</p>
</div>
<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 text-center mb-3 mt-3">
 <a
   href="#"
   className="btn btn-primary"
   id="submit_listing"
 >
   Submit Now
 </a>
</div>
</div>
   </div>
 </div>

 <div class="social-media-block">
<div class="container">
 <div class="row">
     <div class="col-xl-7 col-lg-7 col-md-6 col-sm-6 mt-3 col-12">
         <h5 class="text-white footer_set">Would you like to connect with us ?</h5>
     </div>
     <div class="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12 text-center mt-3">
         <div class="social-icons">
           <a href={HomeSetting.facebook} className="icon-square"><BsFacebook/></a>
           <a href={HomeSetting.twitter}  className="icon-square"><FaTelegram/></a>
           <a href={HomeSetting.linkedin} className="icon-square"><AiFillLinkedin/></a>
           <a href={HomeSetting.youtube}  className="icon-square"><TiSocialYoutube/></a>
           <a href={HomeSetting.instagram} className="icon-square"><TiSocialInstagram/></a>               
         
         </div>
     </div>
 </div>
</div>
 </div>
  
   
<div className="footer">
<div className="container">
  <div className="row mt-4">
   
  <div className="col-xl-3 col-lg-2 col-md-4 col-sm-6 col-12">
      <div className="footer-widget">
        <h3 className="widget-title">Discount Wallet</h3>
        <ul className="listnone">
        <li className='mt-2'>
          <Link to={"/About_us"} className="text-white effect-shine"><MdOutlineKeyboardArrowRight/> About Us
              </Link>
           
          </li>
          <li className='mt-2'>
        <Link to={"/ContactUs"} className="text-white effect-shine"><MdOutlineKeyboardArrowRight/> Contact Us</Link>
           
          </li>
          
         
         
        </ul>
      </div>
    </div>

    <div className="col-xl-3 col-lg-2 col-md-4 col-sm-6 col-12">
      <div className="footer-widget">
        <h3 className="widget-title">Useful Reads</h3>
        <ul className="listnone">

         
         
          <li>
          <Link to={"/Terms_Condtion"} className="text-white effect-shine"><MdOutlineKeyboardArrowRight/> Terms &amp; Condition
              </Link>
           
          </li>
          <li className='mt-2'>
            
             <Link to={"/Privacy_Policy"} className="text-white effect-shine"> <MdOutlineKeyboardArrowRight/> Privacy Policy
              </Link>
           
          </li>
         
        </ul>
      </div>
    </div>
    
    <div className="col-xl-3 col-lg-2 col-md-4 col-sm-6 col-12">
      <div className="footer-widget">
        <h3 className="widget-title ">Login</h3>
        <ul className="listnone">

          <li className='mt-2'>
            <Link to={"/vendor_login"} className='text-white effect-shine'><MdOutlineKeyboardArrowRight/> Vendor Login</Link>
          </li>
          <li className='mt-2'>
          <Link to={"/login"} className='text-white effect-shine'><MdOutlineKeyboardArrowRight/> User Login</Link>
          </li>
          <li className='mt-2'>
            <Link to={"/All_Listing"} className='text-white effect-shine' href="#"><MdOutlineKeyboardArrowRight/> All Listing</Link>
          </li>
          
         
         
        </ul>
      </div>
    </div>
    <div className="col-xl-3 col-lg-2 col-md-4 col-sm-6 col-12">
      <div className="footer-widget">
        <h3 className="widget-title effect-shine">Download App</h3>
        <ul className="listnone">       
          <li className='mt-2'>
            <a className='text-white effect-shine mt-2' href="#"> <MdOutlineKeyboardArrowRight/> Download App</a>
          </li>
          <li className='mt-2'>
            <a className='text-white effect-shine' href="#" target="_blank"><MdOutlineKeyboardArrowRight/>  Magazine
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="col-xl-12 col-lg-3 col-md-12 col-sm-6 col-12 mt-5">
      <div className="footer-widget newsletter-block">
        <h3 className="widget-title" style={{textAlign: "justify"}}>Best emails ever! no bs.
Our emails are personal, informative, and an interesting read on new launches, team stories and much more. You wouldn't want to miss out. Subscribe to newsletter</h3>
        <form onSubmit={handleSubmit}>          
          <div className="form-group">
            <label htmlFor="email" className="sr-only" />
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              onChange={(e) => setemail(e.target.value)}
              aria-describedby="email"
              placeholder="Enter Email Address"
              required=""
            />
          </div>
          <button type="submit"  className="btn btn-primary">Subscribe</button>
           
          
        </form>
      </div>
    </div>
    {/* /.footer-widget */}
  </div>
</div>
      </div>

      </>
 
)
};

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;

