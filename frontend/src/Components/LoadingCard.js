import React from 'react';

const LoadingCard = ({ progress }) => (
    <div className="abs-card loading-card">
        <div className="loading-spinner"></div>
        <h3 className="loading-title">Scanning Number Plate...</h3>
        <p className="loading-sub">Please wait while we process the image</p>
        <div className="progress-container">
            <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-label">{progress}%</span>
        </div>
    </div>
);

export default LoadingCard;
