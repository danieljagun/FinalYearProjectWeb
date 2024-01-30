import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navigation.css';


const Navigation = ({ onMarketClick, onHomeClick, onTrendingClick }) => {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <div className='header'>
            <div className='container'>
                <h1>
                    <span onClick={onHomeClick}>Senti</span>
                    <span className='primary' onClick={onHomeClick}>
            Trader
          </span>
                </h1>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <span onClick={onHomeClick}>Home</span>
                    </li>
                    <li>
                        <span onClick={onMarketClick}>Market</span>
                    </li>
                    <li>
                        <span onClick={onTrendingClick}>Trending Predictions</span>
                    </li>
                </ul>

                <div className='hamburger' onClick={handleClick}>
                    {click ? (
                        <FaTimes size={20} style={{ color: '#333' }} />
                    ) : (
                        <FaBars size={20} style={{ color: '#333' }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navigation;
