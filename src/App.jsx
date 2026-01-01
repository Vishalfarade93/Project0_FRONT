import React, { useEffect, useState } from 'react';
import './App.css';
import UploadForm from './Components/UploadForm';
import ImageLibrary from './Components/ImageLibrary';
import DisplayStatus from './Components/DisplayStatus';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from './assets/logo.png';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // NEW → Pi status
  const [piStatus, setPiStatus] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const fetchContent = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/content/all`);

      const backendImages = res.data.map(item => ({
        id: item.id,
        name: item.fileName,
        title: item.title || "Untitled",
        url: item.filePath,
        isDisplayed: item.displayed,
        processing: item.filePath === "uploading",
        mediaType: item.mediaType
      }));

      backendImages.reverse();
      setImages(backendImages);
    } catch (error) {
      console.error("Error fetching content:", error);
      showNotification('Error loading images', 'error');
    }
  };


  const fetchPiStatus = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/pi/status`);
      setPiStatus(res.data);
    } catch (error) {
      console.error("Error fetching Pi status");
    }
  };

  useEffect(() => {
    fetchContent();
    fetchPiStatus();
    const interval = setInterval(fetchPiStatus, 60000); 
    return () => clearInterval(interval);
  }, []);

  const handleUpload = async (file, title) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/content/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      showNotification('Upload started...', 'info');
      setTimeout(fetchContent, 2000);

    } catch (error) {
      showNotification('Error uploading image', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSendToDisplay = async (imageId, currentlyDisplayed) => {
    try {
      if (!currentlyDisplayed) {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/content/display/${imageId}`);
        showNotification('Image sent to display!', 'success');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/content/remove/${imageId}`);
        showNotification('Image removed from display!', 'info');
      }
      fetchContent();
    } catch (error) {
      showNotification('Error updating display', 'error');
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/content/delete/${imageId}`);
      showNotification('Image deleted!', 'success');
      fetchContent();
    } catch (error) {
      showNotification('Error deleting image', 'error');
    }
  };

  return (
    <div className="App">

      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <header className="app-header">
        <div className="header-content">
          <img src={logo} alt="logo" />
          
        </div>
        <div className="iot-badge">
          <i className="bi bi-wifi"></i><span>IoT Connected</span>
        </div>
      </header>

      <div className="app-container">
        <div className="sidebar">
          <UploadForm onMediaUpload={handleUpload} />
          <DisplayStatus status={piStatus} />
        </div>

        <div className="main-content">
          {uploading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Uploading...</p>
            </div>
          ) : (
            <ImageLibrary
              images={images}
              onSendToDisplay={handleSendToDisplay}
              onDeleteImage={handleDeleteImage}
            />
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
