import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import basurl from "../api/index"
const AdminRegister = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [secretKey, setSecretKey] = useState(''); // Secret key for registration
    const [name, setName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await basurl.post('/api/admin/register', { name,email, password,secretKey });
            localStorage.setItem('adminToken', response.data.token);

            navigate('/admin/dashboard');
        } catch (error) {
            setErrorMessage('Error registering admin');
        }
    };

    return (
        <div className="register-container">
            <h2>Admin Register</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form style={{width:"auto"}} onSubmit={handleRegister}>
            <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Secret Key"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default AdminRegister;
