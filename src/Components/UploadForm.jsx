import React, { useRef, useState } from "react";
import "../CSS/UploadForm.css";

const UploadForm = ({ onMediaUpload }) => {
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleUploadClick = () => {
    if (!title.trim()) {
      alert("Please enter a title before uploading.");
      return;
    }

    if (selectedFiles.length === 0) {
      alert("Please select at least one image or video.");
      return;
    }

    selectedFiles.forEach((file) => {
      onMediaUpload(file, title);
    });

    // Reset form
    setTitle("");
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-form">
      <h3>Upload Media</h3>

      <input
        type="text"
        className="title-input"
        placeholder="Enter title (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div className="upload-area" onClick={handleUploadAreaClick}>
        <div className="upload-icon">
          <i className="bi bi-upload"></i>
        </div>
        <p>Click to select images or videos</p>
        <small>JPG, JPEG, MP4, WEBM, MKV supported</small>

        {selectedFiles.length > 0 && (
          <div className="selected-files">
            <small>{selectedFiles.length} file(s) selected</small>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/jpeg, image/jpg, video/mp4, video/webm, video/mkv"
        multiple
        style={{ display: "none" }}
      />

      <button
        className="upload-button"
        onClick={handleUploadClick}
        disabled={!title.trim() || selectedFiles.length === 0}
      >
        Upload Media
      </button>
    </div>
  );
};

export default UploadForm;
