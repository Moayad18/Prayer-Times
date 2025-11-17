import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const prayerTimeApi = createAsyncThunk(
  "prayetTime/ApiFetch",
  async (selectedCity) => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.apiName}`
    );
    return response.data.data.timings;
  }
);
export const TimeReducer = createSlice({
  name: "prayerTime",
  initialState: {
    timings: {},
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(prayerTimeApi.fulfilled, (state, action) => {
      state.timings = action.payload;
    });
  },
});

export default TimeReducer.reducer;
