import React, { useState } from 'react';
import axios from 'axios';
import './PredictionPage.css';
import bitcoinImage from '../assets/bitcoin.png';
import ethereumImage from '../assets/ethereum.png';
import solanaImage from '../assets/solana.png';
import cardanoImage from '../assets/cardano.png';
import dogecoinImage from '../assets/dogecoin.png';

const coinImages = {
    Bitcoin: bitcoinImage,
    Ethereum: ethereumImage,
    Solana: solanaImage,
    Cardano: cardanoImage,
    Dogecoin: dogecoinImage,
};

const PredictionPage = () => {
    const [predictionOutput, setPredictionOutput] = useState({});
    const [error, setError] = useState(null);

    const handlePredictClick = (coin) => {
        axios.post('http://127.0.0.1:5000/pricePredict', { coin_name: coin })
            .then((response) => {
                console.log('Response data:', response.data);
                if (response.data.success && response.data.predicted_price) {
                    setPredictionOutput({ ...predictionOutput, [coin]: response.data.predicted_price });
                } else {
                    throw new Error(response.data.error || "Unknown error");
                }
                setError(null);
            })
            .catch((error) => {
                console.error('Error fetching prediction:', error);
                setError('Failed to connect to the prediction server. Please ensure the Flask app is running.');
                setTimeout(() => setError(null), 5000);
            });
    };

    const coins = ['Bitcoin', 'Ethereum', 'Solana', 'Dogecoin', 'Cardano'];

    const coinChunks = coins.reduce((result, item, index) => {
        const chunkIndex = Math.floor(index / 2);
        if (!result[chunkIndex]) {
            result[chunkIndex] = [];
        }
        result[chunkIndex].push(item);
        return result;
    }, []);

    const formatPrice = (coin, price) => {
        if (coin === 'Dogecoin' || coin === 'Cardano') {
            return price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
        } else {
            return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
    };

    return (
        <div className="prediction-container">
            <h1>Price Predictions for Cryptocurrencies</h1>
            {coinChunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex} className="prediction-row">
                    {chunk.map((coin, index) => (
                        <div key={index} className="prediction-coin-container">
                            <img src={coinImages[coin]} alt={coin} className="prediction-coin-image" />
                            <h2>{coin}</h2>
                            <button className="prediction-coin-button" onClick={() => handlePredictClick(coin)}>Predict Price</button>
                            {predictionOutput[coin] && (
                                <div className="prediction-coin-prediction-output">
                                    Predicted Price: ${formatPrice(coin, parseFloat(predictionOutput[coin]))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
            {error && <div className="prediction-floating-notification">{error}</div>}
        </div>
    );
};

export default PredictionPage;
