import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  API_CALLED: false,
  isCalled: 0
};

export const ApiLoading = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    ApiCalled: (state) => {
      state.API_CALLED = true
      state.isCalled = Math.random() * 100000
    },
    ApiCalledEnd: (state) => {
      state.API_CALLED = true
    }


  },
});

// Action creators are generated for each case reducer function
export const { ApiCalled, ApiCalledEnd } = ApiLoading.actions;

export default ApiLoading.reducer;
