import React from 'react';
import { FaCoins } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import './Navbar.css';

const Navbar = ({ showCoinSearch }) => {
    return (
        <Link to='/'>
            <div>
                {showCoinSearch && (
                    <div className='navbar'>
                        <FaCoins className='icon' />
                        <h1> Market <span className='primary'>List</span></h1>
                    </div>
                )}
            </div>
        </Link>
    );
}

export default Navbar;
