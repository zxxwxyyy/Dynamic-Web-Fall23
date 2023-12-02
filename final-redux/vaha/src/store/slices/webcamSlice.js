import { createSlice } from '@reduxjs/toolkit';

export const webcamSlice = createSlice({
    name: 'webcam',
    initialState: {
      capturedImage: null,
      emotion: null,
      loadingProgress: 0,
      showProgressBar: false,
      selfieSrc: null,
      faceCoords: null,
      err: false,
    },
    reducers: {
      setCapturedImage: (state, action) => {
        state.capturedImage = action.payload;
      },
      setEmotion: (state, action) => {
        state.emotion = action.payload;
      },
      setLoadingProgress: (state, action) => {
        state.loadingProgress = action.payload;
      },
      setShowProgressBar: (state, action) => {
        state.showProgressBar = action.payload;
      },
      setSelfieSrc: (state, action) => {
        state.selfieSrc = action.payload;
      },
      setFaceCoords: (state, action) => {
        state.faceCoords = action.payload;
      },
      setError: (state, action) => {
        state.err = action.payload;
      },
    },
  });
  
  export const {
    setCapturedImage,
    setEmotion,
    setLoadingProgress,
    setShowProgressBar,
    setSelfieSrc,
    setFaceCoords,
    setError
  } = webcamSlice.actions;
  
  export default webcamSlice.reducer;