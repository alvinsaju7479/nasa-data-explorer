import { useState } from 'react';
import './DatePicker.css';

const DatePicker = ({ onDateChange, onDateRangeChange, viewMode, onToggleViewMode }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSingleDateSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  const handleRangeSubmit = (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      onDateRangeChange(startDate, endDate);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const maxDate = today;
  const minDate = '1995-06-16'; // APOD started on June 16, 1995

  return (
    <div className="date-picker">
      <button onClick={onToggleViewMode} className="toggle-view">
        Switch to {viewMode === 'single' ? 'Date Range' : 'Single Date'} View
      </button>
      
      {viewMode === 'single' ? (
        <form onSubmit={handleSingleDateSubmit} className="date-form">
          <label htmlFor="apod-date">Select a date:</label>
          <input
            type="date"
            id="apod-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={minDate}
            max={maxDate}
          />
          <button type="submit">View APOD</button>
          <button type="button" onClick={() => {
            setSelectedDate('');
            onDateChange('');
          }}>
            View Today's APOD
          </button>
        </form>
      ) : (
        <form onSubmit={handleRangeSubmit} className="date-form">
          <div className="range-inputs">
            <div>
              <label htmlFor="start-date">Start date:</label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={minDate}
                max={maxDate}
              />
            </div>
            <div>
              <label htmlFor="end-date">End date:</label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={minDate}
                max={maxDate}
              />
            </div>
          </div>
          <button type="submit">View APOD Range</button>
          <button type="button" onClick={() => {
            setStartDate('');
            setEndDate('');
            onDateRangeChange('', '');
          }}>
            View Today's APOD
          </button>
        </form>
      )}
    </div>
  );
};

export default DatePicker;