import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    details: null,
};

const detailsSlice = createSlice({
    name: "details",
    initialState,
    reducers: {
        storeDetails: (state, action) => {
            state.details = action.payload;
        },
    },
});

export const { storeDetails } = detailsSlice.actions;

export default detailsSlice.reducer;