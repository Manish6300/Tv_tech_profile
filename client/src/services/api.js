import axios from 'axios'

// Single source of truth for image URLs — proxied through Vite in dev
export const BASE_URL = ''
export const imgUrl = (url) => url ? url : ''

const API = axios.create({ baseURL: '/api' })

API.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

API.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
    }
    return Promise.reject(err)
  }
)

export default API

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me')
}

export const profileAPI = {
  get: () => API.get('/profile'),
  update: (data) => API.put('/profile', data, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export const servicesAPI = {
  getAll: () => API.get('/services/all'),
  getPublic: () => API.get('/services'),
  create: (data) => API.post('/services', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => API.put(`/services/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => API.delete(`/services/${id}`)
}

export const galleryAPI = {
  get: (cat) => API.get('/gallery', { params: cat ? { category: cat } : {} }),
  upload: (data) => API.post('/gallery/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => API.delete(`/gallery/${id}`)
}

export const reviewsAPI = {
  getPublic: () => API.get('/reviews'),
  getAll: () => API.get('/reviews/all'),
  add: (data) => API.post('/reviews', data),
  approve: (id) => API.put(`/reviews/${id}/approve`),
  delete: (id) => API.delete(`/reviews/${id}`)
}

export const requestsAPI = {
  get: () => API.get('/requests'),
  add: (data) => API.post('/requests', data),
  updateStatus: (id, status) => API.put(`/requests/${id}`, { status }),
  delete: (id) => API.delete(`/requests/${id}`)
}

export const socialAPI = {
  get: () => API.get('/social-links'),
  update: (data) => API.put('/social-links', data)
}
