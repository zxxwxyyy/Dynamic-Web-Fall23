
import React, { useEffect, useContext } from 'react';
import Webcam from "react-webcam";
import styles from './vaha.module.css';
import GenerateImageComponent from './GenerateImage';
import cameraContext from '../context/cameraContext'

export default function WebcamCapture() {
  const {
        capturedImage,
        emotion,
        loadingProgress, setLoadingProgress,
        showProgressBar, setShowProgressBar,
        startGeneration,
        webcamRef,
        setCurrentStep,
        capture, 
        handleRetake, 
        handleGeneration} = useContext(cameraContext)
  
  
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
    }, [loadingProgress, showProgressBar, setCurrentStep, setLoadingProgress, setShowProgressBar]);

    
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
                width={640}
                height={480}
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
                height={480}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={640}
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