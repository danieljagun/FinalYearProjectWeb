import React, { useState } from 'react';
import axios from 'axios';
import './TrendingPredictionsPage.css';
import bitcoinImage from '../assets/bitcoin.png';
import ethereumImage from '../assets/ethereum.png';
import solanaImage from '../assets/solana.png';
import cardanoImage from '../assets/cardano.png';
import dogecoinImage from '../assets/dogecoin.png';

const coinImages = {
    bitcoin: bitcoinImage,
    ethereum: ethereumImage,
    solana: solanaImage,
    dogecoin: dogecoinImage,
    cardano: cardanoImage,
};

const TrendingPredictionsPage = () => {
    const [trainingOutput, setTrainingOutput] = useState(null);
    const [error, setError] = useState(null);

    const handlePredictClick = (coin) => {
        axios.post('http://127.0.0.1:5000/predict', { coin_name: coin.toLowerCase() })
            .then((response) => {
                console.log(response.data)
                setTrainingOutput(response.data);
                setError(null);
            })
            .catch((error) => {
                console.error('Error running prediction:', error);
                setError('Failed to connect to the prediction server. Please ensure the Flask app is running.');
                setTimeout(() => setError(null), 5000);
            });
    };

    const coins = ['bitcoin', 'ethereum', 'solana', 'dogecoin', 'cardano'];

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    const renderOutput = () => {
        if (typeof trainingOutput.output === 'string') {
            return trainingOutput.output.split('\n').filter(line => line.trim() !== "==================================================").map((line, index) => (
                <p key={index}>{line}</p>
            ));
        } else {
            return <p>Unexpected data format</p>;
        }
    };


    return (
        <div className="trending-container">
            <h1>Up or Down Predictions for Trending Coins</h1>
            <div className="coins-list">
                {coins.map((coin, index) => (
                    <div key={index} className="trending-coin-container">
                        <img src={coinImages[coin]} alt={coin} className="trending-coin-image" />
                        <h2 className="trending-h2">{capitalizeFirstLetter(coin)}</h2>
                        <button className="trending-button" onClick={() => handlePredictClick(coin)}>Predict Movement</button>
                    </div>
                ))}
            </div>
            {trainingOutput && (
                <div className="trending-prediction-output">
                    <h2>Prediction Output:</h2>
                    {renderOutput()}
                </div>
            )}
            {error && <div className="trending-floating-notification">{error}</div>}
        </div>
    );
};

export default TrendingPredictionsPage;
