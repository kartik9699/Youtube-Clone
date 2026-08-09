import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Banner from './Banner';
import ChannelHeader from './ChannelHeader';
import ChannelTabs from './ChannelTabs';
import VideoCard from './VideoCard';
import Toast from './Toast';
import { FiEdit, FiTrash2, FiMoreVertical } from 'react-icons/fi';

function ChannelProfile({ channel, isOwner, onRefresh }) {
  const navigate = useNavigate();
// Store the video currently being edited
  const [editingVideo, setEditingVideo] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', thumbnailUrl: '' });
  const [editThumbFile, setEditThumbFile] = useState(null);
// The video whose three-dot menu is currently open
  const [menuVideoId, setMenuVideoId] = useState(null);
  // The video pending deletion confirmation (opens the delete modal)
  const [videoToDelete, setVideoToDelete] = useState(null);
  // --- Channel edit/delete state ---
  // Whether the "Edit channel" modal is open
  const [editingChannel, setEditingChannel] = useState(false);
  // Pre-filled channel edit form
  const [channelEditForm, setChannelEditForm] = useState({ name: '', description: '', bannerUrl: '' });
  // Whether the "Delete channel" confirmation modal is open
  const [deleteChannelConfirm, setDeleteChannelConfirm] = useState(false);
  // Toast notification state: { message, type } | null
  const [toast, setToast] = useState(null);

  const token = localStorage.getItem('token');

  const showToast = (message, type = 'error') => setToast({ message, type });

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
      const formData = new FormData();
      formData.append('title', editForm.title);
      formData.append('description', editForm.description);
      if (editThumbFile) formData.append('thumbnail', editThumbFile);

      await axios.put(
        `http://localhost:3000/videos/${editingVideo._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditThumbFile(null);
closeEdit();
      if (onRefresh) await onRefresh();
      showToast('Video updated successfully.', 'success');
    } catch (err) {
      const msg =
        err?.response?.status === 403
          ? 'You are not authorized to edit this video.'
          : err?.response?.data?.message || 'Failed to update video.';
      showToast(msg);
    }
  };

// --- Delete handlers ---
  // Opens the delete confirmation modal for the given video
  const confirmDelete = (video) => {
    setMenuVideoId(null);
    setVideoToDelete(video);
  };

  // Actually deletes the video and closes the modal
  const handleDelete = async () => {
    if (!videoToDelete) return;
    try {
      await axios.delete(`http://localhost:3000/videos/${videoToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideoToDelete(null);
      if (onRefresh) await onRefresh();
      showToast('Video deleted successfully.', 'success');
    } catch (err) {
      const msg =
        err?.response?.status === 403
          ? 'You are not authorized to delete this video.'
          : err?.response?.data?.message || 'Failed to delete video.';
      showToast(msg);
    }
  };

const videos = channel?.videos || [];

  // --- Channel edit/delete handlers ---
  const openEditChannel = () => {
    setChannelEditForm({
      name: channel?.channelName || '',
      description: channel?.description || '',
      bannerUrl: channel?.avatar || '',
    });
    setEditingChannel(true);
  };

  const closeEditChannel = () => {
    setEditingChannel(false);
  };

  const handleChannelEditChange = (e) => {
    setChannelEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChannelEditSubmit = async (e) => {
    e.preventDefault();
    if (!channel) return;
    try {
      await axios.put(
        `http://localhost:3000/channels/${channel._id}`,
        {
          name: channelEditForm.name,
          description: channelEditForm.description,
          bannerUrl: channelEditForm.bannerUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingChannel(false);
      if (onRefresh) await onRefresh();
      showToast('Channel updated successfully.', 'success');
    } catch (err) {
      const msg =
        err?.response?.status === 403
          ? 'You are not authorized to edit this channel.'
          : err?.response?.data?.message || 'Failed to update channel.';
      showToast(msg);
    }
  };

  const handleDeleteChannel = async () => {
    if (!channel) return;
    try {
      await axios.delete(`http://localhost:3000/channels/${channel._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteChannelConfirm(false);
      showToast('Channel and its videos deleted successfully.', 'success');
      // Navigate home right away since the channel no longer exists
      navigate('/');
    } catch (err) {
      const msg =
        err?.response?.status === 403
          ? 'You are not authorized to delete this channel.'
          : err?.response?.data?.message || 'Failed to delete channel.';
      showToast(msg);
    }
  };

  return (
    <>
      <Banner ImgUrl={channel?.avatar}/>
      <ChannelHeader channel={channel} isOwner={isOwner} onEditChannel={openEditChannel} onDeleteChannel={() => setDeleteChannelConfirm(true)} />
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
              {/* Owner-only three-dot menu with edit/delete options */}
              {isOwner && (
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() =>
                      setMenuVideoId((prev) => (prev === video._id ? null : video._id))
                    }
                    title="Video options"
                    className="p-1.5 bg-white text-gray-800 rounded-full shadow hover:bg-gray-200 transition-colors"
                  >
                    <FiMoreVertical size={18} />
                  </button>

                  {/* Dropdown menu */}
                  {menuVideoId === video._id && (
                    <>
                      {/* Click anywhere outside to close */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setMenuVideoId(null)}
                      />
                      <div className="absolute right-0 top-9 z-50 w-44 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5">
                        <button
                          onClick={() => { setMenuVideoId(null); openEdit(video); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                        >
                          <FiEdit size={16} className="text-gray-600" />
                          Edit video
                        </button>
<button
                          onClick={() => confirmDelete(video)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <FiTrash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

{/* Toast notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Replace thumbnail (optional)
                </label>
                <input
                  type="file"
                  accept="image/*,.jpeg,.jpg,.png,.gif,.webp"
                  onChange={(e) => setEditThumbFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow file:mr-3 file:rounded file:border-0 file:bg-blue-600 file:text-white file:px-4 file:py-2"
                />
                {editThumbFile && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {editThumbFile.name}
                  </p>
                )}
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

      {/* Delete Confirmation Modal */}
      {videoToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
            <button
              onClick={() => setVideoToDelete(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-full bg-red-100 flex items-center justify-center">
                <FiTrash2 className="text-red-600" size={22} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">Delete video?</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to permanently delete "
                  <span className="font-medium text-gray-800">{videoToDelete.title}</span>"?
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={() => setVideoToDelete(null)}
                className="text-sm font-medium text-gray-600 hover:bg-gray-100 px-4 py-2 rounded transition-colors"
              >
                Cancel
              </button>
<button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-6 py-2.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Channel Modal */}
      {editingChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative max-w-md w-full bg-white rounded-xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeEditChannel}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit channel</h2>

            <form className="space-y-5" onSubmit={handleChannelEditSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Channel name</label>
                <input
                  type="text"
                  name="name"
                  value={channelEditForm.name}
                  onChange={handleChannelEditChange}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={channelEditForm.description}
                  onChange={handleChannelEditChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-gray-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avatar / banner URL</label>
                <input
                  type="url"
                  name="bannerUrl"
                  value={channelEditForm.bannerUrl}
                  onChange={handleChannelEditChange}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-gray-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeEditChannel}
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

      {/* Delete Channel Confirmation Modal */}
      {deleteChannelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
            <button
              onClick={() => setDeleteChannelConfirm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-full bg-red-100 flex items-center justify-center">
                <FiTrash2 className="text-red-600" size={22} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">Delete channel?</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to permanently delete "
                  <span className="font-medium text-gray-800">{channel?.channelName}</span>"?
                  This will also delete all of its videos and comments. This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={() => setDeleteChannelConfirm(false)}
                className="text-sm font-medium text-gray-600 hover:bg-gray-100 px-4 py-2 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteChannel}
                className="bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-6 py-2.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChannelProfile
