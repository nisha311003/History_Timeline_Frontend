import React from 'react';
import './HeaderPanel.css';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';

const HeaderPanel = () => {
  return (
    <header className="header-panel">
      <div className="header-left">
        <MenuBookIcon className="header-icon" />
        <span className="header-title">| HistoryTimeLine Explorer</span>
      </div>
      <nav className="header-nav">
        <a href="#home" className="nav-item">HOME</a>
        <a href="#about" className="nav-item">ABOUT</a>
        <a href="#services" className="nav-item">SERVICES</a>
        <a href="#contact" className="nav-item">CONTACT US</a>
        <LogoutIcon className="logout-icon" />
      </nav>
    </header>
  );
};

export default HeaderPanel;
