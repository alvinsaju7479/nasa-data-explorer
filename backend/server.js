require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const NASA_API_KEY = process.env.NASA_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Proxy endpoint for APOD
app.get('/api/apod', async (req, res) => {
  try {
    const { date, start_date, end_date } = req.query;
    let url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

    if (date) {
      url += `&date=${date}`;
    } else if (start_date && end_date) {
      url += `&start_date=${start_date}&end_date=${end_date}`;
    } else {
      // Default to today's picture if no date specified
      const today = new Date().toISOString().split('T')[0];
      url += `&date=${today}`;
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APOD data:', error.message);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Failed to fetch APOD data' });
    }
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});