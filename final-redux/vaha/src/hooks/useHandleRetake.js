import { setStartGeneration } from '../store/slices/generateImgSlice';
import { setCurrentStep } from '../store/slices/stepperSlice';
import {  setCapturedImage,
          setEmotion,
          setLoadingProgress,
          setShowProgressBar,
          setFaceCoords,
          setError } from '../store/slices/webcamSlice'

const useHandleRetake = (dispatch) => {
    const handleRetake = () => {
      console.log('handleRetake called');
      dispatch(setCapturedImage(null));
      dispatch(setEmotion(''));
      dispatch(setLoadingProgress(0));
      dispatch(setShowProgressBar(false));
      dispatch(setCurrentStep(1));
      dispatch(setStartGeneration(false));
      dispatch(setError(false));
      dispatch(setFaceCoords(null))
    };
  
    return { handleRetake };
  };
  
  export default useHandleRetake;