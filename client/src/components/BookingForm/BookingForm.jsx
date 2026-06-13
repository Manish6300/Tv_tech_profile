import { useState } from 'react'
import { requestsAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { FaUser, FaPhone, FaTv, FaTools, FaMapMarkerAlt } from 'react-icons/fa'
import LocationPicker from './LocationPicker'
import './BookingForm.css'

const BRANDS = ['Samsung','LG','Sony','Mi','OnePlus','TCL','Panasonic',
                 'Philips','Vu','Haier','Acer','Realme','Toshiba','Other']

const EMPTY = {
  customerName: '', phone: '', address: '', mapLink: '',
  latitude: null, longitude: null,
  tvBrand: '', tvModel: '', problemDescription: ''
}

export default function BookingForm() {
  const [form, setForm]       = useState(EMPTY)
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  // Called by LocationPicker with { address, latitude, longitude, mapLink }
  const handleLocationSelect = ({ address, latitude, longitude, mapLink }) => {
    setForm(f => ({ ...f, address, latitude, longitude, mapLink }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.address) return toast.error('Please select or enter your location')
    setLoading(true)
    try {
      await requestsAPI.add(form)
      toast.success("✅ Service request submitted! We'll contact you shortly.")
      setForm(EMPTY)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit request')
    } finally { setLoading(false) }
  }

  return (
    <section className="section booking-section" id="booking">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Book Now</span>
          <h2>Request a Service</h2>
          <p>Fill the form and I'll contact you within 30 minutes</p>
        </div>

        <div className="booking-wrap" data-aos="zoom-in">
          {/* Info panel */}
          <div className="booking-info">
            <h3>Why Choose Me?</h3>
            <ul className="booking-features">
              <li>✅ Same-day home service</li>
              <li>✅ Genuine spare parts</li>
              <li>✅ 30-day repair warranty</li>
              <li>✅ Transparent pricing</li>
              <li>✅ Expert technician</li>
              <li>✅ All brands covered</li>
            </ul>
            <div className="booking-location-note">
              <strong>📍 Share Your Location</strong>
              <p>Use the GPS button to share your exact location so the technician can navigate directly to you.</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-row">
              <div className="form-group">
                <label><FaUser /> Customer Name *</label>
                <input type="text" placeholder="Your full name" required
                  value={form.customerName} onChange={set('customerName')} />
              </div>
              <div className="form-group">
                <label><FaPhone /> Phone Number *</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" required
                  value={form.phone} onChange={set('phone')} />
              </div>
            </div>

            {/* Location Picker */}
            <div className="form-group">
              <label>📍 Your Location *</label>
              <LocationPicker onSelect={handleLocationSelect} />
              {form.latitude && form.longitude && (
                <div className="coords-confirm">
                  ✅ GPS location captured: {form.latitude.toFixed(5)}, {form.longitude.toFixed(5)}
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><FaTv /> TV Brand *</label>
                <select required value={form.tvBrand} onChange={set('tvBrand')}>
                  <option value="">Select Brand</option>
                  {BRANDS.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label><FaTv /> TV Model</label>
                <input type="text" placeholder="e.g. 55 inch 4K"
                  value={form.tvModel} onChange={set('tvModel')} />
              </div>
            </div>

            <div className="form-group">
              <label><FaTools /> Problem Description *</label>
              <textarea rows="4"
                placeholder="Describe the issue with your TV in detail..." required
                value={form.problemDescription} onChange={set('problemDescription')} />
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Submitting...' : '📋 Submit Service Request'}
            </button>
          </form>
        </div>

        {/* Technician Location Section */}
        <div className="technician-location-section" data-aos="fade-up">
          <div className="tech-location-card">
            <FaMapMarkerAlt className="tech-location-icon" />
            <h3>📍 Technician Location</h3>
            <p className="tech-address">2-6-530, Jaipuri Colony, Weaker Section Colony, Nagole, Hyderabad, Telangana 500068</p>
            <a href="https://maps.app.goo.gl/3YFE4BocPjgbwsZt5" target="_blank" rel="noreferrer" className="tech-map-btn">
              🗺️ View Workshop on Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
