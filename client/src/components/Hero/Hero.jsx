import { motion } from 'framer-motion'
import { FaWhatsapp, FaTools, FaCheckCircle, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import './Hero.css'

import { imgUrl } from '../../services/api'

const API_URL = ''

export default function Hero({ profile, socialLinks }) {
  const waLink = socialLinks?.whatsapp || `https://wa.me/${profile?.whatsapp || '919959714805'}`

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`hero-orb orb-${i + 1}`} />
        ))}
        <div className="hero-grid" />
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FaCheckCircle /> Verified TV Repair Expert
          </motion.div>

          <h1 className="hero-name">{profile?.technicianName || 'Pavan Talla'}</h1>
          <h2 className="hero-title">{profile?.title || 'Professional Multi-Brand TV Technician'}</h2>
          <p className="hero-tagline">{profile?.tagline || 'Fast, Reliable & Affordable TV Repair Services'}</p>

          <div className="hero-meta">
            <span><FaMapMarkerAlt /> {profile?.serviceAreas?.split(',')[0] || 'Hyderabad'}</span>
            <span><FaClock /> {profile?.experience || 10}+ Years Exp.</span>
            <span><FaTools /> Home Service</span>
          </div>

          <div className="hero-btns">
            <motion.a
              href="#booking"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTools /> Request Service
            </motion.a>
            <motion.a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp /> WhatsApp
            </motion.a>
          </div>

          <div className="hero-stats">
            <div className="hstat"><strong>{profile?.tvsRepaired || 5000}+</strong><span>TVs Fixed</span></div>
            <div className="hstat-divider" />
            <div className="hstat"><strong>{profile?.happyCustomers || 4800}+</strong><span>Customers</span></div>
            <div className="hstat-divider" />
            <div className="hstat"><strong>{profile?.rating || 4.9}⭐</strong><span>Rating</span></div>
          </div>
        </motion.div>

        <motion.div
          className="hero-image-col"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="hero-img-wrap">
            <div className="hero-img-ring ring1" />
            <div className="hero-img-ring ring2" />
            <div className="hero-img-circle">
              {profile?.profileImage
                ? <img src={`${API_URL}${profile.profileImage}?t=${profile.updatedAt || Date.now()}`} alt={profile.technicianName} />
                : <div className="hero-img-placeholder"><FaTools /></div>
              }
            </div>
            <motion.div
              className="hero-float-badge badge-exp"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FaCheckCircle /> {profile?.experience || 10}+ Years
            </motion.div>
            <motion.div
              className="hero-float-badge badge-tv"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <FaTools /> {profile?.tvsRepaired || 5000}+ Fixed
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll-hint">
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span />
        </motion.a>
      </div>
    </section>
  )
}
