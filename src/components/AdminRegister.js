import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import basurl from "../api/index";
import './AdminRegister.css';

const AdminRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        secretKey: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await basurl.post('/api/admin/register', formData);
            localStorage.setItem('adminToken', response.data.token);
            navigate('/admin/dashboard');
        } catch (error) {
            setErrorMessage('Registration failed. Please check your details.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="register-header">
                    <h2>Create Account</h2>
                    <p>Register as an administrator</p>
                </div>

                {errorMessage && <div className="error-message">{errorMessage}</div>}
                }

                <form className="register-form" onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="secretKey">Admin Secret Key</label>
                        <input
                            id="secretKey"
                            name="secretKey"
                            type="password"
                            value={formData.secretKey}
                            onChange={handleChange}
                            placeholder="Enter admin secret key"
                            required
                        />
                    </div>

                    <button type="submit" className="register-button">
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminRegister;