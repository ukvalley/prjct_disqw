import React, { useState, useEffect, handleNavigation } from "react";
import { Link } from "react-router-dom";
import './Wallet.css';
import pay from '../images/disq11.png';
import Bank from '../images/disq2.png';
import passbook from '../images/dis.png';
import axios from 'axios';
import Swal from 'sweetalert2'
import Loder from "../Loder";



const Wallet = () => {

  const [data, setData] = useState('No result');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(0);
  const [key, setKey] = useState('');
  const [access_key , setaccess_key] = useState('');
  const [Loader, setLoader] = useState(false);
  const [HomeSetting, setHomeSetting] = useState(null);
  const [Transactionhash , setTransactionhash] = useState('');

  

  const uid = localStorage.getItem('user');


  const handleChange = event => {
    const result = event.target.value.replace(/[^0-9]/gi, '');
    setAmount(result);

    console.log('value is:', result);
  };


  useEffect(() => {
    console.log('clicked')
    fetch_data(); 
  }, []);



  const handleClick =input => {
    let buttonText = input.target.innerText;
    setAmount(parseInt(amount)+parseInt(buttonText));
    console.log(buttonText);
  }

  

  async function fetch_data(){
    setLoader(true);
    
    axios.get("https://callistoworld.io/lara/public/api/HomeApi/1")
    .then(res => {

      setHomeSetting(res.data.HomeSetting);
    
      console.log(res.data.HomeSetting);
      setLoader(false);
  }).catch(error => {
      console.log('errr', error)
      setLoader(false);
  })
  }
  const handleClickPay = event =>{
    let svpa ="9890437811@paytm";
          let ref ="9890437811";
          let tr = "1234";
          let deeplink =   "upi://pay?pa="+svpa+"&pn="+"DiscountWallet"+"&tid="+ref +"&tr="+tr +"&tn=paytodisq&am="+"1.00"+"";
          
          const url = new URL(deeplink);

          console.log(url);

          create_deposit_request();
          
          
  }


  async function create_deposit_request()
  {
    
    let f_data = new FormData();
    f_data.append('amount', amount);
    f_data.append('user_id', uid);
    f_data.append('transaction_hash', Transactionhash);
    
  
    axios.post("https://callistoworld.io/lara/public/api/deposit_request",f_data ,
    { headers: {
       'accept': 'application/json',
       'Accept-Language': 'en-US,en;q=0.8',
       'Content-Type': `form-data;`,
     }})
     .then(function (response)
     {
        console.log(response);
        setLoader(false);
        if (response.data.status == "true") {

            
            Swal.fire({
                title: response.data.message,
                text: 'Deposit Requested Successfully',
                icon: 'success',
                confirmButtonText: 'Okay'
            })
                
           
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


    if(HomeSetting == null)
    {
      return(
        <Loder/>
      )
     
    }

          

    return (


        <main>
            <div className="Wallet">
             <div id="main">
             
             <div className="container1 mt-4">
             <div className="card ">
            <div className="card-body text-center">
               <div className="row mt-3">
                <div className="col">
                 <a href="#" className="card-link ">
                 <Link to="/Customer_Main/PayScanner">
                  <img className="icon_size" src={pay}/>              
                 </Link>              
                 </a>
                 <p className="mt-1 text-muted">Scan & Pay</p>
                </div>
                <div className="col">
               <a href="#" className="card-link">
              <Link to="/Customer_Main/Customer_Venodor_Pay">
              <img className="icon_size" src={Bank }/>
              </Link>
             </a>
             <p className="mt-1 text-muted">Search & Pay</p>
             </div>
                <div className="col">
                 <a href="#" className="card-link ">
                 <Link to="/Customer_Main/Paid_Transaction">
                  <img className="icon_size" src={passbook}/>              
                 </Link>              
                 </a>
                 <p className="mt-1 text-muted">Balance & History</p>
                </div>
                
            </div>
                    
             </div>
            </div>

         
            <div className="mt-5">
             <div className="card" >
            <div className="card-body text-center">
             <h5 className="card-title">Add Money</h5>
             <div className="mt-3">          

             <img style={{width:"200px"}} src={"https://callistoworld.io/lara/public/upload/"+HomeSetting.company_qr_code}></img>   
              <h6>{HomeSetting.company_upi_id} <span><button 
              onClick={() =>  {
                navigator.clipboard.writeText(HomeSetting.company_upi_id);
                alert('Copied Successfully')
              }}
              >Copy</button></span></h6>
              <form>
                <input 
                 type="number"
                 placeholder="0" 
                 className="form-control"
                 value={amount}
                 onChange={handleChange}
                 
                 />             

             
            <div className="col-12">
            <button type="button"
             className="btn btn-outline-primary btn-lg"             
             onClick={handleClick}>+100</button>
             <button type="button"
             className="btn_set btn btn-outline-primary btn-lg"             
             onClick={handleClick}>+200</button>
           
            <button type="button"
             className="btn_set btn btn-outline-primary btn-lg"             
             onClick={handleClick}>+500</button>
             
            <button type="button"
             className="btn_set btn btn-outline-primary btn-lg"             
             onClick={handleClick}>+1000</button>
            </div>  


            <input 
                 type="text"
                 placeholder="Enter Transaction ID / UTR" 
                 className="form-control"
                 value={Transactionhash}
                 onChange={(e) => setTransactionhash(e.target.value)}
                 
                 />    

            <button type="button" className="btn_set btn btn-primary mt-3 btn-lg" style={{    background: "#2e108e"}}
            onClick={handleClickPay}>Proceed To Pay</button>
             </form>
              </div>
             </div>
            </div>
            </div>
            
             </div>

             </div>
             </div>

        </main >
    )





};

Wallet.propTypes = {};

Wallet.defaultProps = {};

export default Wallet;
