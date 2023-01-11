import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewCategroy.css';
import "react-alice-carousel/lib/alice-carousel.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Loder from '../Loder';


const ViewCategroy = () => {

  const [Loader, setLoader] = useState(false);
  const [HomeSetting, setHomeSetting] = useState(null);
  const [BusinessListing, setBusinessListing] = useState(null);
  const [BCategory , setBCategory] =useState(null);
  
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
       console.log(res.data.HomeSetting);

      setLoader(false);
  }).catch(error => {
      console.log('errr', error)
      setLoader(false);
  })
  }

  if (Loader === true) {
    return (
       <Loder /> )       
    }


  return (
     <div className="ViewCategroy first_page_init">
      
       {HomeSetting != null
    ?
       <>
      <div className="body">
       <div className="row text-center">
    <div className="col-md-12">
        <div className="text-center search-head ">
         <h3 className="search-head-title1 ">Popular Categories</h3>
        <h4 className=''>Select Category which you need.
       </h4>
      </div>
    </div>

    <div className="space-medium">
    <div className="container">

    <div className="row">   
  {BCategory.map((record, index) => (
            <>  
   
    <div className="col-xl-2 col-sm-4 col-4 mt-5">
    <Link to={"/All_Categroy/" + record.id}>
    <img src={"https://callistoworld.io/lara/public/upload/"+record.image} className="rounded-circle image_round"/>
    <div className="vendor-icon-text mt-2">
    <h5 className='mt-3 link_disable fs-15'>{record.name}</h5>
    </div>
    </Link>
    </div> 
   
    </>))} 
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

ViewCategroy.propTypes = {};

ViewCategroy.defaultProps = {};

export default ViewCategroy;
