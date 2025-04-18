import React from 'react';
import { useSelector } from 'react-redux';
import MainPanel from '../MainPanel/MainPanel';
import SecondPage from '../MainPanel/SecondPage';
import LoginForm from '../Login/LoginForm';
function HistoryPage() {
    const uiState= useSelector(state=>state.appUIState.loginPanel);
  return (
    <div>
        {uiState.zoneLoginPanelVisible===true&&<LoginForm/>}
        {uiState.zoneMainPanelVisible===true&&<MainPanel/>}
        {uiState.zoneSecondPageVisible===true && <SecondPage />}
    </div>
  );
}

export default HistoryPage;
