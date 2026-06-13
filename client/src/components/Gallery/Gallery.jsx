import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './Gallery.css'

import { imgUrl } from '../../services/api'

const API_URL = ''
const CATS = ['all', 'technician', 'repair', 'workshop', 'customer', 'before', 'after']

export default function Gallery({ images }) {
  const [active, setActive] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const filtered = active === 'all' ? images : images.filter(i => i.category === active)

  const navLb = (dir) => {
    const idx = filtered.findIndex(i => i._id === lightbox._id)
    const next = (idx + dir + filtered.length) % filtered.length
    setLightbox(filtered[next])
  }

  return (
    <section className="section section-alt" id="gallery">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">My Work</span>
          <h2>Work Gallery</h2>
          <p>A glimpse into professional TV repair work</p>
        </div>

        <div className="gallery-filters" data-aos="fade-up">
          {CATS.map(c => (
            <button
              key={c}
              className={`gf-btn ${active === c ? 'active' : ''}`}
              onClick={() => setActive(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="gallery-empty" data-aos="fade-up">
            <p>No images available. Check back soon!</p>
          </div>
        ) : (
          <div className="gallery-grid" data-aos="fade-up">
            {filtered.map((img, i) => (
              <motion.div
                key={img._id}
                className="gallery-item"
                layoutId={img._id}
                whileHover={{ scale: 1.03 }}
                onClick={() => setLightbox(img)}
              >
                <img
                  src={`${API_URL}${img.imageUrl}`}
                  alt={img.caption || 'Gallery'}
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <span>{img.caption || img.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="lb-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={`${API_URL}${lightbox.imageUrl}`} alt={lightbox.caption} />
              {lightbox.caption && <p className="lb-caption">{lightbox.caption}</p>}
            </motion.div>
            <button className="lb-btn lb-close" onClick={() => setLightbox(null)}><FaTimes /></button>
            <button className="lb-btn lb-prev" onClick={() => navLb(-1)}><FaChevronLeft /></button>
            <button className="lb-btn lb-next" onClick={() => navLb(1)}><FaChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
