import { useState, useEffect } from 'react'
import { socialAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { FaWhatsapp, FaInstagram, FaFacebook, FaYoutube, FaMapMarkerAlt, FaPhone, FaSave } from 'react-icons/fa'

export default function SocialManager() {
  const [form, setForm] = useState({ whatsapp:'', instagram:'', facebook:'', youtube:'', maps:'', phone:'' })
  const [loading, setLoading] = useState(false)

  useEffect(() => { socialAPI.get().then(r => setForm(r.data.data || {})) }, [])

  const set = k => e => setForm(f => ({...f, [k]: e.target.value}))

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true)
    try { await socialAPI.update(form); toast.success('Social links updated!') }
    catch { toast.error('Update failed') }
    finally { setLoading(false) }
  }

  const fields = [
    { key: 'whatsapp', label: 'WhatsApp Link', icon: <FaWhatsapp style={{color:'#25D366'}} />, placeholder: 'https://wa.me/91XXXXXXXXXX' },
    { key: 'instagram', label: 'Instagram Link', icon: <FaInstagram style={{color:'#E1306C'}} />, placeholder: 'https://instagram.com/...' },
    { key: 'facebook', label: 'Facebook Link', icon: <FaFacebook style={{color:'#1877F2'}} />, placeholder: 'https://facebook.com/...' },
    { key: 'youtube', label: 'YouTube Link', icon: <FaYoutube style={{color:'#FF0000'}} />, placeholder: 'https://youtube.com/...' },
    { key: 'maps', label: 'Google Maps Link', icon: <FaMapMarkerAlt style={{color:'#EA4335'}} />, placeholder: 'https://maps.google.com/...' },
    { key: 'phone', label: 'Phone Number', icon: <FaPhone style={{color:'var(--primary)'}} />, placeholder: '+91 XXXXX XXXXX' },
  ]

  return (
    <div className="section-card">
      <h3>Social Media Links</h3>
      <form onSubmit={handleSubmit}>
        {fields.map(f => (
          <div key={f.key} className="form-group">
            <label style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>{f.icon} {f.label}</label>
            <input type={f.key === 'phone' ? 'text' : 'url'} value={form[f.key]||''} onChange={set(f.key)} placeholder={f.placeholder} />
          </div>
        ))}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          <FaSave /> {loading ? 'Saving...' : 'Save Links'}
        </button>
      </form>
    </div>
  )
}
