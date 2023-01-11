import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import './Dashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Swal from 'sweetalert2'
import './list.css';




import { BiAbacus, BiBrightness, BiStar, BiHive, BiUserPlus, BiShapePolygon, BiCalendarStar, BiSearchAlt2 } from "react-icons/bi";
import { FaBullseye } from "react-icons/fa";


const Addlist = () => {


    return (


        <main>
            <div className="Addlist dashboard">



                <div id="main">

                    <div className="col s12">
                        <div className="container">
                            <div className="container-fluid px-0 py-0 mx-auto">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card">
                                            <h5 className="text-center mb-4 mt-2"><b>Add Business Listing</b></h5>
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
                                                        <label htmlFor="exampleInputEmail1">Description</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter Description"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Mobile</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter Mobile"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Category</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter Category"
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
                                                        <label htmlFor="exampleInputEmail1">G-Map Latitude</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Google Map Latitude"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">G-Map Longitude</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Google Map Longitude"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Meta Title</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Meta Title"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Meta Description</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Meta Description"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Url Slug</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Url Slug"
                                                        />

                                                    </div>
                                                </div>


                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Visit Count</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Visit Count"
                                                        />

                                                    </div>
                                                </div>


                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Header Image</label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Header Image"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Image 1</label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Image 1"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Image 2</label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Image 2"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Image 3</label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Image 3"
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

Addlist.propTypes = {};

Addlist.defaultProps = {};

export default Addlist;
