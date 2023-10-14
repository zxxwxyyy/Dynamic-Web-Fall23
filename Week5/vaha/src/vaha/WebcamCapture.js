
import React, { useRef, useState, useEffect } from 'react';
import Webcam from "react-webcam";
import styles from './vaha.module.css';

export default function WebcamCapture(props) {
  // Using useRef to create a reference to Webcam  
  const webcamRef = useRef(null);
  // Using useState to control
  const [capturedImage, setCapturedImage] = useState(null);
  const [emotion, setEmotion] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false)
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
    props.onCapture && props.onCapture(imageSrc, randomEmotion); 
    // move the stepper to next step
    props.setCurrentStep(2);
  }

  // if user click on retake
  const retake = () => {
    setCapturedImage(null);
    setEmotion("");
    setLoadingProgress(0);
    setShowProgressBar(false);
    props.setCurrentStep(1)
  };

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
        props.setCurrentStep(2);
      }
  
      return () => {
        clearInterval(interval);
      };
    }, [loadingProgress, showProgressBar]);

    
  return (
    <div className={styles.captureContainer}>
      {/* Check if an image has been captured */}
      {capturedImage ? (
        <>
        {/* Display the captured image. If the progress bar is shown, the image will be blurred for faking prediction purpose. */}
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
          {/* Displays emotion and retake/generate control once loading completes */}   
          {loadingProgress >= 100 && (
          <>
          {/* Displays the randomly selected emotion for the captured face */}
          <div className={styles.emotionLabel}>
            Predicted Emotion: {emotion}
          </div>
          <div className={styles.buttonContainer}> 
            <button className={styles.Button} onClick={retake}>
                <div className={styles.buttonContent}>
                <span className={`material-symbols-outlined ${styles.buttonIcon}`}>
                    cameraswitch
                </span>
                <span className={styles.buttonText}>
                    Retake Photo
                </span>
                </div>
            </button>
                
            <button className={styles.Button} onClick='#'>
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
        <>
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
        </>
      )}
    </div>
  );
}