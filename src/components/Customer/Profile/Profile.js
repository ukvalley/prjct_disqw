import React, { useState, useEffect} from "react";
import './Profile.css';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loder from "../Loder";

const Profile = () => {

  const [country_all, setcountry_all] = useState(null);
  const [BCategory, setBCategory_all] = useState(null);
  const [state_all, setState_all] = useState(null);
  const [city_all, setcity_all] = useState(null);
  const [data, setData] = useState('No result');
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [address, setaddress] = useState("");
  const [type, settype] = useState("");
  const [profile_picture, setprofile_picture] = useState(null)
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");

  const [Loader, setLoader] = useState(false);
  const [Users, setUsers] = useState(null);
  const {id } = useParams();

  const vid = localStorage.getItem('user');

  const navigate = useNavigate();

  
  useEffect(() => {
    fetchData1(vid);
    fetch_data(); 
    fetch_data_state(id);   
    fetch_data_city(id);            
  }, []);

  const handleSubmit = (event) =>{
    event.preventDefault();
    ProfileUpdate(name,email,mobile,address,country,state,city,profile_picture);
   
   }

   async function ProfileUpdate(name,email,mobile,address,country,state,city,profile_picture){

      setLoader(true);

    let f_data = new FormData();
    f_data.append('name', name);
    f_data.append('email', email);
    f_data.append('mobile', mobile);
    f_data.append('address', address);   
    f_data.append('country',country);
    f_data.append('state', state);
    f_data.append('city', city);
    f_data.append('profile_picture',profile_picture);
   
   
 
    await axios.post("https://callistoworld.io/lara/public/api/UserUpdate/"+vid,
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
        //navigate('/Vendor_Main/Viewlist')
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
  
  const handleFileSelect_im2 = (event) => {
    setprofile_picture(event.target.files[0]);   
  }

  async function fetchData1(vid){
    setLoader(true);
    console.log(vid);

    axios.get("https://callistoworld.io/lara/public/api/UserFind/"+vid)
    .then(res => {
  
      setUsers(res.data.Users); 
      setname(res.data.Users.name); 
      setemail(res.data.Users.email); 
      setaddress(res.data.Users.address); 
      setmobile(res.data.Users.mobile); 
      setstate(res.data.Users.state); 
      setcountry(res.data.Users.country);  
      setcity(res.data.Users.city);       

      
       console.log("Listing",res.data.Users);
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
        <div className="Profile">
        
        <div className="container mt-5">
        <div className="card">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
 
       <div className="col-md-12">

        <div className="row">

          <div className="col-md-6">
          <div className="form-group">
             <label className="form_set">Name</label>
             <input
             type="text"
             className="form-control"
             id="name"
             name="name"
             value={name}
             onChange={(e) => setname(e.target.value)}
             placeholder="Enter name"
            />
        </div>
          </div>

          <div className="col-md-6">
          <div className="form-group">
          <label className="form_set">Mobile Number</label>
         
          <input
           type="mobile"
           className="form-control"
           id="mobile"
           name="mobile"
           value={mobile}
           onChange={(e) => setmobile(e.target.value)}
          placeholder="Enter Mobile Number"
          />  
       </div>
          </div>

          <div className="col-md-6">
          <div className="form-group">
          <label className="form_set">Email address</label>
          <input
           type="email"
           className="form-control"
           id="email"
           name="email"
           value={email}
           onChange={(e) => setemail(e.target.value)}
          placeholder="Enter email"
         />
  
          </div>
          </div>

        


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
                      <div className="form-outline">
                      <label className="form_set">
                     Profile Image </label>
                        <input
                        className="form-control-lg"
                         type="file" id="profile_picture" 
                         onChange={handleFileSelect_im2} />

                        
                      </div>
                    </div>
        </div>
       </div>

    
  
 
 
  
  <button type="submit" className="btn btn-primary mb-5">
    Submit
  </button>
        </form>
        </div>
        </div>


         </div>     
    )





};

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
