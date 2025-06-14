import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link

const LoginPage = ({ setIsAuthenticated }) => {
    // State variables for username, password, and form validation errors
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // State for the custom message modal
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    // Initialize useNavigate hook for programmatic navigation
    const navigate = useNavigate();

    /**
     * Validates the password based on defined rules.
     * @param {string} pwd - The password string to validate.
     * @returns {string[]} An array of error messages, or empty if valid.
     */
    const validatePassword = (pwd) => {
        let errors = [];
        if (pwd.length < 2) {
            errors.push('Password must be at least 2 characters long.');
        }
        return errors;
    };

    /**
     * Handles the form submission event.
     * Performs client-side validation and then attempts to log in via API.
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Clear previous error and login messages
        setUsernameError('');
        setPasswordError('');
        setModalMessage('');
        setShowModal(false); // Hide any previous modal

        let isValid = true;

        // Validate username
        if (username.trim() === '') {
            setUsernameError('Username is required.');
            isValid = false;
        }

        // Validate password using the helper function
        const pwdErrors = validatePassword(password);
        if (pwdErrors.length > 0) {
            setPasswordError(pwdErrors.join(' ')); // Join multiple errors with a space
            isValid = false;
        }

        // Proceed with API call only if client-side validation passes
        if (isValid) {
            try {
                // IMPORTANT: Replace with a secure backend API endpoint for production
                const response = await fetch('https://caps-weights-col-sara.trycloudflare.com/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json(); // Parse the JSON response

                if (response.ok) {
                    // Login successful
                    setModalMessage(`Login successful! Welcome, ${username}!`);
                    setIsSuccess(true);
                    setShowModal(true);
                    console.log('Login successful:', data);
                    localStorage.setItem("authToken", data.token); 

           
                } else {
                    // Login failed (e.g., incorrect credentials, user not found)
                    const message = data.message || 'Login failed. Please check your credentials or sign up.';
                    setModalMessage(message);
                    setIsSuccess(false);
                    setShowModal(true);
                    console.error('Login error:', message);
                }
            } catch (error) {
                // Network error or server unreachable
                console.error('Network error or server down:', error);
                setModalMessage('An error occurred during login. Please try again later, or check your internet connection.');
                setIsSuccess(false);
                setShowModal(true);
            }
        }
    };

    /**
     * Handles the click on the modal's close button.
     * If login was successful, it redirects to the dashboard. Otherwise, it just closes the modal.
     */


    const handleModalClose = () => {
        setShowModal(false); // Always close the modal first
        if (isSuccess) {
            setIsAuthenticated(true); // Update authentication state in App.js
            navigate('/dashboard'); // Redirect to the dashboard page
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#6A0DAD] via-[#8A2BE2] to-[#4682B4] sm:p-6 lg:p-8 font-sans">
            <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center z-10
                            before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-2 before:bg-gradient-to-r from-[#4682B4] to-[#6A0DAD] before:rounded-t-lg">

                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome to MizuGuna</h2>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Sign in to MizuGuna</h3>
                <p className="text-gray-600 mb-6">Welcome back! Please sign in to continue.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-left text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            aria-invalid={usernameError ? "true" : "false"}
                            aria-describedby="username-error"
                        />
                        {usernameError && (
                            <p id="username-error" className="text-red-600 text-sm mt-1 text-left">{usernameError}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-invalid={passwordError ? "true" : "false"}
                            aria-describedby="password-error"
                        />
                        {passwordError && (
                            <p id="password-error" className="text-red-600 text-sm mt-1 text-left">{passwordError}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg shadow-md"
                    >
                        Continue
                    </button>
                </form>

                <div className="mt-6 text-sm text-gray-600">
                    Don't have an account?{' '}
                    {/* Updated Link to redirect to /signupp */}
                    <Link to="/signupp" className="text-blue-600 hover:underline font-medium">
                        Sign up
                    </Link>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                    IoT Infrastructure for Inland Fresh Water Fish Farming
                </p>
            </div>

            {/* Custom Message Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full text-center transform transition-transform duration-300 scale-100 animate-fade-in-up">
                        <div className={`text-3xl mb-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                            {isSuccess ? '🎉' : '⚠️'}
                        </div>
                        <p className={`text-lg font-semibold mb-4 ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
                            {modalMessage}
                        </p>
                        <button
                            onClick={handleModalClose} // Call the new handler
                            className="bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            {isSuccess ? 'Go to Dashboard' : 'Close'} {/* Changed button text based on success */}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;