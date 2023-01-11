import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './All_Blog.css';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Slider from "react-slick";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import createMarkup from 'create-markup';
import Loder from '../Loder';
import ReadMoreAndLess from 'react-read-more-less';

//import icons from react icons



import profile from '../../project_images/user.png';


import { TbMessage} from 'react-icons/tb';
import { ImLocation2 } from 'react-icons/im';
import { FcCalendar,FcFeedback,FcPhone } from 'react-icons/fc';
import {AiFillLinkedin,AiFillSafetyCertificate ,AiOutlineTwitter} from 'react-icons/ai';
import {TiSocialYoutube ,TiSocialInstagram} from 'react-icons/ti';
import {BsFacebook } from 'react-icons/bs';



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

const All_Blog = () => {

  const [Loader, setLoader] = useState(false);
  const [HomeSetting, setHomeSetting] = useState(null);
  const [BusinessListing, setBusinessListing] = useState(null);
  const [BCategory , setBCategory] = useState(null);
  const [Blog , setBlog] = useState(null);
 
  const [Category,setCategory] =useState("");

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

  async function fetch_data(){
    setLoader(true);
    
    axios.get("https://callistoworld.io/lara/public/api/HomeApi/1")
    .then(res => {

      setHomeSetting(res.data.HomeSetting);
      setBusinessListing(res.data.BusinessListing);
      setBCategory(res.data.BCategory);
      setBlog(res.data.Blogs);
      
       console.log(res.data.Blogs);

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
     <div className="All_Blog">
       
       {HomeSetting != null
    ?
    <>
      <div className="">
    
   <div className="space-medium">
          <div className="container">
    <div className="row">
      <div className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
        <div className="section-title text-center">
          {/* section title start*/}
          <h1 className='subtitle_size sub_text'>Blogs</h1>
        
        </div>
        {/* /.section title start*/}
      </div>
    </div>
    <div className="row">
     <div className='col-md-12 ' >
     {Blog.map((record, index) => (
        <> 
     <Link to={"/Blog_Content/"+record.id}>
      <div className='col-md-4'>
      <div className="post-img">
      <img src={"https://callistoworld.io/lara/public/upload/"+record.header_image}
            alt="" className="img-fluid" />       
      </div>
      <div className="post-content1">
        <h3 className="post-heading"> 
        <a href="#" className="post-title link_disable">         
           {record.title} </a>
       </h3>   

        <div className='des' dangerouslySetInnerHTML={createMarkup(record.description.slice(0, 100))} />
       
        <p className="meta">
         <span className="meta-date">Created Date: {record.created_at}</span>
        </p>
      </div>
      </div>
      </Link> 
      </>
       ))}
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

All_Blog.propTypes = {};

All_Blog.defaultProps = {};

export default All_Blog;
