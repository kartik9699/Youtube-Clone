import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import ChannelProfile from './ChannelProfile';

function ChannelDetails() {
  const { channelId } = useParams();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // The logged-in user (if any). Used to determine whether the viewer is the
  // owner of the channel being viewed (and therefore allowed to edit/delete).
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const fetchChannel = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`http://localhost:3000/channels/${channelId}`);
      setChannel(res.data.channel);
    } catch (err) {
      if (err?.response?.status === 404) {
        setError('Channel not found.');
      } else {
        setError(err?.response?.data?.message || 'Failed to load the channel.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchChannel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId,channel]);

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

  // Only the channel owner may edit/delete videos.
  const isOwner = user && channel.owner && channel.owner.toString() === user._id;

  return (
    <ChannelProfile
      channel={channel}
      isOwner={isOwner}
      onRefresh={fetchChannel}
    />
  );
}

export default ChannelDetails
