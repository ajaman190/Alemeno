import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    xmlData: null,
    error: null,
  },
  reducers: {
    setXmlData: (state, action) => {
      state.xmlData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setXmlData, setError } = appSlice.actions;

export default appSlice.reducer;