import React, { useState, useEffect, handleNavigation } from "react";
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import QrReader from 'react-qr-scanner'
import {Routes, Route,Link, useNavigate} from 'react-router-dom';
import { AiFillStar,AiFillCamera,AiOutlineQrcode ,AiOutlineSearch} from 'react-icons/ai';
import './PayScanner.css';


const PayScanner = () => {
  const [code, setCode] = useState(null);
  const [showDialog, setDiaglog] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [precScan, setPrecScan] = useState("");
  const [selected, setSelected] = useState("enviornment");
  const [errorMessage, setErrorMessage] = useState(null);
  const [qrdata,setQrdata] = useState(null);  
  const [startScan, setStartScan] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [Loader, setLoader] = useState(false);
  const [HomeSetting, setHomeSetting] = useState(null);
  const [BusinessListing, setBusinessListing] = useState(null);
  const [Testimonials,setTestimonials] = useState(null);
  const [city_all,setcity_all] = useState(null);
  const [BCategory , setBCategory] = useState(null);
  const [Blog , setBlog] = useState(null);
  const[SearchCity,setSearchCity] = useState(null);
  const [Category,setCategory] =useState(null);
  const navigate = useNavigate();


function handleWindowSizeChange() {
    setWidth(window.innerWidth);
}
useEffect(() => {
  fetch_data();            
}, [SearchCity]);

async function fetch_data(){
  setLoader(true);
  
  axios.get("https://callistoworld.io/lara/public/api/SearchListing?city="+SearchCity)
  .then(res => {

   
    setBusinessListing(res.data.BusinessListing);
  
    setcity_all(res.data.city_all);
     console.log(res);

    setLoader(false);
}).catch(error => {
    console.log('errr', error)
    setLoader(false);
})
}


  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
   }, []);

let isDesktop = (width > 768);

  async function fetchData({ qr = "" }) {
    try {
      setProcessing(true);
      
      console.log("scanned code", qr);
      
        // setPrecScan(null);
        setDiaglog(true);
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleScan = async (scanData) => {
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "" && !showDialog && !processing) {
      console.log(`loaded >>>`, scanData);
      // setPrecScan(scanData);
      setQrdata(scanData);
      navigate('/Customer_Main/Payment/'+scanData.text)
      await fetchData({ qr: scanData });
    }
  };
  const handleError = (err) => {
    console.error(err);
  };


  const pay_scan = () =>{

    
   
  }
  return (
    <div className="App">
    <div className="container">
      <button className="btn btn-primary"
        onClick={() => {
          setStartScan(!startScan);
        }}
      ><AiOutlineQrcode className="scan_btn"/>
        {startScan ? "Stop Scan" : " Scan"}
      </button>

      {startScan && (
        <>
      {qrdata != null &&
      <p>{qrdata.text}</p>}
      <select className="btn_camera" onChange={(e) => setSelected(e.target.value)}>
        <option value={"environment"}> Back Camera</option>
        <option value={"user"}>Front Camera</option>
      </select>
     
     
     
      {!showDialog && !processing && (
        <QrReader className="mt-3"
        constraints={
          isDesktop
          ? undefined
          : {
              video: {
                  facingMode: { exact: `environment` }
            }
            }
          }
       
          facingMode= {selected}
          delay={1000}
          onError={handleError}
          onScan={handleScan}
          // chooseDeviceId={()=>selected}
          style={{ width: "90%", heigth: "90%" }}
        />
        
      )}

     </>
      )}
      </div>

      <div className=" mt-5">
      <div id="main"> 
             <div className="col-xl-12 ">
           {city_all != null
               ? 
               <>
              <select className="form-select form_select form-select-lg mt-2 form-select-lg"
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
             {BusinessListing != null
            ?
            <>             
                <div className="container mt-3">
                {BusinessListing.map((record, index) => (
              <>
               <Link to={"/Customer_Main/Payment/" + record.id}>
                <div className="col-md-12">
                <div className="row">
                
                <div className="block mt-3">
               
                 <img src={"https://callistoworld.io/lara/public/upload/"+record.header_image}   />
                    <h5 className="mt-2 link_disable">{record.name}</h5>                    
                    <h6 className="h6_s link_disable">{record.city_id.name}</h6>         
                    <span className=""><AiFillStar className="icon_color"/> 8/10</span>           
                </div>
                
                </div>


                 </div>
                 </Link>
            </>))}  
              </div>
              </>
      :<></>
      }
             </div>
      </div>
    </div>
  );
};

export default PayScanner;
