import { useState, useEffect } from 'react'
import { socialAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { FaWhatsapp, FaPhone, FaSave } from 'react-icons/fa'

export default function SocialManager() {
  const [form, setForm] = useState({ whatsapp:'', phone:'' })
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
