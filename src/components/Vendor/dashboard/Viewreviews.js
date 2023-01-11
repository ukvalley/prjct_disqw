import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import './Dashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Swal from 'sweetalert2'

import './report.css';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,useParams
} from 'react-router-dom';


import { BiAbacus, BiBrightness, BiStar, BiHive, BiUserPlus, BiShapePolygon, BiCalendarStar, BiSearchAlt2 } from "react-icons/bi";
import { FaBullseye } from "react-icons/fa";


const Viewreviews = () => {
    const [Loader, setLoader] = useState(false);
    const { id } = useParams();
    const [Reviews ,setReviews] =useState(null);
    const vid = localStorage.getItem('bid');

    useEffect(() => {
        fetch_data(vid);            
      }, []);

    
      async function fetch_data(vid){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/ReviewsByVid/"+vid)
        .then(res => {
      
          setReviews(res.data.Reviews[0]);          
          
           console.log(res.data.Reviews);
      
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }

    return (


        <main>
            <div className="Viewreviews dashboard">



                <div id="main">

                    <div className="mt-5">
                        <div className="">
                            <div className="card">
                                <div className="container-fluid">
                                    <div className="section">

                                    {Reviews != null
                                     ?
                                      <>
                                        <div className='col-md-12 mt-5 px-0 py-0'>
                                            <h3>View Reviews List</h3>

                                            <div class="table-responsive-lg view_list_table">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No.</th>
                                                            <th scope="col">User Id</th>
                                                            <th scope="col">Review</th>
                                                            <th scope="col">Listing Id</th>
                                                          <th scope="col">Comment</th>
                                                          <th scope="col">Content</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {Reviews.map((record, index) => (
                                                      <>
                                                        <tr>
                                                            <th scope="row">{index+1}</th>
                                                            <td>{record.user_id}</td>
                                                            <td>{record.review}</td>
                                                            <td>{record.listing_id}</td>
                                                            <td>{record.comment}</td>
                                                            <td>{record.content}</td>



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

Viewreviews.propTypes = {};

Viewreviews.defaultProps = {};

export default Viewreviews;
