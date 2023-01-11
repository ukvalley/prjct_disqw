import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import { useParams,Link,useNavigate } from 'react-router-dom';

import './Edit_Social.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Swal from 'sweetalert2'
import { BsFacebook } from 'react-icons/bs';

const Edit_Social = () => {
    const [SocialMediaType ,setSocialMediaType] = useState(null);
    const [Loader, setLoader] = useState(false);
    const [name,setname] = useState("");
    const [account_profile,setaccount_profile] = useState("");
    const [account_url,setaccount_url] = useState("");
    const [is_active,setis_active] = useState("");
    const {id } = useParams();

    useEffect(() => {
        fetch_data(); 
        fetch_data_id();           
      }, []);

      async function fetch_data_id(){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/FaqsById/"+id)
        .then(res => {
      
               
           console.log(res.data);
         
      
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }  
    
      async function fetch_data(){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/SocialMediaType")
        .then(res => {
      
          setSocialMediaType(res.data.SocialMediaType); 
          
          
           console.log(res.data.SocialMediaType);
      
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }
      
      const handleSubmit = (event) =>{
        event.preventDefault();
        SocialRegistration(account_profile,account_url,is_active);
    
       
       }

       async function SocialRegistration(account_profile,account_url,is_active){
    
          setLoader(true);
    
        let f_data = new FormData();
        f_data.append('account_profile', account_profile);
        f_data.append('account_url',account_url);
        f_data.append('is_active', is_active);
        
       
       
     
        await axios.post("https://callistoworld.io/lara/public/api/SocialMediaUpdate/"+id,
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
    return (


        <main>
            <div className="Edit_Social dashboard">



                <div id="main">

                    <div className="col s12 mt-5">
                        <div className="container">
                            <div className="container-fluid px-0 py-0 mx-auto">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card">
                                            <h5 className="text-center mb-4 mt-2"><b>Add Social Media</b></h5>
                                            <form onSubmit={handleSubmit}>
                                           <div className="col-12">
                                            {SocialMediaType != null
                                                ?
                                                <>
                                            <div className="col-md-6 mt-5 ">
                                                    <div className="form-group">
                                                    <select className="form-select"
                                                     value={account_profile}
                                                     onChange={(e) => setaccount_profile(e.target.value)}
                                                     id="account_profile">
                                                        <option>Select</option>
                                                        {SocialMediaType.map((record, index) => (
                                                          <>
                                                    <option value={record.id}>{record.name}</option>
                                                    </> ))} 
                                                </select>
                                                    </div>
                                                </div>

                                                </> :<></>
                                                }
                                            <div className="col-md-6 mt-5">    
                                            <div className="input-group">
                                               <input
                                                    type="text"
                                                    className="form-control"
                                                    id="account_url"
                                                    name="account_url"
                                                    onChange={(e) => setaccount_url(e.target.value)}
                                                    placeholder="Insert Link"
                                               />
                                             </div>
                                             </div>

                                             </div>

                                             <div className="col-md-6 mt-5 ">
                                                    <div className="form-group">
                                                    <select className="form-select"
                                                     value={is_active}
                                                     onChange={(e) => setis_active(e.target.value)}
                                                     id="is_active">
                                                        <option>Select</option>                                                        
                                                    <option value="active">Active</option>
                                                    <option value="inactive">In Active</option>
                                                    
                                                </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mt-3 mb-3">
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

Edit_Social.propTypes = {};

Edit_Social.defaultProps = {};

export default Edit_Social;
