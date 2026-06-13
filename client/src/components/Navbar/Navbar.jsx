import { useState, useEffect } from 'react'
import { FaTv, FaMoon, FaSun, FaBars, FaTimes, FaLock } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'
import './Navbar.css'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Book Service', href: '#booking' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a className="nav-logo" onClick={() => handleNav('#home')}>
          <FaTv className="logo-icon" />
          <span>{profile?.technicianName || 'Pavan Kumar'}</span>
        </a>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a onClick={() => handleNav(l.href)} className="nav-link">{l.label}</a>
            </li>
          ))}
          <li>
            <a href="/admin/login" className="nav-admin-btn">
              <FaLock /> Admin
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          <button className="hamburger" onClick={() => setOpen(o => !o)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  )
}
