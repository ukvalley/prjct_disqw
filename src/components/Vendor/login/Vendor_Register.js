import { useState,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Loder from '../../Loder';
import { Link } from "react-router-dom";
import './login.css';
import axios from 'axios';
import Swal from 'sweetalert2';

import { BiUserCircle,BiMobileAlt} from 'react-icons/bi';
import {HiOutlineMail} from 'react-icons/hi';
import {RiLockPasswordFill} from 'react-icons/ri';
import logo from '../images/discountwallet.png';

const Vendor_Register = () => {

    const [Loader, setLoader] = useState(false);
    const [name,setName] = useState("");
    const [email, setemail]  = useState("");
    const [mobile, setmobile]  = useState("");
    const [password, setpassword]  = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    const [category, setcategory] = useState("");
    const [country, setcountry] = useState("");
    const [state, setstate] = useState("");
    const [city, setcity] = useState("");

    const [country_all, setcountry_all] = useState(null);
    const [state_all, setState_all] = useState(null);
    const [city_all, setcity_all] = useState(null);
    const [BCategory, setBCategory_all] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault(); 
        if(name,email,mobile,password)
             {         
                RegisterPost(name,email,mobile,password);   

           } 
           else {
             Swal.fire({
                 title: 'Validation Error',
                 text: 'Enter Proper Data',
                 icon: 'error',
                 confirmButtonText: 'Okay'
             })
         }
           
      }

      useEffect(() => {
        fetch_data(); 
        fetch_data_state(id);
        fetch_data_city(id);
        
      }, []);
    
      async function RegisterPost(name,email,mobile,password)
      {

          setLoader(true);

        let f_data = new FormData();
        f_data.append('name', name);
        f_data.append('email', email);
        f_data.append('mobile', mobile);
        f_data.append('password', password);
        f_data.append('type',"vendor");
        f_data.append('country',country);
        f_data.append('state', state);
        f_data.append('city', city);
        f_data.append('category', category);
        
     await axios.post("https://callistoworld.io/lara/public/api/RegisterBusniessPost",
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
            navigate('/Vendor_Login');
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

    async function handleCityChange(e) {

        console.log(e.target.value);
        setcity(e.target.value);
      
       
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

      if(country_all == null || state_all == null || city_all == null || BCategory == null)
      {
        return (
            <></>
        )
      }

    return (
        <div className="container">
            <div class="mt-5">
                <div className="wrapper">
                    <h5>Vendor</h5>
                    <div className="logo">
                    <Link to='/'>
                          <img                           
                            src={logo}
                            alt=""
                        /></Link>
                    </div>
                    <div className="text-center mt-4 name">Vendor Register</div>

                    <form onSubmit={handleSubmit} className="p-3 mt-3">
                        <div className="form-field d-flex align-items-center">
                            <BiUserCircle/>
                            <input type="text" 
                             name="name"
                             id="name"
                             onChange={(e) => setName(e.target.value)}
                             placeholder="Business Name" 
                             required="true"/>
                        </div>
                        <div className="form-field d-flex align-items-center">
                            <HiOutlineMail/>
                            <input type="text"
                             name="email" 
                             id="email" 
                             onChange={(e) => setemail(e.target.value)}
                             placeholder="Email"
                             required="true" />
                        </div>
                        <div className="form-field d-flex align-items-center">
                            <BiMobileAlt />
                            <input type="text" 
                             name="mobile"
                             id="mobile"
                             onChange={(e) => setmobile(e.target.value)}
                             placeholder="10-Digit Mobile Number" 
                             required="true"/>
                        </div>
                        <div className="form-field d-flex align-items-center">
                            <RiLockPasswordFill />
                            <input type="text"
                             name="password" 
                             id="Password" 
                             onChange={(e) => setpassword(e.target.value)}
                             placeholder="Password"
                             required="true" />
                        </div>


                        <div className="form-field d-flex align-items-center">
                           
                            <select className="form-control select"
                            value={country}
                            onChange={(e) => handleCountryChange(e)} 
                            id="country"
                            required="true">
                                <option>Select Country</option>
                                {country_all.map((record, index) => (
                                <>
                                   <option value={record.id}>{record.name}</option>
                                </> ))} 
                                </select>
                        </div>

                        <div className="form-field d-flex align-items-center">
                            
                            <select className="form-control select"
                            value={state}
                            onChange={(e) => handleStateChange(e)}
                            id="state"
                            required="true">
                            <option>Select State</option>
                            {state_all.map((record, index) => (
                            <>
                   
                             <option  value={record.id}>{record.name}</option>
                            </> ))} 
                            </select>
                        </div>

                        <div className="form-field d-flex align-items-center">
                           
                            <select className="form-control select"
                            value={city}
                            onChange={(e) => handleCityChange(e)}
                            id="city"
                            required="true">
                            <option>Select City</option>
                            {city_all.map((record, index) => (
                            <>
                            <option value={record.id}>{record.name}</option>
                            </> ))}
                            </select>
                        </div>


                        <div className='form-field d-flex align-items-center'>


                        <select className="form-control select"
                         value={category}
                         onChange={(e) => setcategory(e.target.value)}
                         id="category" 
                        required="true">
                       {BCategory.map((record, index) => (
                      <>
                      <option value={record.id}>{record.name}</option>
                      </> ))}
                    </select>
                        </div>


                        <button className="btn mt-3">Vendor Register</button>
                    </form>
                    <div className="text-center fs-6">
                        <a href="#">Forget password?</a> or 
                        <Link to="/Vendor_Login"><a href="#"> Sign in</a></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}






export default Vendor_Register;


