import React, { useEffect, useState } from 'react';
import './App.css';
import UploadForm from './Components/UploadForm';
import ImageLibrary from './Components/ImageLibrary';
import DisplayStatus from './Components/DisplayStatus';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);
  const [piInfo, setPiInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const BASE_IMAGE_URL = "http://localhost:8989/images/";

  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };
  const fetchPiInfo=async()=>{
    const result=await axios.get("http://localhost:8989/")
  }
  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8989/api/content/all");
      const backendImages = res.data.map(item => ({
        id: item.id,
        name: item.fileName,
        title: item.title || "Untitled",
        url: BASE_IMAGE_URL + item.fileName,
        isDisplayed: item.displayed
      }));

      backendImages.reverse();
      setImages(backendImages);

    } catch (error) {
      console.error("Error fetching content:", error);
      showNotification('Error loading images', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleImageUpload = async (file, title) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);

      await axios.post(
        "http://localhost:8989/api/content/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      showNotification('Image uploaded successfully!', 'success');
      fetchContent();

    } catch (error) {
      console.error("Error uploading:", error);
      showNotification('Error uploading image', 'error');
    }
  };

  const handleSendToDisplay = async (imageId, currentlyDisplayed) => {
    try {
      if (!currentlyDisplayed) {
        await axios.post(`http://localhost:8989/api/content/display/${imageId}`);
        showNotification('Image sent to display!', 'success');
      } else {
        await axios.post(`http://localhost:8989/api/content/remove/${imageId}`);
        showNotification('Image removed from display!', 'info');
      }

      fetchContent();

    } catch (error) {
      console.error("Error toggling display:", error);
      showNotification('Error updating display', 'error');
    }
  };

  const handleDeleteImage = async (imageId) => {
  try {
      await axios.delete(`http://localhost:8989/api/content/delete/${imageId}`);
      showNotification('Image deleted successfully!', 'success');
      fetchContent();

    } catch (error) {
      console.error("Error deleting:", error);
      showNotification('Error deleting image', 'error');
    }
  };

  return (
    <div className="App">
      {/* Notification System */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          <i className={`bi ${
            notification.type === 'success' ? 'bi-check-circle-fill' :
            notification.type === 'error' ? 'bi-exclamation-circle-fill' :
            'bi-info-circle-fill'
          }`}></i>
          {notification.message}
        </div>
      )}
      <header className="app-header">
        <div className="header-content">
          <h1>C</h1>
          <p>I</p>
        </div>
        <div className="iot-badge">
          <i className="bi bi-wifi"></i>
          <span>IoT Connected</span>
        </div>
      </header>

      <div className="app-container">
        <div className="sidebar">
          <UploadForm onImageUpload={handleImageUpload} />
          <DisplayStatus />
        </div>

        <div className="main-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading images</p>
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