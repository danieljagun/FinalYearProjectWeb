import React from 'react'
import './Hero.css'
import MainPage from '../assets/coin.png'

const Hero = () => {
    return (
        <div className='hero'>
            <div className='container'>

                <div className='left'>
                    <p>Welcome to Sentiment Trader </p>
                    <h1>Research cryptocurrencies and see predictions on our Trending Coins</h1>
                    <p>Search and Monitor different cryptocurrencies</p>
                    <div className='input-container'>
                        <input type='email' placeholder='Enter your email' />
                        <button className='btn'>Learn More</button>
                    </div>
                </div>

                <div className='right'>
                    <div className='img-container'>
                        <img src={MainPage} alt=''/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
