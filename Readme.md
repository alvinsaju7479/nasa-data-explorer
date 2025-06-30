NASA Data Explorer - README
A web app to explore NASA's Astronomy Picture of the Day (APOD) using date or date range.
Built with React (Vite) frontend and Express.js backend, and integrates with NASA’s public API.

Live URLs
- Frontend: https://nasa-data-explorer-rz6a.vercel.app/
- Backend: https://nasabackend1.onrender.com/api/apod

Features
- View today’s or specific APOD by date
- Date range support for batch viewing
- Toggle single/date range views
- Error handling + retry
- Loading spinner

Tech Stack
- Frontend: React, Vite, CSS
- Backend: Node.js, Express, Axios
- API: NASA APOD API
- Hosting: Vercel (Frontend), Render (Backend)

Project Structure
nasa-data-explorer/
├── backend/       # Express server (server.js)
├── frontend/      # React frontend
│   ├── src/
│   │   └── App.js, components/
│   └── .env       # VITE_API_BASE_URL

Local Setup
1. Clone & Install
git clone https://github.com/alvinsaju7479/nasa-data-explorer.git
cd nasa-data-explorer
2. Backend
cd backend
npm install
echo "NASA_API_KEY=your_key_here" > .env
npm start
Runs at http://localhost:5000/api/apod
3. Frontend
cd ../frontend
npm install
echo "VITE_API_BASE_URL=http://localhost:5000" > .env
npm run dev

Deployment Steps
Backend (Render)
- Import GitHub repo
- Set build: npm install, start: node server.js
- Add env: NASA_API_KEY=your_key
Frontend (Vercel)
- Import frontend repo

- Vercel autodeploys and hosts frontend
API Endpoint
GET /api/apod
- ?date=YYYY-MM-DD
- ?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
Returns JSON with APOD image(s) and metadata.


