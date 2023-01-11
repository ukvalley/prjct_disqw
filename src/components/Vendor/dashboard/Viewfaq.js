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

import { FaEdit } from "react-icons/fa";
import { AiOutlinePlus,AiOutlineFileAdd,AiFillDelete } from "react-icons/ai";


const Viewfaq = () => {

    const [Faq, setFaq] = useState(null);
    const [Loader, setLoader] = useState(false);
    const { id } = useParams();
    const vid = localStorage.getItem('bid');

    useEffect(() => {
        fetch_data(vid);            
      }, []);

    
      async function fetch_data(vid){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/FaqsByVid/"+vid)
        .then(res => {
      
          setFaq(res.data.Faq[0]); 
          
          
           console.log(res.data.Faq);
      
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }

      function removeList(id)
      {
        fetch("https://callistoworld.io/lara/public/api/BusinessListingByVid/"+id,{
          method:'DELETE'
        }).then((Faq));
      }
    return (


        <main>
            <div className="Viewfaq dashboard">
            <div className="container-fluid">
                <div className="section">
                {Faq != null
                     ?
                    <>
                   <div className='card col-md-12 mt-5 pt-2 px-2 py-2'>
                                            <h3 className="mb-5">FAQ'S List</h3>

                                            <div class="table-responsive-lg view_list_table">
                                            <button className="btn btn-primary add_buttonl mt-2 text-white"> <AiOutlinePlus/> <Link to="/BusinessUser/Addfaq"> Add New </Link></button>

                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No.</th>
                                                            <th scope="col">Id</th>                                                           
                                                            <th scope="col">Question</th>                                                            
                                                            <th scope="col">Answer</th>
                                                            <th scope="col">Edit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {Faq.map((record, index) => (
                                                      <>
                                                        <tr>
                                                            <th scope="row">{index +1}</th>
                                                            <td>{record.id}</td>                                                        
                                                            <td>{record.question}</td>
                                                            <td>{record.answer}</td>
                                                            <td>
                                                                <a><Link to={"/BusinessUser/Edit_Faq/"+ record.id} className="btn "><FaEdit className="list_icon_table"/></Link></a>
                                                            </td>
                                                                                
                                                          
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
            </div >
        </main >
    )





};

Viewfaq.propTypes = {};

Viewfaq.defaultProps = {};

export default Viewfaq;
