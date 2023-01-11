import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './All_Listing.css';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Slider from "react-slick";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import createMarkup from 'create-markup';
import Loder from '../Loder';
import ReadMoreAndLess from 'react-read-more-less';
import { Routes, Route, useParams,useSearchParams } from 'react-router-dom';
import { ImLocation2,ImMail,ImStarFull } from 'react-icons/im';
import {AiFillLinkedin,AiFillSafetyCertificate ,AiOutlineTwitter} from 'react-icons/ai';
import {TiSocialYoutube ,TiSocialInstagram} from 'react-icons/ti';



var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const All_Listing = () => {

  const [Loader, setLoader] = useState(false);
  const [HomeSetting, setHomeSetting] = useState(null);
  const [BusinessListing, setBusinessListing] = useState(null);
  const [BusinessListing1, setBusinessListing1] = useState(null);
  const [BCategory , setBCategory] = useState(null);
  const [Blog , setBlog] = useState(null);
  const [Category,setCategory] =useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [Images,SetImages] = useState(null);

  const [Products, setProducts] = useState(null);
  const [Branches, setBranches] = useState(null);
  const [Review_mid, setReview_mid] = useState(0);
  const [Review_mid_round, setReview_mid_round] = useState(0);
  const [Review_count, setReview_count] = useState(null);
  const [Review_last,setReview_last] =useState(null);
  const [rating, setRating] = useState(0)
  const {id } = useParams();

  const items = [];


  const { s_city,sets_City } =useState("");
  const { s_category,sets_Category } = useState("");

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="entry-summary">
        {isReadMore ? text.slice(0,20) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };
  
  useEffect(() => {
    fetch_data();   
  }, []);

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

    
   
    
    axios.get("https://callistoworld.io/lara/public/api/SearchListing?city="+searchParams.get("city")+"&category="+searchParams.get("category"))
    .then(res => {

      setHomeSetting(res.data.HomeSetting);
      setBusinessListing(res.data.BusinessListing);
    
       console.log(res);

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
     <div className="All_Listing">
       
       {HomeSetting != null
    ?
    <>
         <div className="space-medium">
          <div className="container">
    <div className="row">
      <div className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
        <div className="section-title text-center">
          <h1 className='subtitle_size text-black'>Listing</h1>
        </div>
      </div>
    </div>
    <div className="row">
     <div className='col-md-12'>
     {BusinessListing.map((record, index) => (
           <>  
           <div className="col-xl-4 col-sm-4"> 
          <Link to={"/Trendy_Details/" + record.id}>
        
         <div className="card">
           <img src={"https://callistoworld.io/lara/public/upload/"+record.header_image} 
             className="card-img-top image_fix" />
            <div className="card-body">
           <h5 className="card-title title_name link_disable" >{record.name}</h5> 
          </div>
          <div className="vendor-meta">
            <div className="vendor-meta-item "
              >
            <div className="icon_size0 mb-5"><ImLocation2/>
            <span className="location1">{record.city_id.name}</span>
            </div>

       </div>
        <div className="vendor-meta-item vendor-meta-item-bordered">   
       <div className="icon_size1"><AiFillSafetyCertificate/><span className="location1">{record.country_id.name}</span></div>

 </div>
  </div>

<div className="vendor-meta">
  <div
   className="vendor-meta-item vendor-meta-item-bordered"
    >
   <span className="vendor-price">
    <p style={{ fontSize: "12px" }}>On Request</p>
  </span>
 </div>
  <div className="vendor-meta-item vendor-meta-item-bordered">
  <span className="rating-star"></span>
  {record.review_count == null ?<>
    <label>No Review Yet</label>

  </>:<>
  <span style={{ fontSize: 12 }} className="rating-count vendor-text"><ReviewsMultipletime itr={record.review_count}/></span>

</>}
 </div>
  </div>

        </div>          
  
 </Link>
     </div>
 
 </>))}     
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

All_Listing.propTypes = {};

All_Listing.defaultProps = {};

export default All_Listing;
