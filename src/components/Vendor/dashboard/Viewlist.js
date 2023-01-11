import React, { useState, useEffect, handleNavigation } from "react";
import PropTypes from 'prop-types';
import './list.css';
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
import { FaEdit } from "react-icons/fa";
import { AiOutlinePlus,AiOutlineFileAdd,AiFillDelete } from "react-icons/ai";


const Viewlist = () => {

    const [BusinessListing, setBusinessListing] = useState(null);
    const [Loader, setLoader] = useState(false);
    const { id } = useParams();
    const [visible, setVisible] = useState(true);

    const vid = localStorage.getItem('user');


    useEffect(() => {
        fetch_data(vid);            
      }, []);

    
      async function fetch_data(vid){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/BusinessListingByVid/"+vid)
        .then(res => {
      
          setBusinessListing(res.data.BusinessListing); 
          
          
           console.log("Listing",res.data.BusinessListing);
      
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }

      const removeElement = async ()=>{
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/BusinessListingByVid/"+id)
        .then(res => {
      
          setBusinessListing(res.data.BusinessListing); 
          
          
           console.log(res.data.BusinessListing);
      
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
        }).then((BusinessListing));
      }
      
    return (


        <main>
            <div className="Viewlist dashboard">
              <div id="main">
               <div className="container-fluid">
                <div className="section">
                {BusinessListing != null
                     ?
                    <>
                   <div className='card col-md-12 mt-5 pt-2 px-2 py-2'>
                                            <h3 className="mb-5">Business List</h3>

                                            <div class="table-responsive-lg view_list_table">
                                            <button className="btn btn-primary add_buttonl mt-2 text-white"> <AiOutlinePlus/> <Link to="/Vendor_Main/Bussiness_Registration"> Add New </Link></button>

                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No.</th>
                                                            <th scope="col">Business List</th>                                                           
                                                            <th scope="col">Category</th>                                                            
                                                            <th scope="col">Header Image</th>
                                                            <th scope="col">Edit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {BusinessListing.map((record, index) => (
                                                      <>
                                                        <tr>
                                                            <th scope="row">{index+1}</th>
                                                            <td><Link to={"/Vendor_Main/Profile/"+record.id}>{record.name}</Link></td>                                                        
                                                            <td>{record.category}</td>
                                                            <td><img className="list_img" src={"https://callistoworld.io/lara/public/upload/"+record.header_image}/></td>
                                                            <td>
                                                                <a><Link to={"/Vendor_Main/Edit_Business/"+ record.id} className="btn "><FaEdit className="list_icon_table"/></Link></a>
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
                </div>

                </div>
          
        </main >
    )





};

Viewlist.propTypes = {};

Viewlist.defaultProps = {};

export default Viewlist;
