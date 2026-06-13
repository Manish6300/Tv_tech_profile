import { useState } from 'react'
import { FaMapMarkerAlt, FaSpinner, FaCheckCircle, FaExclamationTriangle, FaLocationArrow } from 'react-icons/fa'
import './LocationPicker.css'

/**
 * LocationPicker
 * Uses Browser Geolocation API — no paid API key required.
 * Calls onSelect({ address, mapLink, latitude, longitude }) on success.
 */
export default function LocationPicker({ onSelect }) {
  const [status, setStatus]   = useState('idle')   // idle | loading | success | denied | error
  const [coords, setCoords]   = useState(null)
  const [address, setAddress] = useState('')

  const fetchAddress = async (lat, lng) => {
    try {
      // Free reverse geocoding via OpenStreetMap Nominatim (no API key needed)
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        { headers: { 'Accept-Language': 'en' } }
      )
      const data = await res.json()
      return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
    } catch {
      return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
    }
  }

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setStatus('error')
      return
    }

    setStatus('loading')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setCoords({ lat, lng })

        const resolvedAddress = await fetchAddress(lat, lng)
        setAddress(resolvedAddress)
        setStatus('success')

        onSelect({
          address:   resolvedAddress,
          latitude:  lat,
          longitude: lng,
          mapLink:   `https://www.google.com/maps?q=${lat},${lng}`
        })
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setStatus('denied')
        else setStatus('error')
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  const handleManualInput = (e) => {
    const val = e.target.value
    setAddress(val)
    // Reset coords if user manually types
    setCoords(null)
    onSelect({ address: val, latitude: null, longitude: null, mapLink: '' })
  }

  return (
    <div className="location-picker">
      {/* Get Location Button */}
      <button
        type="button"
        className={`loc-btn ${status}`}
        onClick={handleGetLocation}
        disabled={status === 'loading'}
      >
        {status === 'loading'
          ? <><FaSpinner className="spin" /> Detecting Location...</>
          : status === 'success'
          ? <><FaCheckCircle /> Location Detected</>
          : <><FaLocationArrow /> Use My Current Location</>
        }
      </button>

      {/* Status messages */}
      {status === 'denied' && (
        <div className="loc-alert denied">
          <FaExclamationTriangle />
          <div>
            <strong>Location permission denied.</strong>
            <p>Please allow location access in your browser settings, or type your address manually below.</p>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className="loc-alert error">
          <FaExclamationTriangle />
          <div>
            <strong>Could not detect location.</strong>
            <p>Please type your address manually below.</p>
          </div>
        </div>
      )}

      {/* Detected coords display */}
      {status === 'success' && coords && (
        <div className="loc-coords">
          <FaMapMarkerAlt />
          <span>
            <strong>GPS:</strong> {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
          </span>
          <a
            href={`https://www.google.com/maps?q=${coords.lat},${coords.lng}`}
            target="_blank"
            rel="noreferrer"
            className="maps-preview-link"
          >
            Preview on Maps ↗
          </a>
        </div>
      )}

      {/* Manual address input (always visible as fallback) */}
      <div className="loc-manual">
        <span className="loc-divider">or enter address manually</span>
        <input
          type="text"
          placeholder="House No, Street, Area, City..."
          value={address}
          onChange={handleManualInput}
        />
      </div>
    </div>
  )
}
