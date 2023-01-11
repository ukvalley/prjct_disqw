import React, { useState, useEffect, handleNavigation } from "react";
import './Discount.css';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';



import { ImLocation2,ImMail,ImStarFull } from 'react-icons/im';

import profile from '../images/profile.png';

import { FcOk } from 'react-icons/fc';
import { FaEye, FaFileContract } from 'react-icons/fa';
import { AiOutlineFileProtect, AiOutlineNumber } from "react-icons/ai";
import { BiMoney } from 'react-icons/bi';
import { HiShieldExclamation, HiClock } from "react-icons/hi";

const Discount = () => {
  const [data, setData] = useState('No result');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(0);
  const [Loader, setLoader] = useState(false);
  const [BusinessListing, setBusinessListing] = useState(null);
  const {id } = useParams();

  const handleChange = event => {
    const result = event.target.value.replace(/[^0-9]/gi, '');

    setMessage(result);
  };

  useEffect(() => {
    fetch_data();            
  }, []);

  async function fetch_data(){
    setLoader(true);
    
    axios.get("https://callistoworld.io/lara/public/api/BusinessSingle/"+id)
    .then(res => {
    
      setBusinessListing(res.data.BusinessListing);       
       console.log(res.data);
     

      setLoader(false);
  }).catch(error => {
      console.log('errr', error)
      setLoader(false);
  })
  }


    return (
        <div className="Discount">
       
          <div className="row px-md-4 pt-4">
  <div className="col-lg-12">

    <div className="card">
    
        <div className="table-responsive px-md-4 mt-1">
          <table className="table table-borderless">
            <tbody>
              <tr className="">
                <td>
                  <div className="d-flex align-items-center">
                    <div>
                      {" "}
                      <img
                        className="pic"
                        src="https://images.pexels.com/photos/7322083/pexels-photo-7322083.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                      />{" "}
                    </div>
                    <div className="ps-3 d-flex flex-column justify-content">
                      <p className="fw-bold">
                        Air<span className="ps-1">Red</span>
                        <span className="ps-1">Pants</span>
                      </p>{" "}                     
                      <small className="">
                        {" "}
                        <p>June 12,2022</p>
                      </small>
                    </div>
                  </div>
                </td>
                
                <td>
                  <div className="d-flex mt-3">
                   <p className="text-black">
                      $55.00
                    </p>
                  </div>
                </td>  
              </tr>
            </tbody>
          </table>
        </div>
      
    </div>
  </div>




          </div>
         </div>     
    )

};

Discount.propTypes = {};

Discount.defaultProps = {};

export default Discount;
