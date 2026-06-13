import { useEffect, useState } from 'react'
import { FaClipboardList, FaStar, FaImages, FaTools } from 'react-icons/fa'
import { requestsAPI, reviewsAPI, galleryAPI, servicesAPI } from '../../services/api'
import './Admin.css'

export default function DashboardHome({ setSection }) {
  const [stats, setStats] = useState({ requests: 0, reviews: 0, gallery: 0, services: 0 })
  const [recentRequests, setRecentRequests] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      const [req, rev, gal, svc] = await Promise.allSettled([
        requestsAPI.get(), reviewsAPI.getAll(), galleryAPI.get(), servicesAPI.getAll()
      ])
      setStats({
        requests: req.value?.data?.data?.length || 0,
        reviews: rev.value?.data?.data?.length || 0,
        gallery: gal.value?.data?.data?.length || 0,
        services: svc.value?.data?.data?.length || 0,
      })
      setRecentRequests(req.value?.data?.data?.slice(0, 8) || [])
    }
    fetchStats()
  }, [])

  const cards = [
    { label: 'Service Requests', val: stats.requests, icon: <FaClipboardList />, cls: 'blue', sec: 'requests' },
    { label: 'Reviews', val: stats.reviews, icon: <FaStar />, cls: 'yellow', sec: 'reviews' },
    { label: 'Gallery Images', val: stats.gallery, icon: <FaImages />, cls: 'green', sec: 'gallery' },
    { label: 'Services', val: stats.services, icon: <FaTools />, cls: 'purple', sec: 'services' },
  ]

  const statusBadge = (s) => {
    const m = { pending: 'badge-warning', 'in-progress': 'badge-info', completed: 'badge-success', cancelled: 'badge-danger' }
    return <span className={`badge ${m[s] || 'badge-info'}`}>{s}</span>
  }

  return (
    <>
      <div className="dash-stat-cards">
        {cards.map((c, i) => (
          <div key={i} className={`dsc dsc-${c.cls}`} onClick={() => setSection(c.sec)}>
            <div className="dsc-icon">{c.icon}</div>
            <div><strong>{c.val}</strong><span>{c.label}</span></div>
          </div>
        ))}
      </div>

      <div className="section-card">
        <h3>Recent Service Requests</h3>
        {recentRequests.length === 0 ? (
          <p className="empty-msg">No service requests yet.</p>
        ) : (
          <div className="table-wrap">
            <table className="dash-table">
              <thead><tr><th>Name</th><th>Phone</th><th>Brand</th><th>Problem</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {recentRequests.map(r => (
                  <tr key={r._id}>
                    <td>{r.customerName}</td>
                    <td>{r.phone}</td>
                    <td>{r.tvBrand}</td>
                    <td className="truncate-cell">{r.problemDescription}</td>
                    <td>{statusBadge(r.status)}</td>
                    <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
