import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdHomeFilled, MdOutlineSubscriptions, MdHistory, MdOutlineWatchLater, MdOutlineSportsVolleyball } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { RiPlayListLine, RiLiveLine } from "react-icons/ri";
import { BiLike, BiMoviePlay } from "react-icons/bi";
import { HiOutlineFire, HiOutlineShoppingBag } from "react-icons/hi";
import { IoMusicalNoteOutline, IoGameControllerOutline, IoNewspaperOutline } from "react-icons/io5";
import { AiOutlineBulb } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [activeTab, setActiveTab] = useState('Home');

  // Full Item Component (Expanded Sidebar)
  const SidebarItem = ({ icon, label, isActive, onClick, to }) => {
    const content = (
      <>
        <span className="text-xl mr-5">{icon}</span>
        <span className="text-[14px] whitespace-nowrap">{label}</span>
      </>
    );
    const className = `flex items-center px-3 py-2 my-1 mx-2 rounded-lg cursor-pointer ${isActive ? 'bg-gray-100 font-semibold text-black' : 'hover:bg-gray-100 text-gray-800'
      }`;
    return to ? (
      <Link to={to} className={className} onClick={onClick}>{content}</Link>
    ) : (
      <div onClick={onClick} className={className}>{content}</div>
    );
  };

  // Mini Item Component (Collapsed Desktop Sidebar)
  const MiniSidebarItem = ({ icon, label, isActive, onClick, to }) => {
    const content = (
      <>
        <span className="text-xl mb-1">{icon}</span>
        <span className="text-[10px] truncate max-w-[60px]">{label}</span>
      </>
    );
    const className = `flex flex-col items-center justify-center py-3 px-1 my-1 mx-2 rounded-lg cursor-pointer ${isActive ? 'bg-gray-100 text-black' : 'hover:bg-gray-100 text-gray-800'
      }`;
    return to ? (
      <Link to={to} className={className} onClick={onClick}>{content}</Link>
    ) : (
      <div onClick={onClick} className={className}>{content}</div>
    );
  };

  return (
    <>
      {/* --- Mobile Dark Backdrop Overlay --- */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        />
      )}

      {/* --- Sidebar Base Container --- */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white overflow-y-auto scrollbar-none pb-4 z-40 transition-all duration-300 ${
          // Mobile responsive classes
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } ${
          // Desktop responsive width classes
          isOpen ? 'w-60' : 'md:w-18'
          }`}
      >
        {isOpen ? (
          <div>
            {/* Top Section */}
            <div className="border-b border-gray-200 py-3">
              <SidebarItem icon={<MdHomeFilled />} label="Home" to="/" isActive={activeTab === 'Home'} onClick={() => setActiveTab('Home')} />
              <SidebarItem icon={<SiYoutubeshorts />} label="Shorts" isActive={activeTab === 'Shorts'} onClick={() => setActiveTab('Shorts')} />
              <SidebarItem icon={<MdOutlineSubscriptions />} label="Subscriptions" to="/channel" isActive={activeTab === 'Subscriptions'} onClick={() => setActiveTab('Subscriptions')} />
            </div>

            {/* "You" Section */}
            <div className="border-b border-gray-200 py-3">
              <div className="flex items-center px-5 py-2 cursor-pointer hover:bg-gray-100 rounded-lg mx-2 mb-1">
                <h3 className="text-base font-semibold text-gray-800 mr-2">You</h3>
                <IoIosArrowForward className="text-sm text-gray-800" />
              </div>
              <SidebarItem icon={<MdHistory />} label="History" isActive={activeTab === 'History'} onClick={() => setActiveTab('History')} />
              <SidebarItem icon={<RiPlayListLine />} label="Playlists" isActive={activeTab === 'Playlists'} onClick={() => setActiveTab('Playlists')} />
              <SidebarItem icon={<MdOutlineWatchLater />} label="Watch later" isActive={activeTab === 'Watch later'} onClick={() => setActiveTab('Watch later')} />
              <SidebarItem icon={<BiLike />} label="Liked videos" isActive={activeTab === 'Liked videos'} onClick={() => setActiveTab('Liked videos')} />
            </div>

            {/* "Explore" Section */}
            <div className="py-3">
              <h3 className="text-base font-semibold px-5 py-2 text-gray-800">Explore</h3>
              <SidebarItem icon={<HiOutlineFire />} label="Trending" isActive={activeTab === 'Trending'} onClick={() => setActiveTab('Trending')} />
              <SidebarItem icon={<HiOutlineShoppingBag />} label="Shopping" isActive={activeTab === 'Shopping'} onClick={() => setActiveTab('Shopping')} />
              <SidebarItem icon={<IoMusicalNoteOutline />} label="Music" isActive={activeTab === 'Music'} onClick={() => setActiveTab('Music')} />
              <SidebarItem icon={<BiMoviePlay />} label="Movies" isActive={activeTab === 'Movies'} onClick={() => setActiveTab('Movies')} />
              <SidebarItem icon={<RiLiveLine />} label="Live" isActive={activeTab === 'Live'} onClick={() => setActiveTab('Live')} />
              <SidebarItem icon={<IoGameControllerOutline />} label="Gaming" isActive={activeTab === 'Gaming'} onClick={() => setActiveTab('Gaming')} />
              <SidebarItem icon={<IoNewspaperOutline />} label="News" isActive={activeTab === 'News'} onClick={() => setActiveTab('News')} />
              <SidebarItem icon={<MdOutlineSportsVolleyball />} label="Sports" isActive={activeTab === 'Sports'} onClick={() => setActiveTab('Sports')} />
              <SidebarItem icon={<AiOutlineBulb />} label="Courses" isActive={activeTab === 'Courses'} onClick={() => setActiveTab('Courses')} />
            </div>
          </div>
        ) : (
          /* IF SIDEBAR IS COLLAPSED (Desktop mini-sidebar) */
          <div className="hidden md:block py-2">
            <MiniSidebarItem icon={<MdHomeFilled />} label="Home" to="/" isActive={activeTab === 'Home'} onClick={() => setActiveTab('Home')} />
            <MiniSidebarItem icon={<SiYoutubeshorts />} label="Shorts" isActive={activeTab === 'Shorts'} onClick={() => setActiveTab('Shorts')} />
            <MiniSidebarItem icon={<MdOutlineSubscriptions />} label="Subscriptions" isActive={activeTab === 'Subscriptions'} onClick={() => setActiveTab('Subscriptions')} />
            <MiniSidebarItem icon={<RiPlayListLine />} label="You" isActive={activeTab === 'Playlists'} onClick={() => setActiveTab('Playlists')} />
          </div>
        )}
      </aside>
    </>
  );
}