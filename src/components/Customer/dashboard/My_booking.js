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

    const [Dashboard_data, SetDashboard_data] = useState(null);
    const [name, setName] = useState('');

    const [Search_data, setSearch_Data] = useState(null);

    const [Loader, setLoader] = useState(false);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        fetch_data();
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();

        if (name.length > 0) {
            search_data(name);
        }
        else {
            Swal.fire({
                title: 'Search Query is blank',
                text: 'Enter Again',
                icon: 'error',
                confirmButtonText: 'Okay'
            })
        }



    }

    async function search_data(name) {

        setLoader(true);
        await axios.get("https://nonstopmoney.live/sweekar_landmark/api/SearchData/" + name)
            .then(res => {

                setSearch_Data(res.data)
                setLoader(false);
            }).catch(error => {
                console.log('errr', error)
                setLoader(false);
            })
    }




    async function fetch_data() {
        setLoader(true);


        console.log('a');

        await axios.get(`https://nonstopmoney.live/sweekar_landmark/api/dashboard_information/TEJAS`)
            .then(res => {

                SetDashboard_data(res.data);
                setLoader(false);
            })
            .catch(error => {
                console.log('errr', error)
                setLoader(false);
            })

    }












    return (


        <main>
            <div className="My_booking">



                <div id="main">

                    <div className="col s12">
                        <div className="container-fluid">
                            <div className="section">


                                <div className='col-md-12 mt-5'>
                                    <h3>My Bookings</h3>
                                    <p>My Booking list of open, scheduled and completed bookings.</p>

                                    <div class="table-responsive-xl">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S.No.</th>
                                                    <th scope="col">Order ID</th>
                                                    <th scope="col">Session Date & Time</th>
                                                    <th scope="col">Package Name</th>
                                                    <th scope="col">Video Communication Platform</th>
                                                    <th scope="col">Session Status</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>1234</td>
                                                    <td>22 oct 2022</td>
                                                    <td>demo package</td>
                                                    <td>demo</td>
                                                    <td>Done</td>
                                                    <td>Done</td>
                                                    <td>View</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>1234</td>
                                                    <td>22 oct 2022</td>
                                                    <td>demo package</td>
                                                    <td>demo</td>
                                                    <td>Done</td>
                                                    <td>Done</td>
                                                    <td>View</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>1234</td>
                                                    <td>22 oct 2022</td>
                                                    <td>demo package</td>
                                                    <td>demo</td>
                                                    <td>Done</td>
                                                    <td>Done</td>
                                                    <td>View</td>
                                                </tr>
                                            </tbody>
                                        </table>
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
