import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import './report.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Swal from 'sweetalert2'





import { BiAbacus, BiBrightness, BiStar, BiHive, BiUserPlus, BiShapePolygon, BiCalendarStar, BiSearchAlt2 } from "react-icons/bi";
import { FaBullseye, FaBell } from "react-icons/fa";
import { AiOutlineBell } from "react-icons/ai";


const My_wishlist = () => {

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
            <div className="My_wishlist">



                <div id="main">

                    <div className="col s12">
                        <div className="container-fluid">
                            <div className="section">


                                <div className='col-md-12 mt-5'>
                                    <h3>My Wishlist</h3>
                                    <p>Hello Couple! The wishlist is great way to keep track your wedding vendor and their service availablity in your wishlist board.</p>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>





            </div >
        </main >
    )





};

My_wishlist.propTypes = {};

My_wishlist.defaultProps = {};

export default My_wishlist;
