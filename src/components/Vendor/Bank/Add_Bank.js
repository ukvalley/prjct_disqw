import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import './Add_Bank.css';
import { useParams,Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Swal from 'sweetalert2'



const Add_Bank = () => {
 
    const [Loader,setLoader]= useState(false);
    const [BusinessListing ,setBusinessListing]=useState(null);
    const [bank_name,setbank_name] = useState("");
    const [account_name,setaccount_name] = useState("");
    const [account_number,setaccount_number] = useState("");
    const [ifsc_code,setifsc_code] = useState("");
    const [upi_id,setupi_id] = useState("");
    const [account_type,setaccount_type] = useState("");
    const vid = localStorage.getItem('bid');
    const [listing_id,setlisting_id] = useState(vid);
    const [is_active,setis_active] = useState("");
    const {id } = useParams();

   
    const handleSubmit = (event) =>{
        event.preventDefault();
        if(bank_name,account_number,ifsc_code,account_type,upi_id,listing_id,is_active,account_name)
        {         
            BankRegistration(bank_name,account_number,ifsc_code,account_type,upi_id,listing_id,is_active,account_name);
        } 
      else {
        Swal.fire({
            title: 'Validation Error',
            text: 'Enter Proper Data',
            icon: 'error',
            confirmButtonText: 'Okay'
        })
    }
    
       
       }
       async function BankRegistration(bank_name,account_number,ifsc_code,account_type,upi_id,listing_id,is_active,account_name){
    
          setLoader(true);
    
        let f_data = new FormData();
        f_data.append('bank_name', bank_name);
        f_data.append('account_number',account_number);
        f_data.append('ifsc_code', ifsc_code);
        f_data.append('account_type',account_type);
        f_data.append('upi_id',upi_id);
        f_data.append('listing_id',listing_id);
        f_data.append('is_active', is_active);
        f_data.append('account_name', account_name);
       
       
     
        await axios.post("https://callistoworld.io/lara/public/api/BankAccountsRegistration",
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
        if (response.data.status == "true") {
            Swal.fire({
                title: response.data.message,
                text: 'Data Added Successfully',
                icon: 'success',
                confirmButtonText: 'Okay'
            })
            //navigate('/Vendor_Main/Viewlist')
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

    useEffect(() => {
        fetch_data();             
      }, []);

      async function fetch_data(){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/BusinessListingByVid/"+vid)
        .then(res => {
      
          setBusinessListing(res.data.BusinessListing);              
           console.log(res.data.BusinessListing);
           console.log(vid);
      
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }      

    return (


        <main>
            <div className="Add_Bank">
                <div id="main mt-5">
                    <div className="col s12">
                        <div className="container mt-5">
                            <div className="container-fluid px-0 py-0 mx-auto">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card">
                                            <h5 className="text-center mb-4 mt-2"><b>Add Bank Account</b></h5>
                                            <form onSubmit={handleSubmit}>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Bank Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="bank_name"
                                                            name="bank_name"
                                                            onChange={(e) => setbank_name(e.target.value)}
                                                            placeholder="Enter Bank Name"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Account Number</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="account_number"
                                                            name="account_number"
                                                            onChange={(e) => setaccount_number(e.target.value)}

                                                            placeholder="Enter Account Number"
                                                        />

                                                    </div>
                                                </div>


                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Ifsc Code</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="ifsc_code"
                                                            name="ifsc_code"
                                                            onChange={(e) => setifsc_code(e.target.value)}
                                                            placeholder="Enter ifsc_code"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Account Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="account_name"
                                                            name="account_name"
                                                            onChange={(e) => setaccount_name(e.target.value)}

                                                            placeholder="Enter Description"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-5 ">
                                                    <div className="form-group">
                                                    <select className="form-select"
                                                     value={account_type}
                                                     onChange={(e) => setaccount_type(e.target.value)}
                                                     id="account_type">
                                                    <option selected="">Account Type</option>
                                                    <option value="saving">Saving</option>
                                                    <option value="current">Current</option> 
                                                </select>


                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">UPI ID</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="upi_id"
                                                            name="upi_id"
                                                            onChange={(e) => setupi_id(e.target.value)}

                                                            placeholder="Enter upi_id"
                                                        />
                                                    </div>
                                                </div>

                                               
                                                <div className="col-md-6 mt-5 ">
                                                    <div className="form-group">
                                                    <select className="form-select"
                                                     value={is_active}
                                                     onChange={(e) => setis_active(e.target.value)}
                                                     id="is_active">
                                                    <option selected="">Staus</option>
                                                    <option value="active">Active</option>
                                                    <option value="in_ctive">In Active</option> 
                                                </select>


                                                    </div>
                                                </div>
                                                
                                                {BusinessListing != null
                                                    ?
                                                     <>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                    <select className="form-select"
                                                     value={listing_id}
                                                     onChange={(e) => setlisting_id(e.target.value)}
                                                     id="listing_id">
                                                  <option>Business Listing</option>

                                                        {BusinessListing.map((record, index) => (
                                                          <>
                                                    <option value={record.id}>{record.name}</option>
                                                    </> ))} 
                                                </select>


                                                    </div>
                                                </div>

                                                </> :<></>
                                                }
                                               

                                              <div className="col-md-12 mb-3">
                                                    <button type="submit" className="btn btn-primary">
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>





            </div >
        </main >
    )





};

Add_Bank.propTypes = {};

Add_Bank.defaultProps = {};

export default Add_Bank;
