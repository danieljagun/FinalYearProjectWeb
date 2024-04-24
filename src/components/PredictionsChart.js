import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, Brush } from 'recharts';
import './PredictionsChart.css';

const PredictionsChart = () => {
    const [selectedCoin, setSelectedCoin] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        if (selectedCoin) {
            axios.get(`http://127.0.0.1:5000/predictions/${selectedCoin.toLowerCase()}`)
                .then(response => {
                    if (response.data.success) {
                        const filteredData = response.data.data
                            .filter(d => {
                                const date = new Date(d.timestamp).getTime();
                                return (!startDate || date >= startDate) && (!endDate || date <= endDate);
                            })
                            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                            .map(prediction => ({
                                ...prediction,
                                timestamp: new Date(prediction.timestamp).toLocaleDateString(),
                                difference: Math.abs(prediction.predicted_price - prediction.actual_price),
                                percentageDifference: ((prediction.actual_price - prediction.predicted_price) / prediction.actual_price) * 100,
                                isCorrect: prediction.predicted_movement === (prediction.actual_price > prediction.predicted_price ? 'Up' : 'Down') ? 'Correct' : 'Incorrect'
                            }));

                        setPredictions(filteredData);
                    } else {
                        throw new Error(response.data.error);
                    }
                })
                .catch(error => console.error('Error fetching predictions:', error));
        }
    }, [selectedCoin, startDate, endDate]);

    const formatCurrency = (value, coinName) => {
        if (coinName === 'dogecoin' || coinName === 'cardano') {
            return `$${value.toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
        } else {
            return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
        }
    };

    return (
        <div className="predictions-container">
            <h2>{selectedCoin ? `${selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)} Predictions Chart` : 'Select a Coin'}</h2>
            <select onChange={(e) => setSelectedCoin(e.target.value)} value={selectedCoin}>
                <option value="">Select a Coin</option>
                {['bitcoin', 'ethereum', 'solana', 'dogecoin', 'cardano'].map((coin) => (
                    <option key={coin} value={coin}>{coin.charAt(0).toUpperCase() + coin.slice(1)}</option>
                ))}
            </select>
            <input type="date" onChange={(e) => setStartDate(new Date(e.target.value).getTime())} />
            <input type="date" onChange={(e) => setEndDate(new Date(e.target.value).getTime())} />
            {selectedCoin && predictions.length > 0 && (
                <div className="chart-container">
                    <h3 className="chart-title">Price Percentage Comparison Chart</h3>
                    <LineChart
                        width={700}
                        height={300}
                        data={predictions}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis />
                        <Tooltip formatter={(value, name) => {
                            if (name === 'predicted_price' || name === 'actual_price') {
                                return formatCurrency(value, selectedCoin);
                            } else if (name === 'percentageDifference') {
                                return `${value.toFixed(2)}%`;
                            }
                            return value;
                        }} />
                        <Legend />
                        <Line type="monotone" dataKey="predicted_price" stroke="#8884d8" activeDot={{ r: 8 }} label="Predicted Price" />
                        <Line type="monotone" dataKey="actual_price" stroke="#82ca9d" activeDot={{ r: 8 }} label="Actual Price" />
                        <Line type="monotone" dataKey="isCorrect" stroke="#FF6347" activeDot={{ r: 8 }} label="Prediction Accuracy" />
                    </LineChart>
                    <h3 className="chart-title">Volatility and Error Range</h3>
                    <AreaChart
                        width={700}
                        height={300}
                        data={predictions}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp"
                               type="category"
                               allowDuplicatedCategory={false}
                        />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="difference" stroke="#FF6347" fill="#FF6347" fillOpacity={0.3} />
                        <Brush dataKey="timestamp" height={30} stroke="#8884d8" />
                    </AreaChart>
                </div>
            )}
        </div>
    );
};

export default PredictionsChart;
