import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navigation.css';

const Navigation = ({
                        onMarketClick,
                        onHomeClick,
                        onTrendingClick,
                        onPricePredictionClick,
                        onPredictionsChartClick,
                        onNewsSentimentClick
                    }) => {
    const [click, setClick] = useState(false);

    const handleClick = () => {
        if (click) {
            setClick(false);
        }
    };

    return (
        <div className='header'>
            <div className='container'>
                <h1>
                    <span onClick={onHomeClick}>Senti</span>
                    <span className='primary' onClick={onHomeClick}>Trader</span>
                </h1>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li>
            <span onClick={() => {
                handleClick();
                onHomeClick();
            }}>Home</span>
                    </li>
                    <li>
            <span onClick={() => {
                handleClick();
                onMarketClick();
            }}>Market</span>
                    </li>
                    <li>
            <span onClick={() => {
                handleClick();
                onTrendingClick();
            }}>Trending Predictions</span>
                    </li>
                    <li>
            <span onClick={() => {
                handleClick();
                onPricePredictionClick();
            }}>Price Prediction</span>
                    </li>
                    <li>
            <span onClick={() => {
                handleClick();
                onPredictionsChartClick();
            }}>Predictions Charts</span>
                    </li>
                    <li>
            <span onClick={() => {
                handleClick();
                onNewsSentimentClick();
            }}>News</span>
                    </li>
                </ul>

                <div className='hamburger' onClick={() => setClick(!click)}>
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
