import React, { useState, useEffect, handleNavigation } from "react";
import './Edit_Branch.css';
import { useParams,Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { createEditor } from 'slate'
import Loder from '../Loder';

const Edit_Branch = () => {
 
  const [Loader,setLoader]= useState(false);
  const [country_all, setcountry_all] = useState(null);
  const [BCategory, setBCategory_all] = useState(null);
  const [Branches, setBranches] = useState(null);
  const [pin_all, setpin_all] = useState(null);

  const [HomeSetting, setHomeSetting] = useState(null);
  const [BusinessListing, setBusinessListing] = useState(null);
  const [state_all, setState_all] = useState(null);
  const [city_all, setcity_all] = useState(null);
  const [name, setname] = useState("");
  const [listing_id, setlisting_id] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");

  const [address, setaddress] = useState("");
  const [google_map_latitude, setgoogle_map_latitude] = useState("");
  const [google_map_longitude, setgoogle_map_longitude] = useState("");

  const navigate = useNavigate();
  const {id } = useParams();
  const vid = localStorage.getItem('user');

  const handleSubmit = (event) =>{
    event.preventDefault();
    BranchRegistration(name,address,country,state,city,google_map_latitude,google_map_longitude,listing_id);
   }

  
   async function BranchRegistration(name,address,country,state,city,google_map_latitude,google_map_longitude,listing_id){

      setLoader(true);

    let f_data = new FormData();
    f_data.append('name', name);
    f_data.append('address',address);
    f_data.append('country',country);
    f_data.append('state', state);
    f_data.append('city', city);
    f_data.append('pincode', pincode);

    f_data.append('google_map_latitude', google_map_latitude);
    f_data.append('google_map_longitude', google_map_longitude);
    f_data.append('listing_id', listing_id);
  
 
    await axios.post("https://callistoworld.io/lara/public/api/BranchesUpdate/"+id,
    f_data ,
 { headers: {
    'accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.8',
    'Content-Type': `multipart/form-data;`,
  }})
   .then(function (response)
    {
    console.log(response);
    setLoader(false);
    if (response.data.status == "true") {
        Swal.fire({
            title: response.data.message,
            text: 'Data Added Successfully',
            icon: 'success',
            confirmButtonText: 'Okay'
        })
        navigate('/Vendor_Main/Branch')
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
useEffect(() => {
  fetch_data(); 
  fetch_data_state(id);   
  fetch_data_city(id);  
  fetch_data_pin(1);       

  fetch_Business();
  Branch_fetch_data();
}, []);

async function handleCityChange(e) {

  console.log(e.target.value);
  setcity(e.target.value);

  setLoader(true);
  await axios.get("https://callistoworld.io/lara/public/api/getPincode/"+e.target.value)
    .then(response => {

      setpin_all(response.data.PinCode)
     
      console.log(response.data.PinCode)

      setLoader(false);
    })
    .catch(error => {
      setLoader(false);
      console.error('There was an error!', error);
    });
}
async function fetch_data_pin(city_id){
  setLoader(true);
  
  axios.get("https://callistoworld.io/lara/public/api/getPincode/"+city_id)
  .then(res => {

    setpin_all(res.data.PinCode);    
    
     console.log(res.data.PinCode);

    setLoader(false);
}).catch(error => {
    console.log('errr', error)
    setLoader(false);
})
}
async function Branch_fetch_data(){
    setLoader(true);
    
   await axios.get("https://callistoworld.io/lara/public/api/BranchById/"+id)
    .then(res => {
    
      setBranches(res.data.Branches);
      setname(res.data.Branches.name);
      setaddress(res.data.Branches.address);
      setcountry(res.data.Branches.country);
      setlisting_id(res.data.Branches.listing_id);
      setstate(res.data.Branches.state);
      setcity(res.data.Branches.city);
      setgoogle_map_latitude(res.data.Branches.google_map_latitude);
      setgoogle_map_longitude(res.data.Branches.google_map_longitude);  


       console.log(res.data.Branches);

      setLoader(false);
  }).catch(error => {
      console.log('errr', error)
      setLoader(false);
  })
  }

async function fetch_Business(){
    setLoader(true);
    
    axios.get("https://callistoworld.io/lara/public/api/HomeApi/1")
    .then(res => {
  
      setHomeSetting(res.data.HomeSetting);
      setBusinessListing(res.data.BusinessListing);
     
       console.log(res.data.BusinessListing);
  
      setLoader(false);
  }).catch(error => {
      console.log('errr', error)
      setLoader(false);
  })
  }

async function handleStateChange(e) {

  console.log(e.target.value);
  setstate(e.target.value);

  setLoader(true);
  await axios.get("https://callistoworld.io/lara/public/api/city_all/"+e.target.value)
    .then(response => {

      setcity_all(response.data.city_all)
     
      console.log(response.data.city_all)

      setLoader(false);
    })
    .catch(error => {
      setLoader(false);
      console.error('There was an error!', error);
    });
}

async function handleCountryChange(e) {

  console.log(e);
  setcountry(e.target.value);

  setLoader(true);
  await axios.get("https://callistoworld.io/lara/public/api/state_all/"+e.target.value)
    .then(response => {

      setState_all(response.data.state_all)
     
      console.log(response.data.state_all)

      setLoader(false);
    })
    .catch(error => {
      setLoader(false);
      console.error('There was an error!', error);
    });
}
async function fetch_data(){
  setLoader(true);
  
  axios.get("https://callistoworld.io/lara/public/api/country_all")
  .then(res => {

    setcountry_all(res.data.country_all); 
    setBCategory_all(res.data.BCategory);   
    
     console.log(res.data);

    setLoader(false);
}).catch(error => {
    console.log('errr', error)
    setLoader(false);
})
}

async function fetch_data_state(){
  setLoader(true);
  
  axios.get("https://callistoworld.io/lara/public/api/state_all/"+id)
  .then(res => {

    setState_all(res.data.state_all);    
    
     console.log(res.data.state_all);

    setLoader(false);
}).catch(error => {
    console.log('errr', error)
    setLoader(false);
})
}
async function fetch_data_city(){
  setLoader(true);
  
  axios.get("https://callistoworld.io/lara/public/api/city_all/"+id)
  .then(res => {

    setcity_all(res.data.city_all);    
    
     console.log(res.data.city_all);

    setLoader(false);
}).catch(error => {
    console.log('errr', error)
    setLoader(false);
})
}


    return (
        <div className="Edit_Branch">
        <div className="container py-5 h-100">
          <div className="col-12">
        <div className="card" style={{ borderRadius: 15 }}>
       
            <div className="row g-0">
              <div className="col-lg-12">
                <div className="p-3">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <h3 className="fw-normal mb-5" style={{ color: "#4835d4" }}>
                     Update Branch
                  </h3>
                 
                  <div className="row">
                    <div className="col-md-6">
                     
                      <label className="form_set"> Branch Name </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                          placeholder="Enter Name"
                          className="form-control form-control-lg"
                        />
                        
                      </div>

                      <div className="col-md-6">
                        <label className="form_set">Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                          className="form-control form-control-lg"
                        />
                  </div>

                   
                  </div>
                
                
                  <div className="row mt-4">               
                  {HomeSetting != null
                       ?
                       <>              
                    {BusinessListing != null
                       ?
                       <>  
                    <div className="col-md-6">
                        <label className="form_set">Category</label>
                    <select className="form-control select"
                     value={listing_id}
                     onChange={(e) => setlisting_id(e.target.value)}
                     id="listing_id">
                       {BusinessListing.map((record, index) => (
                      <>
                      <option value={record.id}>{record.name}</option>
                      </> ))}
                    </select>
                  </div>
                  </>
                  :<></>
                 }
                  </>
                  :<></>
                 }
                  </div>
                  
                  <div className="row">
                  {country_all != null
                       ?
                       <>
                  <div className="col-md-6">
                        <label className="form_set">Country</label>
                    <select className="form-control select"
                     value={country}
                     onChange={(e) => handleCountryChange(e)} 
                     id="country">
                       <option>Select</option>
                    {country_all.map((record, index) => (
                    <>
                     
                      <option value={record.id}>{record.name}</option>
                      </> ))} 
                    </select>
                  </div>
                  </> :<></>
                 }
                  
                    <div className="col-md-6">
                    {state_all != null
                       ?
                       <>
                        <label className="form_set">State</label>
                    <select className="form-control select"
                     value={state}
                     onChange={(e) => handleStateChange(e)}
                     id="state">
                       <option>Select</option>
                      {state_all.map((record, index) => (
                    <>
                   
                      <option  value={record.id}>{record.name}</option>
                      </> ))} 
                    </select>
                    </> :<></>
                 }
                  </div>
                  </div>
                
                   
                 <div className="row">
                  <div className="col-md-6">
                  {city_all != null
                       ?
                       <>
                    <label className="form_set">City</label>
                    <select className="form-control select"
                     value={city}
                     onChange={(e) => setcity(e.target.value)}
                     id="city">
                       <option>Select</option>
                       {city_all.map((record, index) => (
                    <>
                      <option value={record.id}>{record.name}</option>
                      </> ))}
                    </select>
                    </> :<></>
                 }
                  </div>
                  
                  <div className="col-md-6">
                  {pin_all != null
                       ?
                       <>
                    <label className="form_set">Pin Code</label>
                    <select className="form-control select"
                     value={pincode}
                     onChange={(e) => setpincode(e.target.value)}
                     id="pincode">
                       <option>Select</option>
                       {pin_all.map((record, index) => (
                    <>
                      <option value={record.id}>{record.Pincode}</option>
                      </> ))}
                    </select>
                    </> :<></>
                 }
                  </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                      Google_Map_Latitude
                        </label>
                        <input
                          type="text"
                          id="google_map_latitude"
                          name="google_map_latitude"
                          value={google_map_latitude}
                          onChange={(e) => setgoogle_map_latitude(e.target.value)}
                          className="form-control form-control-lg"
                        />
                        
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                      Google_Map_Longitude
                        </label>
                        <input
                          type="text"
                          id="google_map_longitude"
                          name="google_map_longitude"
                          value={google_map_longitude}
                          onChange={(e) => setgoogle_map_longitude(e.target.value)}
                          className="form-control form-control-lg"
                        />
                       
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                  </form>
                </div>
              
              </div>
            
            </div>
          
        </div>
          </div>
       </div>
       </div>     
    )





};

Edit_Branch.propTypes = {};

Edit_Branch.defaultProps = {};

export default Edit_Branch;
