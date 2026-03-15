import React from 'react';

const Header = () => (
    <header className="abs-header">
        <div className="abs-header-inner">
            <div className="abs-logo">
                <span className="abs-logo-icon">P</span>
                <div>
                    <h1 className="abs-title">ParkEase</h1>
                    <p className="abs-subtitle">Automated Billing System</p>
                </div>
            </div>
            <div className="abs-badge">
                <span className="badge-dot"></span>
                System Online
            </div>
        </div>
    </header>
);

export default Header;
