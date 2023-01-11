import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import './Dashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Swal from 'sweetalert2'
import './list.css';




import { BiAbacus, BiBrightness, BiStar, BiHive, BiUserPlus, BiShapePolygon, BiCalendarStar, BiSearchAlt2 } from "react-icons/bi";
import { FaBullseye } from "react-icons/fa";


const Add_Branch = () => {


    return (


        <main>
            <div className="Add_Branch dashboard">



                <div id="main">

                    <div className="col s12">
                        <div className="container">
                            <div className="container-fluid px-0 py-0 mx-auto">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card">
                                            <h5 className="text-center mb-4 mt-2"><b>Add Branch</b></h5>
                                            <form>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter Business Listing Name"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Address</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter Address"
                                                        />

                                                    </div>
                                                </div>


                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Country</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter Country"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">State</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter State"
                                                        />

                                                    </div>
                                                </div>




                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">City</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter City"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">G-map Latitude</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter G-map Latitude"
                                                        />

                                                    </div>
                                                </div>







                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">G-map Longitude</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Entar G-map Longitude"
                                                        />

                                                    </div>
                                                </div>





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

Add_Branch.propTypes = {};

Add_Branch.defaultProps = {};

export default Add_Branch;
