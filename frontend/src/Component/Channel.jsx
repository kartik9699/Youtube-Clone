import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Banner from './Banner';
import ChannelHeader from './ChannelHeader';
import ChannelTabs from './ChannelTabs';
import VideoCard from './VideoCard';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

function Channel() {
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Store the video currently being edited
  const [editingVideo, setEditingVideo] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', thumbnailUrl: '' });
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const fetchChannel = async () => {
    setLoading(true);
    setError('');
    try {
      if (!token || !user) {
        setChannel(null);
        setError('Please sign in to view your channel.');
        return;
      }
      const res = await axios.get('http://localhost:3000/channels/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChannel(res.data.channel);
    } catch (err) {
      if (err?.response?.status === 404) {
        setChannel(null);
        setError('You do not have a channel yet. Create one using the header button.');
      } else {
        setError(err?.response?.data?.message || 'Failed to load your channel.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Edit handlers ---
  const openEdit = (video) => {
    setEditingVideo(video);
    setEditForm({
      title: video.title,
      description: video.description || '',
      thumbnailUrl: video.thumbnailUrl || '',
    });
  };

  const closeEdit = () => {
    setEditingVideo(null);
    setEditForm({ title: '', description: '', thumbnailUrl: '' });
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingVideo) return;
    try {
      await axios.put(
        `http://localhost:3000/videos/${editingVideo._id}`,
        {
          title: editForm.title,
          description: editForm.description,
          thumbnailUrl: editForm.thumbnailUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      closeEdit();
      await fetchChannel();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to update video.');
    }
  };

  // --- Delete handler ---
  const handleDelete = async (video) => {
    if (!window.confirm(`Delete "${video.title}"? This cannot be undone.`)) return;
    try {
      await axios.delete(`http://localhost:3000/videos/${video._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchChannel();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete video.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !channel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4 text-center">
        <p className="text-gray-600">{error || 'Channel not found.'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const videos = channel.videos || [];

  return (
    <>
      <Banner />
      <ChannelHeader channel={channel} isOwner />
      <ChannelTabs />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10 mt-3">
        {videos.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            No videos yet on this channel.
          </div>
        ) : (
          videos.map((video) => (
            <div key={video._id} className="relative">
              <VideoCard video={video} />
              {/* Owner-only edit/delete controls */}
              <div className="absolute top-2 right-2 flex gap-2 bg-black/60 rounded-full p-1 opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(video)}
                  title="Edit video"
                  className="p-1.5 bg-white text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(video)}
                  title="Delete video"
                  className="p-1.5 bg-white text-red-600 rounded-full hover:bg-red-100 transition-colors"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Video Modal */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative max-w-md w-full bg-white rounded-xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeEdit}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit video</h2>

            <form className="space-y-5" onSubmit={handleEditSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-gray-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                <input
                  type="url"
                  name="thumbnailUrl"
                  value={editForm.thumbnailUrl}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-gray-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="text-sm font-medium text-gray-600 hover:bg-gray-100 px-4 py-2 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Channel
