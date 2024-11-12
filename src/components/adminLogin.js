import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import basurl from "../api/index"
const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // If token exists, redirect to dashboard
        const token = localStorage.getItem('adminToken');
        if (token) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await basurl.post('/api/admin/login', { email, password });
            localStorage.setItem('adminToken', response.data.token);

            navigate('/admin/dashboard');
        } catch (error) {
            setErrorMessage('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form style={{width:"auto"}} onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
