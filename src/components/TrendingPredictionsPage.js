import React, { useState } from 'react';
import axios from 'axios';
import './TrendingPredictionsPage.css'; // Import CSS file for styling
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

const TrendingPredictionsPage = () => {
    const [trainingOutput, setTrainingOutput] = useState(null);
    const [error, setError] = useState(null); // State for error handling

    const handlePredictClick = (coin) => {
        // Make a request to your Flask backend to run the TrainModelPrediction.py script for the specified coin
        axios
            .post('http://localhost:5000/predict', { coin_name: coin }) // Replace with your actual backend URL
            .then((response) => {
                // Store the response data in the state variable
                setTrainingOutput(response.data);
                setError(null); // Reset error state
            })
            .catch((error) => {
                console.error('Error running prediction:', error);
                setError('Failed to connect to the prediction server. Please ensure the Flask app is running.'); // Set error state
                // Clear error message after 5 seconds
                setTimeout(() => {
                    setError(null);
                }, 5000);
            });
    };

    const coins = ['Bitcoin', 'Ethereum', 'Solana', 'XRP', 'Cardano', 'Dogecoin'];

    // Split coins into chunks of three for layout
    const coinChunks = coins.reduce((result, item, index) => {
        const chunkIndex = Math.floor(index / 3);
        if (!result[chunkIndex]) {
            result[chunkIndex] = []; // Initialize chunk if not exists
        }
        result[chunkIndex].push(item);
        return result;
    }, []);

    return (
        <div>
            <h1>Up or Down Predictions for Trending Coins</h1>
            {/* Display coins in rows of three */}
            {coinChunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex} className="prediction-row">
                    {chunk.map((coin, index) => (
                        <div key={index} className="coin-container">
                            {/* Use imported images from the object */}
                            <img src={coinImages[coin]} alt={coin} className="coin-image" />
                            <h2>{coin}</h2>
                            <button onClick={() => handlePredictClick(coin)}>Predict</button>
                        </div>
                    ))}
                </div>
            ))}
            {/* Display the training output if available */}
            {trainingOutput && (
                <div>
                    <h2>Training Output:</h2>
                    {/* Render the output from the response */}
                    <pre>{trainingOutput.output}</pre>
                    {/* Optionally, you can also display a success message */}
                    {trainingOutput.success && <p>Prediction successful</p>}
                </div>
            )}
            {/* Render the error notification if there's an error */}
            {error && <div className="floating-notification">{error}</div>}
        </div>
    );
};

export default TrendingPredictionsPage;
