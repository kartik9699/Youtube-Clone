import { useState } from 'react';
import axios from 'axios';
import { FaYoutube } from "react-icons/fa6";

const YouTubeAuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  // Form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleToggleMode = () => {
    setIsLogin((prev) => !prev);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        // --- LOGIN ---
        const { data } = await axios.post('http://localhost:3000/login', {
          email,
          password,
        });
        // Store token and user for subsequent authenticated requests
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Notify the rest of the app that auth state changed
        window.dispatchEvent(new Event('authchange'));
        handleClose();
      } else {
        // --- REGISTER ---
        await axios.post('http://localhost:3000/register', {
          username,
          email,
          password,
        });
        // After successful registration, switch to login so the user can sign in
        setIsLogin(true);
        setError('Registration successful! Please sign in.');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative max-w-md w-full bg-white rounded-xl shadow-2xl p-8 sm:p-10 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header / Logo Area */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <FaYoutube className="text-red-600 w-15 h-15" />
              </div>
              <h1 className="text-2xl font-normal text-gray-900 mb-2">
                {isLogin ? 'Sign in' : 'Create account'}
              </h1>
              <p className="text-base text-gray-600">
                to continue to YouTube
              </p>
            </div>

            {/* Error / Success message */}
            {error && (
              <p className="mb-4 text-sm text-center rounded-md px-3 py-2 bg-red-50 text-red-600">
                {error}
              </p>
            )}

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Username only shown during registration */}
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900"
                    required
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isLogin ? "Email or phone" : "Email"}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900"
                  required
                />
              </div>

              {/* Confirm password (registration only) */}
              {!isLogin && (
                <div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Use 8 or more characters with a mix of letters, numbers & symbols
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 mt-2">
                <button
                  type="button"
                  onClick={handleToggleMode}
                  className="text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors"
                >
                  {isLogin ? 'Create account' : 'Sign in instead'}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Please wait...' : isLogin ? 'Sign in' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default YouTubeAuthModal;
