import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import './Trendy_Details.css';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Slider from "react-slick";
import 'bootstrap/dist/css/bootstrap.min.css';
import Loder from '../Loder';
import profile from '../../project_images/user.png';
import { Rating } from 'react-simple-star-rating'
import GoogleMapReact from 'google-map-react';
import * as moment from 'moment';
import Faq from 'react-faq-component';
import { QRCodeCanvas } from "qrcode.react";

import { ImLocation2,ImMail,ImStarFull } from 'react-icons/im';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import usestate from 'usestate';

const Trendy_Details = () => {

  const [Loader, setLoader] = useState(false);
  const [Faq, setFaq] = useState(null);
  const [review, setReview] = useState(null);
  const [comment, setcomment] = useState(null);


  const [BusinessListing, setBusinessListing] = useState(null);
  const [Products, setProducts] = useState(null);
  const [Branches, setBranches] = useState(null);
  const [Review_mid, setReview_mid] = useState(0);
  const [Review_mid_round, setReview_mid_round] = useState(0);
  const [Review_count, setReview_count] = useState(null);
  const [Review_last,setReview_last] =useState(null);
  const [rating, setRating] = useState(0)
  const {id } = useParams();

  const items = [];

  const [Images,SetImages] = useState(null);

  const  [name, setName]  = useState("");
  const  [email, setEmail]  = useState("");
  const  [phone, setPhone]  = useState("");
  const  [description, setDescription]  = useState("");

  const [rating_text, setrating_text] = useState("");

 
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => {
    console.log('Leave')
    console.log(review)
    if(rating == 1)
    {
      setrating_text("poor");
    }
    if(rating == 2)
    {
      setrating_text("Bad");
    }
    if(rating == 3)
    {
      setrating_text("Average");
    }
    if(rating == 4)
    {
      setrating_text("Good");
    }
    if(rating == 5)
    {
      setrating_text("Excellent");
    } 

    if(rating == 0)
    {
      setrating_text("");
    }

    if(rating == null)
    {
      setrating_text("");
    }

  }
  const onPointerMove = (value) => {
    console.log(value)    

    if(value == 1)
    {
      setrating_text("poor");
    }
    if(value == 2)
    {
      setrating_text("Bad");
    }
    if(value == 3)
    {
      setrating_text("Average");
    }
    if(value == 4)
    {
      setrating_text("Good");
    }
    if(value == 5)
    {
      setrating_text("Excellent");
    }
}

const [token, setToken] = useState();

const [authTokens, setAuthTokens] = useState(
  localStorage.getItem("tokens") || ""
);

const setTokens = (data) => {
  localStorage.setItem("tokens", JSON.stringify(data));
  setAuthTokens(data);
};

const handleLogout = () => {
  localStorage.removeItem("tokens");
  setAuthTokens("");
};
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

 const Loggeduser =  localStorage.getItem('user')

 console.log("log",Loggeduser);

 if(Loggeduser === null)
  {
    Swal.fire({
      title: "Please Log in to give review",
      text: 'You are not Logged In',
      icon: 'error',
      confirmButtonText: 'Okay'
  })
  setLoader(false);
  return;
  }

    let f_data = new FormData();
    f_data.append('review', rating);
    f_data.append('comment',comment);
    f_data.append('listing_id',BusinessListing.id);
    f_data.append('user_id',Loggeduser);


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
   if (response.data.status == "true") {
    Swal.fire({
        title: response.data.message,
        text: 'Data Added Successfully',
        icon: 'success',
        confirmButtonText: 'Okay'
    })

    fetch_data();
   
    
    setTokens(id);
    console.log("token",authTokens)
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
});
}  

  const handleSubmit = (event) =>{
    event.preventDefault();
    LeadsPost(name,email,phone,description);
   }
              
   async function LeadsPost(name,email,phone,description){

      setLoader(true);
      const Loggeduser =  localStorage.getItem('user')

      console.log("log",Loggeduser);
     
      if(Loggeduser === null)
       {
         Swal.fire({
           title: "Please Log in to give Request Quote",
           text: 'You are not Logged In',
           icon: 'error',
           confirmButtonText: 'Okay'
       })
       setLoader(false);
       return;
       }

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
    
    axios.get("https://callistoworld.io/lara/public/api/BusinessSingle/"+id)
    .then(res => {    
       
      setBusinessListing(res.data.BusinessListing);

      setProducts(res.data.Products);
      setFaq(res.data.Faq);
      setBranches(res.data.Branches);
      setReview_mid(res.data.Review_mid);
      setReview_mid_round(res.data.Review_mid_round);
      setReview_count(res.data.Review_count);
      setReview_last(res.data.Review_last);
      SetImages(res.data.images);
      
       console.log(res.data);

       if(res.data.BusinessListing.image_1 != null)
       {
        items.push(res.data.BusinessListing.image_1)
       }
       if(res.data.BusinessListing.image_2 != null)
       {
        items.push(res.data.BusinessListing.image_2)
       }
       if(res.data.BusinessListing.image_3 != null)
       {
        items.push(res.data.BusinessListing.image_3)
       }

       console.log("item",items)

      setLoader(false);
  }).catch(error => {
      console.log('errr', error)
      setLoader(false);
  })
  }
  const downloadQRCode = () => {
    const canvas = document.getElementById("qrCode");

    console.log(canvas);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${BusinessListing.id}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };


  if (Loader == true) {
    return (
       <Loder /> )       
    }

   

  return (
     <div className="Trendy_Details">
       
       {BusinessListing != null
    ?
      <>      
        <div className="row">
        <div className="col-md-12 ">   
        <div className="list-single-second mt-5">
  <div className="container">
    <div className="row">
      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
        <div className="vendor-head text-left">
          <h3 className="font_s_size">{BusinessListing.name} </h3>
          
          <p className="vendor-address">
            {BusinessListing.city_id.name}
          </p>
          <a href="#location" className="btn-secondary-link ml-2">
              View Map
            </a>{" "}
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
              <a className='No_Review_Yet' href="#reviews"> <ReviewsMultipletime itr={Review_mid_round} /></a>
            </div>
             <div style={{ clear: "both" }} />
          </div>
        </div>
      </div>
    </div>
  </div>
        </div>
       
        <div className='mt-5'></div>

        <h5 className='mt-5 text-center'>Products</h5>
       
        
      
        <div className='container mt-2'> 
        <div className='flex-card'>                
       
       {Products.map((record, index) => (
           <>  
           <div className="col-xl-4 col-sm-4"> 
          <Link to={"/Products_details/" + record.id}>
        
         <div className="card" style={{ width: "18rem" }}>
           <img src={"https://callistoworld.io/lara/public/upload/"+record.product_image} 
             className="image_fix" />
            <div className="card-body">
           <h5 className="card-title title_name link_disable">{record.name} <br/>
           {(record.price_unit - (record.price_unit*record.discount_percentage/100) - (record.price_unit * ((record.cashback * record.user_cashback/100)/100))) }₹ <br/>
           </h5> 
          </div>
          <div className="vendor-meta">
            <div className="vendor-meta-item "
             >
            <div className="icon_size0 mb-5">
            <span className="location1">Price :{record.price_unit}₹</span>
            </div>

       </div>
        <div className="vendor-meta-item vendor-meta-item-bordered">   
       <div className="icon_size1"><span className="location1">Store Dis:{record.discount_percentage}%</span></div>

 </div>
  </div>

         <div className="vendor-meta">
  <div
   className="vendor-meta-item vendor-meta-item-bordered"
    >
   <span className="vendor-price">
    <p style={{ fontSize: 12 }}>On Request</p>
  </span>
 </div>
  <div className="vendor-meta-item vendor-meta-item-bordered">

    DISQ {record.cashback*(record.user_cashback/100)}%
  
 </div>
         </div>

        </div>          
  
 </Link>
     </div>
 
          </>))}          
      
              
       </div>
        </div>

       
        <AliceCarousel disableButtonsControls="false" autoPlay autoPlayInterval="3000">
                 {Images.map(name => ( 
                  
                  <img className="card-img" 
                  src={"https://callistoworld.io/lara/public/upload/"+name} 
                  alt="Card image"
                  style={{ maxHeight: 500 }} />
                  

            ))}
            </AliceCarousel>       
         </div>
        

        </div>
       
      
      
     

        <div className="">
  <div className="container">
    <div className="row">
      <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12">

      <div className='row'>
      <div className='col-md-12'>
      <div className="vendor-owner-profile mb30">
            <div className="vendor-owner-profile-head">
            <div className="card text-center "  id="qrCode1">           
           <div className='' style={{marginLeft:"15"}}>
              <QRCodeCanvas
                includeMargin={true}
                id="qrCode"
                bgColor={"#ffff00"}
                value={BusinessListing.id+""}
                size={200}
                level={"H"}
              />
     </div>

            <div className="card-body">
            <h5 className="card-title card_name_set">{BusinessListing.name}</h5>
            <div className='col-md-12'>
            <button type="button" className="btn3 btn-primary" onClick={downloadQRCode}>Download QR</button>{" "}
           </div>
       
            <div className='col-md-12 mt-3'>
            <Link to={"/Customer_Main/Payment/" + BusinessListing.id}><button type="button" className="btn3 btn-primary">Click to Pay</button></Link> {" "}
            </div>
           </div>
            
            </div> 
              
            </div>
         
          </div>
          </div>
           </div>



        {/*vendor-details */}
        <div className="">
          <div className="card ">
            <h3 className="card-header bg-white title_size">About {BusinessListing.name}</h3>
            <div className="card-body ">
             
              <div className="ql-editor about_font">
              <div dangerouslySetInnerHTML={createMarkup(BusinessListing.description)} />                 
               
              </div>
             
            </div>
          </div>


       
                     
       
          <div id="reviews">
            <div className="card  ">
              <div className="card-header bg-white">
                <h3 className="mb0 d-inline-block title_size">Reviews</h3>
                <a
                  href="#writereview"
                  className="btn btn-default btn-sm float-right d-inline-block"
                >
                  write a review
                </a>
              </div>
              <div className="card-body">
                <div className="review-block">
                  <div className="row review_font">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                      {/* review-sidebar */}
                      <div className="review-sidebar ">
                      <ReviewsMultipletime itr={Review_mid_round} />
                        <div className="review-total">This Business has {Review_mid} Star Review On Basis of {Review_count} People</div>
                        
                        <hr/>
                      </div>
                      
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">

                        {Review_last != null ? 
                        <>
                        {Review_last.map((record, index) => (
                        <>  
                    <div className="review-total">Review By {record.user_id_id.name}</div>
                    {record.comment != null || record.comment != "null" &&
                    <p className="meta-date" style={{font_size:"12px"}}>{record.comment}</p>
                    }
                    
                    <ReviewsMultipletime itr={record.review} />

                    <p className="meta-date">{moment(record.created_at).format('MMMM Do YYYY')}</p>

                    <hr/>

                       
                   
                      </>))}  
                      </> 
                    
                   
                    :<></>}
                    </div>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          <div id="comment_card"></div>
        </div>
        <form onSubmit={handleRating}> 
        <div className="card leave-review" id="writereview">
          <div className="card-header bg-white mb0">
            <h3 className="mb0">Write Your Reviews</h3>
            <Rating              
              value={review}
              id="review"
              onChange={(e) => setReview(e.target.value)}
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onPointerMove={onPointerMove}
              onClick = {onClick}
            />
            <h3>{rating_text}</h3>
          </div>
          <div className="card-body" id="card-body">
            <span id="show_msg" />
                   
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt30">
                  <div className="form-group">
                    <label className="control-label" htmlFor="review">
                      Write Your Review
                    </label>
                    <textarea   className="form-control"
                      placeholder="Write Review"
                      rows={5} id="comment"  name="comment"
                      onChange={(e) => setcomment(e.target.value)}
                      cols={50}
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                 <button type='submit' className='btn btn-primary'>Submit</button>
                  </div>
                </div>
              </div>
           
          </div>
        </div>
        </form>
       
        
       
     {Faq != null || Faq != undefined ? <>
         
            <div className='col-md-12'>
            {Faq.map((record, index) => (
            <>  
             <div className="faq"> 
                 <p className="faq-heading" dangerouslySetInnerHTML={createMarkup(record.question)}/>
                 <p dangerouslySetInnerHTML={createMarkup(record.answer)}></p>                  
             </div>
             </>))} 
             </div>
           
          </> : <></> }
      
      </div>
      
    
      <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12">
        <div className="sidebar-venue">
          <div className="card">
            <span id="show_msg" className="text-success" />
            <div className="card-body">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
              </div>
              <form onSubmit={handleSubmit}>              
                
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h3 className="mb20 title_size">Request Quote</h3>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12  col-sm-12 col-12">
                    <div className="form-group ">
                      <label className="control-label sr-only">Name</label>
                      <input
                        className="form-control input-md review_font_system"
                        placeholder="Name" id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name="name" type="text" />
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                      <label className=" control-label sr-only"> Email</label>
                      <input className="form-control input-md review_font_system" placeholder="Email"
                        id="email"  name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} type="text"/>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                      <label className=" control-label sr-only"> Phone</label>
                      <input
                        className="form-control input-md review_font_system"
                        placeholder="Phone" id="phone" name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                      />
                    </div>
                  </div>
             
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                      <label className="control-label sr-only"> Comment</label>
                      <textarea
                        className="form-control review_font_system"
                        placeholder="Write Comment"
                        id="description"  rows={5} name="description" cols={50}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        defaultValue={""} />
                    
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                    <button type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
         
          <div className="vendor-owner-profile mb30">
            <div className="vendor-owner-profile-head">
            <div className="card">
            <img className="card-img-top card_set" 
            src={"https://callistoworld.io/lara/public/upload/"+BusinessListing.header_image}
             alt="Card image cap" />
            <div className="card-body">
            <h5 className="card-title card_name_set">{BusinessListing.name}</h5>
           <div className='vendor-meta'>
            <div className='col-md-12 mt-3'>
            <div className="mb-3"><ImLocation2/>
            <span className="location1">{BusinessListing.city_id.name}</span>
            </div>
            </div>
           </div>
           <div className='vendor-meta'>
            <div className='col-md-12 mt-3'>
            <div className=" mb-3"><ImMail/>
            <span className="location1">{BusinessListing.email}</span>
            </div>
            </div>
           </div>
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

Trendy_Details.propTypes = {};

Trendy_Details.defaultProps = {};

export default Trendy_Details;
