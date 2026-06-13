import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa'
import './Contact.css'

export default function Contact({ profile, socialLinks }) {
  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Get In Touch</span>
          <h2>Contact Me</h2>
        </div>

        <div className="contact-grid">
          {[
            { icon: <FaPhone />, label: 'Call Me', value: profile?.phone, cls: 'blue' },
            { icon: <FaWhatsapp />, label: 'WhatsApp', value: `+${profile?.whatsapp}`, href: socialLinks?.whatsapp || `https://wa.me/${profile?.whatsapp}`, cls: 'green', btnText: 'Chat Now', target: '_blank' },
          ].map((c, i) => (
            <div key={i} className="contact-card" data-aos="fade-up" data-aos-delay={i * 80}>
              <div className={`cc-icon ${c.cls}`}>{c.icon}</div>
              <h4>{c.label}</h4>
              <p>{c.value}</p>
              {c.btnText && <a href={c.href} target={c.target} rel="noreferrer" className="btn btn-sm btn-outline">{c.btnText}</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
