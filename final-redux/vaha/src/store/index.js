import { configureStore } from '@reduxjs/toolkit';
import webcamReducer from './slices/webcamSlice';
import generateReducer from './slices/generateImgSlice'
import stepperReducer from './slices/stepperSlice'

export const store = configureStore({
  reducer: {
    webcam: webcamReducer,
    generateImage: generateReducer,
    stepper: stepperReducer,
  },
});