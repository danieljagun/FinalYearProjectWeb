import React, { useState } from 'react';
import axios from 'axios';
import CoinItem from './CoinItem'; // Import CoinItem component
import './TrendingPredictionsPage.css'; // Import CSS file for styling

const TrendingPredictionsPage = () => {
    const [trainingOutput, setTrainingOutput] = useState(null);

    const handlePredictClick = (coin) => {
        // Make a request to your Flask backend to run the TrainModelPrediction.py script for the specified coin
        axios
            .post('http://localhost:5000/predict', { coin_name: coin }) // Replace with your actual backend URL
            .then((response) => {
                // Store the response data in the state variable
                setTrainingOutput(response.data);
            })
            .catch((error) => {
                console.error('Error running prediction:', error);
            });
    };

    const coins = ['Bitcoin', 'Ethereum', 'Solana', 'Ripple', 'Cardano', 'Dogecoin'];

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
                <div key={chunkIndex} className="coin-row">
                    {chunk.map((coin, index) => (
                        <div key={index} className="coin-container">
                            <img src={`images/${coin.toLowerCase()}.png`} alt={coin} className="coin-image" />
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
        </div>
    );
};

export default TrendingPredictionsPage;
