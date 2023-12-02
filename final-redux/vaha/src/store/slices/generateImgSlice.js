import { createSlice } from '@reduxjs/toolkit';

export const generateSlice = createSlice({
    name: 'generateImage',
    initialState: {
      startGeneration: false,
      generationProgress: 0,
      generatedImage: [],

    },
    reducers: {
      setStartGeneration: (state, action) => {
        state.startGeneration = action.payload
      },
      setGenerationProgress:(state, action) => {
        state.generationProgress = action.payload
      },
      setGeneratedImage: (state, action) => {
        state.generatedImage = action.payload
      },
    },
  });
  
  export const {
    setStartGeneration,
    setGenerationProgress,
    setGeneratedImage,
  } = generateSlice.actions;
  
  export default generateSlice.reducer;