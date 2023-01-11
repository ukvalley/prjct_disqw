import React, { useState, useEffect, handleNavigation } from "react";
import './ViewProduct.css';
import axios from 'axios';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,useParams
} from 'react-router-dom';


import { FaEdit } from "react-icons/fa";
import {AiFillDelete ,AiOutlinePlus} from "react-icons/ai";

const ViewProduct = () => {

    const [Products, setProducts] = useState(null);
    const [Loader, setLoader] = useState(false);
    const { id } = useParams();
    const vid = localStorage.getItem('user');


    useEffect(() => {
        fetch_data(vid);            
      }, []);

    
      async function fetch_data(vid){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/ProductsByVid/"+vid)
        .then(res => {
      
          setProducts(res.data.Products[0]); 
          
          
           console.log(res.data.Products);
      
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }
      
    return (


        <main>
            <div className="ViewProduct dashboard">
              <div id="main">
               <div className="container-fluid">
                <div className="section">
                {Products != null
                     ?
                    <>
                   <div className='card col-md-12 mt-5 pt-2 px-2 py-2'>
                                            <h3 className="mb-5">Product List</h3>

                                            <div class="table-responsive-lg view_list_table">
                                            <button className="btn btn-primary add_buttonl mt-2 text-white"> <AiOutlinePlus/> <Link to="/Vendor_Main/Product"> Add New </Link></button>

                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No.</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Description</th>                                                            
                                                            <th scope="col">Product Image</th>
                                                            <th scope="col">Edit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {Products.map((record, index) => (
                                                      <>
                                                        <tr>
                                                            <th scope="row">{index}</th>
                                                            <td>{record.name}</td>
                                                            
                                                            <td>{record.description}</td>
                                                            <td><img  className="list_img" src={"https://callistoworld.io/lara/public/upload/"+record.product_image}/></td>
                                        
                                                            <td>
                                                                <Link to={"/Vendor_Main/EditProducts/"+record.id} className="list_icon_table"><a><FaEdit/></a></Link>
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

ViewProduct.propTypes = {};

ViewProduct.defaultProps = {};

export default ViewProduct;
