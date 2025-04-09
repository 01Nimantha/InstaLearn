import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotices = createAsyncThunk(
  'notices/fetchNotices',
  async () => {
    const response = await axios.get('http://localhost:8085/api/v1/notice/get-all-notices');
    return response.data;
  }
);

const noticeSlice = createSlice({
  name: "notice",
  initialState: {
    notices: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notices = action.payload;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default noticeSlice.reducer; 