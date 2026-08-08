import { useState } from 'react';
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';

const UploadVideoModal = ({ isOpen, onClose, onUploaded }) => {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [description, setDescription] = useState('');

  // UI state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitle('');
    setVideoUrl('');
    setThumbnailUrl('');
    setDescription('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Video title is required.');
      return;
    }
    if (!videoUrl.trim()) {
      setError('Video URL is required.');
      return;
    }
    if (!thumbnailUrl.trim()) {
      setError('Thumbnail URL is required.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please sign in to upload a video.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:3000/videos',
        {
          title: title.trim(),
          videoUrl: videoUrl.trim(),
          thumbnailUrl: thumbnailUrl.trim(),
          description: description.trim(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (onUploaded) onUploaded(data.video);
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
          <div className="relative max-w-md w-full bg-white rounded-xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
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
                <FiUpload className="w-12 h-12 text-red-600" />
              </div>
              <h1 className="text-2xl font-normal text-gray-900 mb-2">Upload video</h1>
              <p className="text-base text-gray-600">
                Add a new video to your channel
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
              {/* Title */}
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Video title"
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900"
                  required
                />
              </div>

              {/* Video URL */}
              <div>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Video URL (e.g. YouTube)" 
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  Paste a video URL to play in the player (any URL supported by react-player).
                </p>
              </div>

              {/* Thumbnail URL */}
              <div>
                <input
                  type="url"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="Thumbnail image URL"
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Video description"
                  rows={3}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder-gray-500 text-gray-900 resize-none"
                />
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
                  {loading ? 'Uploading...' : 'Upload video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadVideoModal;

