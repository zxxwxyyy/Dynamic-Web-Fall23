import { createContext, useState, useRef } from "react";
import Webcam from "react-webcam";

const cameraContext = createContext()

function CamProvider({children, currentStep, setCurrentStep}){
  const webcamRef = useRef(null);
  // Using useState to control
  const [capturedImage, setCapturedImage] = useState(null);
  const [emotion, setEmotion] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false)
  const [selfieSrc, setSelfieSrc] = useState(null);
  const [startGeneration, setStartGeneration] = useState(false);
  const emotionsArray = ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];


  const capture = () => {
    // Capture webcam
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    // faking predict by randomly select one labels
    const randomEmotion = emotionsArray[Math.floor(Math.random() * emotionsArray.length)];
    setEmotion(randomEmotion);
    // reset and show the progress bar
    setLoadingProgress(0);
    setShowProgressBar(true);
    
  }

  // if user click on retake
  const handleRetake = () => {
    setCapturedImage(null);
    setEmotion("");
    setLoadingProgress(0);
    setShowProgressBar(false);
    setCurrentStep(1)
    setStartGeneration(false)
  };


  // control generation button
  const handleGeneration =()=>{
    setStartGeneration(prevState => !prevState);
    if(currentStep === 3){
      setCurrentStep(2)
    }
  }

  const handleCapture = (imageSrc, emotion) => {
    setSelfieSrc(imageSrc);
  };

  const valueToShare = {
    capturedImage, setCapturedImage,
    emotion, setEmotion,
    loadingProgress, setLoadingProgress,
    showProgressBar, setShowProgressBar,
    selfieSrc, setSelfieSrc,
    startGeneration, setStartGeneration,
    webcamRef,
    currentStep, setCurrentStep,
    capture,
    handleRetake,
    handleGeneration,
    handleCapture,
}
  return <cameraContext.Provider value={valueToShare}>{children}</cameraContext.Provider>
}

export {CamProvider}
export default cameraContext
