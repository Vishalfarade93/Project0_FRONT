import React, { useRef, useState } from 'react';
import "../CSS/UploadForm.css";

const UploadForm = ({ onImageUpload }) => {
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);

    if (!title.trim()) {
      alert("Please enter a title before uploading.");
      return;
    }

    files.forEach(file => {
      if (file.type.startsWith("image/")) {
        onImageUpload(file, title);
      }
    });

    setTitle(""); 
    event.target.value = "";
  };

  return (
    <div className="upload-form">
      <h3>Upload Images</h3>

      <input
        type="text"
        className="title-input"
        placeholder="Enter title to display (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div 
        className="upload-area"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-icon"><i className="bi bi-upload"></i></div>
        <p>Click to select image</p>
        <small>JPG, PNG supported</small>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: "none" }}
      />

    </div>
  );
};
export default UploadForm;
