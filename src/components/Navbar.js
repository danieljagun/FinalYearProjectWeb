import React from 'react';
import { FaCoins } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ showCoinSearch }) => {
    return (
        <div>
            {showCoinSearch && (
                <div className='navbar'>
                    <FaCoins className='icon' />
                    <h1> Market <span className='primary'>List</span></h1>
                </div>
            )}
        </div>
    );
}

export default Navbar;
