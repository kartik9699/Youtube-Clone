import React, { useState } from 'react';
import { FaYoutube} from "react-icons/fa6";
const YouTubeAuthModal = ({isOpen,onClose}) => {
  
  const [isLogin, setIsLogin] = useState(true);

  return (
    
      
<>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          
          {/* Modal Container */}
          <div className="relative max-w-md w-full bg-white rounded-xl shadow-2xl p-8 sm:p-10 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header / Logo Area */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                {/* YouTube Logo SVG Placeholder */}

                {/* <svg viewBox="0 0 120 28" className="h-6 text-red-600 w-auto" fill="currentColor">
                  <path d="M118.9 4.3c-1.4-5.3-5.5-9.4-10.8-10.8C98.6-8 60-8 60-8s-38.6 0-48.1 1.5c-5.3 1.4-9.4 5.5-10.8 10.8C-.4 13.8-.4 26-.4 26s0 12.2 1.5 21.7c1.4 5.3 5.5 9.4 10.8 10.8 9.6 1.5 48.1 1.5 48.1 1.5s38.6 0 48.1-1.5c5.3-1.4 9.4-5.5 10.8-10.8 1.5-9.6 1.5-21.7 1.5-21.7s.1-12.2-1.5-21.7zm-79.6 31V16.7L67.6 26 39.3 35.3z" transform="translate(0 8) scale(0.6)"/>
                </svg> */}
                <FaYoutube className="text-red-600 w-15 h-15"/>
              </div>
              <h1 className="text-2xl font-normal text-gray-900 mb-2">
                {isLogin ? 'Sign in' : 'Create a Google Account'}
              </h1>
              <p className="text-base text-gray-600">
                to continue to YouTube
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <input 
                      type="text" 
                      placeholder="First name" 
                      className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <input 
                      type="text" 
                      placeholder="Last name" 
                      className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900"
                    />
                  </div>
                </div>
              )}

              <div>
                <input 
                  type="email" 
                  placeholder={isLogin ? "Email or phone" : "Your email address"}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <p className="text-xs text-blue-600 font-medium mb-3 cursor-pointer hover:underline">
                    Create a new Gmail address instead
                  </p>
                </div>
              )}

              <div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <input 
                    type="password" 
                    placeholder="Confirm" 
                    className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Use 8 or more characters with a mix of letters, numbers & symbols
                  </p>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center">
                  <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                    Forgot email?
                  </a>
                </div>
              )}

              {isLogin && (
                <p className="text-sm text-gray-600 mt-8">
                  Not your computer? Use Guest mode to sign in privately. <a href="#" className="text-blue-600 font-medium hover:underline">Learn more</a>
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 mt-2">
                <button 
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors"
                >
                  {isLogin ? 'Create account' : 'Sign in instead'}
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
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