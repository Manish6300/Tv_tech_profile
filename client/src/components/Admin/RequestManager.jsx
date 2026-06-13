import { useState, useEffect } from 'react'
import { requestsAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { FaTrash, FaMapMarkerAlt, FaDirections, FaPhone, FaEye } from 'react-icons/fa'
import './RequestManager.css'

const STATUSES = ['pending', 'in-progress', 'completed', 'cancelled']

const badgeCls = {
  pending:      'badge-warning',
  'in-progress':'badge-info',
  completed:    'badge-success',
  cancelled:    'badge-danger'
}

export default function RequestManager() {
  const [requests, setRequests] = useState([])
  const [selected, setSelected] = useState(null)   // detail modal
  const [filter, setFilter]     = useState('all')

  const fetchRequests = () =>
    requestsAPI.get().then(r => setRequests(r.data.data))

  useEffect(() => { fetchRequests() }, [])

  const updateStatus = async (id, status) => {
    try { await requestsAPI.updateStatus(id, status); toast.success('Status updated'); fetchRequests() }
    catch { toast.error('Failed to update') }
  }

  const del = async (id) => {
    if (!confirm('Delete this request?')) return
    try { await requestsAPI.delete(id); toast.success('Deleted'); fetchRequests() }
    catch { toast.error('Failed to delete') }
  }

  // Open Google Maps navigation in new tab — no API key needed
  const navigate = (lat, lng, address) => {
    const url = lat && lng
      ? `https://www.google.com/maps?q=${lat},${lng}`
      : `https://www.google.com/maps/search/${encodeURIComponent(address)}`
    window.open(url, '_blank')
  }

  const filtered = filter === 'all'
    ? requests
    : requests.filter(r => r.status === filter)

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = requests.filter(r => r.status === s).length
    return acc
  }, {})

  return (
    <div>
      {/* Stats row */}
      <div className="req-stat-row">
        {[
          { label: 'Total',       val: requests.length,      cls: 'blue'   },
          { label: 'Pending',     val: counts.pending,       cls: 'yellow' },
          { label: 'In Progress', val: counts['in-progress'],cls: 'purple' },
          { label: 'Completed',   val: counts.completed,     cls: 'green'  },
          { label: 'Cancelled',   val: counts.cancelled,     cls: 'red'    },
        ].map((s, i) => (
          <div key={i} className={`req-stat req-stat-${s.cls}`}
            onClick={() => setFilter(i === 0 ? 'all' : STATUSES[i - 1])}>
            <strong>{s.val}</strong><span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="section-card">
        <div className="req-header">
          <h3>Service Requests <span className="count-badge">{filtered.length}</span></h3>
          <div className="req-filters">
            {['all', ...STATUSES].map(s => (
              <button key={s}
                className={`rf-btn ${filter === s ? 'active' : ''}`}
                onClick={() => setFilter(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Cards layout (mobile-friendly) */}
        <div className="req-cards">
          {filtered.map(r => (
            <div key={r._id} className="req-card">
              <div className="req-card-header">
                <div className="req-avatar">{r.customerName.charAt(0).toUpperCase()}</div>
                <div className="req-card-info">
                  <strong>{r.customerName}</strong>
                  <a href={`tel:${r.phone}`} className="req-phone">
                    <FaPhone /> {r.phone}
                  </a>
                </div>
                <span className={`badge ${badgeCls[r.status]}`}>{r.status}</span>
              </div>

              <div className="req-card-body">
                <div className="req-detail">
                  <span className="req-label">TV Brand</span>
                  <span>{r.tvBrand} {r.tvModel && `— ${r.tvModel}`}</span>
                </div>
                <div className="req-detail">
                  <span className="req-label">Problem</span>
                  <span>{r.problemDescription}</span>
                </div>
                <div className="req-detail">
                  <span className="req-label"><FaMapMarkerAlt /> Address</span>
                  <span>{r.address}</span>
                </div>
                {r.latitude && r.longitude && (
                  <div className="req-detail">
                    <span className="req-label">GPS Coords</span>
                    <span className="req-coords">
                      {r.latitude.toFixed(5)}, {r.longitude.toFixed(5)}
                    </span>
                  </div>
                )}
                <div className="req-detail">
                  <span className="req-label">Date</span>
                  <span>{new Date(r.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                </div>
              </div>

              <div className="req-card-footer">
                {/* Navigate button — opens Google Maps directly */}
                <button
                  className="btn btn-sm btn-navigate"
                  onClick={() => navigate(r.latitude, r.longitude, r.address)}
                  title="Open in Google Maps"
                >
                  <FaDirections /> Navigate
                </button>

                {/* Status selector */}
                <select
                  className="status-select"
                  value={r.status}
                  onChange={e => updateStatus(r._id, e.target.value)}
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                {/* Delete */}
                <button
                  className="btn btn-sm btn-delete"
                  onClick={() => del(r._id)}
                  title="Delete request"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="req-empty">
              <FaMapMarkerAlt />
              <p>No {filter !== 'all' ? filter : ''} requests found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
