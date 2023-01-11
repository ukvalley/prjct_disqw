import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import './report.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Swal from 'sweetalert2'
import { BiAbacus, BiBrightness, BiStar, BiHive, BiUserPlus, BiShapePolygon, BiCalendarStar, BiSearchAlt2 } from "react-icons/bi";
import { FaBullseye, FaBell } from "react-icons/fa";
import { AiOutlineBell } from "react-icons/ai";


const My_booking = () => {

  
    return (


        <main>
            <div className="My_booking">
                <div id="main">

                    <div className="col s12">
                        <div className="container">
                            <div className="section">


                                <div className='col-md-12 mt-5'>
                                    <h3>My Bookings</h3>
                                    <p>My Booking list of open, scheduled and completed bookings.</p>
                                    <div className="row">
                                        <div className="mb-3">

                                            <div className="card-report">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between p-md-1">
                                                        <div className="d-flex flex-row">
                                                            <div className="align-self-center-icon mt-1" style={{ fontSize: "25px" }}>
                                                                <i>{<FaBell />}</i>
                                                            </div>
                                                            <div>
                                                                <h6>Notification From Some Data Notification From Some Data</h6>
                                                                <p className="address mb-0"><b>21 Oct 2022</b></p>
                                                            </div>
                                                        </div>


                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-4">

                                            <div className="card-report">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between p-md-1">
                                                        <div className="d-flex flex-row">
                                                            <div className="align-self-center-icon mt-1" style={{ fontSize: "25px" }}>
                                                                <i>{<FaBell />}</i>
                                                            </div>
                                                            <div>
                                                                <h6>Notification From Some Data Notification From Some Data</h6>
                                                                <p className="address mb-0"><b>21 Oct 2022</b></p>
                                                            </div>
                                                        </div>


                                                    </div>

                                                </div>
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

My_booking.propTypes = {};

My_booking.defaultProps = {};

export default My_booking;
