import React, { useState } from 'react';
import logo from '../assets/NumisTrack_Logo2.png';
import backgroundImage from '../assets/NumisTrack_Logo1_MT.png';
import "../index.css";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill in all fields");
        } else {
            // Handle form submission (e.g., API call)
            console.log({ email, password, rememberMe });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen" style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                {/* Title */}
                <h2 className="text-white text-2xl font-semibold text-center mb-4">Login</h2>

                {/* Form */}
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
                            aria-label="Email"
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
                            aria-label="Password"
                        />
                        {/* Show Password Toggle */}
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                className="mr-2 cursor-pointer"
                                aria-label="Show Password"
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
                            aria-label="Remember Me"
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
                    <a href="#" className="text-blue-500 hover:underline">Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;