import { motion } from 'framer-motion'
import { FaCheckCircle, FaStar, FaMapMarkerAlt, FaAward } from 'react-icons/fa'
import './About.css'

import { imgUrl } from '../../services/api'

const API_URL = ''

export default function About({ profile }) {
  if (!profile) return null

  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">About Me</span>
          <h2>Your Trusted TV Repair Expert</h2>
        </div>

        <div className="about-grid">
          <motion.div
            className="about-img-col"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-img-wrap">
              {profile.profileImage
                ? <img src={`${API_URL}${profile.profileImage}`} alt={profile.technicianName} />
                : <div className="about-img-placeholder"><FaAward /></div>
              }
              <div className="about-exp-badge">
                <strong>{profile.experience || 10}+</strong>
                <span>Years Experience</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3>{profile.technicianName}</h3>
            <p className="about-bio">{profile.biography}</p>

            <div className="about-quick-stats">
              <div className="aq-stat">
                <strong>{profile.tvsRepaired?.toLocaleString()}+</strong>
                <span>TVs Repaired</span>
              </div>
              <div className="aq-stat">
                <strong>{profile.happyCustomers?.toLocaleString()}+</strong>
                <span>Happy Customers</span>
              </div>
              <div className="aq-stat">
                <strong>{profile.rating} <FaStar /></strong>
                <span>Avg Rating</span>
              </div>
            </div>

            {profile.skills?.length > 0 && (
              <div className="about-skills">
                <h4>Core Skills</h4>
                <div className="skills-wrap">
                  {profile.skills.map((s, i) => (
                    <span key={i} className="skill-tag"><FaCheckCircle /> {s}</span>
                  ))}
                </div>
              </div>
            )}

            {profile.certifications?.length > 0 && (
              <div className="about-certs">
                <h4><FaAward /> Certifications</h4>
                <ul>
                  {profile.certifications.map((c, i) => (
                    <li key={i}><FaCheckCircle /> {c}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="about-area">
              <FaMapMarkerAlt />
              <div>
                <strong>Service Areas</strong>
                <p>{profile.serviceAreas}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
