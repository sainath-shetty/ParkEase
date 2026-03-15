import React from 'react';

const StatusCard = ({ icon, title, message, buttonLabel, onAction }) => (
    <div className="no-record">
        <div className="no-record-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{message}</p>
        <button className="abs-btn abs-btn-secondary" onClick={onAction}>
            {buttonLabel}
        </button>
    </div>
);

export default StatusCard;
