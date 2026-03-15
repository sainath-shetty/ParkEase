import React from 'react';

const UploadCard = ({ imagePreview, onFileChange, onScan, hasImage }) => (
    <div className="abs-card upload-card">
        <div className="abs-card-header">
            <h2>Number Plate Scanner</h2>
            <p>Upload a clear image of the vehicle's number plate to generate a parking bill</p>
        </div>
        <div className="upload-zone" onClick={() => document.getElementById('fileInput').click()}>
            {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
            ) : (
                <>
                    <div className="upload-icon">&#128247;</div>
                    <p className="upload-text">Click to upload number plate image</p>
                    <p className="upload-hint">Supports JPG, PNG, JPEG</p>
                </>
            )}
        </div>
        <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onFileChange}
        />
        <button
            className="abs-btn abs-btn-primary"
            onClick={onScan}
            disabled={!hasImage}
        >
            Scan &amp; Generate Bill
        </button>
    </div>
);

export default UploadCard;
