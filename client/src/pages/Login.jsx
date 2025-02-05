import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await login({ email, password });
            dispatch(loginSuccess(data));
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={ handleSubmit }>
                <div>
                    <label>Email:</label>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type='submit'>Login</button>
            </form>
            <p>
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
};

export default Login;
