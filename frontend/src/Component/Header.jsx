import { GiHamburgerMenu } from "react-icons/gi";
import { FaYoutube, FaRegBell } from "react-icons/fa6";
import { CiSearch, CiLogout } from "react-icons/ci";
import { IoMicOutline } from "react-icons/io5";
import { MdOutlineVideoCall } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import YouTubeAuthModal from './YouTubeAuthModal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Header({ toggleSidebar }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
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

const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
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
        <div className="hidden md:block p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
          <MdOutlineVideoCall className="text-3xl text-gray-700" />
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors relative">
          <FaRegBell className="text-xl text-gray-700" />
          <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] rounded-full px-1">9+</span>
        </div>
{user ? (
          <div className="flex items-center gap-2 ml-2">
            <div className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm uppercase">
                {user.username ? user.username[0] : 'U'}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-800 max-w-[120px] truncate">
                {user.username}
              </span>
            </div>
            <button
              onClick={handleLogout}
              title="Sign out"
              className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
            >
              <CiLogout className="text-2xl text-gray-700" />
            </button>
          </div>
        ) : (
          <div className="cursor-pointer ml-2">
            <CgProfile className="text-3xl text-gray-700" onClick={()=>setIsOpen(true)}/>
          </div>
        )}
      </div>
<YouTubeAuthModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
    </header>
  );
}