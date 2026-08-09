import { GiHamburgerMenu } from "react-icons/gi";
import { FaYoutube, FaRegBell } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoMicOutline } from "react-icons/io5";
import { MdOutlineVideoCall } from "react-icons/md";
import YouTubeAuthModal from './YouTubeAuthModal';
import CreateChannelModal from './CreateChannelModal';
import UploadVideoModal from './UploadVideoModal';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ toggleSidebar }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [hasChannel, setHasChannel] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Load user from localStorage on mount and when auth state changes
  useEffect(() => {
    const syncUser = () => {
      const stored = localStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    };
    syncUser();
    // Listen for login/logout events dispatched by the modal / logout button
    window.addEventListener('authchange', syncUser);
    return () => window.removeEventListener('authchange', syncUser);
  }, []);

  // Determine whether the logged-in user already has a channel
  useEffect(() => {
    const checkChannel = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setHasChannel(false);
        return;
      }
      try {
        const res = await axios.get('http://localhost:3000/channels/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasChannel(!!res.data?.channel);
      } catch {
        setHasChannel(false);
      }
    };
    checkChannel();
  }, [user]);

// Handle the video-call / create-channel button (click)
  const handleCreateChannelClick = () => {
    // Already has a channel -> open the dropdown menu
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
setUser(null);
    setMenuOpen(false);
    setProfileMenuOpen(false);
    window.dispatchEvent(new Event('authchange'));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    // Navigate to home with the search query; empty term shows all videos
    navigate(term ? `/?q=${encodeURIComponent(term)}` : '/');
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 bg-white z-50 border-b border-gray-100">
      
      {/* 1. Left Section: Hamburger Button & Logo */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <GiHamburgerMenu className="text-xl" />
        </button>
        <div className="flex items-center gap-1 cursor-pointer">
          <FaYoutube className="text-red-600 text-3xl" />
          <p className="text-xl font-bold tracking-tighter">
            YouTube<sup className="text-[10px] font-normal ml-1 text-gray-500">IN</sup>
          </p>
        </div>
      </div>

      {/* 2. Middle Section: Search Bar & Mic */}
      <form onSubmit={handleSearch} className="hidden sm:flex items-center flex-grow max-w-[600px] mx-4">
        <div className="flex w-full border border-gray-300 rounded-full overflow-hidden focus-within:border-blue-500 ml-10">
          <input 
            type="text" 
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 outline-none text-gray-700 bg-white"
          />
          <button type="submit" className="px-5 bg-gray-50 border-l border-gray-300 hover:bg-gray-100 transition-colors">
            <CiSearch className="text-2xl text-gray-700" />
          </button>
        </div>
        <div className="p-2 ml-4 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-colors">
          <IoMicOutline className="text-2xl text-gray-800" />
        </div>
      </form>

      {/* 3. Right Section: Actions & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
{/* Create channel / upload video dropdown - only shown when logged in */}
        {user && (
          <div className="relative">
            {hasChannel ? (
              /* Logged in & has channel -> video-call button with Add video dropdown */
              <div
                onClick={handleCreateChannelClick}
                title="Your channel"
                className="hidden md:block p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
              >
                <MdOutlineVideoCall className="text-3xl text-gray-700" />
              </div>
            ) : (
              /* Logged in but no channel -> Create channel button */
              <button
                onClick={() => setIsCreateOpen(true)}
                title="Create channel"
                className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-full text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                <MdOutlineVideoCall className="text-2xl text-gray-700" />
                Create channel
              </button>
            )}

            {/* Dropdown menu when user has a channel */}
            {menuOpen && hasChannel && user && (
              <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => { setMenuOpen(false); navigate('/channel'); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  View channel
                </button>
                <button
                  onClick={() => { setMenuOpen(false); setIsUploadOpen(true); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Add video
                </button>
              </div>
            )}
          </div>
        )}

{user && (
          <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors relative">
            <FaRegBell className="text-xl text-gray-700" />
            <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] rounded-full px-1">9+</span>
          </div>
        )}

{user ? (
          <div
            className="relative ml-2"
            onMouseEnter={() => setProfileMenuOpen(true)}
            onMouseLeave={() => setProfileMenuOpen(false)}
          >
            <div className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm uppercase">
                {user.username ? user.username[0] : 'U'}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-800 max-w-[120px] truncate">
                {user.username}
              </span>
            </div>

            {/* Profile Dropdown on hover */}
            {profileMenuOpen && (
              <div className="absolute right-0 top-12 w-60 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                {/* User info header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.username || user.email}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>

                {hasChannel ? (
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setMenuOpen(false);
                      navigate('/channel');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    View your channel
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setMenuOpen(false);
                      setIsCreateOpen(true);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    Create channel
                  </button>
                )}

                <div className="border-t border-gray-100 my-1"></div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="cursor-pointer ml-2">
            {/* <CgProfile className="text-3xl text-gray-700" onClick={()=>setIsOpen(true)}/> */}
            <button
  onClick={() => setIsOpen(true)}
  className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-full text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors"
>
  {/* Standard Material outline user icon */}
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="w-6 h-6"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" 
    />
  </svg>
  Sign in
</button>
          </div>
        )}
      </div>

      <YouTubeAuthModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
      <CreateChannelModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
      <UploadVideoModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </header>
  );
}
