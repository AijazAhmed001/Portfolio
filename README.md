# Aijaz Ahmed — Portfolio Website

A complete, production-ready full-stack portfolio website for **Aijaz Ahmed**, Full Stack Developer & AI Enthusiast.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite + Tailwind CSS |
| Animations | Framer Motion + AOS |
| Backend | Node.js + Express.js |
| Database | MongoDB (Atlas) |
| Deployment | Vercel (Frontend) + Render (Backend) |

---

## 📁 Project Structure

```
portfolio/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/    # All UI components
│   │   ├── data/          # portfolioData.js (all content)
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
├── backend/           # Node.js + Express API
│   ├── config/        # DB connection
│   ├── controllers/   # Route logic
│   ├── middleware/    # Rate limiting, error handling
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   └── server.js
│
├── .gitignore
└── README.md
```

---

## 🌐 Sections

1. **Hero** — Typing animation, particles, floating profile
2. **About** — Bio, stats counters, info grid
3. **Skills** — Circular rings + animated progress bars
4. **Services** — Hover cards with feature lists
5. **Projects** — Filter grid, search, detail modal
6. **Experience** — Animated vertical timeline
7. **Education** — Air University card with CGPA bar
8. **Certifications** — Colored credential cards
9. **Achievements** — Animated CountUp stats
10. **Testimonials** — Auto-play slider with ratings
11. **Blog** — Article cards with thumbnails
12. **Contact** — Validated form + API integration
13. **Footer** — Links, socials, scroll-to-top

---

## ⚡ Getting Started

### 1. Clone & Setup

```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Backend Setup

```bash
cd backend
npm install

# Copy and fill in your env variables
copy .env.example .env

# Start backend
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173  
Backend runs on: http://localhost:5000

---

## 🔐 Security Features

- ✅ Helmet.js security headers (CSP, HSTS, X-Frame-Options)
- ✅ Rate limiting (5 contact submissions / 10 min / IP)
- ✅ MongoDB injection sanitization
- ✅ Input validation (express-validator + client-side)
- ✅ CORS whitelisting
- ✅ 10KB body size limit (prevents large payload attacks)
- ✅ Graceful shutdown on SIGTERM/SIGINT
- ✅ Unhandled rejection catching

---

## 🌍 Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build
# Connect repo to Vercel — auto-deploy on push
```

Set environment variable on Vercel:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

### Backend → Render

1. Connect repo to Render as **Web Service**
2. Set Build Command: `npm install`
3. Set Start Command: `node server.js`
4. Add environment variables:
   - `MONGODB_URI` — your MongoDB Atlas connection string
   - `PORT` — 5000
   - `NODE_ENV` — production
   - `FRONTEND_URL` — your Vercel URL

### Database → MongoDB Atlas

1. Create a free cluster on [MongoDB Atlas](https://cloud.mongodb.com)
2. Add your Render server IP to Network Access
3. Copy connection string to `MONGODB_URI`
4. Run seed endpoints once to populate data:
   - `GET /api/projects/seed`
   - `GET /api/blogs/seed`
   - `GET /api/skills/seed`

---

## 📧 Contact

**Aijaz Ahmed**  
📧 aijazahmed@email.com  
🌍 Air University, Islamabad, Pakistan  
💼 [LinkedIn](https://linkedin.com/in/aijazahmed) | [GitHub](https://github.com/aijazahmed)
