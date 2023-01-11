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
    Link
} from 'react-router-dom';


import { BiAbacus, BiBrightness, BiStar, BiHive, BiUserPlus, BiShapePolygon, BiCalendarStar, BiSearchAlt2 } from "react-icons/bi";
import { FaBullseye } from "react-icons/fa";


const Products = () => {


    return (


        <main>
            <div className="Products dashboard">



                <div id="main">

                    <div className="">
                        <div className="container">
                            <div className="">
                                <div className="container-fluid">
                                    <div className="section">


                                        <div className='col-md-12 mt-5 px-0 py-0'>
                                            <h3>Products List</h3>

                                            <div class="table-responsive-lg view_list_table">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No.</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Description</th>
                                                            <th scope="col">Price Unit</th>
                                                            <th scope="col">Discount Percentage</th>
                                                            <th scope="col">Product Image</th>
                                                            <th scope="col">Image 1</th>
                                                            <th scope="col">Image 2</th>
                                                            <th scope="col">Image 3</th>
                                                            <th scope="col">Image 4</th>
                                                            <th scope="col">Image 5</th>




                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">1</th>
                                                            <td>Demo</td>
                                                            <td>Demo</td>
                                                            <td>Demo</td>
                                                            <td>Demo</td>
                                                            <td>Demo</td>
                                                            <td>Demo</td>
                                                            <td>Demo</td>
                                                            <td>Demo</td>
                                                            <td>Demo</td>
                                                            <td>Demo</td>



                                                        </tr>


                                                    </tbody>
                                                </table>
                                            </div>
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

Products.propTypes = {};

Products.defaultProps = {};

export default Products;
