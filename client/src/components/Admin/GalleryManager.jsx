import { useState, useEffect } from 'react'
import { galleryAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { FaTrash, FaUpload } from 'react-icons/fa'

import { imgUrl } from '../../services/api'

const API_URL = ''
const CATS = ['repair','technician','workshop','customer','before','after']

export default function GalleryManager() {
  const [images, setImages] = useState([])
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState('repair')
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)

  const fetch = () => galleryAPI.get().then(r => setImages(r.data.data))
  useEffect(() => { fetch() }, [])

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return toast.error('Select an image')
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      fd.append('category', category)
      fd.append('caption', caption)
      await galleryAPI.upload(fd)
      toast.success('Image uploaded!')
      setFile(null); setCaption('')
      e.target.reset(); fetch()
    } catch { toast.error('Upload failed') }
    finally { setLoading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return
    try { await galleryAPI.delete(id); toast.success('Deleted'); fetch() }
    catch { toast.error('Delete failed') }
  }

  return (
    <div className="section-card">
      <h3>Gallery Management</h3>
      <form onSubmit={handleUpload} className="upload-form">
        <div className="form-row">
          <div className="form-group">
            <label>Image File *</label>
            <input type="file" accept="image/*" required onChange={e => setFile(e.target.files[0])} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              {CATS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Caption</label>
            <input type="text" placeholder="Optional caption" value={caption} onChange={e => setCaption(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          <FaUpload /> {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      <div className="admin-gallery-grid">
        {images.map(img => (
          <div key={img._id} className="ag-item">
            <img src={`${API_URL}${img.imageUrl}`} alt={img.caption} loading="lazy" />
            <div className="ag-overlay">
              <span className="badge badge-info">{img.category}</span>
              <button className="btn btn-sm" style={{background:'var(--danger)',color:'#fff'}} onClick={() => handleDelete(img._id)}>
                <FaTrash />
              </button>
            </div>
            {img.caption && <p className="ag-caption">{img.caption}</p>}
          </div>
        ))}
        {images.length === 0 && <p className="empty-msg">No images uploaded yet.</p>}
      </div>
    </div>
  )
}
