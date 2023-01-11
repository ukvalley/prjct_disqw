import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import './Dashboard';
import axios from 'axios';
import Swal from 'sweetalert2'
import { FaBullseye, FaBell } from "react-icons/fa";
import Loder from "../Loder";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,useParams
} from 'react-router-dom';
import * as moment from 'moment';


const Notification = () => {
    const [Notification, setNotification] = useState(null);
    const [Loader, setLoader] = useState(false);
    const { id } = useParams();
    const vid = localStorage.getItem('user');

    useEffect(() => {
        fetch_data(vid);            
      }, []);

    
      async function fetch_data(vid){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/NotificationsByUId/"+vid)
        .then(res => {
      
          setNotification(res.data.Notification[0]); 
          
          
           console.log(res.data.Faq);
      
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }

      if (Loader == true) {
        return (
           <Loder /> )       
        }

    return (


        <main>
            <div className="Notification">
                <div id="main">                    
                   {Notification != null
                    ?
                    <>
                                <div className='col-md-12 mt-5'>
                                    <h3>Notification</h3>
                                    
                                    {Notification.map((record, index) => (
                                                      <>
                                    <div className="row">
                                        <div className="mb-3">

                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex">
                                                            <div className="bell_color1 mt-2" style={{ fontSize: "20px" }}>
                                                                <FaBell className="bell_color" />
                                                            </div>
                                                            <div>
                                                                <h6 className="mt-1 set_1">{record.notification_title}</h6>
                                                                <p className="address1 set_1">{moment(record.created_at).fromNow()}</p>
                                                            </div>
                                                        </div>


                                                    

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    </> ))}
                                </div>
                    </>
                    :<></>
                     }
                    </div>
                       





            </div >
        </main >
    )





};

Notification.propTypes = {};

Notification.defaultProps = {};

export default Notification;
