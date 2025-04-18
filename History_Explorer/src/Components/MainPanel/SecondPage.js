import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import ReplyIcon from "@mui/icons-material/Reply";
import { Button } from '@mui/material';
import MughalEmpire from './MughalEmpire';
import MughalEmpire_MCQ from './MughalEmpire_MCQ';
import "./MainPanel.css";
import { useDispatch } from "react-redux";
import { enableZoneMainPanel, enableZoneSecondPage} from "../../redux/redux/AppUIStateReducer";
import Translate from './Translate';

const SecondPage = () => {
  const [showMughalEmpire, setShowMughalEmpire] = useState(true);
  const [showMcq, setShowMcq] = useState(true);
  const dispatch = useDispatch();
  const [currentSection, setCurrentSection] = useState("secondPage");

  const handleTestYourSelf = () => {
    setShowMughalEmpire(false);
    setShowMcq(true);
    setCurrentSection("mcq");
  };

  const handleGame = () => {
    setShowMughalEmpire(false);
    setShowMcq(false);
    setCurrentSection("translate");
  };

  const handleBackToMain = () => {
    if (currentSection === "secondPage") {
      dispatch(enableZoneMainPanel());
    } else {
      dispatch(enableZoneSecondPage());
      setShowMughalEmpire(true); // 👈 reset to main content of second page
      setShowMcq(true);
      setCurrentSection("secondPage");
    }
  };

  return (
    <div className='secondpage'>
      <React.Fragment>
        <CssBaseline />
        <Box
          sx={{
            bgcolor: 'white',
            height: '100vh',
            width: '70%',
            opacity: 0.8,
            overflow: 'auto',
            margin: '0 auto',
            paddingTop: '10px'
          }}
        >
          <Button variant="text" color="secondary" startIcon={<ReplyIcon />} onClick={handleBackToMain}>
            Back to Section
          </Button>

          {showMughalEmpire ? (
            <div>
              <MughalEmpire />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '8vw auto' }}>
                <Button variant="contained" color="primary" onClick={handleTestYourSelf}>Test Yourself</Button>
                <Button variant="contained" color="primary" style={{ marginLeft: "20px" }} onClick={handleGame}>Have some fun!</Button>
              </div>
            </div>
          ) : (
            showMcq ? (
              <MughalEmpire_MCQ />
            ) : (
              <Translate />
            )
          )}
        </Box>
      </React.Fragment>
    </div>
  );
};

export default SecondPage;
