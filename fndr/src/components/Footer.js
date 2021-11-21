import React from 'react';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const Footer = () => {
    return (
        <div>
            <footer>
                <div className="container">
                    <div className="inner-content">
                        <ul className="nav-links">
                            <li><Link to="/"><HomeIcon fontSize="large"/></Link></li>
                            <li><Link to="/"><AddToPhotosIcon /></Link></li>
                            <li><Link to="/"><ListAltIcon /></Link></li>
                        </ul>
                        
                    </div>
                </div>
            </footer>
        </div>
    )
}

// 
