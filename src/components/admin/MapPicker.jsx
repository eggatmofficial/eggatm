import { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapStyles = `
  .map-container {
    position: relative;
    width: 100%;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .map-instructions {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(4px);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .instructions-text {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }
  
  .map-controls {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .control-button {
    width: 2.5rem;
    height: 2.5rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .control-button:hover {
    background-color: #f3f4f6;
    transform: scale(1.05);
  }
  
  .control-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #374151;
  }
  
  .loading-state {
    background-color: #f9fafb;
    border-radius: 0.5rem;
    padding: 3rem;
    text-align: center;
  }
  
  .loading-spinner {
    width: 4rem;
    height: 4rem;
    border: 4px solid #dbeafe;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }
  
  .loading-text {
    font-weight: 500;
    color: #4b5563;
    margin-bottom: 0.25rem;
  }
  
  .loading-subtext {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .error-state {
    background-color: #fef2f2;
    border: 1px solid #fee2e2;
    border-radius: 0.5rem;
    padding: 2rem;
    text-align: center;
  }
  
  .error-icon {
    width: 3rem;
    height: 3rem;
    color: #ef4444;
    margin: 0 auto 1rem;
  }
  
  .error-title {
    font-weight: 500;
    color: #991b1b;
    margin-bottom: 0.25rem;
  }
  
  .error-message {
    font-size: 0.875rem;
    color: #b91c1c;
  }
  
  .map-wrapper {
    width: 100%;
    height: 300px;
    border-radius: 0.5rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const mapContainerStyle = {
  height: "300px",
  width: "100%",
};

const defaultCenter = {
  lat: 11,
  lng: 78,
};

export default function MapPicker({ lat, lng, onChange }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
    libraries: ["places"],
  });
  
  const [map, setMap] = useState(null);

  const handleMapClick = (e) => {
    onChange({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  if (loadError) {
    return (
      <>
        <style>{mapStyles}</style>
        <div className="error-state">
          <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="error-title">Failed to load Google Maps</h3>
          <p className="error-message">Please check your API key configuration</p>
        </div>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <style>{mapStyles}</style>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading map...</p>
          <p className="loading-subtext">Please wait while we load the map</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{mapStyles}</style>
      <div className="map-container">
        <div className="map-instructions">
          <p className="instructions-text">Click anywhere to set location</p>
        </div>
        
        <div className="map-wrapper">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={{ lat, lng }}
            onClick={handleMapClick}
            onLoad={map => setMap(map)}
            options={{
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }]
                }
              ],
              disableDefaultUI: false,
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: false,
              fullscreenControl: true,
            }}
          >
            <Marker
              position={{ lat, lng }}
              animation={window.google.maps.Animation.DROP}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#3B82F6",
                fillOpacity: 1,
                strokeColor: "#FFFFFF",
                strokeWeight: 2,
              }}
            />
          </GoogleMap>
        </div>
        
        <div className="map-controls">
          <button
            onClick={() => {
              map?.setZoom(map.getZoom() + 1);
            }}
            className="control-button"
            title="Zoom in"
          >
            <svg className="control-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button
            onClick={() => {
              map?.setZoom(map.getZoom() - 1);
            }}
            className="control-button"
            title="Zoom out"
          >
            <svg className="control-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}