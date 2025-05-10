import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <nav>
                <div className="nav-brand">
                    <Link to="/">DentistSmiles</Link>
                </div>
                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
                </button>
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
                    <li><Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
                    <li><Link to="/booking" onClick={() => setIsMenuOpen(false)} className="btn-appointment">Book Now</Link></li>
                    <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;