import React, { useState, useEffect } from "react";
import './Dashboard.css';
import axios from 'axios';
import './report.css';

import {
    BrowserRouter as Router,
     Link
} from 'react-router-dom';

import { FaEdit } from "react-icons/fa";
import { AiOutlinePlus,AiFillDelete } from "react-icons/ai";

const Viewsocial = () => {

    const [SocialMedia, setSocialMedia] = useState(null);
    const [Loader, setLoader] = useState(false);
    const vid = localStorage.getItem('bid');

    useEffect(() => {
        fetch_data(vid);            
      }, []);

    
      async function fetch_data(vid){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/SocialMediaByVid/"+vid)
        .then(res => {
      
          setSocialMedia(res.data.SocialMedia[0]);           
          
           console.log("Listing",res.data.SocialMedia);
      
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }


    return (


        <main>
            <div className="Viewsocial dashboard">
            <div id="main">
               <div className="container-fluid">
                <div className="section">
                {SocialMedia != null
                     ?
                    <>
                   <div className='card col-md-12 mt-5 pt-2 px-2 py-2'>
                                            <h3 className="mb-5">Social Media List</h3>

                                            <div class="table-responsive-lg view_list_table">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No.</th>
                                                            <th scope="col">Account Profile</th>                                                           
                                                            <th scope="col">Account URL</th>                                                            
                                                            <th scope="col">Is_Active</th>
                                                            <th scope="col">Edit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {SocialMedia.map((record, index) => (
                                                      <>
                                                        <tr>
                                                            <th scope="row">{index}</th>
                                                            <td>{record.account_profile}</td>                                                        
                                                            <td>{record.account_url}</td>
                                                            <td>{record.is_active}</td>
                                                            <td>
                                                                <a><Link to={"/BusinessUser/Edit_Social/"+ record.id} className="btn "><FaEdit className="list_icon_table"/></Link></a>
                                                            </td>
                                                                                
                                                           
                                                          </tr>
                                                        </> ))} 

                                                    </tbody>
                                                     <button className="btn btn-primary mt-2 text-white"> <AiOutlinePlus/> <Link to="/BusinessUser/Addsocial"> Add New </Link></button>
                                                </table>
                                                
                                            </div>
                   </div>
                   </>
              :<></>
              }
                </div>
               </div>          
                </div>




            </div >
        </main >
    )





};

Viewsocial.propTypes = {};

Viewsocial.defaultProps = {};

export default Viewsocial;
