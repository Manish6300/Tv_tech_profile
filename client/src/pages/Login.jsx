import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTv, FaUser, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'
import toast from 'react-hot-toast'
import './Login.css'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await authAPI.login(form)
      login(data.token, data.admin)
      toast.success('Welcome back, Admin!')
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-orb o1" />
        <div className="login-orb o2" />
        <div className="login-orb o3" />
      </div>
      <div className="login-card">
        <div className="login-logo"><FaTv /></div>
        <h2>Admin Login</h2>
        <p className="login-sub">TV Technician Dashboard</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><FaUser /> Username</label>
            <input
              type="text"
              placeholder="Enter username"
              required
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label><FaLock /> Password</label>
            <div className="pass-field">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter password"
                required
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                autoComplete="current-password"
              />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(s => !s)}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

        <a href="/" className="back-link"><FaArrowLeft /> Back to Website</a>
      </div>
    </div>
  )
}
