import { useNavigate  } from "react-router-dom";
import { FaBackward } from 'react-icons/fa';
import './Header/Header.css';

export const BackButton = () => {
    let navigate = useNavigate();
    return (
        <>
        <FaBackward onClick={() => navigate(-1)} className="header_icon"  
        />
          
        </>
    );
};