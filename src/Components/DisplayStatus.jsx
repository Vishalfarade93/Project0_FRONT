import React from 'react';
import '../CSS/DisplayStatus.css';
import raspberryPiLogo from '../assets/rpi.svg';

const DisplayStatus = ({ status }) => {

  if (!status) {
    return (
      <div className="display-status">
        <h3>Display Status</h3>
        <div className="status-card">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const isOnline = status.online;
  const lastSeen = status.lastSeen
    ? new Date(status.lastSeen).toLocaleTimeString()
    : "Unknown";

  return (
    <div className="display-status">
      <h3>Display Status</h3>

      <div className="status-card">
        <div className="pi-info">
          <div className="pi-icon">
            <img style={{ height: '60px' }} src={raspberryPiLogo} alt="Raspberry Pi Logo" />
          </div>

          <div className="pi-details">
            <h4>{status.deviceId}</h4>
            <span className={isOnline ? "status-connected" : "status-disconnected"}>
              {isOnline ? <><i className="bi bi-wifi"></i> Online</> : <><i className="bi bi-wifi-off"></i> Offline</>}
            </span>
          </div>
        </div>

        <div className="display-stats">

          {/* CHANGED — DEPARTMENT FIELD */}
          <div className="stat">
            <span className="stat-label">Department</span>
            <span className="stat-value">{status.department || "Unknown"}</span>
          </div>

          <div className="stat">
            <span className="stat-label">Last Seen</span>
            <span className="stat-value">{lastSeen}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DisplayStatus;
