import React, { useState, useEffect, handleNavigation } from "react";
import './Affiliate.css';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';


const Affiliate = () => {
  const [data, setData] = useState('No result');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(0);
  const [Loader, setLoader] = useState(false);
  const [BusinessListing, setBusinessListing] = useState(null);
  const {id } = useParams();

  const handleChange = event => {
    const result = event.target.value.replace(/[^0-9]/gi, '');

    setMessage(result);
  };

  useEffect(() => {
    fetch_data();            
  }, []);

  async function fetch_data(){
    setLoader(true);
    
    axios.get("https://callistoworld.io/lara/public/api/BusinessSingle/"+id)
    .then(res => {
    
      setBusinessListing(res.data.BusinessListing);       
       console.log(res.data);
     

      setLoader(false);
  }).catch(error => {
      console.log('errr', error)
      setLoader(false);
  })
  }


    return (
        <div className="Affiliate">
      <div className="container mt-5">
  <div className="table-wrap card">
    <table className="table">
      <tbody>
        <tr className="align-middle alert border-bottom" role="alert">
         <td className="text-center">
            <img
              className="pic"
              src="https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png"
              alt=""
            />
          </td>
          <td>
            <div>
              <p>Sneakers Shoes 2020 For Men</p>
             
            </div>
          </td>
          <td>
            <div className="fw-600">$44.99</div>
          </td>
        </tr>
     
        
      </tbody>
    </table>
  </div>
</div>

         </div>     
    )





};

Affiliate.propTypes = {};

Affiliate.defaultProps = {};

export default Affiliate;
