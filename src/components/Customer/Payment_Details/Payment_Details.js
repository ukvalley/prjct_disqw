import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import './Payment_Details';
import axios from 'axios';
import Swal from 'sweetalert2'
import { GoVerified} from "react-icons/go";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,useParams
} from 'react-router-dom';
import * as moment from 'moment';
import logo from '../images/discount_logo.png';


const Payment_Details = () => {
    const [Transaction, setTransaction] = useState(null);
    const [Loader, setLoader] = useState(false);
    const { id } = useParams();
    const vid = localStorage.getItem('user');

    useEffect(() => {
        fetch_data(vid);            
      }, []);


      function intToEnglish(number){

        var NS = [
            {value: 1000000000000000000000, str: "sextillion"},
            {value: 1000000000000000000, str: "quintillion"},
            {value: 1000000000000000, str: "quadrillion"},
            {value: 1000000000000, str: "trillion"},
            {value: 1000000000, str: "billion"},
            {value: 1000000, str: "million"},
            {value: 1000, str: "thousand"},
            {value: 100, str: "hundred"},
            {value: 90, str: "ninety"},
            {value: 80, str: "eighty"},
            {value: 70, str: "seventy"},
            {value: 60, str: "sixty"},
            {value: 50, str: "fifty"},
            {value: 40, str: "forty"},
            {value: 30, str: "thirty"},
            {value: 20, str: "twenty"},
            {value: 19, str: "nineteen"},
            {value: 18, str: "eighteen"},
            {value: 17, str: "seventeen"},
            {value: 16, str: "sixteen"},
            {value: 15, str: "fifteen"},
            {value: 14, str: "fourteen"},
            {value: 13, str: "thirteen"},
            {value: 12, str: "twelve"},
            {value: 11, str: "eleven"},
            {value: 10, str: "ten"},
            {value: 9, str: "nine"},
            {value: 8, str: "eight"},
            {value: 7, str: "seven"},
            {value: 6, str: "six"},
            {value: 5, str: "five"},
            {value: 4, str: "four"},
            {value: 3, str: "three"},
            {value: 2, str: "two"},
            {value: 1, str: "one"}
          ];
        
          var result = '';
          for (var n of NS) {
            if(number>=n.value){
              if(number<=20){
                result += n.str;
                number -= n.value;
                if(number>0) result += ' ';
              }else{
                var t =  Math.floor(number / n.value);
                var d = number % n.value;
                if(d>0){
                  return intToEnglish(t) + ' ' + n.str +' ' + intToEnglish(d);
                }else{
                  return intToEnglish(t) + ' ' + n.str;
                }
        
              }
            }
          }
          return result;
        }

    
      async function fetch_data(vid){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/TransactionDetail/"+id)
        .then(res => {
      
          setTransaction(res.data.Transaction); 
          
          
           console.log(res.data.Transaction);
      
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }

    return (
        <main>
            <div className="Payment_Details">
            <div className="container  mt-5">
            {Transaction != null
                     ?
                    <>
                     
            <div className="card"  style={{ padding: 11 }}>
               <div className="col-12">
                <h5 className="text-left">Amount</h5> 
                <div className="mt-2"><h3 className="text-left">₹ {Transaction.amount} <GoVerified style={{ color:"green" }}/></h3></div>
                <p className="text-left">{intToEnglish(Transaction.amount)} Rupees Only</p>
               </div> 
               <hr/>

               <div className="col-12">
                <h5 className="text-left">To</h5> 
               
                 <table className="table">
                 <tbody>    
                  <>
                    <div className="text-left">
                      <p className="text-left">{Transaction.business_id_id.name} <GoVerified style={{color:"#00a2ff"}}/> <br/></p>   
                            
                    </div>
                  </>
                  
                <td className="text-right">
                  <img
                    className="pic"
                    src={"https://callistoworld.io/lara/public/upload/"+Transaction.business_id_id.header_image}
                    alt=""
                    />
                </td>
       
     
        
      </tbody>
                </table>
  
               </div> 
               <hr/>
               <div className="col-12 mb-0">
                <h5 className="text-left">From</h5> 
                <div className="mt-2"><h3 className="text-left">DISQ Wallet</h3></div>
                <p className="text-left">Closing Balance : {Transaction.main_wallet}</p>
               </div> 
            </div>
           
            </> :<></>}
            </div>
            </div >
        </main >
    )





};

Payment_Details.propTypes = {};

Payment_Details.defaultProps = {};

export default Payment_Details;
