import React, { useState, useEffect, handleNavigation } from "react";
import './Payment_Success.css';
import { useParams,Link,useLocation } from 'react-router-dom';
import axios from 'axios';



import { ImLocation2,ImMail,ImStarFull } from 'react-icons/im';

import profile from '../images/profile.png';

import { FcOk } from 'react-icons/fc';
const Payment_Success = () => {
  const [data, setData] = useState('No result');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(0);
  const [Loader, setLoader] = useState(false);
  const [Transaction, setTransaction] = useState(null);
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
    
    axios.get("https://callistoworld.io/lara/public/api/TransactionDetail/"+id)
    .then(res => {
    
      setTransaction(res.data.Transaction);       
       console.log(res.data);
     

      setLoader(false);
  }).catch(error => {
      console.log('errr', error)
      setLoader(false);
  })
  }


    return (
        <div className="Payment_Success">
        <div className="cards">
  <div style={{ borderRadius: 200,   height: 200,  width: 200,
      background: "#F8FAF5",  margin: "0 auto"  }}  >
    <i className="checkmark">✓</i>
  </div>
  <h1 className="Success_h1">Success</h1>
  <p className="Success_p">
    We received your purchase request;
    <br /> we'll be in touch shortly!
  </p>
</div>

         </div>     
    )





};

Payment_Success.propTypes = {};

Payment_Success.defaultProps = {};

export default Payment_Success;
