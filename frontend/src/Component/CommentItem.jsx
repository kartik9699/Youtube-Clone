import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// Helper to format createdAt into a relative "time ago" string
function timeAgo(dateString) {
  if (!dateString) return "";
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

function CommentItem({ comment, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text || '');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const menuRef = useRef(null);

  // Backend returns author as a populated object (username/email/avatar)
  const author = comment.author;
  const authorName =
    (author && (author.username || author.email)) || "Anonymous";
  const avatar = author?.avatar || "https://ui-avatars.com/api/?name=A&background=0D8ABC&color=fff";

  // Determine if the logged-in user is the author of this comment
  const currentUser = (() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();
  const isOwner = !!(currentUser && author && currentUser._id === author._id);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSaveEdit = async () => {
    const trimmed = editText.trim();
    if (!trimmed) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please sign in to edit your comment.');
      return;
    }

    setSaving(true);
    setMessage('');
    try {
      const { data } = await axios.put(
        `http://localhost:3000/comments/${comment._id}`,
        { text: trimmed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (onEdit && data.comment) {
        onEdit(data.comment);
      }
      setIsEditing(false);
      setMenuOpen(false);
    } catch (err) {
      console.error("Failed to edit comment:", err);
      setMessage(err?.response?.data?.message || 'Failed to edit comment.');
    } finally {
      setSaving(false);
    }
  };

const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please sign in to delete your comment.');
      setDeleteModalOpen(false);
      return;
    }

    setDeleting(true);
    try {
      await axios.delete(`http://localhost:3000/comments/${comment._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteModalOpen(false);
      if (onDelete) onDelete(comment._id);
    } catch (err) {
      console.error("Failed to delete comment:", err);
      setMessage(err?.response?.data?.message || 'Failed to delete comment.');
      setDeleteModalOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex gap-4 text-sm">
      {/* Left Column: Avatar */}
      <div className="shrink-0 pt-1 relative">
        <img
          src={avatar}
          alt={authorName}
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
      </div>

      {/* Right Column: Content */}
      <div className="flex-1 min-w-0">
        {/* Header: Username and Time */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="font-medium text-[13px] hover:bg-gray-100 rounded px-1 -ml-1 cursor-pointer">
            {authorName}
          </span>
          <span className="text-gray-500 text-xs">
            {timeAgo(comment.createdAt)}
          </span>
        </div>

        {/* Comment Body / Edit Mode */}
        {isEditing ? (
          <div>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2 text-[14px] focus:outline-none focus:border-blue-500 resize-y"
            />
            {message && <p className="text-xs text-red-500 mt-1">{message}</p>}
            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => { setIsEditing(false); setEditText(comment.text || ''); setMessage(''); }}
                className="px-4 py-1.5 text-[12px] font-semibold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={!editText.trim() || saving}
                className="px-4 py-1.5 text-[12px] font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-[#0f0f0f] text-[14px] leading-[20px] whitespace-pre-wrap pr-4">
            {comment.text}
          </p>
        )}

        {/* Action Bar */}
        <div className="flex items-center gap-4 mt-2">
          {/* Like */}
          <div className="flex items-center gap-1 text-gray-600">
            <button className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
            </button>
            <span className="text-xs font-medium">{comment.likes || 0}</span>
          </div>

          {/* Dislike */}
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
            </svg>
          </button>

          {/* Reply Button */}
          <button className="text-[12px] font-semibold hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">
            Reply
          </button>
        </div>
      </div>

      {/* Far Right: More Options (only for the comment author) */}
      {isOwner && (
        <div className="shrink-0 pt-1 relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="More options"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-900">
               <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-50">
              <button
                onClick={() => { setIsEditing(true); setMenuOpen(false); setMessage(''); }}
                className="w-full text-left px-4 py-2 text-[13px] text-gray-800 hover:bg-gray-100 transition-colors"
              >
                Edit
              </button>
<button
                onClick={() => { setMenuOpen(false); setDeleteModalOpen(true); setMessage(''); }}
                className="w-full text-left px-4 py-2 text-[13px] text-red-600 hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => { if (!deleting) setDeleteModalOpen(false); }}
          ></div>
          {/* Card */}
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete this comment?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              This will permanently remove your comment. This action cannot be undone.
            </p>
            {message && <p className="text-xs text-red-500 mb-3">{message}</p>}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => { setDeleteModalOpen(false); setMessage(''); }}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-full hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default CommentItem;
