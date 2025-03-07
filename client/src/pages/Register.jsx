import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authApi";
import backgroundImage from '../assets/NumisTrack_Logo1_MT.png';
import "../index.css";

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await register({ fullName, username, email, password });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
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
            {/* Title */}
            <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-700 mb-6 mt-[-5vh]">
                NumisTrack
            </h1>

            {/* Register Box */}
            <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md p-8 relative z-10">
                <h2 className="text-white text-2xl font-semibold text-center mb-4">Create an Account</h2>

                {/* Error Message */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Full Name Input */}
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-400 mb-1">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    {/* Username Input */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-400 mb-1">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-400 mb-1">Confirm Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    {/* Show Password Toggle */}
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            className="mr-2 cursor-pointer"
                        />
                        <label htmlFor="showPassword" className="text-gray-400 cursor-pointer">Show Password</label>
                    </div>

                    {/* Terms & Conditions Checkbox */}
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={acceptTerms}
                            onChange={() => setAcceptTerms(!acceptTerms)}
                            required
                            className="mr-2 cursor-pointer"
                        />
                        <label htmlFor="terms" className="text-gray-400 cursor-pointer">
                            I agree to the <a href="#" className="text-blue-500 hover:underline">Terms & Conditions</a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Register
                    </button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-4">
                    <span className="text-gray-400">Already have an account? </span>
                    <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
