
import React, { useRef, useState, useEffect } from 'react';
import Webcam from "react-webcam";
import styles from './vaha.module.css';
import GenerateImageComponent from './GenerateImage';

export default function WebcamCapture(props) {
  // Using useRef to create a reference to Webcam  
  const webcamRef = useRef(null);
  // Using useState to control
  const [capturedImage, setCapturedImage] = useState(null);
  const [emotion, setEmotion] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false)
  const {currentStep, setCurrentStep, startGeneration,setStartGeneration, onCapture} = props
  // Set emotion labels for faking the predict emotion effect
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
    // inform the parent component about the captured image
    onCapture && onCapture(imageSrc, randomEmotion); 
    // move the stepper to next step
    // setCurrentStep(2);
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

  // useEffect hook to manage the progress bar and the completion of the progress.
  useEffect(() => {
    let interval

    if (showProgressBar && loadingProgress < 100) {
        interval = setInterval(() => {
          setLoadingProgress(prevProgress => prevProgress + 20); // Increments by 20 every 1s for 5s total
        }, 800); 
      } 
     // When progress reaches 100, hide the progress bar and move to the next step.
    if (loadingProgress >= 100) {
        setShowProgressBar(false);
        setCurrentStep(2);
      }
  
      return () => {
        clearInterval(interval);
      };
    }, [loadingProgress, showProgressBar]);

    
    return (
      <div className={styles.captureContainer}>
        {/* If startGeneration prop is true, render GenerateImageComponent */}
        {startGeneration ? (
          <GenerateImageComponent 
            capturedImage={capturedImage} 
            emotion={emotion} 
            setCurrentStep={setCurrentStep} 
            handleRetake={handleRetake}
            handleGeneration = {handleGeneration}
          />
        ) : (
          // If capturedImage exists, display the image related content, otherwise show the webcam feed
          capturedImage ? (
            <>
              <img 
                src={capturedImage} 
                alt="Captured"
                className={showProgressBar ? styles.blurredSelfie : styles.selfie}
                width={837}
                height={479}
              />
              {/* Shows a progress bar that fills up over time */}
              {showProgressBar && (
                <div className={styles.progressBar} style={{width: `${loadingProgress}%`}}></div>
              )}
              {/* A placeholder element for the detected face rectangle later on */}
              <div className={styles.faceRectangle}></div>
              {/* Displays predicted emotion and retake/generate control once loading completes */}   
              {loadingProgress >= 100 && (
                <>
                {/* Displays the randomly selected emotion for the captured face */}
                  <div className={styles.emotionLabel}>
                    Predicted Emotion: {emotion}
                  </div>
                  <div className={styles.buttonContainer}> 
                    <button className={styles.Button} onClick={handleRetake}>
                      <div className={styles.buttonContent}>
                        <span className={`material-symbols-outlined ${styles.buttonIcon}`}>
                          cameraswitch
                        </span>
                        <span className={styles.buttonText}>
                          Retake Photo
                        </span>
                      </div>
                    </button>
    
                    <button className={styles.Button} onClick={handleGeneration}>
                      <div className={styles.buttonContent}>
                        <span className={`material-symbols-outlined ${styles.buttonIcon}`}>
                          draw
                        </span>
                        <span className={styles.buttonText}>
                          Generate
                        </span>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            // If no image has been captured, show the webcam feed.
            <div className={styles.webcamContainer}> 
              <Webcam
                audio={false}
                height={479}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={837}
              />
              <div className={styles.buttonContainer}>
                <button className={styles.Button} onClick={capture}>
                  <div className={styles.buttonContent}>
                    <span className={`material-symbols-outlined ${styles.buttonIcon}`}>
                      photo_camera
                    </span>
                    <span className={styles.buttonText}>
                      Take Photo
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    )
}