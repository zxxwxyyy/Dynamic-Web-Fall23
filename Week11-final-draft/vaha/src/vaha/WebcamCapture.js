
import React, { useEffect, useContext, useState } from 'react';
import Webcam from "react-webcam";
import styles from './vaha.module.css';
import GenerateImageComponent from './GenerateImage';
import cameraContext from '../context/cameraContext'

export default function WebcamCapture() {
  const {
          capturedImage,
          setCapturedImage,
          emotion,
          setEmotion,
          loadingProgress, setLoadingProgress,
          showProgressBar, setShowProgressBar,
          startGeneration,
          webcamRef,
          setCurrentStep,
          handleRetake, 
          handleGeneration,
          err,
          handleError} = useContext(cameraContext)
  
  const [faceCoords, setFaceCoords] = useState(null)
    
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
  }
  
  
  const handleImageUpload = async(event) => {
    const file = event.target.files[0]
    if (file){
      const reader = new FileReader()
      reader.onload = async(e) => {
        const imageDataUrl = e.target.result;
        setCapturedImage(imageDataUrl)
        setShowProgressBar(true)
        setLoadingProgress(0)
        let interval

        const formData = new FormData()
        formData.append('image', dataURItoBlob(imageDataUrl))

        try {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            if (progress <= 90) {
              setLoadingProgress(progress);
            } else {
              
              clearInterval(interval);
            }
          }, 100);
          const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            body: formData,
          });
          clearInterval(interval);
          setLoadingProgress(100);
          setShowProgressBar(false);
    
          const data = await response.json();
          // console.log(data.face_coords)
          if (data.emotion && data.face_coords) {
            setEmotion(data.emotion);
            setFaceCoords(data.face_coords);
          }
          setCurrentStep(2); 
          if(response.status === 500) {
            handleError(true)
            
          }
        } catch (error) {
          handleError(true)
          console.error('Error during image prediction:', error);
          setShowProgressBar(false);
          clearInterval(interval);
          setLoadingProgress(0);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowProgressBar(true);
    setLoadingProgress(0);
    let interval;

    const formData = new FormData();
    formData.append('image', dataURItoBlob(imageSrc));

    try {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 90) {
          setLoadingProgress(progress);
        } else {
          
          clearInterval(interval);
        }
      }, 100);
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
      clearInterval(interval);
      setLoadingProgress(100);
      setShowProgressBar(false);

      const data = await response.json();
      // console.log(data.face_coords)
      if (data.emotion && data.face_coords) {
        setEmotion(data.emotion);
        setFaceCoords(data.face_coords);
      }
      setCurrentStep(2); 
      if(response.status === 500) {
        handleError(true)
      }
    } catch (error) {
      console.error('Error during image prediction:', error);
      setShowProgressBar(false);
      clearInterval(interval);
      setLoadingProgress(0);
    }
  };

  const faceStyle = faceCoords ? {
    border: '3px solid #4CAF50',
    position: 'absolute',
    top: `${faceCoords[1]}px`, 
    left: `${faceCoords[0]}px`, 
    width: `${faceCoords[2]}px`, 
    height: `${faceCoords[3]}px`, 
    transform: 'translate(0%, 0%)' 
} : {};


    
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
              {
                  faceCoords && (
                      <div style={faceStyle}></div>
                  )
              }
              {/* Displays predicted emotion and retake/generate control once loading completes */}   
              {loadingProgress >= 100 && (
                <>
                  {err && (<div className={styles.errorLabel}>No face detected. Please retake the picture.</div>)}
                  <div className={styles.emotionLabel}>
                    Predicted Emotion: {emotion}
                  </div>
                  <div className={styles.buttonContainer}> 
                    <button className={styles.Button} onClick={handleRetake}>
                      <div className={styles.buttonContent}>
                        <span className={`material-symbols-outlined ${styles.buttonIcon}`}>
                          undo
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
                <label htmlFor="fileUpload" className={styles.customFileUploadLabel}>
                <span className={`material-symbols-outlined ${styles.buttonIcon}`}>
                  file_upload
                </span>
                <span className={styles.buttonText}>Upload Img</span>
              </label>
              
              {/* Hidden file input */}
              <input 
                id="fileUpload"
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className={styles.uploadInput} 
              />
              </div>
            </div>
          )
        )}
      </div>
    )
}