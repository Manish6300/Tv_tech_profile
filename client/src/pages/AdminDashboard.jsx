import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  FaTachometerAlt, FaUser, FaImages, FaTools, FaStar,
  FaClipboardList, FaShareAlt, FaBars, FaTimes, FaSignOutAlt,
  FaExternalLinkAlt, FaTv
} from 'react-icons/fa'
import DashboardHome from '../components/Admin/DashboardHome'
import ProfileManager from '../components/Admin/ProfileManager'
import GalleryManager from '../components/Admin/GalleryManager'
import ServiceManager from '../components/Admin/ServiceManager'
import ReviewManager from '../components/Admin/ReviewManager'
import RequestManager from '../components/Admin/RequestManager'
import SocialManager from '../components/Admin/SocialManager'
import toast from 'react-hot-toast'
import './AdminDashboard.css'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { id: 'profile', label: 'Profile', icon: <FaUser /> },
  { id: 'gallery', label: 'Gallery', icon: <FaImages /> },
  { id: 'services', label: 'Services', icon: <FaTools /> },
  { id: 'reviews', label: 'Reviews', icon: <FaStar /> },
  { id: 'requests', label: 'Service Requests', icon: <FaClipboardList /> },
  { id: 'social', label: 'Social Links', icon: <FaShareAlt /> },
]

export default function AdminDashboard() {
  const [section, setSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/admin/login')
  }

  const renderSection = () => {
    switch(section) {
      case 'dashboard': return <DashboardHome setSection={setSection} />
      case 'profile': return <ProfileManager />
      case 'gallery': return <GalleryManager />
      case 'services': return <ServiceManager />
      case 'reviews': return <ReviewManager />
      case 'requests': return <RequestManager />
      case 'social': return <SocialManager />
      default: return null
    }
  }

  return (
    <div className="dashboard-layout">
      {/* Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo"><FaTv /><span>TV Admin</span></div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}><FaTimes /></button>
        </div>
        <nav className="sidebar-nav">
          {NAV.map(n => (
            <button
              key={n.id}
              className={`sidebar-item ${section === n.id ? 'active' : ''}`}
              onClick={() => { setSection(n.id); setSidebarOpen(false) }}
            >
              {n.icon} {n.label}
            </button>
          ))}
          <a href="/" target="_blank" rel="noreferrer" className="sidebar-item">
            <FaExternalLinkAlt /> View Website
          </a>
          <button className="sidebar-item logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="dash-main">
        <header className="dash-topbar">
          <button className="topbar-toggle" onClick={() => setSidebarOpen(true)}><FaBars /></button>
          <h1 className="topbar-title">{NAV.find(n => n.id === section)?.label || 'Dashboard'}</h1>
          <div className="topbar-user">
            <div className="topbar-avatar">{admin?.username?.charAt(0).toUpperCase()}</div>
            <span>{admin?.username}</span>
          </div>
        </header>

        <div className="dash-content">
          {renderSection()}
        </div>
      </div>
    </div>
  )
}
