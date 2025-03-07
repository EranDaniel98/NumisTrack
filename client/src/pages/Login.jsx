import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../assets/NumisTrack_Logo1_MT.png';
import "../index.css";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Basic Validation
        if (!trimmedEmail || !trimmedPassword) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            console.log("Logging in:", { email: trimmedEmail, rememberMe });

            // Use axios to post data to the login API
            const { data } = await axios.post("/api/login", {
                email: trimmedEmail,
                password: trimmedPassword,
                rememberMe,
            });

            // Save token (assuming API returns a token)
            localStorage.setItem("token", data.token);

            navigate("/dashboard");

        } catch (error) {
            console.error("Login error:", error);
            // If the error response from axios exists, use its message
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError(error.message || "An error occurred during login.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-700 mb-8">
                NumisTrack
            </h1>

            {/* Login Box */}
            <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md p-8 relative z-10">
                <h2 className="text-white text-3xl font-semibold text-center mb-4">Login</h2>

                {/* Error Message */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-400 mb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        {/* Show Password Toggle */}
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                className="mr-2 cursor-pointer"
                            />
                            <label htmlFor="showPassword" className="text-gray-400 cursor-pointer">Show Password</label>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="mr-2 cursor-pointer"
                        />
                        <label htmlFor="rememberMe" className="text-gray-400 cursor-pointer">Remember Me</label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Login
                    </button>
                </form>

                {/* Forgot Password */}
                <div className="text-center mt-4">
                    <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
                </div>

                {/* Sign Up Link */}
                <div className="text-center mt-2">
                    <span className="text-gray-400">Don't have an account? </span>
                    <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
