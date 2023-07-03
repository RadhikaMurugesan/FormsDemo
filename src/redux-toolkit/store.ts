import { configureStore } from "@reduxjs/toolkit";
import detailsReducer from "./slices/detailsSlice";

const store = configureStore({
    reducer: {
        details: detailsReducer,
    },
});

export default store;