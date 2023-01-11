import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import './Child_Categroy_Details.css';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Slider from "react-slick";
import 'bootstrap/dist/css/bootstrap.min.css';
import Loder from '../Loder';
import profile from '../../project_images/user.png';
import { Rating } from 'react-simple-star-rating'
import GoogleMapReact from 'google-map-react';

import { ImLocation2,ImMail,ImStarFull } from 'react-icons/im';
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Child_Categroy_Details = () => {

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const [Loader, setLoader] = useState(false);
  const [Faq, setFaq] = useState(null);
  const [review, setReview] = useState(null);
  const [comment, setcomment] = useState(null);


  const [BusinessListing, setBusinessListing] = useState(null);
  const [BChildCategory, setBChildCategory] = useState(null);
  const [BCategory, setBCategory] = useState(null);

  
  const [Products, setProducts] = useState(null);
  const [Branches, setBranches] = useState(null);
  const [Review_mid, setReview_mid] = useState(0);
  const [Review_mid_round, setReview_mid_round] = useState(0);
  const [Review_count, setReview_count] = useState(null);
  const [Review_last,setReview_last] =useState(null);
  const [rating, setRating] = useState(0)
  const {id } = useParams();

  const  [name, setName]  = useState("");
  const  [email, setEmail]  = useState("");
  const  [phone, setPhone]  = useState("");
  const  [description, setDescription]  = useState("");

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value) => {
    console.log(value)
    


  }

  const onClick = (value) => {
    setRating(value);
  }
  

  useEffect(() => {
    fetch_data();            
  }, []);

  function createMarkup(text) { return {__html: text}; };
    
  const handleRating = (event) => {
    event.preventDefault();
    ReviewPost(review,comment);  
    
 }

 async function ReviewPost(review,comment){

  setLoader(true);

    let f_data = new FormData();
    f_data.append('review', rating);
    f_data.append('comment',comment);
    f_data.append('listing_id',BusinessListing.id)
    f_data.append('user_id',1)


   await axios.post("https://callistoworld.io/lara/public/api/ReviewPost", 
    f_data ,
   { headers: {
     'accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.8',
    'Content-Type': `multipart/form-data;`,
   }})
   .then(function (response)
   {
     setName('');
    
  console.log(response);
   setLoader(false);
    })
.catch(function (error) {
setLoader(false);
console.log(error);
});
}  

  const handleSubmit = (event) =>{
    event.preventDefault();
    LeadsPost(name,email,phone,description);
   }
              
   async function LeadsPost(name,email,phone,description){

      setLoader(true);

    let f_data = new FormData();
    f_data.append('name', name);
    f_data.append('email', email);
    f_data.append('phone', phone);
    f_data.append('description',description);
    f_data.append('listing_id',BusinessListing.id)
   
 
    await axios.post("https://callistoworld.io/lara/public/api/LeadsPost", 
    f_data ,
 { headers: {
    'accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.8',
    'Content-Type': `multipart/form-data;`,
  }})
   .then(function (response)
    {
      setName('');
      setEmail('');
      setPhone('');
      setDescription('');
    console.log(response);
    setLoader(false);
   

   
})
.catch(function (error) {
    setLoader(false);
    console.log(error);
});
}      


function ReviewsMultipletime (props) {
  
    let rows = [];
    for (let i=0; i< props.itr; i++ )
    {
      rows.push("hi");
    }
    return (
    <div>
      {rows.map((object,i) =>  <ImStarFull className='star_review'/>)}
    </div>
    )
  
}

  async function fetch_data(){
    setLoader(true);
    
    axios.get("https://callistoworld.io/lara/public/api/CategorySingle/"+id)
    .then(res => {
    
       
      setBusinessListing(res.data.BusinessListing);
      setProducts(res.data.Products);
      setBCategory(res.data.BCategory);
      setBChildCategory(res.data.BChildCategory);
      setFaq(res.data.Faq);
      setBranches(res.data.Branches);
      setReview_mid(res.data.Review_mid);
      setReview_mid_round(res.data.Review_mid_round);
      setReview_count(res.data.Review_count);
      setReview_last(res.data.Review_last);
      
       console.log(res.data.BCategory);

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
     <div className="Child_Categroy_Details">
       
       {BCategory != null
        ?
      <>    
      <div className='col-md-12'>
       <div className="card bg-white text-center">
                 <img className="card-img img_sizechild" 
                 src={"https://callistoworld.io/lara/public/upload/"+BCategory.image} 
                 alt="Card image"
                  />
       </div>
       
         <div className="list-single-second mt-1">
  <div className="container">
    <div className="row">
      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
        <div className="vendor-head text-left">
          <h1 className="font_s_size">{BCategory.name}</h1>
          <p className="vendor-address">          
            <a href="#location" className="btn-secondary-link ml-2">
              View Map
            </a>{" "}
          </p>
        </div>
      </div>
     
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="">         
          <div className="vendor-meta-item vendor-meta-item-bordered">
            <div
              style={{ float: "left", paddingRight: 10 }}
              className="rating-star"
            ></div>
            <div style={{ float: "left" }} className="rating-count vendor-text">
              <a className='No_Review_Yet' href="#reviews">No Review Yet</a>
            </div>
             <div style={{ clear: "both" }} />
          </div>
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
            <h3 className="card-header bg-white title_size">About {BCategory.name}</h3>
            <div className="card-body ">
             
              <div className="ql-editor about_font">
              <div dangerouslySetInnerHTML={createMarkup(BCategory.description)} />                 
               
              </div>
             
            </div>
          </div>
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

Child_Categroy_Details.propTypes = {};

Child_Categroy_Details.defaultProps = {};

export default Child_Categroy_Details;
