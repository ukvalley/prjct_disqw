import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';

import axios from 'axios';
import './Products_details.css';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Slider from "react-slick";
import 'bootstrap/dist/css/bootstrap.min.css';
import Loder from '../Loder';
import profile from '../../project_images/user.png';
import { Rating } from 'react-simple-star-rating'
import Swal from 'sweetalert2'


const Products_details = () => {

  const [Loader, setLoader] = useState(false);
  const [Faq, setFaq] = useState(null);
  const [number, setnumber] = useState(null);

  const [Product, setProduct] = useState(null);
  const [Branches, setBranches] = useState(null);
  const [listing_id_id , setlisting_id_id] = useState(null);
  const [rating, setRating] = useState(0)
  const {id } = useParams();

 const uid = localStorage.getItem('user');

  useEffect(() => {
    fetch_data();            
  }, []);


 async function purchaseProduct()
  {

    if(uid == null)
    {
      Swal.fire({
        title: 'Please Log in first to make purchase',
        text: 'Please Log in first to make purchase',
        icon: 'error',
        confirmButtonText: 'Okay'
    })

  }

  if(Product.id == null)
    {
      Swal.fire({
        title: 'Product Id Not Found',
        text: 'Product Id Not Found',
        icon: 'error',
        confirmButtonText: 'Okay'
    })

    return false;
    }

    let price = (Product.price_unit - (Product.price_unit*Product.discount_percentage/100) );

    setLoader(true);
   

  let f_data = new FormData();
  f_data.append('bid', Product.listing_id);
  f_data.append('pid',Product.id);
  f_data.append('uid', uid);
  f_data.append('amount', price);
  
 
 

  await axios.post("https://callistoworld.io/lara/public/api/PurchaseProduct",
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
          text: 'Product Order Created Successfully',
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

  function createMarkup(text) { return {__html: text}; };           
           
  async function fetch_data(){
    setLoader(true);
    
    axios.get("https://callistoworld.io/lara/public/api/ProductSingle/"+id)
    .then(res => {
    
      setProduct(res.data.Product);
      setFaq(res.data.Faq);
      setBranches(res.data.Branches);
      setlisting_id_id(res.data.listing_id_id);

       console.log(res.data);

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
     <div className="Products_details">
       
       {Product != null
    ?
      <>            
        

       
         <div className="list-single-second mt-3">
  <div className="container">
    <div className="row">
      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
        <div className="vendor-head text-left">
          <h1 className="font_s_size">{Product.name}</h1>
          <h3 className="vendor-address mt-4">
            MRP {Product.price_unit} ₹ | Store Discount: {Product.discount_percentage}%  | Disq {(Product.cashback * Product.user_cashback/100)}%   <br/>

            Value Price:  {(Product.price_unit - (Product.price_unit*Product.discount_percentage/100) - (Product.price_unit * ((Product.cashback * Product.user_cashback/100)/100))) }₹ 
           
          </h3>

          

          <button onClick={purchaseProduct} className='btn btn-primary'>Purchase Now</button>
        </div>
      </div>
     
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="">         
         
        </div>
      </div>
    </div>
  </div>
        </div>

     
        <div className="vendor-content-wrapper">
  <div className="container">
    <div className="row">
      <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12">
        {/*vendor-details */}
        <div className="">
          <div className="card ">
            <h3 className="card-header bg-white title_size">About {Product.name}</h3>
            <div className="card-body ">
             
              <div className="ql-editor about_font">
              <div dangerouslySetInnerHTML={createMarkup(Product.description)} />                 
             
              </div>
             
            </div>
          </div>
        
         
        </div>
       
       
          <div className="card" style={{ width: "22rem" }}>
            <img className="card-img-top card_set" 
            src={"https://callistoworld.io/lara/public/upload/"+Product.product_image}
             alt="Card image cap" />
            </div>    


            <div className="row">
        <div className="col-md-12 ">   
           
          
                 {Product.image_1 != null
                 ? 
                 <div className="card bg-white text-white">
                 <img className="card-img" 
                 src={"https://callistoworld.io/lara/public/upload/"+Product.image_1} 
                 alt="Card image"
                 style={{ maxHeight: 500, borderRadius: 5 }} />
                 </div>
                 :<></>}
    
                {Product.image_2 != null
                 ?
                 <div className="card bg-white text-white">
                 <img className="card-img" 
                 src={"https://callistoworld.io/lara/public/upload/"+Product.image_2} 
                 alt="Card image"
                 style={{ maxHeight: 500, borderRadius: 5 }} />
                 </div>
                 :<></>}
    
                {Product.image_3 != null
                 ?
                 <div className="card bg-white text-white">
                 <img className="card-img"
                  src={"https://callistoworld.io/lara/public/upload/"+Product.image_3} 
                  alt="Card image" 
                  style={{ maxHeight: 500, borderRadius: 5 }}/>
                  </div>
                  :<></>}


           
              
          
             
            
         
         </div>
         </div>
          
 
           
          
         
      </div>
      
    
      
    </div>
    
  </div>
        </div>
      
      </>
      :<></>
      }
     
      </div>
      
    
  )


};

Products_details.propTypes = {};

Products_details.defaultProps = {};

export default Products_details;
