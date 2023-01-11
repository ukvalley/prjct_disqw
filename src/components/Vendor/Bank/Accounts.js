import React, { useState, useEffect} from "react";
import axios from 'axios';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,useParams
} from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import {AiFillDelete } from "react-icons/ai";


const Accounts = () => {

    const [BankAccounts, setBankAccounts] = useState(null);
    const [Loader, setLoader] = useState(false);
    const { id } = useParams();
    const vid = localStorage.getItem('bid');


    useEffect(() => {
        fetch_data(vid);            
      }, []);

    
      async function fetch_data(vid){
        setLoader(true);
        
        axios.get("https://callistoworld.io/lara/public/api/BankAccountByVid/"+vid)
        .then(res => {
      
          setBankAccounts(res.data.BankAccounts[0]); 
          
          
           console.log(res.data.BankAccounts);
      
          setLoader(false);
      }).catch(error => {
          console.log('errr', error)
          setLoader(false);
      })
      }
      
    return (


        <main>
            <div className="Accounts dashboard">
              <div id="main">
               <div className="container-fluid">
                <div className="section">
                {BankAccounts != null
                     ?
                    <>
                   <div className='card col-md-12 mt-5 pt-2 px-2 py-2'>
                                            <h3 className="mb-5">Bank List</h3>

                                            <div class="table-responsive-lg view_list_table">
                                            <Link to="/BusinessUser/Add_Bank" className="btn btn-info">ADD BANK </Link>

                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No.</th>
                                                            <th scope="col">Bank Name</th>
                                                            <th scope="col">Account Number</th>
                                                            <th scope="col">Accept Type</th>
                                                            <th scope="col">Action</th>                                                            
                                                           
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {BankAccounts.map((record, index) => (
                                                      <>
                                                        <tr>
                                                            <th scope="row">{index}</th>
                                                            <td>{record.bank_name}</td>
                                                            <td>{record.account_number}</td>
                                                            <td>{record.account_type}</td>
                                                            
                                                                                                                     
                                                          
                                                            <td>
                                                                <Link to={"/BusinessUser/Edit_Bank/"+record.id} className="list_icon_table"><a><FaEdit/></a></Link>
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

Accounts.propTypes = {};

Accounts.defaultProps = {};

export default Accounts;
