import {configureStore} from "@reduxjs/toolkit";
import appUIStateReducer from "./AppUIStateReducer";
import historyReducer from "./HistoryReducer";
export const appStore = configureStore({
    reducer: {
        appUIState: appUIStateReducer,
        historyReducer: historyReducer
    }

})
