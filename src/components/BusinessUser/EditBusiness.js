import React, { useState, useEffect, handleNavigation } from "react";
import { useParams,Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loder from '../Loder';

const EditBusiness = () => {
  
  const [BusinessListing,setBusinessListing]= useState(null);
  const [Loader,setLoader]= useState(false);
  const [country_all, setcountry_all] = useState(null);
  const [BCategory, setBCategory_all] = useState(null);
  const [state_all, setState_all] = useState(null);
  const [city_all, setcity_all] = useState(null);
  const [pin_all, setpin_all] = useState(null);
  const [categoryValue, setcategoryValue] = useState(null);
  const [Entity_type, setEntity_type] = useState(null);
  

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");

  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [category, setcategory] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [google_map_latitude, setgoogle_map_latitude] = useState("");
  const [google_map_longitude, setgoogle_map_longitude] = useState("");
  const [bank_proof, setbank_proof] =useState(null);
  const [gst_number, setgst_number] = useState("");
  const [business_pan, setbusiness_pan] = useState("");
  const [entity_type, setentity_type] = useState("");
  const [website, setwebsite] = useState("");
  const [meta_title, setmeta_title] = useState("");
  const [meta_description, setmeta_description] = useState("");
  const [header_image, setheader_image] =useState(null);
  const [image_1, setimage_1] = useState(null);
  const [image_2, setimage_2] = useState(null);
  const [image_3, setimage_3] = useState(null);   

  const [IsActive, setIsActive] = useState("");   

  const [active_readonly, setactive_readonly] = useState(false);

 

  const navigate = useNavigate();
  const {id } = useParams();
  const bid = localStorage.getItem('bid');


  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log(categoryValue);
    
    if(name,email,mobile,category,country,state,city,pincode,gst_number,
      header_image)
      {         
        BusinessRegistration(name,description,email,mobile,category,country,state,city,pincode,address,google_map_latitude,
          meta_title,meta_description,header_image,image_1,image_2,image_3,gst_number,business_pan,entity_type,website,bank_proof);
    
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

   const handleFileSelect = (event) => {
    console.warn(event.target.files);
    setheader_image(event.target.files[0]);   
  }
  const handleFileSelect_Bank = (event) => {
    setbank_proof(event.target.files[0]);   
  }
  const handleFileSelect_im1 = (event) => {
    setimage_1(event.target.files[0]);   
  }
  const handleFileSelect_im2 = (event) => {
    setimage_2(event.target.files[0]);   
  }
  const handleFileSelect_im3= (event) => {
    setimage_3(event.target.files[0]);   
  }
  
   async function BusinessRegistration(name,description,email,mobile,category,country,state,city,pincode,address,google_map_latitude,
    meta_title,meta_description,header_image,image_1,image_2,image_3,gst_number,business_pan,entity_type,website,bank_proof){

      setLoader(true);

    let f_data = new FormData();
    f_data.append('name', name);
    f_data.append('email', email);
    f_data.append('mobile', mobile);
    f_data.append('category', categoryValue);
    f_data.append('description',description);
    f_data.append('country',country);
    f_data.append('state', state);
    f_data.append('city', city);
    f_data.append('address', address);
    f_data.append('pincode',pincode);
    f_data.append('gst_number',gst_number);
    f_data.append('business_pan',business_pan);
    f_data.append('entity_type',entity_type);
    f_data.append('website',website);
    f_data.append('bank_proof',bank_proof);
    f_data.append('google_map_latitude', google_map_latitude);
    f_data.append('meta_title', meta_title);
    f_data.append('meta_description',meta_description);
    f_data.append('header_image',header_image);
    f_data.append('image_1',image_1);
    f_data.append('image_2',image_2);
    f_data.append('image_3',image_3);
   
 
    await axios.post("https://callistoworld.io/lara/public/api/BusinessUpdate/"+bid,
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
            text: 'Details Submitted Successfully',
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

useEffect(() => {
  fetch_data(); 
  view_data(bid);  
    fetch_entity();   
}, []);

async function fetch_entity(){
  setLoader(true);
  
  axios.get("https://callistoworld.io/lara/public/api/BusinessEntityType")
  .then(res => {

    setEntity_type(res.data.BusinessEntityType); 
     console.log(res.data);

    setLoader(false);
}).catch(error => {
    console.log('errr', error)
    setLoader(false);
})
}
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

async function fetch_data_state(country_id){
  setLoader(true);
  
  axios.get("https://callistoworld.io/lara/public/api/state_all/"+country_id)
  .then(res => {

    setState_all(res.data.state_all); 
    
    
     console.log(res.data.state_all);

    setLoader(false);
}).catch(error => {
    console.log('errr', error)
    setLoader(false);
})
}
async function fetch_data_city(state_id){
  setLoader(true);
  
  axios.get("https://callistoworld.io/lara/public/api/city_all/"+state_id)
  .then(res => {

    setcity_all(res.data.city_all); 
    
    
     console.log(res.data.city_all);

    setLoader(false);
}).catch(error => {
    console.log('errr', error)
    setLoader(false);
})
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



const view_data = async () => {
  await axios.get("https://callistoworld.io/lara/public/api/BusinessSingleAdmin/"+bid)
  .then(res => { 
      
    setBusinessListing(res.data.BusinessListing); 
    setname(res.data.BusinessListing.name);
    setdescription(res.data.BusinessListing.description);
    setemail(res.data.BusinessListing.email); 
    setmobile(res.data.BusinessListing.mobile);
    setcategoryValue(res.data.BusinessListing.category);
    setcountry(res.data.BusinessListing.country);
    setstate(res.data.BusinessListing.state);
    setcity(res.data.BusinessListing.city);
    setpincode(res.data.BusinessListing.pincode);
    setgst_number(res.data.BusinessListing.gst_number);
    setwebsite(res.data.BusinessListing.website);
    setentity_type(res.data.BusinessListing.entity_type);
    setbusiness_pan(res.data.BusinessListing.business_pan);
    setaddress(res.data.BusinessListing.address);
    setgoogle_map_latitude(res.data.BusinessListing.google_map_latitude);
    setmeta_title(res.data.BusinessListing.meta_title);
    setmeta_description(res.data.BusinessListing.meta_description);
    setheader_image(res.data.BusinessListing.header_image);
    setimage_1(res.data.BusinessListing.image_1);
    setimage_2(res.data.BusinessListing.image_2);
    setimage_3(res.data.BusinessListing.image_3);
    setIsActive(res.data.BusinessListing.is_active);

    if(res.data.BusinessListing.is_active == "active")
    {
        setactive_readonly(true);
    }
    


    fetch_data_state(res.data.BusinessListing.country);   
    fetch_data_city(res.data.BusinessListing.state);    

    fetch_data_pin(res.data.BusinessListing.city)

    

    console.log(res.data.BusinessListing);

    setLoader(false);
}).catch(error => {
    console.log('errr',error)
    setLoader(false);
})


     
}


    return (
        <div className="Edit_Business">
        <div className="container py-5 h-100">
          <div className="col-12">
        <div className="card" style={{ borderRadius: 15 }}>
        
            <div className="row g-0">
              <div className="col-lg-12">
                <div className="p-3">
               
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                {BusinessListing != null
                   ?<>
                  <h3 className="fw-normal mb-5" style={{ color: "#4835d4" }}>
                    Complete Bussiness Registration
                  </h3>
                 
                  <div className="row">
                    <div className="col-md-6">
                     
                      <label className="form_set"> First Name </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          readOnly
                          onChange={(e) => setname(e.target.value)}
                          placeholder="Enter Name"
                          className="form-control form-control-lg"
                        />
                        
                      </div>

                     

                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set"> Email </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          value={email}
                          readOnly
                          onChange={(e) => setemail(e.target.value)}
                          className="form-control form-control-lg"
                        />
                       
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">

                  
                 
                  <label className="form_set"> Description </label>
                  <textarea type="text" 
                      placeholder="Description"
                      id="description"
                      value={description}
                      rows={4}
                      cols={50}
                     onChange={(e) => setdescription(e.target.value)}
                      />
                  </div>
                
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                          Mobile
                        </label>
                        <input
                          type="text"
                          id="mobile"
                          name="mobile"
                          value={mobile}
                          readOnly
                          onChange={(e) => setmobile(e.target.value)}
                          className="form-control form-control-lg"
                        />
                        
                      </div>
                    </div>
                  
                                  
                    {BCategory != null
                       ?
                       <>  
                    <div className="col-md-6">
                        <label className="form_set">Category</label>
                    <select className="form-control select"
                     value={categoryValue}
                     onChange={(e) => setcategoryValue(e.target.value)}
                     id="categoryValue">
                       {BCategory.map((record, index) => (
                <>
                      <option value={record.id}>{record.name}</option>
                      </> ))}
                    </select>
                  </div>
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
                  <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                      Business Pan
                        </label>
                        <input
                          type="text"
                          id="business_pan"
                          name="business_pan"
                          value={business_pan}
                          onChange={(e) => setbusiness_pan(e.target.value)}
                          readOnly={active_readonly}
                          className="form-control form-control-lg"
                        />
                        
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                      Google Map URL
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
                      GST NO
                        </label>
                        <input
                          type="text"
                          id="gst_number"
                          name="gst_number"
                          value={gst_number}
                          onChange={(e) => setgst_number(e.target.value)}
                          readOnly={active_readonly}
                          className="form-control form-control-lg"
                        />
                        
                      </div>
                    </div>
                  </div>
                  <div className="row">
                  {Entity_type != null
                       ?
                       <>
                  <div className="col-md-6">
                        <label className="form_set">Entity Type</label>
                    <select className="form-control select"
                     value={entity_type}
                     onChange={(e) => setentity_type(e.target.value)}
                     id="entity_type">
                       <option>Select</option>
                    {Entity_type.map((record, index) => (
                    <>
                     
                      <option value={record.id}>{record.name}</option>
                      </> ))} 
                    </select>
                  </div>
                  </> :<></>
                 }
                  
                  <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set"> Website </label>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          value={website}
                          onChange={(e) => setwebsite(e.target.value)}
                          className="form-control form-control-lg"
                        />
                       
                      </div>
                    </div>
                   
                  </div>
                 
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                      Business Logo </label>
                      <input type="file"    
                       onChange={handleFileSelect}
                       id="header_image" 
                       />

                        
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                        Banner 1 </label>
                        <input
                        className="form-control form-control-lg"
                       
                         type="file" id="image_1" 
                         onChange={handleFileSelect_im1}/>

                        
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                      Banner 2  </label>
                        <input
                        className="form-control-lg"
                         type="file" id="image_2" 
                         onChange={handleFileSelect_im2} />

                        
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form-label form_set">
                        Banner 3</label>
                        <input
                        className="form-control form-control-lg"
                         type="file" id="image_3"
                         onChange={handleFileSelect_im3} />                        
                      </div>
                    </div>
                  </div>
                 
                  <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                </>  :<></>
                 }
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

EditBusiness.propTypes = {};

EditBusiness.defaultProps = {};

export default EditBusiness;
