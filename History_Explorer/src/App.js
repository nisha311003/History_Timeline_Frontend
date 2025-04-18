import React, { useState, useEffect } from 'react';
import LoginForm from './Components/Login/LoginForm';
import HistoryPage from './Components/HistoryPage/HistoryPage (1)';

import Gupta_Image from './Components/Assests/Gupta_Empire_Image2.jpg';
import Mauryan_Image from './Components/Assests/Mauryan_Dynasty_Image1.jpg';
import Indus_Image from './Components/Assests/Indus_Valley_Civilisation_Image1.webp';
import Indian_Image from './Components/Assests/Indian_Independance_Image1.webp';

import './App.css';

const backgroundImages = [
  Gupta_Image,
  Mauryan_Image,
  Indus_Image,
  Indian_Image,
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log('User logged in');
  };

  // Background image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000); // change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div
          className="app-container"
          style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}
        >
          <div className="horizontal-divider"></div>
          <div className="main-container">
            <HistoryPage />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
