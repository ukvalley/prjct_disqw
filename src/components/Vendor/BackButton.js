import { useNavigate  } from "react-router-dom";
import notification from '../assets/n1.png';
import { FaBackward } from 'react-icons/fa';
import './Header/Header.css';

export const BackButton = () => {
    let navigate = useNavigate();
    return (
        <>
        <FaBackward onClick={() => navigate(-1)} src={notification} className="header_icon"  
        />
          
        </>
    );
};