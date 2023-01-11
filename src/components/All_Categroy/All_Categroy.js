import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import './All_Categroy.css';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Slider from "react-slick";
import 'bootstrap/dist/css/bootstrap.min.css';
import Loder from '../Loder';
import profile from '../../project_images/user.png';
import { Rating } from 'react-simple-star-rating'

import { ImLocation2,ImMail,ImStarFull } from 'react-icons/im';
import { faStar } from "@fortawesome/free-solid-svg-icons";

const All_Categroy = () => {


  const [Loader, setLoader] = useState(false);
  const [Faq, setFaq] = useState(null);
  const [review, setReview] = useState(null);
  const [comment, setcomment] = useState(null);


  const [BusinessListing, setBusinessListing] = useState(null);
  const [BCategory, setBCategory] = useState(null);
  const [BChildCategory, setBChildCategory] = useState(null);

  const [HomeSetting,setHomeSetting] = useState(null);
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
  }, [id]);

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

async function checkLogin() {

  let f_data = new FormData();
  f_data.append('mobile', "9890437811");
  f_data.append('password', "1218");


  axios.post("https://callistoworld.io/lara/public/api/LoginPost",f_data ,
  { headers: {
     'accept': 'application/json',
     'Accept-Language': 'en-US,en;q=0.8',
     'Content-Type': `form-data;`,
   }})
   .then(function (response)
   {
    
   console.log(response);

   if(response.status == "true")
   {
      localStorage.setItem('user',"9890437811")
   }
   
  

  
})
}

  async function fetch_data(){
    setLoader(true);
    
    axios.get("https://callistoworld.io/lara/public/api/CategorySingle/"+id)
    .then(res => {
      
      setBCategory(res.data.BCategory);     
      setBusinessListing(res.data.BusinessListing);
      setBChildCategory(res.data.BChildCategory);
      setProducts(res.data.Products);
      setFaq(res.data.Faq);
      setBranches(res.data.Branches);
      setReview_mid(res.data.Review_mid);
      setReview_mid_round(res.data.Review_mid_round);
      setReview_count(res.data.Review_count);
      setReview_last(res.data.Review_last);
      
       console.log(res.data.BusinessListing);

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
     <div className="All_Categroy">
      
     
       

        {BCategory != null
        ?
      <>

        <div className='container mt-5 flex-btn'>
       {BChildCategory.map((record, index) => (
           <>
           <Link to={"/All_Categroy/" + record.id}>
       <button type="button" 
       className="btn ml-1 btn-outline-primary"
       onClick = {checkLogin} > 
       {record.name}
       </button>
       </Link>
       </>
       ))} 
       </div>


        <div className='container mt-5'> 
        <div className='row'>
        
        {BusinessListing.map((record, index) => (
           <>  
         <div className="col-md-3">        
         <Link to={"/Trendy_Details/" + record.id}>
         <div className="card">
           <img src={"https://callistoworld.io/lara/public/upload/"+record.header_image} 
             className="image_fix" />
            <div className="card-body">
           <h5 className="card-title title_name link_disable">{record.name}</h5> 
          </div>
          <div className="vendor-meta">
            <div className="vendor-meta-item1"
             style={{ height: 50 }} >
            <div className="icon_size3 mb-5"><ImLocation2/>
            <span className="location1">{record.city_id.name}</span>
            </div>

       </div>
  </div>

<div className="vendor-meta">
  <div
   className="vendor-meta-item vendor-meta-item-bordered"
   style={{ height: 70 }} >
   <span className="vendor-price">
    <p style={{ fontSize: 16 }}>On Request</p>
  </span>
 </div>
  <div className="vendor-meta-item vendor-meta-item-bordered">
  <span className="rating-star"></span>
  <span style={{ fontSize: 16 }} className="rating-count vendor-text">No Review Yet</span>
 </div>
  </div>

        </div>          
        </Link>
 
         </div>
         </>))} 
    </div>         
    </div>
       
        </>
      :<></>
      }
      
     
     
      </div>
      
    
  )


};

All_Categroy.propTypes = {};

All_Categroy.defaultProps = {};

export default All_Categroy;
