import { motion } from 'framer-motion'
import {
  FaTv, FaWifi, FaMobileAlt, FaExpand, FaMicrochip,
  FaDesktop, FaWrench, FaHome, FaDownload, FaVolumeUp, FaPlug, FaBolt
} from 'react-icons/fa'
import './Services.css'

import { imgUrl } from '../../services/api'

const API_URL = ''

const iconMap = {
  FaTv: <FaTv />, FaWifi: <FaWifi />, FaMobileAlt: <FaMobileAlt />,
  FaExpand: <FaExpand />, FaMicrochip: <FaMicrochip />, FaDesktop: <FaDesktop />,
  FaWrench: <FaWrench />, FaHome: <FaHome />, FaDownload: <FaDownload />,
  FaVolumeUp: <FaVolumeUp />, FaPlug: <FaPlug />, FaBolt: <FaBolt />
}

export default function Services({ services }) {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">What I Do</span>
          <h2>My Services</h2>
          <p>Professional TV repair & installation services for all major brands</p>
        </div>

        <div className="services-grid">
          {services.map((svc, i) => (
            <motion.div
              key={svc._id}
              className="service-card"
              data-aos="fade-up"
              data-aos-delay={i % 3 * 100}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="svc-header">
                <div className="svc-icon">{iconMap[svc.icon] || <FaTv />}</div>
                <h3>{svc.title}</h3>
              </div>
              <div className="svc-body">
                <p>{svc.description}</p>
                {svc.price && svc.price !== 'Contact for Price' && (
                  <div className="svc-price">{svc.price}</div>
                )}
              </div>
              <div className="svc-footer">
                <a href="#booking" className="btn btn-primary btn-sm">Book Service</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
