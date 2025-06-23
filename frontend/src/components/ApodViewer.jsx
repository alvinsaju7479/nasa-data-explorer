import { useState, useEffect } from 'react';
import './ApodViewer.css';

const ApodViewer = ({ data, viewMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  if (!data) return null;

  const renderSingleApod = (apod) => (
    <div className="apod-container" key={apod.date}>
      <h2>{apod.title} - {apod.date}</h2>
      {apod.media_type === 'image' ? (
        <img 
          src={apod.url} 
          alt={apod.title} 
          className="apod-media"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder-image.jpg';
          }}
        />
      ) : (
        <iframe
          title={apod.title}
          src={apod.url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="apod-media"
        />
      )}
      <div className="apod-details">
        <p><strong>Copyright:</strong> {apod.copyright || 'Public Domain'}</p>
        <p>{apod.explanation}</p>
      </div>
    </div>
  );

  const renderRangeApod = (apods) => {
    if (!Array.isArray(apods)) return renderSingleApod(apods);
    
    const currentApod = apods[currentIndex];
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < apods.length - 1;

    return (
      <div className="apod-range-container">
        <div className="range-navigation">
          <button 
            onClick={() => setCurrentIndex(currentIndex - 1)} 
            disabled={!canGoPrev}
          >
            Previous
          </button>
          <span>
            {currentIndex + 1} of {apods.length} - {currentApod.date}
          </span>
          <button 
            onClick={() => setCurrentIndex(currentIndex + 1)} 
            disabled={!canGoNext}
          >
            Next
          </button>
        </div>
        {renderSingleApod(currentApod)}
      </div>
    );
  };

  return (
    <div className="apod-viewer">
      {viewMode === 'single' ? renderSingleApod(data) : renderRangeApod(data)}
    </div>
  );
};

export default ApodViewer;