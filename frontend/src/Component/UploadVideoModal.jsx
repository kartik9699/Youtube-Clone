import { useState } from 'react';
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';

const UploadVideoModal = ({ isOpen, onClose, onUploaded }) => {
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const [description, setDescription] = useState('');

  // UI state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitle('');
    setVideoFile(null);
    setThumbFile(null);
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
    if (!videoFile) {
      setError('Please select a video file to upload.');
      return;
    }
    if (!thumbFile) {
      setError('Please select a thumbnail image file.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please sign in to upload a video.');
      return;
    }

    setLoading(true);
    try {
      // Build a multipart/form-data payload for multer
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('video', videoFile);
      formData.append('thumbnail', thumbFile);

      const { data } = await axios.post(
        'http://localhost:3000/videos',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
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
            <form className="space-y-5" onSubmit={handleSubmit} encType="multipart/form-data">
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

              {/* Video File */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video file
                </label>
                <input
                  type="file"
                  accept="video/*,.mp4,.webm,.ogg,.mov,.m4v,.mkv"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow file:mr-3 file:rounded file:border-0 file:bg-blue-600 file:text-white file:px-4 file:py-2"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  {videoFile
                    ? `Selected: ${videoFile.name} (${(videoFile.size / 1024 / 1024).toFixed(2)} MB)`
                    : 'Choose an MP4, WebM, OGG, MOV or MKV file from your device.'}
                </p>
              </div>

              {/* Thumbnail File */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail image
                </label>
                <input
                  type="file"
                  accept="image/*,.jpeg,.jpg,.png,.gif,.webp"
                  onChange={(e) => setThumbFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow file:mr-3 file:rounded file:border-0 file:bg-blue-600 file:text-white file:px-4 file:py-2"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  {thumbFile
                    ? `Selected: ${thumbFile.name}`
                    : 'Choose a JPG, PNG, GIF or WebP image for the thumbnail.'}
                </p>
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

