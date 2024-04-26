import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import './components/Navigation.css';
import Coins from './components/Coins';
import Coin from './routes/Coin';
import Navbar from './components/Navbar';
import TrendingPredictionsPage from './components/TrendingPredictionsPage';
import PredictionPage from './components/PredictionPage';
import PredictionsCharts from './components/PredictionsChart';
import NewsSentiment from './components/NewsSentiment';

function App() {
    const [coins, setCoins] = useState([]);
    const [showCoins, setShowCoins] = useState(false);
    const [showTrendingPredictions, setShowTrendingPredictions] = useState(false);
    const [showPredictionPage, setShowPredictionPage] = useState(false);
    const [showPredictionCharts, setShowPredictionCharts] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [showNewsSentiment, setShowNewsSentiment] = useState(false);

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

    const handleCoinSelect = (coin) => {
        setSelectedCoin(coin);
    };

    const handleMarketClick = () => {
        setShowCoins(true);
        setShowTrendingPredictions(false);
        setShowPredictionPage(false);
        setShowPredictionCharts(false);
        setShowNewsSentiment(false);
    };

    const handleHomeClick = () => {
        setShowCoins(false);
        setShowTrendingPredictions(false);
        setShowPredictionPage(false);
        setShowPredictionCharts(false);
        setShowNewsSentiment(false);
    };

    const handleTrendingClick = () => {
        setShowCoins(false);
        setShowTrendingPredictions(true);
        setShowPredictionPage(false);
        setShowPredictionCharts(false);
        setShowNewsSentiment(false);
    };

    const handlePredictionClick = () => {
        setShowCoins(false);
        setShowTrendingPredictions(false);
        setShowPredictionPage(true);
        setShowPredictionCharts(false);
        setShowNewsSentiment(false);
    };

    const handlePredictionChartsClick = () => {
        setShowCoins(false);
        setShowTrendingPredictions(false);
        setShowPredictionPage(false);
        setShowPredictionCharts(true);
        setShowNewsSentiment(false);
    };

    const handleNewsSentimentClick = () => {
        setShowCoins(false);
        setShowTrendingPredictions(false);
        setShowPredictionPage(false);
        setShowPredictionCharts(false);
        setShowNewsSentiment(true);
    };


    return (
        <>
            <Navigation
                onMarketClick={handleMarketClick}
                onHomeClick={handleHomeClick}
                onTrendingClick={handleTrendingClick}
                onPricePredictionClick={handlePredictionClick}
                onPredictionsChartClick={handlePredictionChartsClick}
                onNewsSentimentClick={handleNewsSentimentClick}
            />
            {showCoins ? (
                <>
                    <Navbar showCoinSearch={showCoins} />
                    <Routes>
                        <Route path='/' element={<Coins coins={coins} />} />
                        <Route path='/coin/:coinId' element={<Coin />} />
                    </Routes>
                </>
            ) : showTrendingPredictions ? (
                <TrendingPredictionsPage />
            ) : showPredictionPage ? (
                    <PredictionPage />
            ) : showPredictionCharts ? (
                <PredictionsCharts />
            ) : showNewsSentiment ? (
                <NewsSentiment />
            ) : (
                <Hero />
            )}
        </>
    );
}

export default App;
