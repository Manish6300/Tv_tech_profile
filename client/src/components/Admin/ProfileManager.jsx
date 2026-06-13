import { useState, useEffect } from 'react'
import { profileAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { FaSave, FaCamera } from 'react-icons/fa'

import { imgUrl } from '../../services/api'

const API_URL = ''

export default function ProfileManager() {
  const [form, setForm] = useState({})
  const [photoFile, setPhotoFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    profileAPI.get().then(r => {
      const d = r.data.data
      setForm({
        technicianName: d.technicianName || '',
        title: d.title || '',
        tagline: d.tagline || '',
        biography: d.biography || '',
        experience: d.experience || '',
        tvsRepaired: d.tvsRepaired || '',
        happyCustomers: d.happyCustomers || '',
        serviceLocations: d.serviceLocations || '',
        rating: d.rating || '',
        phone: d.phone || '',
        whatsapp: d.whatsapp || '',
        email: d.email || '',
        address: d.address || '',
        workshopLocation: d.workshopLocation || '',
        serviceAreas: d.serviceAreas || '',
        skills: d.skills?.join(', ') || '',
        certifications: d.certifications?.join(', ') || '',
      })
      if (d.profileImage) setPreview(`${API_URL}${d.profileImage}?t=${new Date(d.updatedAt).getTime()}`)
    })
  }, [])

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (file) { setPhotoFile(file); setPreview(URL.createObjectURL(file)) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'skills' || k === 'certifications') {
          fd.append(k, JSON.stringify(v.split(',').map(s => s.trim()).filter(Boolean)))
        } else fd.append(k, v)
      })
      if (photoFile) fd.append('profileImage', photoFile)
      const res = await profileAPI.update(fd)
      const saved = res.data.data
      if (saved.profileImage) setPreview(`${API_URL}${saved.profileImage}?t=${new Date(saved.updatedAt).getTime()}`)
      setPhotoFile(null)
      toast.success('Profile updated!')
    } catch { toast.error('Update failed') }
    finally { setLoading(false) }
  }

  return (
    <div className="section-card">
      <h3>Profile Management</h3>
      <form onSubmit={handleSubmit}>
        <div className="profile-photo-section">
          <div className="pp-wrap">
            {preview
              ? <img src={preview} alt="Profile" className="pp-img" />
              : <div className="pp-placeholder">Photo</div>
            }
            <label className="pp-upload-btn">
              <FaCamera /> Change
              <input type="file" accept="image/*" hidden onChange={handlePhoto} />
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group"><label>Name</label><input type="text" value={form.technicianName||''} onChange={set('technicianName')} /></div>
          <div className="form-group"><label>Title</label><input type="text" value={form.title||''} onChange={set('title')} /></div>
        </div>
        <div className="form-group"><label>Tagline</label><input type="text" value={form.tagline||''} onChange={set('tagline')} /></div>
        <div className="form-group"><label>Biography</label><textarea rows="4" value={form.biography||''} onChange={set('biography')} /></div>
        <div className="form-row">
          <div className="form-group"><label>Experience (Years)</label><input type="number" value={form.experience||''} onChange={set('experience')} /></div>
          <div className="form-group"><label>TVs Repaired</label><input type="number" value={form.tvsRepaired||''} onChange={set('tvsRepaired')} /></div>
          <div className="form-group"><label>Happy Customers</label><input type="number" value={form.happyCustomers||''} onChange={set('happyCustomers')} /></div>
          <div className="form-group"><label>Service Locations</label><input type="number" value={form.serviceLocations||''} onChange={set('serviceLocations')} /></div>
          <div className="form-group"><label>Rating</label><input type="number" step="0.1" value={form.rating||''} onChange={set('rating')} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Phone</label><input type="text" value={form.phone||''} onChange={set('phone')} /></div>
          <div className="form-group"><label>WhatsApp Number</label><input type="text" value={form.whatsapp||''} onChange={set('whatsapp')} /></div>
          <div className="form-group"><label>Email</label><input type="email" value={form.email||''} onChange={set('email')} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Address</label><input type="text" value={form.address||''} onChange={set('address')} /></div>
          <div className="form-group"><label>Service Areas</label><input type="text" value={form.serviceAreas||''} onChange={set('serviceAreas')} /></div>
        </div>
        <div className="form-group"><label>Workshop Location (Maps Link)</label><input type="text" placeholder="https://maps.app.goo.gl/..." value={form.workshopLocation||''} onChange={set('workshopLocation')} /></div>
        <div className="form-group"><label>Skills (comma separated)</label><input type="text" value={form.skills||''} onChange={set('skills')} /></div>
        <div className="form-group"><label>Certifications (comma separated)</label><input type="text" value={form.certifications||''} onChange={set('certifications')} /></div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          <FaSave /> {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

    </div>
  )
}
