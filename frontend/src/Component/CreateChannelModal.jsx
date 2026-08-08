import { useState } from 'react';
import axios from 'axios';
import { FaYoutube } from "react-icons/fa6";

const CreateChannelModal = ({ isOpen, onClose, onCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');

  // UI state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName('');
    setDescription('');
    setBannerUrl('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Channel name is required.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please sign in to create a channel.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:3000/channels',
        {
          name: name.trim(),
          description: description.trim(),
          bannerUrl: bannerUrl.trim(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Notify the rest of the app that the user now has a channel
      window.dispatchEvent(new Event('authchange'));
      if (onCreated) onCreated(data.channel);
      handleClose();
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
              <h1 className="text-2xl font-normal text-gray-900 mb-2">Create your channel</h1>
              <p className="text-base text-gray-600">
                A channel brings your videos together
              </p>
            </div>

            {/* Error message */}
            {error && (
              <p className="mb-4 text-sm text-center rounded-md px-3 py-2 bg-red-50 text-red-600">
                {error}
              </p>
            )}

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Channel Name */}
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Channel name"
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Channel description"
                  rows={3}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900 resize-none"
                />
              </div>

              {/* Banner / Avatar URL */}
              <div>
                <input
                  type="url"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  placeholder="Banner / avatar image URL (optional)"
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Paste an image URL to use as your channel avatar.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 mt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-sm font-medium text-gray-600 hover:bg-gray-100 px-4 py-2 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create channel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateChannelModal;
