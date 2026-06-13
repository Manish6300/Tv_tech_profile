# TV Technician MERN Stack Website

A premium, fully responsive Multi-Brand TV Technician Portfolio & Service Booking website built with the MERN stack.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm

---

### 1. Clone / Download the project

```
cd tv-technician-mern
```

---

### 2. Setup Backend

```bash
cd server
npm install
```

Edit `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/tv_technician_mern
JWT_SECRET=your_super_secret_jwt_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start server:
```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

### 4. Access the App

| Page | URL |
|---|---|
| Website | http://localhost:5173 |
| Admin Login | http://localhost:5173/admin/login |
| Admin Dashboard | http://localhost:5173/admin/dashboard |
| Backend API | http://localhost:5000/api |

---

## 🔐 Default Admin Credentials

```
Username: admin
Password: admin123
```

> ⚠️ Change these in `.env` before deploying to production!

---

## 📁 Folder Structure

```
tv-technician-mern/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar/
│   │   │   ├── Hero/
│   │   │   ├── About/
│   │   │   ├── Services/
│   │   │   ├── Brands/
│   │   │   ├── Stats/
│   │   │   ├── Gallery/
│   │   │   ├── Reviews/
│   │   │   ├── BookingForm/
│   │   │   ├── Contact/
│   │   │   ├── FAQ/
│   │   │   ├── Footer/
│   │   │   ├── Admin/         # Dashboard panels
│   │   │   └── UI/            # Loader, FloatButtons, etc.
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/           # Auth + Theme context
│   │   ├── services/          # Axios API calls
│   │   └── routes/            # Protected route
│   └── package.json
│
└── server/                    # Node.js + Express backend
    ├── config/db.js
    ├── models/                # Mongoose models
    ├── controllers/           # Business logic
    ├── routes/                # API routes
    ├── middleware/            # Auth, upload, error
    ├── utils/seed.js          # Auto-seeds initial data
    ├── uploads/               # Uploaded images
    ├── app.js
    ├── server.js
    └── .env
```

---

## 🌟 Features

### Public Website
- ✅ Premium animated hero section
- ✅ About section with skills & certifications
- ✅ Services grid with icons
- ✅ Brand logo auto-scroll slider
- ✅ Animated statistics counters
- ✅ Image gallery with lightbox & filters
- ✅ Customer reviews with search & filter
- ✅ Service booking form
- ✅ Contact section with WhatsApp, call, email
- ✅ FAQ accordion
- ✅ Floating WhatsApp button
- ✅ Scroll to top button
- ✅ Dark/Light theme toggle
- ✅ Fully responsive (mobile, tablet, desktop)

### Admin Dashboard
- ✅ JWT secured login
- ✅ Profile management with photo upload
- ✅ Gallery upload & delete (Multer)
- ✅ Service add/edit/delete
- ✅ Review approve/delete
- ✅ Service request status management
- ✅ Social links management

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | ❌ | Admin login |
| GET | /api/auth/me | ✅ | Get current admin |
| GET | /api/profile | ❌ | Get profile |
| PUT | /api/profile | ✅ | Update profile |
| GET | /api/services | ❌ | Get active services |
| POST | /api/services | ✅ | Add service |
| PUT | /api/services/:id | ✅ | Update service |
| DELETE | /api/services/:id | ✅ | Delete service |
| GET | /api/gallery | ❌ | Get gallery |
| POST | /api/gallery/upload | ✅ | Upload image |
| DELETE | /api/gallery/:id | ✅ | Delete image |
| GET | /api/reviews | ❌ | Get approved reviews |
| POST | /api/reviews | ❌ | Submit review |
| PUT | /api/reviews/:id/approve | ✅ | Approve review |
| DELETE | /api/reviews/:id | ✅ | Delete review |
| POST | /api/requests | ❌ | Submit service request |
| GET | /api/requests | ✅ | Get all requests |
| PUT | /api/requests/:id | ✅ | Update request status |
| DELETE | /api/requests/:id | ✅ | Delete request |
| GET | /api/social-links | ❌ | Get social links |
| PUT | /api/social-links | ✅ | Update social links |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Framer Motion, Swiper.js, AOS |
| Styling | CSS3 with CSS Variables, Responsive |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| File Upload | Multer |
| HTTP Client | Axios |
| Toast | react-hot-toast |
