import React from 'react';
import ImageCard from './ImageCard';
import '../CSS/ImageLibrary.css';

const ImageLibrary = ({ images, onSendToDisplay, onDeleteImage }) => {
  return (
    <div className="image-library">
      <div className="library-header">
        <h2>Content Library</h2>
        <span className="image-count"><i className="bi bi-images"></i> {images.length} </span>
      </div>

      {images.length === 0 ? (
        <div className="empty-library">
          <div className="empty-icon"><i className="bi bi-image"></i></div>
          <h3>No images uploaded yet</h3>
          <p>Upload images to get started</p>
        </div>
      ) : (
        <div className="image-grid">
          {images.map(image => (
            <ImageCard
              key={image.id}
              image={image}
              onSendToDisplay={onSendToDisplay}
              onDeleteImage={onDeleteImage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageLibrary;
