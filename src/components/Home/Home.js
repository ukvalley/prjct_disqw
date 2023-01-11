import { useState,useEffect} from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useParams } from 'react-router-dom';
import Loader from '../Loder';


const Home = () => {

  const [name, setName]        = useState('');
  const [address, setAddress]  = useState('');
  const [email1,setUsername]   = useState('');
  const [password,setPassword] = useState('');
  const [Data,SetData]     = useState('');
  const [Loader,setLoader]     = useState(false);  
  const { id } = useParams();

  useEffect(()=>{
    fetch_data();
  }, []);


  async function fetch_data(){

    setLoader(true);
    axios.get("https://globalwin.in/j12/api/view_branch/" +id)
    .then(res=>{
     
      if (res.data.status != "success") {
        Swal.fire({
            title: 'Data Not Found',
            text: 'Requested Data Not Found',
            icon: 'error',
            confirmButtonText: 'Okay'
        })
        SetData(res.data)
        console.log(res.data)
      }
      setName(res.data.branch_data.branch_name);
      setAddress(res.data.branch_data.branch_address);
      setUsername(res.data.branch_data.branch_username);
      setPassword(res.data.branch_data.branch_password);

      setLoader(false);

    }).catch(error => {
      console.log('errr', error)
      setLoader(false);
  })
  }
  



  const handleSubmit = (event) => {
    event.preventDefault();
    update_branch(name, address, email1, password);
  }


  async function update_branch(){

    setLoader(true);
    axios.post("https://globalwin.in/j12/api/update_branch/" +id,{

      branch_name: name,
      branch_address: address,
      branch_username: email1,
      branch_password: password,
    })   
    .then(function (response){
      console.log(response);
      setLoader(false);

      if (response.data.status == "success") {
        Swal.fire({
            title: response.data.message,
            text: 'Data Added Successfully',
            icon: 'success',
            confirmButtonText: 'Okay'
        })
    }

    else {
        setLoader(false);
        Swal.fire({
            title: response.data.message,
            text: 'Data Add failed',
            icon: 'error',
            confirmButtonText: 'Okay'
        })
    }

    })
    .catch(function (error) {
      setLoader(false);
      console.log(error);
      Swal.fire({
          title: error.message,
          text: 'Data Add failed',
          icon: 'error',
          confirmButtonText: 'Okay'
      })
  });
  }


  if (Loader == 'true') {
        return (
            <Loader/>
        )

    }
  return(
    <div className="Branch">
    <div id="main">
    <div className="col-md-12">
      <h5 className="card-title mt-5">Update Branch</h5>

<div id="inline-form" className="card card card-default scrollspy">
  <div className="card-content">
   
  
    <form action="" onSubmit={handleSubmit}>
   
      <div className="row">
        <div className="input-field col-md-6">
          <div className="form-group">
            <label>Branch Name</label>
            <input value={name}
             onChange={(e) => setName(e.target.value)}
              type="text"
             className="form-control"              
             placeholder="Enter Branch  Name">

             </input>
          </div>
        </div>

        <div className="input-field col-md-6">
          <div className="form-group">
            <label>Address</label>
            <input type="text" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control" 
            placeholder="Enter Address">

            </input>
          </div>
        </div>

        <div className="input-field col-md-6">
          <div className="form-group">
            <label>Username</label>
            <input type="text" 
             value={email1}
             onChange={(e) => setUsername(e.target.value)}
            className="form-control" 
            placeholder="Enter Username">

            </input>
          </div>
        </div>

        <div className="input-field col-md-6">
            <div className="form-group">
            <label>Password</label>
            <input type="Password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             className="form-control"
              placeholder="Enter Password">

              </input>
            </div>
        </div>


        <div className="input-field col-md-6 mt-3">
          <div className="input-field col s12">
            <button className="btn btn-primary" type="submit">
              Update</button>
          </div>
        </div>
      </div> 
    </form>
  </div>
  
</div>
</div>

</div>
</div>

)};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
