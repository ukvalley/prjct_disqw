import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';

import axios from 'axios';
import './Blog_Content.css';
import "react-alice-carousel/lib/alice-carousel.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Loder from '../Loder';

import blog from '../../project_images/blog.png';

const Blog_Content = () => {

  const [Loader, setLoader] = useState(false);
  const [Blog, setBlog] = useState(null);
  const {id } = useParams();

  useEffect(() => {
    fetch_data();            
  }, []);

  function createMarkup(text) { return {__html: text}; };
     
                       

  async function fetch_data(){
    setLoader(true);
    
    axios.get("https://callistoworld.io/lara/public/api/BlogSingle/"+id)
    .then(res => {
     
      setBlog(res.data.Blog);
     
      console.log(res.data.Blog);

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
     <div className="Blog_Content a">
       
       {Blog != null
       ?
      <>      
        <div className="row">
        <div className="col-md-12 "> 
         {Blog.header_image != null
                    ? 
           <div className="card bg-white text-white">
           <img className="card-img blog_img" 
            src={"https://callistoworld.io/lara/public/upload/"+Blog.header_image} 
             alt="Card image"/>
             </div>
           :<></>}
                 
             </div>

        </div>
       
    
        <div className="mt-5">
            <div className="container">
              <div className="row">
                 <div className="col-xl-12 col-lg-8 col-md-12 col-sm-12 col-12">
                 
                   <div className="card ">
            
            <h3 className="card-header bg-white title_size">{Blog.title}</h3>
            <div className="card-body ">
             
              <div className="ql-editor about_font">
              <div dangerouslySetInnerHTML={createMarkup(Blog.description)} />                 
               
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
      
    
  )};

Blog_Content.propTypes = {};

Blog_Content.defaultProps = {};

export default Blog_Content;
