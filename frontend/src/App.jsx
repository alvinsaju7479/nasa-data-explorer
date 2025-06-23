import { useState, useEffect } from 'react';
import './App.css';
import ApodViewer from './components/ApodViewer';
import DatePicker from './components/DatePicker';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [viewMode, setViewMode] = useState('single');

  // API base URL configuration
  const API_BASE_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000/api/apod' 
    : '/api/apod';

  const fetchApodData = async (date = '', startDate = '', endDate = '') => {
    setLoading(true);
    setError(null);
    
    try {
      let url = API_BASE_URL;
      const params = new URLSearchParams();
      
      if (date) {
        params.append('date', date);
      } else if (startDate && endDate) {
        params.append('start_date', startDate);
        params.append('end_date', endDate);
      }

      // Only append params if they exist
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Validate API response structure
      if (!data || (Array.isArray(data) && data.length === 0)) {
        throw new Error('No data available for the selected date range');
      }

      setApodData(data);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Failed to fetch APOD data');
      setApodData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    fetchApodData(today);
  }, []);

  const handleDateChange = (date) => {
    if (!date) {
      const today = new Date().toISOString().split('T')[0];
      fetchApodData(today);
    } else {
      fetchApodData(date);
    }
  };

  const handleDateRangeChange = (startDate, endDate) => {
    if (!startDate || !endDate) {
      const today = new Date().toISOString().split('T')[0];
      fetchApodData(today);
    } else {
      setDateRange({ startDate, endDate });
      fetchApodData('', startDate, endDate);
    }
  };

  const toggleViewMode = () => {
    const newMode = viewMode === 'single' ? 'range' : 'single';
    setViewMode(newMode);
    
    // Reset to today's image when switching modes
    if (newMode === 'single') {
      const today = new Date().toISOString().split('T')[0];
      fetchApodData(today);
    }
  };

  const handleRetry = () => {
    if (viewMode === 'single') {
      const date = dateRange.startDate || new Date().toISOString().split('T')[0];
      fetchApodData(date);
    } else {
      fetchApodData('', dateRange.startDate, dateRange.endDate);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <DatePicker 
          onDateChange={handleDateChange}
          onDateRangeChange={handleDateRangeChange}
          viewMode={viewMode}
          onToggleViewMode={toggleViewMode}
        />
        
        {loading ? (
          <LoadingSpinner message="Loading NASA's Astronomy Picture of the Day..." />
        ) : error ? (
          <div className="error-message">
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button 
              onClick={handleRetry}
              className="retry-button"
            >
              Try Again
            </button>
          </div>
        ) : (
          <ApodViewer 
            data={apodData} 
            viewMode={viewMode} 
            onError={(err) => setError(err)}
          />
        )}
      </main>
      <footer className="footer">
        <p>NASA Data Explorer - Powered by NASA's Open APIs</p>
        <p className="disclaimer">
          This product uses the NASA API but is not endorsed or certified by NASA.
        </p>
      </footer>
    </div>
  );
}

export default App;