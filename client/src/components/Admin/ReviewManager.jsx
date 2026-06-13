import { useState, useEffect } from 'react'
import { reviewsAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { FaTrash, FaCheck } from 'react-icons/fa'

export default function ReviewManager() {
  const [reviews, setReviews] = useState([])

  const fetch = () => reviewsAPI.getAll().then(r => setReviews(r.data.data))
  useEffect(() => { fetch() }, [])

  const approve = async (id) => {
    try { await reviewsAPI.approve(id); toast.success('Approved'); fetch() }
    catch { toast.error('Failed') }
  }

  const del = async (id) => {
    if (!confirm('Delete this review?')) return
    try { await reviewsAPI.delete(id); toast.success('Deleted'); fetch() }
    catch { toast.error('Failed') }
  }

  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n)

  return (
    <div className="section-card">
      <h3>Reviews Management <span className="count-badge">{reviews.length}</span></h3>
      <div className="table-wrap">
        <table className="dash-table">
          <thead><tr><th>Customer</th><th>Rating</th><th>Review</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r._id}>
                <td><strong>{r.name}</strong></td>
                <td style={{color:'#F59E0B',fontSize:'1rem'}}>{stars(r.rating)}</td>
                <td className="truncate-cell">{r.message}</td>
                <td><span className={`badge ${r.isApproved?'badge-success':'badge-warning'}`}>{r.isApproved?'Approved':'Pending'}</span></td>
                <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                <td><div className="action-btns">
                  {!r.isApproved && <button className="btn btn-sm" style={{background:'var(--success)',color:'#fff'}} onClick={() => approve(r._id)}><FaCheck /></button>}
                  <button className="btn btn-sm" style={{background:'var(--danger)',color:'#fff'}} onClick={() => del(r._id)}><FaTrash /></button>
                </div></td>
              </tr>
            ))}
            {reviews.length === 0 && <tr><td colSpan="6" style={{textAlign:'center',color:'var(--text-muted)',padding:'2rem'}}>No reviews yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
