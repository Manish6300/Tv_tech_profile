import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { FaStar, FaRegStar, FaSearch } from 'react-icons/fa'
import { reviewsAPI } from '../../services/api'
import toast from 'react-hot-toast'
import 'swiper/css'
import 'swiper/css/pagination'
import './Reviews.css'

function StarDisplay({ rating }) {
  return (
    <div className="star-row">
      {[1,2,3,4,5].map(n => (
        <span key={n} className={n <= rating ? 'star' : 'star star-empty'}>★</span>
      ))}
    </div>
  )
}

function StarInput({ value, onChange }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="star-input">
      {[1,2,3,4,5].map(n => (
        <button
          key={n} type="button"
          className={`si-star ${n <= (hover || value) ? 'active' : ''}`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
        >★</button>
      ))}
    </div>
  )
}

export default function Reviews({ reviews, onRefresh }) {
  const [filter, setFilter] = useState(0)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ name: '', rating: 0, message: '' })
  const [loading, setLoading] = useState(false)

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : 0

  const filtered = reviews.filter(r =>
    (filter === 0 || r.rating === filter) &&
    (search === '' || r.name.toLowerCase().includes(search.toLowerCase()) || r.message.toLowerCase().includes(search.toLowerCase()))
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.rating) return toast.error('Please select a rating')
    setLoading(true)
    try {
      await reviewsAPI.add(form)
      toast.success('Review submitted for approval!')
      setForm({ name: '', rating: 0, message: '' })
      onRefresh?.()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit')
    } finally { setLoading(false) }
  }

  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Testimonials</span>
          <h2>Customer Reviews</h2>
          {reviews.length > 0 && (
            <div className="reviews-summary">
              <span className="avg-rating">{avgRating}</span>
              <StarDisplay rating={Math.round(avgRating)} />
              <span className="total-reviews">({reviews.length} reviews)</span>
            </div>
          )}
        </div>

        {/* Filter & Search */}
        <div className="reviews-toolbar" data-aos="fade-up">
          <div className="reviews-search">
            <FaSearch />
            <input
              placeholder="Search reviews..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="rating-filters">
            {[0,5,4,3,2,1].map(n => (
              <button key={n} className={`rf-btn ${filter===n?'active':''}`} onClick={() => setFilter(n)}>
                {n === 0 ? 'All' : `${n}★`}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            breakpoints={{ 320:{slidesPerView:1}, 640:{slidesPerView:2}, 1024:{slidesPerView:3} }}
            className="reviews-swiper"
            data-aos="fade-up"
          >
            {filtered.map(r => (
              <SwiperSlide key={r._id}>
                <div className="review-card">
                  <div className="rc-header">
                    <div className="rc-avatar">{r.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <h4>{r.name}</h4>
                      <StarDisplay rating={r.rating} />
                    </div>
                  </div>
                  <p className="rc-message">"{r.message}"</p>
                  <span className="rc-date">{new Date(r.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="no-reviews">No reviews found.</p>
        )}

        {/* Submit Review */}
        <div className="review-form-wrap" data-aos="fade-up">
          <h3>Share Your Experience</h3>
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text" placeholder="Your name" required
                  value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                />
              </div>
              <div className="form-group">
                <label>Rating *</label>
                <StarInput value={form.rating} onChange={v => setForm(f => ({...f, rating: v}))} />
              </div>
            </div>
            <div className="form-group">
              <label>Your Review *</label>
              <textarea
                rows="3" placeholder="Describe your experience..." required
                value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
