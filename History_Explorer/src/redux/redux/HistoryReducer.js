import { createSlice } from "@reduxjs/toolkit";

export const historyReducerSlice = createSlice({
    name: "historyReducer",
    initialState: {
          selectedPeriod:"",

    },
    reducers: {

        setSelectedPeriod: (state, action) => {
            state.selectedPeriod=action.payload;
        },

    }
});

export const {
    setSelectedPeriod,

} = historyReducerSlice.actions;
export default historyReducerSlice.reducer;