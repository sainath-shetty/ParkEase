import React from 'react';

const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
};

const ParkingTicket = ({ numplate, entryTime, exitTime, duration, charge, scanStatus, errorMessage, onReset }) => {

    // Backend unreachable or server error
    if (scanStatus === 'error') {
        return (
            <div className="no-record">
                <div className="no-record-icon">&#10060;</div>
                <h3>Connection Error</h3>
                <p>{errorMessage}</p>
                <button className="abs-btn abs-btn-secondary" onClick={onReset}>Try Again</button>
            </div>
        );
    }

    // First scan — vehicle entry registered
    if (scanStatus === 'entry_registered') {
        return (
            <div className="no-record">
                <div className="no-record-icon">&#9989;</div>
                <h3>Entry Registered</h3>
                <p>Vehicle <strong>{numplate}</strong> has been checked in. Scan the same plate again on exit to generate the bill.</p>
                <button className="abs-btn abs-btn-secondary" onClick={onReset}>Scan Another Vehicle</button>
            </div>
        );
    }

    // Exit scan — generate bill
    return (
        <>
            <div className="ticket-header">
                <div className="ticket-logo-box">P</div>
                <div>
                    <h2 className="ticket-title">PARKING RECEIPT</h2>
                    <p className="ticket-sub">ParkEase Automated Billing System</p>
                </div>
                <div className="ticket-stamp">PAID</div>
            </div>

            <div className="ticket-divider"></div>

            <div className="ticket-body">
                <div className="ticket-row highlight">
                    <span className="ticket-label">Vehicle Number</span>
                    <span className="ticket-value plate">{numplate}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Entry Time</span>
                    <span className="ticket-value">{formatDate(entryTime)}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Exit Time</span>
                    <span className="ticket-value">{formatDate(exitTime)}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Duration (minutes)</span>
                    <span className="ticket-value">{duration} min</span>
                </div>
            </div>

            <div className="ticket-divider"></div>

            <div className="rate-table">
                <div className="rate-row">
                    <span>First Hour</span>
                    <span>&#8377;10 flat</span>
                </div>
                <div className="rate-row">
                    <span>After 1 Hour</span>
                    <span>&#8377;20 / hour</span>
                </div>
            </div>

            <div className="ticket-total">
                <span>Total Amount</span>
                <span className="total-amount">&#8377;{parseFloat(charge).toFixed(2)}</span>
            </div>

            <div className="ticket-actions">
                <button className="abs-btn abs-btn-primary" onClick={() => window.print()}>
                    Print Receipt
                </button>
                <button className="abs-btn abs-btn-secondary" onClick={onReset}>
                    Scan Another Vehicle
                </button>
            </div>
        </>
    );
};

export default ParkingTicket;

