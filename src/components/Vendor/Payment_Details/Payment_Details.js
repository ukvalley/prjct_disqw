import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import './Payment_Details';
import axios from 'axios';
import { GoVerified} from "react-icons/go";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,useParams
} from 'react-router-dom';
import * as moment from 'moment';


const Payment_Details = () => {
    const [VendorTransaction, setVendorTransaction] = useState(null);
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
        
        axios.get("https://callistoworld.io/lara/public/api/VendorTransactionById/"+id)
        .then(res => {
      
          setVendorTransaction(res.data.VendorTransaction);          
          
           console.log(res.data.VendorTransaction);
      
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
            {VendorTransaction != null
                     ?
                    <>
                 {VendorTransaction.transaction_type == "received" ?<>     
            <div className="card"  style={{ padding: 11 }}>
               <div className="col-12">
                <h5 className="text-left">Amount</h5> 
                <div className="mt-2"><h3 className="text-left">₹ {VendorTransaction.amount} <GoVerified style={{ color:"green" }}/></h3></div>
                <p className="text-left">{intToEnglish(VendorTransaction.amount)} Rupees Only</p>
               </div> 
               <hr/>

               <div className="col-12">
                <h5 className="text-left">From</h5> 
               
                 <table className="table">
                 <tbody>    
                  <>
                    <div className="text-left">
                      <p className="text-left">{VendorTransaction.business_id_id.name} <GoVerified style={{color:"#00a2ff"}}/> <br/>{VendorTransaction.user_id.name}</p>   
                            
                    </div>
                  </>
                  
                      
     
        
      </tbody>
                </table>
  
               </div> 
               <hr/>
               <div className="col-12 mb-0">
                <h5 className="text-left">For</h5> 
                <p className="text-left">Transaction Type {VendorTransaction.transaction_type}</p>
               </div> 
            </div>
           </>:<>



           {VendorTransaction.transaction_type == "product_purchase" ?<>     
            <div className="card"  style={{ padding: 11 }}>
               <div className="col-12">
                <h5 className="text-left">Amount</h5> 
                <div className="mt-2"><h3 className="text-left">₹ {VendorTransaction.amount} <GoVerified style={{ color:"green" }}/></h3></div>
                <p className="text-left">{intToEnglish(VendorTransaction.amount)} Rupees Only</p>
               </div> 
               <hr/>

               <div className="col-12">
                <h5 className="text-left">From</h5> 
               
                 <table className="table">
                 <tbody>    
                  <>
                    <div className="text-left">
                      <p className="text-left">{VendorTransaction.business_id_id.name} <GoVerified style={{color:"#00a2ff"}}/> <br/>{VendorTransaction.user_id.name}</p>   
                            
                    </div>
                  </>
                  
                      
     
        
      </tbody>
                </table>
  
               </div> 
               <hr/>
               <div className="col-12 mb-0">
                <h5 className="text-left">For</h5> 
                <p className="text-left">Transaction Type {VendorTransaction.transaction_type}</p>
               </div> 
            </div>
           </>:<></>}
           {VendorTransaction.transaction_type == "cashback" ?<>     
            <div className="card"  style={{ padding: 11 }}>
               <div className="col-12">
                <h5 className="text-left">Amount</h5> 
                <div className="mt-2"><h3 className="text-left">₹ {VendorTransaction.amount} <GoVerified style={{ color:"green" }}/></h3></div>
                <p className="text-left">{intToEnglish(VendorTransaction.amount)} Rupees Only</p>
               </div> 
               <hr/>

               <div className="col-12">
                <h5 className="text-left">From</h5> 
               
                 <table className="table">
                 <tbody>    
                  <>
                    <div className="text-left">
                      <p className="text-left">{VendorTransaction.business_id_id.name} <GoVerified style={{color:"#00a2ff"}}/> <br/></p>   
                            
                    </div>
                  </>
                  
                      
     
        
      </tbody>
                </table>
  
               </div> 
               <hr/>
               <div className="col-12 mb-0">
                <h5 className="text-left">For</h5> 
                <p className="text-left">Transaction Type {VendorTransaction.transaction_type}</p>
               </div> 
            </div>
           </>:<>
           {VendorTransaction.transaction_type == "fees_deduction" ?<>     
            <div className="card"  style={{ padding: 11 }}>
               <div className="col-12">
                <h5 className="text-left">Amount</h5> 
                <div className="mt-2"><h3 className="text-left">₹ {VendorTransaction.amount} <GoVerified style={{ color:"green" }}/></h3></div>
                <p className="text-left">{intToEnglish(VendorTransaction.amount)} Rupees Only</p>
               </div> 
               <hr/>

               <div className="col-12">
                <h5 className="text-left">From</h5> 
               
                 <table className="table">
                 <tbody>    
                  <>
                    <div className="text-left">
                      <p className="text-left">{VendorTransaction.business_id_id.name} <GoVerified style={{color:"#00a2ff"}}/> <br/>{VendorTransaction.user_id.name}</p>   
                            
                    </div>
                  </>
                  
                      
     
        
      </tbody>
                </table>
  
               </div> 
               <hr/>
               <div className="col-12 mb-0">
                <h5 className="text-left">To</h5> 
                <p className="text-left">Transaction Type {VendorTransaction.transaction_type}</p>
               </div> 
            </div>
           </>:<>
            {VendorTransaction.transaction_type == "reconciliation" ?<>     
            <div className="card"  style={{ padding: 11 }}>
               <div className="col-12">
                <h5 className="text-left">Amount</h5> 
                <div className="mt-2"><h3 className="text-left">₹ {VendorTransaction.amount} <GoVerified style={{ color:"green" }}/></h3></div>
                <p className="text-left">{intToEnglish(VendorTransaction.amount)} Rupees Only</p>
               </div> 
               <hr/>

               <div className="col-12">
                <h5 className="text-left">From</h5> 
               
                 <table className="table">
                 <tbody>    
                  <>
                    <div className="text-left">
                      <p className="text-left">{VendorTransaction.business_id.name} <GoVerified style={{color:"#00a2ff"}}/> <br/>{VendorTransaction.user_id.name}</p>   
                            
                    </div>
                  </>
                  
                      
     
        
      </tbody>
                </table>
  
               </div> 
               <hr/>
               <div className="col-12 mb-0">
                <h5 className="text-left">For</h5> 
                <p className="text-left">Transaction Type {VendorTransaction.transaction_type}</p>
               </div> 
            </div>
           </>:<>
           </>}
           </>}</>}
           </>}
            </> :<></>}
            </div>
            </div>
        </main >
    )





};

Payment_Details.propTypes = {};

Payment_Details.defaultProps = {};

export default Payment_Details;
