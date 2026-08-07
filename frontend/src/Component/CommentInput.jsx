import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CommentInput({ onAdded }) {
  const { videoID } = useParams();
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    // The frontend stores the JWT token in localStorage after login.
    // If no token is present, prompt the user to sign in.
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please sign in to comment.');
      return;
    }

    setSubmitting(true);
    setMessage('');
    try {
      const { data } = await axios.post(
        `http://localhost:3000/videos/${videoID}/comments`,
        { text: trimmed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText('');
      if (onAdded && data.comment) {
        onAdded(data.comment);
      }
    } catch (err) {
      console.error("Failed to add comment:", err);
      setMessage(err?.response?.data?.message || 'Failed to add comment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-start w-full">
      {/* Current User Avatar */}
      <div className="w-10 h-10 rounded-full bg-black shrink-0"></div>

      <div className="flex-1">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full bg-transparent border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-black transition-colors"
        />
        {message && <p className="text-xs text-red-500 mt-1">{message}</p>}
        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => { setText(''); setMessage(''); }}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!text.trim() || submitting}
            className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Commenting...' : 'Comment'}
          </button>
        </div>
      </div>
    </form>
  );
}
export default CommentInput;
