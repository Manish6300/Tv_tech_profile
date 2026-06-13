import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import './FAQ.css'

const faqs = [
  { q: 'Do you provide home service?', a: 'Yes! I provide doorstep TV repair service at your home across Hyderabad, Secunderabad, and surrounding areas. Just call or WhatsApp to schedule.' },
  { q: 'Which TV brands do you repair?', a: 'I repair all major brands including Samsung, LG, Sony, Mi, OnePlus, TCL, Panasonic, Philips, Vu, Haier, Acer, Realme, Toshiba, and more.' },
  { q: 'How much does TV repair cost?', a: 'Cost depends on the issue and parts needed. I provide a free diagnosis and transparent pricing before starting any work. No hidden charges.' },
  { q: 'How long does repair take?', a: 'Most repairs are completed within 1–2 hours on-site. Complex repairs needing spare parts may take 1–2 business days.' },
  { q: 'Do you provide warranty on repairs?', a: 'Yes, I offer a 30-day service warranty on all repairs. If the same issue recurs within this period, I will fix it at no extra charge.' },
  { q: 'What are your working hours?', a: 'Monday to Saturday, 9 AM to 7 PM. Emergency service may be available on request outside these hours.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">FAQ</span>
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-list" data-aos="fade-up">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <FaChevronDown className="faq-chevron" />
              </button>
              <div className="faq-a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
