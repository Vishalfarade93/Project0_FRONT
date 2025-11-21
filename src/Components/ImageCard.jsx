import React, { useState } from 'react';
import '../CSS/ImageCard.css';

const ImageCard = ({ image, onSendToDisplay, onDeleteImage }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const handleSendToDisplayClick = async () => {
    setIsActionLoading(true);
    try {
      await onSendToDisplay(image.id, image.isDisplayed);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    setIsActionLoading(true);
    try {
      await onDeleteImage(image.id);
      setShowDeleteConfirm(false);
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <>
      <div className={`image-card ${image.isDisplayed ? 'active-display' : ''}`}>
        <div className="card-header">
          <span className="status-indicator">
            {image.isDisplayed 
              ? <><i className="bi bi-broadcast" style={{ color: "#4CAF50" }}></i> On Display</>
              : <><i className="bi bi-circle" style={{ color: "#666" }}></i> Ready</>}
          </span>
        </div>

        <div className="image-preview">
          <img src={image.url} alt={image.name} />
          {isActionLoading && (
            <div className="action-overlay">
              <div className="action-spinner"></div>
            </div>
          )}
        </div>

        <div className="card-content">
          <h4 className="file-title">{image.title}</h4>
          <div className="file-info">
            <span>{image.name}</span>
          </div>
        </div>

        <div className="card-actions">
          <button 
            className="btn btn-preview" 
            onClick={() => setShowPreview(true)}
            disabled={isActionLoading}
          >
            <i className="bi bi-eye"></i> Preview
          </button>

          <button 
            className={`btn ${image.isDisplayed ? 'btn-remove' : 'btn-send'}`}
            onClick={handleSendToDisplayClick}
            disabled={isActionLoading}
          >
            <i className={`bi ${image.isDisplayed ? 'bi-stop-circle' : 'bi-play-circle'}`}></i>
            {isActionLoading ? "Processing..." : (
              image.isDisplayed ? "Remove from Display" : "Send to Display"
            )}
          </button>

          <button 
            className="btn btn-delete" 
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isActionLoading || image.isDisplayed}
          >
            <i className="bi bi-trash"></i> Delete
          </button>
        </div>
      </div>

    
      {showPreview && (
        <div className="preview-modal" onClick={() => setShowPreview(false)}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <div className="preview-header">
              <h3>Preview: {image.title}</h3>
              <button className="close-btn" onClick={() => setShowPreview(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="preview-image">
              <img src={image.url} alt={image.name} />
            </div>
            <div className="preview-footer">
              <button className="btn btn-close-preview" onClick={() => setShowPreview(false)}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="preview-modal" onClick={() => setShowDeleteConfirm(false)}>
          <div className="preview-content delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="preview-header">
              <h3><i className="bi bi-exclamation-triangle" style={{ color: '#f44336' }}></i> Confirm Delete</h3>
              <button className="close-btn" onClick={() => setShowDeleteConfirm(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="delete-confirm-body">
              <p>Are you sure you want to delete <strong>"{image.title}"</strong>?</p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="delete-confirm-actions">
              <button 
                className="btn btn-cancel" 
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isActionLoading}
              >
                Cancel
              </button>
              <button 
                className="btn btn-confirm-delete" 
                onClick={handleDeleteClick}
                disabled={isActionLoading}
              >
                {isActionLoading ? (
                  <>
                    <div className="button-spinner"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-trash"></i>
                    Yes, Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCard;