import React from 'react';
import '../CSS/DisplayStatus.css';
import raspberryPiLogo from '../assets/rpi.svg';

const DisplayStatus = () => {
  return (
    <div className="display-status">
      <h3>Display Status</h3>
      <div className="status-card">
        <div className="pi-info">
          <div className="pi-icon">
            <img style={{height:'60px'}} src={raspberryPiLogo} alt="Raspberry Pi Logo" />
          </div>
          <div className="pi-details">
            <h4>Raspberry Pi Display</h4>
            <span className="status-connected">🟢 Connected</span>
          </div>
        </div>
        
        {/* <div className="current-display">
          <h5>Currently Displaying:</h5>
          {currentDisplay ? (
            <div className="active-display-info">
              <div className="display-preview">
                <img src={currentDisplay.url} alt={currentDisplay.name} />
              </div>
              <div className="display-details">
                <strong>{currentDisplay.name}</strong>
                <span>Since: {currentDisplay.uploadedAt}</span>
              </div>
            </div>
          ) : (
            <div className="no-display">
              <div className="no-display-icon">📺</div>
              <p>No image currently on display</p>
            </div>
          )}
        </div> */}
        
        <div className="display-stats">
          <div className="stat">
            <span className="stat-label">Uptime</span>
            <span className="stat-value">24/7</span>
          </div>
          <div className="stat">
            <span className="stat-label">Last Update</span>
            <span className="stat-value">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayStatus;