import React, { useState, useEffect, handleNavigation } from "react";
import './Payment_Failed.css';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';



import { ImLocation2,ImMail,ImStarFull } from 'react-icons/im';

import profile from '../images/profile.png';

import { FcOk } from 'react-icons/fc';


const Payment_Failed = () => {
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
        <div className="Payment_Failed">
        <div className="cards">
        <div className="modal-body">
  <p
    style={{
      textAlign: "center",
      color: "#d75a4a",
      fontSize: 24,
      fontWeight: 500
    }}
  >
    Sorry! your payment failed!
  </p>
  <p style={{ color: "#555555" }}>
    Transaction ID:&nbsp;
    <strong style={{ fontWeight: 500, fontSize: 16, color: "#222222" }}>
      152458258752515
    </strong>
    <br />
    Payment amount:&nbsp;
    <strong style={{ fontWeight: 500, fontSize: 16, color: "#222222" }}>
      Rs.35000
    </strong>
    <br />
    If your payment got detucted for above transaction, the same shall be
    credited back to your account in
    <strong style={{ fontWeight: 500, fontSize: 15, color: "#222222" }}>
      {" "}
      5 working days
    </strong>
  </p>
</div>

        </div>
         </div>     
    )





};

Payment_Failed.propTypes = {};

Payment_Failed.defaultProps = {};

export default Payment_Failed;
