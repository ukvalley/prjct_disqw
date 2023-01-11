import React, { useState, useEffect } from "react";
import './Dashboard.css';
import axios from 'axios';
import './report.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,useParams
} from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { AiOutlinePlus,AiFillDelete } from "react-icons/ai";


const Branch = () => {
    const [Branches, setBranches] = useState(null);
    const [Loader, setLoader] = useState(false);
    const { id } = useParams();
    const [visible, setVisible] = useState(true);

    const vid = localStorage.getItem('bid');

    useEffect(() => {
        fetch_data(vid);            
      }, []);

    
      async function fetch_data(vid){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/BranchesByVid/"+vid)
        .then(res => {
      
          setBranches(res.data.Branches[0]); 
          
          
           console.log("Listing",res.data.Branches);
      
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }
    return (


        <main>
            <div className="Branch dashboard">
                <div id="main">
                    <div className="mt-5">
                        <div className="container">
                            <div className="">
                                <div className="container-fluid">
                                    <div className="section card">
                                        <div className='col-md-12 mt-5 px-0 py-0'>
                                            <h3>Branch List</h3>
                                            <button className="btn btn-primary add_buttonl mt-2 text-white"> <AiOutlinePlus/> <Link to="/BusinessUser/Add_Branch"> Add New </Link></button>
                                            {Branches != null
                                              ?
                                              <>
                                            <div class="table-responsive-lg view_list_table">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No.</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Address</th>
                                                            <th scope="col">Country</th>
                                                            <th scope="col">State</th>
                                                            <th scope="col">City</th>
                                                          
                                                            <th scope="col">Edit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {Branches.map((record, index) => (
                                                      <>
                                                        <tr>
                                                            <th scope="row">{index}</th>
                                                            <td>{record.name}</td>
                                                            <td>{record.address}</td>
                                                            <td>{record.country_id.name}</td>
                                                            <td>{record.state_id.name}</td>
                                                            <td>{record.city_id.name}</td>
                                                           
                                                            <td>
                                                                <a><Link to={"/BusinessUser/Edit_Branch/"+ record.id} className="btn "><FaEdit className="list_icon_table"/></Link></a>
                                                            </td>
                                                                                
                                                           
                                                        </tr>
                                                        </> ))} 
                                                    </tbody>
                                                </table>
                                            </div>
                                            </>
                                         :<></>
                                          }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )





};

Branch.propTypes = {};

Branch.defaultProps = {};

export default Branch;
