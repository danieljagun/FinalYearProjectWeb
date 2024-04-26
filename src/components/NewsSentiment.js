import React, { useState } from 'react';
import axios from 'axios';
import './NewsSentiment.css';

const NewsSentiment = () => {
    const [coin, setCoin] = useState('');
    const [wordCloudUrl, setWordCloudUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const cryptocurrencies = ['Bitcoin', 'Ethereum', 'Solana', 'Dogecoin', 'Cardano'];

    const handleSelectChange = (event) => {
        setCoin(event.target.value);
    };

    const fetchSentiment = async () => {
        if (!coin) return;
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:5000/news_sentiment', { coin_name: coin.toLowerCase() });
            if (response.data.success) {
                setWordCloudUrl(response.data.word_cloud_url);
            } else {
                console.error('Error:', response.data.error);
                setWordCloudUrl(''); // Reset state if error
            }
        } catch (error) {
            console.error('Error:', error);
            setWordCloudUrl(''); // Reset state if error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="news-sentiment-container">
            <h1>Cryptocurrency Sentiment Analysis</h1>
            <select value={coin} onChange={handleSelectChange} className="coin-select">
                <option value="">Select a Coin</option>
                {cryptocurrencies.map((name) => (
                    <option key={name} value={name}>{name}</option>
                ))}
            </select>
            <button onClick={fetchSentiment} disabled={!coin} className="analyze-button">
                Analyze Sentiment
            </button>
            <p className="wordcloud-description">
                Explore the visual landscape of the most frequently mentioned terms in recent news articles about your selected cryptocurrency. This WordCloud illuminates the key topics and trends that are currently shaping discussions and sentiment in the crypto community.
            </p>
            {loading ? <p>Loading...</p> : null}
            {wordCloudUrl && (
                <img src={wordCloudUrl} alt="Word Cloud" className="word-cloud-image" />
            )}
        </div>
    );
};

export default NewsSentiment;
