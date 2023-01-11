import React, { useState, useEffect, handleNavigation } from "react";
import './EditProducts.css';
import { useParams,Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Editor, EditorState} from 'draft-js';
import Loder from '../Loder';

const EditProducts = () => {
 
  const [Loader,setLoader]= useState(false);
  const [Product,setProduct] =useState(null);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [HomeSetting, setHomeSetting] = useState(null);
  const [BusinessListing, setBusinessListing] = useState(null);
  const [price_unit, setprice_unit] = useState("");
  const [discount_percentage, setdiscount_percentage] = useState("");
  const [listing_id, setlisting_id] = useState("");
  
  const [country, setcountry] = useState("");
  const [product_image, setproduct_image] =useState(null);
  const [image_1, setimage_1] = useState(null);
  const [image_2, setimage_2] = useState(null);
  const [image_3, setimage_3] = useState(null);    

  const [image_4, setimage_4] = useState(null);    
  const [image_5, setimage_5] = useState(null);    

  const navigate = useNavigate();
  const {id } = useParams();

  const handleSubmit = (event) =>{
    event.preventDefault();
    ProductRegistration(name,description,price_unit,discount_percentage,listing_id,product_image,image_1,image_2,image_3,image_4,image_5);
   }

   const handleFileSelect = (event) => {
    setproduct_image(event.target.files[0]);   
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
  const handleFileSelect_im4 = (event) => {
    setimage_4(event.target.files[0]);   
  }
  const handleFileSelect_im5= (event) => {
    setimage_5(event.target.files[0]);   
  }
  
   async function ProductRegistration(name,description,price_unit,discount_percentage,listing_id,product_image,image_1,image_2,image_3,image_4,image_5){

      setLoader(true);

    let f_data = new FormData();
    f_data.append('name', name);
    f_data.append('description',description);
    f_data.append('price_unit', price_unit);
    f_data.append('discount_percentage',discount_percentage);
    f_data.append('listing_id', listing_id);
    f_data.append('product_image',product_image);
    f_data.append('image_1',image_1);
    f_data.append('image_2',image_2);
    f_data.append('image_3',image_3);
    f_data.append('image_4',image_4);
    f_data.append('image_5',image_5);
   
 
    await axios.post("https://callistoworld.io/lara/public/api/ProductUpdate/"+id,
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
    fetch_Business();        
  }, []);

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
  async function fetch_data(){
    setLoader(true);
    
    axios.get("https://callistoworld.io/lara/public/api/ProductSingle/"+id)
    .then(res => {
    
      setProduct(res.data.Product);
      setname(res.data.Product.name);
      setprice_unit(res.data.Product.price_unit);
      setdiscount_percentage(res.data.Product.discount_percentage);
      setlisting_id(res.data.Product.listing_id);
      setdescription(res.data.Product.description);
      setproduct_image(res.data.Product.product_image);
      setimage_1(res.data.Product.image_1);
      setimage_2(res.data.Product.image_2);
      setimage_3(res.data.Product.image_3);
      setimage_4(res.data.Product.image_4);
      setimage_5(res.data.Product.image_5);


       console.log(res.data);

      setLoader(false);
  }).catch(error => {
      console.log('errr', error)
      setLoader(false);
  })
  }


    return (
        <div className="EditProducts">
       <div className="container py-5 h-100">
          <div className="col-12">
        <div className="card" style={{ borderRadius: 15 }}>
        
            <div className="row g-0">
              <div className="col-lg-12">
                <div className="p-3">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <h3 className="fw-normal mb-5" style={{ color: "#4835d4" }}>
                  Product Registration  </h3>
                 
                  <div className="row">
                    <div className="col-md-6">
                     
                      <label className="form_set">Product Name </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                          placeholder="Enter Name"
                          className="form-control form-control-lg"
                          required="true"
                        />
                        
                      </div>

                     

                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">Price Unit </label>
                        <input
                          type="text"
                          id="price_unit"
                          name="price_unit"
                          value={price_unit}
                          onChange={(e) => setprice_unit(e.target.value)}
                          className="form-control form-control-lg"
                          required="true"
                        />
                       
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                  <div className="col-md-6">
                      <div className="form-outline">
                      <span className="text-left">Discount Percentage</span>
                        <input
                          type="text"
                          id="discount_percentage"
                          name="discount_percentage"
                          value={discount_percentage}
                          onChange={(e) => setdiscount_percentage(e.target.value)}
                          className="form-control form-control-lg"
                          required="true"
                        />
                       
                      </div>
                    </div>

                    {HomeSetting != null
                       ?
                       <> 
                        {BusinessListing != null
                       ?
                       <>  
                    <div className="col-md-6">
                        <label className="form_set">Listing Id</label>
                    <select className="form-control select"
                     value={listing_id}
                     onChange={(e) => setlisting_id(e.target.value)}
                     id="listing_id"
                     required="true">
                      <option>Select</option>
                     {BusinessListing.map((record, index) => (
                     <>
                      <option value={record.id}>{record.name}</option>
                      </> ))}
                    </select>
                    </div>
                    </> :<></>}
                      </> :<></>}

                  </div>

                  
                  <div className="row mt-5">
               <label>Description</label>
                  <textarea type="text" 
                      placeholder="Description"
                      id="description"
                      value={description}
                      rows={4}
                      cols={50}
                     onChange={(e) => setdescription(e.target.value)}
                     required="true"
                      />
                  </div>
                
                 
                 
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                      Product Image  </label>
                      <input type="file"    
                       onChange={handleFileSelect}
                       id="product_image" 
                       
                       />

                        
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                        Image 1 </label>
                        <input
                        className="form-control form-control-lg"                       
                         type="file" id="image_1" 
                         onChange={handleFileSelect_im1}
                         />                       
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
                         type="file" id="image_2" 
                         onChange={handleFileSelect_im2} 
                         />
                       
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form-label" htmlFor="form3Examplev2">
                        Image 3</label>
                        <input
                        className="form-control form-control-lg"
                         type="file" id="image_3"
                         onChange={handleFileSelect_im3}
                          />                        
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form_set">
                      Image 4  </label>
                        <input
                        className="form-control form-control-lg"
                         type="file" id="image_4" 
                         onChange={handleFileSelect_im4} 
                         />

                        
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-outline">
                      <label className="form-label" htmlFor="form3Examplev2">
                        Image 5</label>
                        <input
                        className="form-control form-control-lg"
                         type="file" id="image_5"
                         onChange={handleFileSelect_im5}
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

EditProducts.propTypes = {};

EditProducts.defaultProps = {};

export default EditProducts;
