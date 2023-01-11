import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import { useParams,Link,useNavigate } from 'react-router-dom';
import './Edit_Faq.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Swal from 'sweetalert2'



const Edit_Faq = () => {
const [Loader,setLoader]= useState(false);
const [Faq ,setFaq]=useState(null);
const {id } = useParams();
const [BusinessListing ,setBusinessListing]=useState(null);

const [question ,setquestion]=useState("");
const [answer,setanswer]=useState("");
const [listing_id ,setlisting_id]=useState("");
const navigate = useNavigate();
const vid = localStorage.getItem('user');

const handleSubmit = (event) =>{
    event.preventDefault();
   FaqRegistration(question,answer,listing_id);   
   }

   async function FaqRegistration(question,answer,listing_id){

    setLoader(true);

    let f_data = new FormData();
    f_data.append("listing_id",listing_id);
    f_data.append("question",question);
    f_data.append("answer",answer);

    await axios.post("https://callistoworld.io/lara/public/api/FaqUpdate/"+id,
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
    fetch_data_business();            
  }, []);
  
  const fetch_data_business = async () => {
    await axios.get("https://callistoworld.io/lara/public/api/BusinessListingByVid/"+vid)
    .then(res => { 
        console.log(res.data.BusinessListing);
        setBusinessListing(res.data.BusinessListing);
      
      
  
      
  
      setLoader(false);
  }).catch(error => {
      console.log('errr',error)
      setLoader(false);
  })
  }

  async function fetch_data(){
    setLoader(true);
    
    axios.get("https://callistoworld.io/lara/public/api/FaqsById/"+id)
    .then(res => {
  
      setFaq(res.data.Faq);    
      setquestion(res.data.Faq.question);
      setanswer(res.data.Faq.answer);    
      setlisting_id(res.data.Faq.listing_id);      
       console.log(res.data.Faq);
     
  
      setLoader(false);
  }).catch(error => {
      console.log('errr', error)
      setLoader(false);
  })
  }  

    return (


        <main>
            <div className="Edit_Faq dashboard">
              <div id="main">

                    <div className="col s12">
                        <div className="container">
                            <div className="container-fluid px-0 py-0 mx-auto">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-xl-12 col-lg-12 mt-5 col-md-12">
                                        <div className="card">
                                            <h5 className="text-center mb-4 mt-2"><b>Add Faq's</b></h5>
                                            <form  onSubmit={handleSubmit} encType="multipart/form-data">
                                                
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
                                                <div className="col-md-6 ">
                                                    <div className="form-group">
                                                      
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="question"
                                                            name="question"
                                                            value={question}
                                                            onChange={(e) => setquestion(e.target.value)}
                                                            placeholder="Enter Question "
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-4">
                                                    <div className="form-group">
                                                           <input
                                                            type="text"
                                                            className="form-control"
                                                            id="answer"
                                                            name="answer"
                                                            value={answer}
                                                            onChange={(e) => setanswer(e.target.value)}
                                                            placeholder="Enter Answer"
                                                        />

                                                    </div>
                                                </div>



                                                <div className="col-md-12 mt-2 mb-3">
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

Edit_Faq.propTypes = {};

Edit_Faq.defaultProps = {};

export default Edit_Faq;
