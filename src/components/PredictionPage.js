import React, { useState } from 'react';
import axios from 'axios';
import './PredictionPage.css';
import bitcoinImage from '../assets/bitcoin.png';
import ethereumImage from '../assets/ethereum.png';
import solanaImage from '../assets/solana.png';
import xrpImage from '../assets/xrp.png';
import cardanoImage from '../assets/cardano.png';
import dogecoinImage from '../assets/dogecoin.png';

const coinImages = {
    Bitcoin: bitcoinImage,
    Ethereum: ethereumImage,
    Solana: solanaImage,
    XRP: xrpImage,
    Cardano: cardanoImage,
    Dogecoin: dogecoinImage,
};

const PredictionPage = () => {
    const [predictionOutput, setPredictionOutput] = useState({});
    const [error, setError] = useState(null);

    const handlePredictClick = (coin) => {
        axios
            .post('http://127.0.0.1:5000/pricePredict', { coin_name: coin })
            .then((response) => {
                setPredictionOutput({ ...predictionOutput, [coin]: response.data.predicted_price });
                setError(null);
            })
            .catch((error) => {
                console.error('Error fetching prediction:', error);
                setError('Failed to connect to the prediction server. Please ensure the Flask app is running.');
            });
    };

    const coins = ['Bitcoin', 'Ethereum', 'Solana', 'XRP', 'Cardano', 'Dogecoin'];

    const coinChunks = coins.reduce((result, item, index) => {
        const chunkIndex = Math.floor(index / 3);
        if (!result[chunkIndex]) {
            result[chunkIndex] = [];
        }
        result[chunkIndex].push(item);
        return result;
    }, []);

    return (
        <div>
            <h1>Price Predictions for Cryptocurrencies</h1>
            {coinChunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex} className="prediction-row">
                    {chunk.map((coin, index) => (
                        <div key={index} className="coin-container">
                            <img src={coinImages[coin]} alt={coin} className="coin-image" />
                            <h2>{coin}</h2>
                            <button onClick={() => handlePredictClick(coin)}>Predict Price</button>
                            {predictionOutput[coin] && (
                                <p>Predicted Price: ${predictionOutput[coin].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            )}
                        </div>
                    ))}
                </div>
            ))}
            {error && <div className="floating-notification">{error}</div>}
        </div>
    );
};

export default PredictionPage;
