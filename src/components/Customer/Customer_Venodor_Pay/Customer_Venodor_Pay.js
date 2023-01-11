import React, { useState, useEffect, handleNavigation } from "react";
import { Link,useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Swal from 'sweetalert2'
import './Customer_Venodor_Pay.css';
import { QrReader } from 'react-qr-reader';
import pay from '../images/operation.png';
import hotel from '../images/hotel.jpg';

import { AiFillStar ,AiOutlineSearch} from 'react-icons/ai';


const Customer_Venodor_Pay = () => {
  
    const [Loader, setLoader] = useState(false);
    const [HomeSetting, setHomeSetting] = useState(null);
    const [BusinessListing, setBusinessListing] = useState(null);
    const[Testimonials,setTestimonials] = useState(null);
    const [city_all,setcity_all] = useState(null);
    const [BCategory , setBCategory] = useState(null);
    const [Blog , setBlog] = useState(null);
    const[SearchCity,setSearchCity] = useState(null);

    const [Category,setCategory] =useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch_data();            
      }, [SearchCity]);

    async function fetch_data(){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/SearchListing?city="+SearchCity)
        .then(res => {
    
         
          setBusinessListing(res.data.BusinessListing);        
          setcity_all(res.data.city_all);
          
           console.log(res);
    
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }

      
    return (


        <main>
            <div className="Customer_Venodor_Pay">
             <div id="main"> 
             <div className="col-xl-12 ">
           {city_all != null
               ? 
               <>
              <select className="form-select form_select form-select-lg mt-2 form-select-lg"
               aria-label="Default select example"
               value={SearchCity}
               onChange={(e) => setSearchCity(e.target.value)}
               id="city"
                >
              <option selected="">Select City</option>
              {city_all.map((record, index) => (
               <>
              <option value={record.id}>{record.name}</option>
              </>
              ))}
              </select>
              
            </>
            :<></>}
    </div>
             {BusinessListing != null
            ?
            <>             
                <div className="container mt-3">
                {BusinessListing.map((record, index) => (
              <>
               <Link to={"/Customer_Main/Payment/" + record.id}>
                <div className="col-md-12">
                <div className="row">
                
                <div className="block mt-3">
               
                 <img src={"https://callistoworld.io/lara/public/upload/"+record.header_image}   />
                    <h5 className="mt-2 link_disable">{record.name}</h5>                    
                    <h6 className="h6_s link_disable">{record.city_id.name}</h6>         
                    <span className=""><AiFillStar className="icon_color"/> 8/10</span>           
                </div>
                
                </div>


                 </div>
                 </Link>
            </>))}  
              </div>
              </>
      :<></>
      }
             </div>
             </div>

        </main >
    )





};

Customer_Venodor_Pay.propTypes = {};

Customer_Venodor_Pay.defaultProps = {};

export default Customer_Venodor_Pay;
