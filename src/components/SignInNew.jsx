
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation

const SignInNew = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('success'); // 'success' or 'error'

    // Function to validate password strength
    const validatePassword = (pwd) => {
        let errors = [];
        if (pwd.length < 8) {
            errors.push('Password must be at least 8 characters long.');
        }
        // Add more complex validation if desired (e.g., require numbers, symbols, uppercase)
        // if (!/[A-Z]/.test(pwd)) errors.push('Password must contain an uppercase letter.');
        // if (!/[0-9]/.test(pwd)) errors.push('Password must contain a number.');
        // if (!/[!@#$%^&*()]/.test(pwd)) errors.push('Password must contain a special character.');
        return errors;
    };

    // Function to show a custom modal message
    const showCustomModal = (message, type = 'success') => {
        setModalMessage(message);
        setModalType(type);
        setShowModal(true);
    };

    // Function to close the custom modal
    const closeCustomModal = () => {
        setShowModal(false);
        setModalMessage('');
        setModalType('success');
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Reset all errors
        setUsernameError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setGeneralError('');
        closeCustomModal(); // Close any open modals

        let isValid = true;

        // Client-side validation for username
        if (username.trim() === '') {
            setUsernameError('Username is required.');
            isValid = false;
        }

        // Client-side validation for password
        const pwdErrors = validatePassword(password);
        if (pwdErrors.length > 0) {
            setPasswordError(pwdErrors.join(' '));
            isValid = false;
        }

        // Client-side validation for confirm password
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            isValid = false;
        }

        if (isValid) {
            setIsLoading(true); // Show loading indicator
            try {
                // Send signup data to the backend API
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) { // Status 200-299 (e.g., 201 Created)
                    console.log('Signup successful!', data);
                    showCustomModal('Account created successfully! Please log in.', 'success');
                    // Redirect to login page after a short delay or user interaction
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000); // Redirect after 2 seconds
                } else if (response.status === 409) { // Conflict: Username already exists
                    setUsernameError(data.error || 'Username already exists. Please choose a different one.');
                    showCustomModal('This username is already taken. Please try another.', 'error');
                } else { // Other errors (e.g., 400 Bad Request, 500 Internal Server Error)
                    setGeneralError(data.error || 'An error occurred during signup. Please try again.');
                    showCustomModal('An error occurred during signup. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Network or unexpected signup error:', error);
                setGeneralError('Could not connect to the server. Please check your network and try again.');
                showCustomModal('Network error. Please try again later.', 'error');
            } finally {
                setIsLoading(false); // Hide loading indicator
            }
        }
    };

    return (
        // Main container with a vibrant gradient background
        <div className="min-h-screen flex items-center justify-center p-4 
                        bg-gradient-to-br from-[#6A0DAD] via-[#8A2BE2] to-[#4682B4] sm:p-6 lg:p-8 font-inter">
            
            {/* Signup container with similar styling to the InfoPage's main card */}
            <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center z-10
                            before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-2 before:bg-gradient-to-r from-[#4682B4] to-[#6A0DAD] before:rounded-t-lg">
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Join MizuGuna</h2>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Create Your Account</h3>
                <p className="text-gray-600 mb-6">Start managing your fish farm today!</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-left text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {usernameError && (
                            <p className="text-red-500 text-xs mt-1 text-left">{usernameError}</p>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {passwordError && (
                            <p className="text-red-500 text-xs mt-1 text-left">{passwordError}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-left text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {confirmPasswordError && (
                            <p className="text-red-500 text-xs mt-1 text-left">{confirmPasswordError}</p>
                        )}
                    </div>
                    {generalError && (
                        <p className="text-red-500 text-sm text-center">{generalError}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline" onClick={() => navigate('/login')}>
                        Log in
                    </a>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                    IoT Infrastructure for Inland Fresh Water Fish Farming
                </p>
            </div>

            {/* Custom Modal for success/error messages */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full mx-4
                                    ${modalType === 'success' ? 'border-t-4 border-green-500' : 'border-t-4 border-red-500'}`}>
                        <p className={`text-lg font-semibold ${modalType === 'success' ? 'text-green-700' : 'text-red-700'} mb-4`}>
                            {modalMessage}
                        </p>
                        <button
                            onClick={closeCustomModal}
                            className={`px-4 py-2 rounded-md transition-colors duration-200
                                       ${modalType === 'success' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignInNew;