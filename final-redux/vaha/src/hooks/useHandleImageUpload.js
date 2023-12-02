import { setCapturedImage } from "../store/slices/webcamSlice";
import { setShowProgressBar, setLoadingProgress, setEmotion, setFaceCoords, setError } from "../store/slices/webcamSlice";
import { setCurrentStep } from "../store/slices/stepperSlice";
import useDataURItoBlob from "./useDataURItoBlob";

const useHandleImageUpload = (dispatch) => {
    const { dataURItoBlob } = useDataURItoBlob()
    const handleImageUpload = async (event) => {
        const file = event.target.files[0]
        if (file){
          const reader = new FileReader()
          reader.onload = async(e) => {
            const imageDataUrl = e.target.result;
            dispatch(setCapturedImage(imageDataUrl))
            dispatch(setShowProgressBar(true))
            dispatch(setLoadingProgress(0))
            let interval
    
            const formData = new FormData()
            formData.append('image', dataURItoBlob(imageDataUrl))
    
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
              dispatch(setError(true))
              console.error('Error during image prediction:', error);
              dispatch(setShowProgressBar(false));
              clearInterval(interval);
              dispatch(setLoadingProgress(0));
            }
          };
          reader.readAsDataURL(file);
        }
    };
  
    return { handleImageUpload };
  };
  
  export default useHandleImageUpload;