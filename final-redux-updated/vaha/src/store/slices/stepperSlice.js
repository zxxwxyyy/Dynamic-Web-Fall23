import { createSlice } from '@reduxjs/toolkit';

export const stepperSlice = createSlice({
    name: 'stepper',
    initialState: {
      currentStep: 1,
    },
    reducers: {
      setCurrentStep: (state, action) => {
        state.currentStep = action.payload;
      },
    },
})

export const {
    setCurrentStep
  } = stepperSlice.actions;

export default stepperSlice.reducer;