import { setShowProgressBar } from '../store/slices/webcamSlice'

import { setStartGeneration,
         setGenerationProgress,
         setGeneratedImage } from '../store/slices/generateImgSlice'
import { setCurrentStep } from '../store/slices/stepperSlice';


const useHandleGeneration = (dispatch, emotion) => {
    const handleGeneration = async () => {
      dispatch(setGeneratedImage([]));
      dispatch(setStartGeneration(true));
      dispatch(setGenerationProgress(0));
      dispatch(setShowProgressBar(true));

      let progress = 0;
      let progressInterval = setInterval(() => {
        progress += 10;
        if (progress > 90) {
          clearInterval(progressInterval);
        } else {
          dispatch(setGenerationProgress(progress));
        }
      }, 1000);
    try {

      const response = await fetch('http://localhost:5000/generated_images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emotion: emotion }),
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      dispatch(setGeneratedImage(result.images));
      dispatch(setGenerationProgress(100));
      dispatch(setCurrentStep(3));
      dispatch(setShowProgressBar(false));

    } catch (error) {
      clearInterval(progressInterval);
      console.error('Error during image generation:', error);
      dispatch(setGenerationProgress(0));
      dispatch(setShowProgressBar(false));
    }
    };
  
    return { handleGeneration };
  };
  
  export default useHandleGeneration;