import React, { useState, useEffect, handleNavigation } from "react";
import './Paid_Transaction.css';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import * as moment from 'moment';
import Loder from "../../Loder";


const Paid_Transaction = () => {
  const [data, setData] = useState('No result');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(0);
  const [Loader, setLoader] = useState(false);
  const [Transaction, setTransaction] = useState(null);
  const {id } = useParams();
  const uid = localStorage.getItem('user');

  const handleChange = event => {
    const result = event.target.value.replace(/[^0-9]/gi, '');

    setMessage(result);
  };

  useEffect(() => {
    fetch_data(uid);            
  }, []);

  async function fetch_data(){
    setLoader(true);
    
    axios.get("https://callistoworld.io/lara/public/api/TransactionDetailByUid/"+uid)
    .then(res => {
    
      setTransaction(res.data.Transaction);       
       console.log(res.data);
     

      setLoader(false);
  }).catch(error => {
      console.log('errr', error)
      setLoader(false);
  })
  }

  if (Loader == true) {
    return (
       <Loder /> )       
    }


    return (
        <div className="Paid_Transaction">
       
          <div className="row px-md-4">
  <div className="card  col-lg-12 mt-1">
  {Transaction != null
    ?<>   {Transaction.map((record, index) => (
      <>
  <div className="mt-2">
    {record.transaction_type == "transfer" ?<>
      <Link to={"/Customer_Main/Payment_Details/"+record.id}>
    <table className="abc_c">
      <tbody>
     
        <tr role="alert">
     
         <td className="text-center img-tr">
            <img
              className="pic"
              src={"https://callistoworld.io/lara/public/upload/"+record.business_id_id.header_image} 
              alt=""
            />
          </td>
          <td className="content-tr">
            <div className="">
              <p className="bold text-left mb3px">Paid to {record.business_id_id.name}</p>
              <small>
              <p className="text-left">{moment(record.created_at).fromNow()}</p>
              </small>
            </div>
            
          </td>

          <td className="amt-tr">
            <p className="set_amount">₹ {record.amount}</p> 
          </td>
        
        </tr>
       
        
      </tbody>
    </table>
    </Link>
   </> 

   
   :<>
   {record.transaction_type == "cashback" ?<>
      <Link to={"/Customer_Main/Payment_Details/"+record.id}>
    <table className="abc_c">
      <tbody>
     
        <tr role="alert">
     
         <td className="text-center img-tr">
            <img
              className="pic"
              src={"https://callistoworld.io/lara/public/upload/"+record.business_id_id.header_image} 
              alt=""
            />
          </td>
          <td className="content-tr">
            <div className="">
              <p className="bold text-left mb3px">Cashback Rewards Received for Paying {record.business_id_id.name}</p>
              <small>
              <p className="text-left">{moment(record.created_at).fromNow()}</p>
              </small>
            </div>
            
          </td>

          <td className="amt-tr">
            <p className="set_amount">₹ {record.amount}</p> 
          </td>
        
        </tr>
       
        
      </tbody>
    </table>
    </Link>
   </>
    :<>
   {record.transaction_type == "deposit" ?<>
      <Link to={"/Customer_Main/Payment_Details/"+record.id}>
    <table className="abc_c">
      <tbody>
     
        <tr role="alert">
     
         <td className="text-center img-tr">
            <img
              className="pic"
              src={"https://callistoworld.io/lara/public/upload/"+record.business_id_id.header_image} 
              alt=""
            />
          </td>
          <td className="content-tr">
            <div className="">
              <p className="bold text-left mb3px">Deposit Successful to DISQ Wallet</p>
              <small>
              <p className="text-left">{moment(record.created_at).fromNow()}</p>
              </small>
            </div>
            
          </td>

          <td className="amt-tr">
            <p className="set_amount">₹ {record.amount}</p> 
          </td>
        
        </tr>
       
        
      </tbody>
    </table>
    </Link>
   </> 
   :<>

{record.transaction_type == "product_purchase" ?<>
      <Link to={"/Customer_Main/Payment_Details/"+record.id}>
    <table className="abc_c">
      <tbody>
     
        <tr role="alert">
     
         <td className="text-center img-tr">
            <img
              className="pic"
              src={"https://callistoworld.io/lara/public/upload/"+record.business_id_id.header_image} 
              alt=""
            />
          </td>
          <td className="content-tr">
            <div className="">
              <p className="bold text-left mb3px">Product Purchased <br/>
              {record.product_id_id.name}
              </p>
              <small>
              <p className="text-left">{moment(record.created_at).fromNow()}</p>
              </small>
            </div>
            
          </td>

          <td className="amt-tr">
            <p className="set_amount">₹ {record.amount}</p> 
          </td>
        
        </tr>
       
        
      </tbody>
    </table>
    </Link>
   </> 
   :<></>
    }

   {record.transaction_type == "referral" ?<>
      <Link to={"/Customer_Main/Payment_Details/"+record.id}>
    <table className="abc_c">
      <tbody>
     
        <tr role="alert">
     
         <td className="text-center img-tr">
            <img
              className="pic"
              src={"https://callistoworld.io/lara/public/upload/"+record.business_id_id.header_image} 
              alt=""
            />
          </td>
          <td className="content-tr">
            <div className="">
              <p className="bold text-left mb3px">Received Referral Reward Points</p>
              <small>
              <p className="text-left">{moment(record.created_at).fromNow()}</p>
              </small>
            </div>
            
          </td>

          <td className="amt-tr">
            <p className="set_amount">₹ {record.amount}</p> 
          </td>
        
        </tr>
       
        
      </tbody>
    </table>
    </Link>
   </>:<></>}
   </>}</>}
   </>}
    <hr/>
  
  </div>
  </> ))}
        </> :<></>}
  </div>




          </div>
         </div>     
    )





};

Paid_Transaction.propTypes = {};

Paid_Transaction.defaultProps = {};

export default Paid_Transaction;
