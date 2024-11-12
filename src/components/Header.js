import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    
    const navigate = useNavigate()
    const [login,setLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');

        // If no token exists, redirect to login
        if (!token) {
            setLogin(false)
        } else {
          setLogin(true)
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };
    
    
    
    
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/booking">Book Now</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    {login&&<button className='logout-btn' onClick={handleLogout}>Logout</button>}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
