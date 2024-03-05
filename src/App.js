import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import './components/Navigation.css';
import Coins from './components/Coins';
import Navbar from './components/Navbar';
import TrendingPredictionsPage from './components/TrendingPredictionsPage';

function App() {
    const [coins, setCoins] = useState([]);
    const [showCoins, setShowCoins] = useState(false);
    const [showTrendingPredictions, setShowTrendingPredictions] = useState(false);
    const [trainingOutput, setTrainingOutput] = useState(null); // New state for training output

    const url =
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en';

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setCoins(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleMarketClick = () => {
        setShowCoins(true);
        setShowTrendingPredictions(false);
    };

    const handleHomeClick = () => {
        setShowCoins(false);
        setShowTrendingPredictions(false);
    };

    const handleTrendingClick = () => {
        setShowCoins(false);
        setShowTrendingPredictions(true);
    };

    return (
        <>
            <Navigation
                onMarketClick={handleMarketClick}
                onHomeClick={handleHomeClick}
                onTrendingClick={handleTrendingClick}
            />
            {showCoins ? (
                <>
                    <Navbar showCoinSearch={showCoins} />
                    <Coins coins={coins} />
                </>
            ) : showTrendingPredictions ? (
                <TrendingPredictionsPage />
            ) : (
                <>
                    <Hero />

                </>
            )}
        </>
    );
}

export default App;
