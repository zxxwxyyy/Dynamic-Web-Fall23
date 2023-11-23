import { createContext, useState, useRef } from "react";

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
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState(null);

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
  const handleGeneration = async () => {
    // console.log('Generation started');
    setGeneratedImage([]);
    setStartGeneration(true);
    setGenerationProgress(0); 
    setShowProgressBar(true); 
    // console.log('Show progress bar should be true');
    
    let progressInterval = setInterval(() => {
        setGenerationProgress(prevProgress => {
        const nextProgress = prevProgress < 90 ? prevProgress + 10 : prevProgress;
        return nextProgress;
      });
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
      // console.log('result images:', result.images);
      setGeneratedImage(result.images);
      // console.log('Generated image after set', generatedImage)
      setGenerationProgress(100); 
      setCurrentStep(3); 
      setShowProgressBar(false); 

    } catch (error) {
      clearInterval(progressInterval);
      console.error('Error during image generation:', error);
      setGenerationProgress(0); 
      setShowProgressBar(false); 
    }
};

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
    // capture,
    handleRetake,
    handleGeneration,
    handleCapture,
    generatedImage,
    generationProgress
}
  return <cameraContext.Provider value={valueToShare}>{children}</cameraContext.Provider>
}

export {CamProvider}
export default cameraContext
