// src/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
<<<<<<< HEAD
  const response = await axios.get(https://api.bucollections.com/test');
=======
  const response = await axios.get('https://api.bucollections.com/test');
>>>>>>> f8993fcea858e9c75aea3e40f1c8bb302d5ad547
  return response.data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
