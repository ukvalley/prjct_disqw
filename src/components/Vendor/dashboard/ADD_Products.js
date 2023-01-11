import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import './Dashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Swal from 'sweetalert2'
import './list.css';

import { BiAbacus, BiBrightness, BiStar, BiHive, BiUserPlus, BiShapePolygon, BiCalendarStar, BiSearchAlt2 } from "react-icons/bi";
import { FaBullseye } from "react-icons/fa";


const ADD_Products = () => {


    return (


        <main>
            <div className="ADD_Products">



                <div id="main">

                    <div className="col s12">
                        <div className="container">
                            <div className="container-fluid px-0 py-0 mx-auto">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card">
                                            <h5 className="text-center mb-4 mt-2"><b>Add Products</b></h5>
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
                                                        <label htmlFor="exampleInputEmail1">Price Unit</label>
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
                                                        <label htmlFor="exampleInputEmail1">Discount Percentage</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter Description"
                                                        />

                                                    </div>
                                                </div>




                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Product Image</label>
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

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Image 4</label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Image 4"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Image 5</label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Image 5"
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

ADD_Products.propTypes = {};

ADD_Products.defaultProps = {};

export default ADD_Products;
