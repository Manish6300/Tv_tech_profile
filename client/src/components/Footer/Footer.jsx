import { FaTv, FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa'
import './Footer.css'

export default function Footer({ profile, socialLinks }) {
  const year = new Date().getFullYear()

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo"><FaTv /><span>{profile?.technicianName || 'Pavan Kumar'}</span></div>
            <p>Professional Multi-Brand TV Technician providing reliable doorstep repair services across Hyderabad.</p>
            <div className="footer-socials">
              <a href={socialLinks?.whatsapp} target="_blank" rel="noreferrer" className="fs-btn whatsapp"><FaWhatsapp /></a>
              <a href={socialLinks?.instagram} target="_blank" rel="noreferrer" className="fs-btn instagram"><FaInstagram /></a>
              <a href={socialLinks?.facebook} target="_blank" rel="noreferrer" className="fs-btn facebook"><FaFacebook /></a>
              <a href={socialLinks?.youtube} target="_blank" rel="noreferrer" className="fs-btn youtube"><FaYoutube /></a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              {['#home','#about','#services','#gallery','#reviews','#booking','#contact'].map((h, i) => (
                <li key={i}><a onClick={() => scrollTo(h)}>{h.replace('#','').charAt(0).toUpperCase()+h.slice(2).replace('-',' ')}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Services</h4>
            <ul>
              {['LED TV Repair','Smart TV Repair','Screen Replacement','Motherboard Repair','Wall Mount','Home Service'].map(s => (
                <li key={s}><a onClick={() => scrollTo('#services')}>{s}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4>Contact</h4>
            <ul>
              <li><FaPhone /><a href={`tel:${profile?.phone}`}>{profile?.phone}</a></li>
              <li><FaWhatsapp /><a href={socialLinks?.whatsapp} target="_blank" rel="noreferrer">WhatsApp Chat</a></li>
              <li><FaEnvelope /><a href={`mailto:${profile?.email}`}>{profile?.email}</a></li>
              <li><FaMapMarkerAlt /><span>{profile?.address}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© {year} {profile?.technicianName || 'Pavan Kumar'}. All Rights Reserved. Built with ❤️</p>
        </div>
      </div>
    </footer>
  )
}
