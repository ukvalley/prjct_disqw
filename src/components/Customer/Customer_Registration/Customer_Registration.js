import React, { useState, useEffect, handleNavigation } from "react";
import './Customer_Registration.css';
import { useParams,Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loder from '../Loder';

const Customer_Registration = () => { 
  const [Loader,setLoader]= useState(false);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [category, setdcategory] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [address, setaddress] = useState("");
  const [google_map_latitude, setgoogle_map_latitude] = useState("");
  const [google_map_longitude, setgoogle_map_longitude] = useState("");
  const [meta_title, setmeta_title] = useState("");
  const [meta_description, setmeta_description] = useState("");
  const [header_image, setheader_image] = useState("");
  const [image_1, setimage_1] = useState("");
  const [image_2, setimage_2] = useState("");
  const [image_3, setimage_3] = useState("");    
  const navigate = useNavigate();
  const {id } = useParams();

  const handleSubmit = (event) =>{
    event.preventDefault();
    
   
    if(name,description,email,mobile,category,country,state,city,address,google_map_latitude,google_map_longitude,
        meta_title,meta_description,header_image)
        {         
          bio_data_post(name,description,email,mobile,category,country,state,city,address,google_map_latitude,google_map_longitude,
            meta_title,meta_description,header_image);
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
  
   async function bio_data_post(name,description,email,mobile,category,country,state,city,address,google_map_latitude,google_map_longitude,
    meta_title,meta_description,header_image){

      setLoader(true);

    let f_data = new FormData();
    f_data.append('name', name);
    f_data.append('description', description);
    f_data.append('email', email);
    f_data.append('mobile', mobile);
    f_data.append('category', category);
    f_data.append('country',country);
    f_data.append('state', state);
    f_data.append('city', city);
    f_data.append('address', address);
    f_data.append('google_map_latitude', google_map_latitude);
    f_data.append('google_map_longitude', google_map_longitude);
    f_data.append('meta_title', meta_title);
    f_data.append('meta_description',meta_description);
    f_data.append('header_image',header_image);
    
   
   
 
    await axios.post("https://globalwin.in/j12/api/bio_data_post/" + id,
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
    if (response.data.status == "success") {
        Swal.fire({
            title: response.data.message,
            text: 'Data Added Successfully',
            icon: 'success',
            confirmButtonText: 'Okay'
        })
        //navigate('/Matrimony');
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
    return (
        <div className="Customer_Registration">
        <div className="container py-5 h-100">
          <div className="col-12">
        <div className="card" style={{ borderRadius: 15 }}>
        
            <div className="row g-0">
              <div className="col-lg-12">
                <div className="p-3">
                <form onSubmit={handleSubmit} enctype="multipart/form-data">
                  <h3 className="fw-normal mb-5" style={{ color: "#4835d4" }}>
                    Bussiness Registration
                  </h3>
                 
                  <div className="row">
                    <div className="col-md-6">
                     
                      <label className="form_set"> First Name </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter Name"
                          className="form-control form-control-lg"
                          required 
                        />
                        
                      </div>
                   
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set"> Email </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control form-control-lg"
                        />
                       
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                          Mobile
                        </label>
                        <input
                          type="text"
                          id="mobile"
                          name="mobile"
                          className="form-control form-control-lg"
                        />
                        
                      </div>
                    </div>
                    <div className="col-md-6">
                        <label className="form_set">Category</label>
                    <select className="form-control select">
                      <option value={1}>Select</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                      <option value={4}>Four</option>
                    </select>
                  </div>
                  </div>
                  <div className="row">
                  <div className="col-md-6">
                        <label className="form_set">Country</label>
                    <select className="form-control select">
                      <option value={1}>Select</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                      <option value={4}>Four</option>
                    </select>
                  </div>
                    <div className="col-md-6">
                        <label className="form_set">State</label>
                    <select className="form-control select">
                      <option value={1}>Select</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                      <option value={4}>Four</option>
                    </select>
                  </div>
                  </div>
                  <div className="row">
                  <div className="col-md-6">
                        <label className="form_set">City</label>
                    <select className="form-control select">
                      <option value={1}>Select</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                      <option value={4}>Four</option>
                    </select>
                  </div>
                    <div className="col-md-6">
                        <label className="form_set">Address</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control form-control-lg"
                        />
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
                          id="name"
                          name="name"
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
                          id="email"
                          name="email"
                          className="form-control form-control-lg"
                        />
                       
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                      Meta_Title
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control form-control-lg"
                        />
                        
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                      Meta_Description
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control form-control-lg"
                        />
                       
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                      Header_Image  </label>
                        <input
                        className="form-control form-control-lg"
                         type="file" id="myFile" name="filename" />

                        
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                        Image 1 </label>
                        <input
                        className="form-control form-control-lg"
                         type="file" id="myFile" name="filename" />

                        
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                      Image 2  </label>
                        <input
                        className="form-control form-control-lg"
                         type="file" id="myFile" name="filename" />

                        
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form-label" htmlFor="form3Examplev2">
                        Image 3 </label>
                        <input
                        className="form-control form-control-lg"
                         type="file" id="myFile" name="filename" />                        
                      </div>
                    </div>
                  </div>
                 
                  <button className="btn btn-primary btn-lg">Submit</button>
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

Customer_Registration.propTypes = {};

Customer_Registration.defaultProps = {};

export default Customer_Registration;
