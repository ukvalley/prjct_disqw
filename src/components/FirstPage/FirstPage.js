import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FirstPage.css';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams, Link ,useNavigate} from "react-router-dom";
import createMarkup from 'create-markup';
import Loder from '../Loder';
import * as moment from 'moment';
//import icons from react icons
import {AiFillSafetyCertificate , AiOutlineSearch,AiTwotonePhone} from 'react-icons/ai';
import { ImLocation2,ImStarFull } from 'react-icons/im';
import whatsapp from '../assets/whatsapp.png'
import contact from '../assets/contact.png'
import message from '../assets/message.png'
import Swal from 'sweetalert2'

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

const FirstPage = () => {

  const [Loader, setLoader] = useState(false);
  const [HomeSetting, setHomeSetting] = useState(null);
  const [BusinessListing, setBusinessListing] = useState(null);
  const [BestDeals, setBestDeals] = useState(null);

  const[Testimonials,setTestimonials] = useState(null);
  const [city_all,setcity_all] = useState(null);
  const [BCategory , setBCategory] = useState(null);
  const [Blog , setBlog] = useState(null);
  const [SearchCity,setSearchCity] = useState(null);
  const navigate = useNavigate();
  const [ToggleButton,SetToggleButton] = useState(false);
  const [Category,setCategory] =useState(null);
  const [Products,setProducts] =useState(null);

  const {id } = useParams();
  const vid = localStorage.getItem('user');
  const user_type = localStorage.getItem('user_type');
  const [type, settype]  = useState("");
  const items = [];
  const Loggeduser =  localStorage.getItem('user');

  console.log(Loggeduser);

  function logout()
  {
    localStorage.removeItem('user');
    window.location.reload();    
  }


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


  function ToggleButtonClicked()
  {
    if(ToggleButton === true)
    {
      SetToggleButton(false)
    }
    else{
      SetToggleButton(true)
    }
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
    
    axios.get("https://callistoworld.io/lara/public/api/HomeApi/1")
    .then(res => {

      setHomeSetting(res.data.HomeSetting);
      setBusinessListing(res.data.BusinessListing);
      setBCategory(res.data.BCategory);
      setTestimonials(res.data.Testimonials);
      setcity_all(res.data.city_all);
      setBlog(res.data.Blogs);
      setBestDeals(res.data.BestDeals);
      setProducts(res.data.Products)
       console.log(res.data.city_all);

      setLoader(false);
  }).catch(error => {
      console.log('errr', error)
      setLoader(false);
  })
  }

  const handleSubmitVendor = (e) => 
  {
    e.preventDefault()
   
  }
  
  async function ProfileUpdate(){

    setLoader(true);

  let f_data = new FormData();
  f_data.append('type',"vendor");
 

  await axios.post("https://callistoworld.io/lara/public/api/UserUpdate/"+vid,
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

      localStorage.setItem('user_type',"vendor")
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

  const All_listing = () =>{

    navigate('/All_Listing?city='+SearchCity+'&category='+Category)
   
  }

   
   
  if (Loader == true) {
    return (
       <Loder /> )       
    }


  return (
    <div className='Main'>
     <div className="FirstPage first_page_init">
       
       {HomeSetting != null
    ?
    <>  
        <div className="row back_img">
       
           <div className="col-md-12 mt-5" style={{paddingInline:"11%"}}> 
       <div className="search-form ">
  <form acceptCharset="UTF-8" className="form-row"   >   
    <div className="col-xl-5 ">
            {BCategory != null
              ? 
               <>
              <select className="form-select form_select mt-2 form-select-lg"
               aria-label="Default select example"
               value={Category}
               onChange={(e) => setCategory(e.target.value)}
               id="category"
               >
              <option>Select Category</option>
              {BCategory.map((record, index) => (
               <>
              <option value={record.id}>{record.name}</option>
              </>
              ))}
              </select>
            </>
            :<></>}
    </div>
    <div className="col-xl-5 ">
          {BCategory != null
               ? 
               <>
              <select className="form-select form_select mt-2 form-select-lg"
               aria-label="Default select example"
               value={SearchCity}
               onChange={(e) => setSearchCity(e.target.value)}
               id="city"
                >
              <option selected="">Select City</option>
              {city_all.map((record, index) => (
               <>
              <option value={record.id}>{record.name}</option>
              </>
              ))}
              </select>
            </>
            :<></>}
    </div>
    
    <div className="col-md-2 mt-1 btn_size_search">
      <button className="btn btn-outline-light btn-block" style={{ fontSize: '18px',padding:"1%"}} type="submit" onClick={All_listing}>
        Search <AiOutlineSearch/>
      </button>
    </div>
  </form>
      </div>
           </div>


           <div className="col-md-12 font_size">
        <div className="text-center search-head ">
         <h5 className="search-head-title">{HomeSetting.header_title}</h5>
        <h6 className="subtitle_size h6_style">{HomeSetting.header_subtitle}</h6>
      </div>
          </div>
          </div>

          <div>
          <div className='mt-5'>
{Loggeduser === null ? <>
<Link to={"/Register"}>
   <button type="submit" className="btn btn-primary" style={{background:"#2e108e"}}>Sign Up</button></Link>
  
  <Link to={"/login"}>
   <button type="submit"className="btn btn-primary abc_btn" style={{background:"#2e108e"}}> Sign In</button> </Link> </>

   : <>
   
   <Link to={"/Customer_main/Dashboard"}> 
   <button type="button" className="btn btn-primary abc_btn" style={{background:"#2e108e"}}> Dashboard </button> </Link>

    <button type="button" onClick={logout} className="btn btn-primary abc_btn" style={{background:"#2e108e"}}> Log out </button> </>}
          </div>
          </div>

         <div className="row text-center mt-5">
       
           <div className="col-md-12 ">    
           <h5 className="search-head-title1">New Arrival</h5>
           <h4 className='sub_text h4_style'>Explored With New Arrival on DISQ</h4>
           </div>

        </div>
 
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

        
        <div className="row text-center mt-5">
    <div className="col-md-12">
        <div className="text-center search-head ">
         <h5 className="search-head-title1">Popular Categories</h5>
        <h4 className='h4_style'>Select Customise & get it according to your needs.
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

        <div className="row ">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
      <Link to={"/ViewCategroy"}>
       <a
          href=""
          className="btn btn-primary view_all btn-lg"
        >
          View All Categories
        </a>
        </Link>
      </div>
        </div>
    
        <div className="col-md-12 mt-50">
     <div className='row'>
       <div className='col-md-12 owl-item'>
          <AliceCarousel disableButtonsControls="false" autoPlay infinite="true" autoPlayInterval="2000">

          <div className="card bg-white text-white">
            <img className="card-img"
            src={"https://callistoworld.io/lara/public/upload/"+HomeSetting.slider_image_1} 
            alt="Card image"
            style={{ maxHeight: 500, borderRadius: 5 }}  />
          </div>
          <div className="card bg-white text-white">
            <img className="card-img"
            src={"https://callistoworld.io/lara/public/upload/"+HomeSetting.slider_image_2} 
            alt="Card image" 
            style={{ maxHeight: 500, borderRadius: 5 }} />
          </div>
          <div className="card bg-white text-white">
            <img className="card-img"
            src={"https://callistoworld.io/lara/public/upload/"+HomeSetting.slider_image_3} 
            alt="Card image" 
            style={{ maxHeight: 500, borderRadius: 5 }} />
          </div>

         
         </AliceCarousel>
         </div>
         </div>

        </div>

     

       <div className='mt-5'>
         
       
        
        {user_type != "vendor" &&   
                   
               <Link to="/Vendor_Register">
               <button className="btn btn-primary"onClick={handleSubmitVendor}>Apply for Vendor</button>
             </Link>
          }      
       
          <div className="row text-center ">
         <div className="col-md-12">
          <div className="text-center search-head ">
           <p className="search-head-title1">Our Channel partner</p>
           {/* <h5>Our recent patners</h5> */}
         </div>



         <div className='container mt-2'> 
        <div className='flex-card'>                
       
       {BusinessListing.map((record, index) => (
           <>  
           <div className="col-xl-3 col-sm-3"> 
          <Link to={"/Trendy_Details/" + record.id}>
        
         <div className="card" style={{ width: "18rem" }}>
           <img src={"https://callistoworld.io/lara/public/upload/"+record.header_image} 
             className="image_fix" />
            <div className="card-body">
           <h5 className="card-title title_name link_disable">{record.name}</h5> 
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
    <p style={{ fontSize: 12 }}>On Request</p>
  </span>
 </div>
  <div className="vendor-meta-item vendor-meta-item-bordered">
  <span className="rating-star"></span>
  {record.review_count == 0 ?<>
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
               <p className="search-head-title1">Become Channel partner</p>
                <Link to={"/Vendor_Main/Vendor_Register"}><button className="btn btn-primary">Apply for Vendor</button></Link>
     
        </div>

       {/* <div className='container mt-5'> 
       <div className='flex-card'>
        
        

        {BusinessListing.map((record, index) => (
           <>  
           <div className="col-xl-4 col-sm-4"> 
          <Link to={"/Trendy_Details/" + record.id}>
        
         <div className="card" style={{ width: "18rem" }}>
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
  {record.review_count !== null ? <>
  <span style={{ fontSize: "12px" }} className="rating-count vendor-text"><ReviewsMultipletime itr={record.review_count}/></span>
  </> :<>
  <p>Not Review Yet</p></>}
 </div>
  </div>

        </div>          
  
 </Link>
     </div>
 
 </>))}          


        
</div>
        </div> */}


         <div className="col-md-12 mt-5">
    <div className="space-medium bg-white">
  <div className="containers">
    <div className="row">
      <div className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
        <div className="section-title text-center">
        
          <div className="section-top-icon shape-icon-2 mb-1 mb20">
            < ImLocation2 />
          </div>
          <h4>Deal Of The Day</h4>
          <p>Discount Wallet offers some great feature and exitsing options so why pay high prices always. 
            connected with Discount Wallet's Deal of the day and save money and get maximun discount whiles spending.
          </p>
        </div>
        
      </div>
    </div>
    <style
      dangerouslySetInnerHTML={{
        __html:
          "\n            .location {\n     text-align: center;\n     display: block;\n      }\n\n            .location_item {\n                display: inline-block;\n            }\n\n        "
      }}
    />
    <div className="location">
    {BestDeals.map((record, index) => (
           <>    <Link to={"/Trendy_Details/" + record.id}>
      <div className="col-xl-4 col-lg-3 col-md-6 col-sm-12 col-12 pr-xl-0  mt-3 location_item">
        <div className="location-card">
          <a href="#">
            <div 
              className="location-card-img location-card-img1"
              style={{
               
                height: 200,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 15
              }}
            >  <img className='deals_img' src={"https://callistoworld.io/lara/public/upload/"+record.image} /></div>
         <h6 className='text-bold mt-5'>{record.title}</h6>
          </a>
        </div>
      </div></Link>
      </>))}  
    </div>
  </div>
  <div className="container">
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-60">
        {/* <hr> */}
      </div>
    </div>
 
  </div>
    </div>
         </div>

         

         <div className="space-medium">
          <div className="container">
    <div className="row">
      <div className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
        <div className="section-title text-center">
          {/* section title start*/}
          <h2 className='subtitle_size text-black'> Read Our Articles</h2>
          <p style={{ fontSize: 16 }}>
            Check out our blogs for inspirations for the improvement.
          </p>
        </div>
        {/* /.section title start*/}
      </div>
    </div>
    <div className="row">
     <div className='flex-card' >
     {Blog.map((record, index) => (
        <> 
     <Link to={"/Blog_Content/"+record.id}>
      <div className='col-xl-4 col-sm-4'>
      <div className="card" style={{width:"18rem"}}>
      <img src={"https://callistoworld.io/lara/public/upload/"+record.header_image}
            alt="" className="img-fluid" />       
      
      <div className="post-content mt-2">
        <h3 className="post-heading"> 
        <a href="#" className="post-title link_disable">         
           {record.title} </a>
       </h3>   

        
        <p className="meta">
         <span className="meta-date">{moment(record.created_at).format('MMMM Do YYYY')}</span>
        </p>
      </div>
      </div>
      </div>
      </Link> 
      </>
       ))}
     </div>
      
     
    
    </div>
    <div className="row mt-5">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
      <Link to={"/All_Blog"}>  <a href="#" className="btn btn-primary view_all btn-lg" >
          View All Articles
        </a></Link>
      </div>
    </div>
          </div>
         </div>
        
         <div className="space-medium bg-white">
  <div className="container">
    <div className="row">
      <div className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
        <div className="section-title text-center">
          <h2 className="subtitle_size sub_text">Testimonial</h2>
          <p className='sub_mini'>Still confused? Read our happy tales</p>
        </div>
      </div>
    </div>
    <div className=" flex-card">
    {Testimonials.map((record, index) => (
        <> 
      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
        <div className="testimonial-block testimonial-second" style={{width:"18rem"}}>
          <div className="testimonial-meta">
            <div className="testimonial-pic circle-lg">
              <img
                src={"https://callistoworld.io/lara/public/upload/"+record.image}
                className="rounded-circle"
                alt=""
              />
            </div>
            <div className="testimonial-meta-text">
              <h2 className="testimonial-name">{record.name}</h2>
              <p className="testimonial-small-text mb0">{record.position}</p>
            </div>
          </div>
        
          <div className="testimonial-content">
            <p className="testimonial-text">
            <div className='des' dangerouslySetInnerHTML={createMarkup(record.testimonial)} />
              
            </p>
          </div>
        </div>
      </div>
     </> ))}
    </div>
    <div className="row mt-5">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
        <a
          href="#"
          className="btn btn-primary btn-lg"
        >
          View All Testimonials
        </a>
      </div>
    </div>
  </div>
         </div>

         <div className="adminActions">
  <input type="checkbox" name="adminToggle" onClick={ToggleButtonClicked} className="adminToggle" />
  <a className="adminButton" href="#!">
    <AiTwotonePhone className='plus_b'/>
  </a>

   {ToggleButton &&  
  <div className="adminButtons">
   
   <Link to={"/ContactUs"}>   
      <img className='img_size_i' src={message}/>
      </Link>
    <a  href="tel:+91 0099009900" title="Call Now">
    <img className='img_size_i' src={contact} />
    </a>
    <a href="https://wa.me/918130111231?text=" title="Whatsapp Now">
    <img className='img_size_i' src={whatsapp} />
    </a>
  </div>
  } 


        </div>


       
      
      </>
      :<></>
      }
     
      </div>
      </div>
 
    
  )


};

FirstPage.propTypes = {};

FirstPage.defaultProps = {};

export default FirstPage;
