import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentHeader from './CommentHeader';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

export default function CommentSection() {
  const { videoID } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

useEffect(() => {
    if (!videoID) return;

    let mounted = true;

    axios
      .get(`http://localhost:3000/videos/${videoID}/comments`)
      .then(({ data }) => {
        if (mounted) {
          setComments(Array.isArray(data) ? data : []);
          setError(false);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch comments:", err);
        if (mounted) setError(true);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [videoID]);

  // Callback passed to CommentInput that prepends the newly added comment
  const handleAddComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <div className="mt-6 px-4 sm:px-0">
      <CommentHeader commentCount={comments.length} />
      <CommentInput onAdded={handleAddComment} />

      <div className="mt-4 flex flex-col gap-6">
        {loading && <p className="text-gray-500 text-sm">Loading comments...</p>}
        {error && (
          <p className="text-red-500 text-sm">Failed to load comments.</p>
        )}
        {!loading && !error && comments.length === 0 && (
          <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
        )}
        {!loading &&
          !error &&
          comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
      </div>
    </div>
  );
}
