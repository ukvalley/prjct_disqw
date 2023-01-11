import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import './Enquiry.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Swal from 'sweetalert2'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,useParams
} from 'react-router-dom';
import { BiAbacus, BiBrightness, BiStar, BiHive, BiUserPlus, BiShapePolygon, BiCalendarStar, BiSearchAlt2 } from "react-icons/bi";
import { FaBullseye } from "react-icons/fa";


const Enquiry = () => {
    const [Loader, setLoader] = useState(false);
    const { id } = useParams();
    const [Leads ,setLeads] =useState(null);
    const vid = localStorage.getItem('user');

    useEffect(() => {
        fetch_data(vid);            
      }, []);

    
      async function fetch_data(vid){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/LeadsByVid/"+vid)
        .then(res => {
      
          setLeads(res.data.Leads[0]);          
          
           console.log(res.data.Leads);
      
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }

    return (


        <main>
            <div className="Enquiry dashboard">



                <div id="main">

                    <div className="mt-5">
                        <div className="">
                            <div className="card">
                                <div className="container-fluid">
                                    <div className="section">

                                    {Leads != null
                                     ?
                                      <>
                                        <div className='col-md-12 mt-5 px-0 py-0'>
                                            <h3>View Enquiry List</h3>

                                            <div class="table-responsive-lg view_list_table">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No.</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Contact Number</th>
                                                          <th scope="col">Comment</th>
                                                          <th scope="col">Listing Id</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {Leads.map((record, index) => (
                                                      <>
                                                        <tr>
                                                            <th scope="row">{index+1}</th>
                                                            <td>{record.name}</td>
                                                            <td>{record.email}</td>
                                                            <td>{record.phone}</td>
                                                            <td>{record.description}</td>
                                                            <td>{record.listing_id}</td>



                                                        </tr>
                                                        </> ))} 

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        </>
              :<></>
              }
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

Enquiry.propTypes = {};

Enquiry.defaultProps = {};

export default Enquiry;
