import useDataURItoBlob from "./useDataURItoBlob";
import { setCapturedImage, setShowProgressBar, setLoadingProgress, setEmotion, setFaceCoords, setError } from "../store/slices/webcamSlice";
import { setCurrentStep } from "../store/slices/stepperSlice";

const useCapture = (dispatch, webcamRef) => {
    const { dataURItoBlob } = useDataURItoBlob()
    const capture = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCapturedImage(imageSrc));
        dispatch(setShowProgressBar(true));
        dispatch(setLoadingProgress(0));
        let interval;
    
        const formData = new FormData();
        formData.append('image', dataURItoBlob(imageSrc));
    
        try {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            if (progress <= 90) {
              dispatch(setLoadingProgress(progress));
            } else {
              
              clearInterval(interval);
            }
          }, 100);
          const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            body: formData,
          });
          clearInterval(interval);
          dispatch(setLoadingProgress(100));
          dispatch(setShowProgressBar(false));
    
          const data = await response.json();
          // console.log(data.face_coords)
          if (data.emotion && data.face_coords) {
            dispatch(setEmotion(data.emotion));
            dispatch(setFaceCoords(data.face_coords));
          }
          dispatch(setCurrentStep(2)); 
          if(response.status === 500) {
            dispatch(setError(true))
          }
        } catch (error) {
          console.error('Error during image prediction:', error);
          dispatch(setShowProgressBar(false));
          clearInterval(interval);
          dispatch(setLoadingProgress(0));
        }
      };
    return { capture }
}
export default useCapture