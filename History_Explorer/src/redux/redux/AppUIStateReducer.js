import { createSlice } from "@reduxjs/toolkit";

export const appUIStateSlice = createSlice({
    name: "appUIState",
    initialState: {
          loginPanel:{
              zoneLoginPanelVisible: true,
              zoneMainPanelVisible:false,
              zoneSecondPageVisible:false,
          }

    },
    reducers: {

        enableZoneMainPanel: (state, action) => {
            state.loginPanel.zoneMainPanelVisible = true;
            state.loginPanel.zoneSecondPageVisible = false;
            state.loginPanel.zoneLoginPanelVisible=false;
        },

        enableZoneSecondPage: (state, action) => {
            state.loginPanel.zoneMainPanelVisible = false;
            state.loginPanel.zoneSecondPageVisible = true;
            state.loginPanel.zoneLoginPanelVisible=false;
        },

    }
});

export const {

    enableZoneMainPanel,
    enableZoneSecondPage,

} = appUIStateSlice.actions;
export default appUIStateSlice.reducer;