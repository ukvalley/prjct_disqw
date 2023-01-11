import React, { useState, useEffect, handleNavigation } from "react";
import './Payment.css';
import { useParams,Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import "react-alice-carousel/lib/alice-carousel.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as moment from 'moment';
import Loder from "../../Loder";
import { FcOk } from 'react-icons/fc';

const Payment = () => {
  const [amount, setamount] = useState(0);
  const [Loader, setLoader] = useState(false);
  const [BusinessListing, setBusinessListing] = useState(null);
  const [Wallet, setWallet] = useState(null);
  const {id } = useParams();
  const uid = localStorage.getItem('user');
  const navigate = useNavigate();

  const handleChange = event => {
    const result = event.target.value.replace(/[^0-9]/gi, '');
    setamount(result);
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    if(amount)
      {         
    PayTransection(amount);
    } 
    else {
      Swal.fire({
          title: 'Validation Error',
          text: 'Enter Proper Amount',
          icon: 'error',
          confirmButtonText: 'Okay'
      })
  }
   
   }

   async function PayTransection(amount){

     setLoader(true);

    let f_data = new FormData();
    f_data.append('amount',amount);
    f_data.append('vid',BusinessListing.vendor);
    f_data.append('bid',BusinessListing.id);
    f_data.append('uid',uid);

    console.log(f_data);
      
    await axios.post("https://callistoworld.io/lara/public/api/PayToVendor",
    f_data,
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
            text: 'Payment Transfer Success',
            icon: 'success',
            confirmButtonText: 'Okay'
        })
        navigate('/Customer_Main/Payment_Details/'+response.data.Transaction.id)
    }

    else {
        setLoader(false);
        Swal.fire({
            title: response.data.message,
            text: 'Payment Transfer Failed',
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
        text: 'Payment Transfer Failed',
        icon: 'error',
        confirmButtonText: 'Okay'
    })
});
}
  useEffect(() => {
    fetch_data();            
  }, []);

  async function fetch_data(){
    setLoader(true);
    
    axios.get("https://callistoworld.io/lara/public/api/BusinessSingle/"+id)
    .then(res => {
    
      setBusinessListing(res.data.BusinessListing);       
       console.log(res.data);
     

      
  }).catch(error => {
      console.log('errr', error)
      
  })


 
    
  axios.get("https://callistoworld.io/lara/public/api/fetchWallet/"+uid)
  .then(res => {
  
    setWallet(res.data.Wallet);       
     console.log(res.data);
   

     setLoader(false);
}).catch(error => {
    console.log('errr', error)
    setLoader(false);
})

  }

 

  if(BusinessListing == null || Loader == true || Wallet == null)
  {
    return (
    <>
    
    <Loder/>
    
    </>
    )
    
  }
  else {

  


    return (
        <div className="Payment body">
         <div className="container mt-1 color_body_a">
        
         {Wallet != null
    ?<>  
            <form onSubmit={handleSubmit}>
            <div className="size_abc mt-1">
           
            <img className="Vendor_icon" 
            src={"https://callistoworld.io/lara/public/upload/"+BusinessListing.header_image} />

            <div className="mt-3">
                <h3 className="Vendor_name text-center">{BusinessListing.name}</h3>
                <p className="text-center vendor_id1"><FcOk className="vendor_id"/> DW00111</p>
            </div>
          
            <div className="mt-5">
            <p className="text-center">You are paying</p>
           
            <input type="number" 
             id="amount"
             name="amount"
             value={amount}
             onChange={(e) => setamount(e.target.value)}
             placeholder="₹ 0" 
             className="form-control amtinpt"/>

            </div>              
            
            <div className="mt-3"></div>       
            
            </div>

            <div className="mt-5">
            <div className="text-center">
            <h5 className="wallet_color">Wallet Balance <b>{Wallet.main_wallet}</b></h5>
            </div>
            <div className="b_size text-center">
               
            <button className="btn btn-primary btn-lg btn_size">Pay</button>
            
            </div>
            </div>
            </form>
      </>
      :<></>
      }
             </div>
         </div>     
    )


  }


};

Payment.propTypes = {};

Payment.defaultProps = {};

export default Payment;
