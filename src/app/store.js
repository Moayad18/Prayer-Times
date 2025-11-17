import { configureStore } from "@reduxjs/toolkit";
import TimeReducer from "../sliceReducer/TimePrayReducer";
const store = configureStore({
  reducer: {
    prayerTime: TimeReducer,
  },
});

export default store;
