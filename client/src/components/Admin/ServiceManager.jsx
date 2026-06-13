import { useState, useEffect } from 'react'
import { servicesAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa'

import { imgUrl } from '../../services/api'

const API_URL = ''

const ICONS = ['FaTv','FaWifi','FaMobileAlt','FaExpand','FaMicrochip','FaDesktop','FaWrench','FaHome','FaDownload','FaVolumeUp','FaPlug','FaBolt']

const emptyForm = { title:'', description:'', icon:'FaTv', price:'', isActive:'true', order:0 }

export default function ServiceManager() {
  const [services, setServices] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [imgFile, setImgFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetch = () => servicesAPI.getAll().then(r => setServices(r.data.data))
  useEffect(() => { fetch() }, [])

  const set = k => e => setForm(f => ({...f, [k]: e.target.value}))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k,v]) => fd.append(k, v))
      if (imgFile) fd.append('image', imgFile)
      if (editId) { await servicesAPI.update(editId, fd); toast.success('Service updated!') }
      else { await servicesAPI.create(fd); toast.success('Service added!') }
      setForm(emptyForm); setEditId(null); setImgFile(null); fetch()
    } catch { toast.error('Save failed') }
    finally { setLoading(false) }
  }

  const handleEdit = (s) => {
    setEditId(s._id)
    setForm({ title:s.title, description:s.description, icon:s.icon, price:s.price||'', isActive:s.isActive?'true':'false', order:s.order })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return
    try { await servicesAPI.delete(id); toast.success('Deleted'); fetch() }
    catch { toast.error('Delete failed') }
  }

  return (
    <div className="section-card">
      <h3>{editId ? 'Edit Service' : 'Add Service'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group"><label>Service Name *</label><input type="text" required value={form.title} onChange={set('title')} /></div>
          <div className="form-group"><label>Icon</label>
            <select value={form.icon} onChange={set('icon')}>
              {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
            </select>
          </div>
          <div className="form-group"><label>Price</label><input type="text" value={form.price} onChange={set('price')} placeholder="Contact for Price" /></div>
          <div className="form-group"><label>Status</label>
            <select value={form.isActive} onChange={set('isActive')}>
              <option value="true">Active</option><option value="false">Inactive</option>
            </select>
          </div>
        </div>
        <div className="form-group"><label>Description *</label><textarea rows="3" required value={form.description} onChange={set('description')} /></div>
        <div className="form-btns-row">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : editId ? <><FaEdit /> Update</> : <><FaPlus /> Add</>}
          </button>
          {editId && <button type="button" className="btn btn-outline" onClick={() => {setEditId(null); setForm(emptyForm)}}><FaTimes /> Cancel</button>}
        </div>
      </form>

      <div className="table-wrap" style={{marginTop:'1.5rem'}}>
        <table className="dash-table">
          <thead><tr><th>Name</th><th>Description</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {services.map(s => (
              <tr key={s._id}>
                <td><strong>{s.title}</strong></td>
                <td className="truncate-cell">{s.description}</td>
                <td>{s.price}</td>
                <td><span className={`badge ${s.isActive?'badge-success':'badge-danger'}`}>{s.isActive?'Active':'Inactive'}</span></td>
                <td><div className="action-btns">
                  <button className="btn btn-sm btn-outline" onClick={() => handleEdit(s)}><FaEdit /></button>
                  <button className="btn btn-sm" style={{background:'var(--danger)',color:'#fff'}} onClick={() => handleDelete(s._id)}><FaTrash /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
