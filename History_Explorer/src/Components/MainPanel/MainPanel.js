import React, { useState } from "react";
import "./MainPanel.css";
import { useDispatch } from "react-redux";
import { enableZoneSecondPage } from "../../redux/redux/AppUIStateReducer";
import { setSelectedPeriod } from "../../redux/redux/HistoryReducer";
import HeaderPanel from "../HeaderPanel/HeaderPanel";

const historyPeriods = [
  { name: "Indus Valley Civilisation", color: "#FFD700" },
  { name: "Vedic Period", color: "#FFA500" },
  { name: "Gupta Empire", color: "#FF4500" },
  { name: "Mauryan Dynasty", color: "#DC143C" },
  { name: "Medieval Period", color: "#8A2BE2" },
  { name: "Chola Dynasty", color: "#1E90FF" },
  { name: "Mughal Empire", color: "#32CD32", link: "/secondpage" },
  { name: "Colonial Era", color: "#FF1493 " },
  { name: "Indian Independence", color: "#00CED1" },
  { name: "Post Independent India", color: "#FF6347" },
  { name: "Harappan Civilisation", color: "#8A2BE2" }
];

function MainPanel() {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleClick = (period) => {
    dispatch(setSelectedPeriod(period.name)); // <-- set the selected period (just for future reference) 
    if (period.link) {
      dispatch(enableZoneSecondPage()); // <-- go to second page if there's a link
    }
  };

  return (
    <>
    <HeaderPanel/>
    <div className="mainpanel">
      
      {/* Period Button (Center) */}
      <div 
        className={`menuToggle ${isActive ? "active" : ""}`} 
        onClick={toggleMenu}
      >
        Period
      </div>

      {/* Circular Menu */}
      <ul 
        className={`menu ${isActive ? "active" : ""}`} 
        style={{ "--count": historyPeriods.length }}
      >
        {historyPeriods.map((period, index) => (
          <li key={index} style={{ "--i": index, "--clr": period.color }}>
            {period.link ? (
              <a href="#" onClick={() => handleClick(period)}>
              {period.name}
            </a>
            ) : (
              <a href="#">{period.name}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default MainPanel;
