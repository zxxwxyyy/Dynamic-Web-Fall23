
import React, { useRef } from 'react';
import Webcam from "react-webcam";
import styles from './vaha.module.css';
import GenerateImageComponent from './GenerateImage';
import { useSelector, useDispatch } from 'react-redux';
import useHandleGeneration from '../hooks/useHandleGeneration';
import useHandleRetake from '../hooks/useHandleRetake';
import useHandleImageUpload from '../hooks/useHandleImageUpload';
import useCapture from '../hooks/useCapture';

export default function WebcamCapture() {
  const webcamRef = useRef(null)
  const dispatch = useDispatch()
  const { capturedImage,
          err,
          emotion,
          loadingProgress,
          showProgressBar,
          faceCoords
        } = useSelector((state) => state.webcam);
  const { startGeneration } = useSelector((state)=>state.generateImage)
  const { handleRetake } = useHandleRetake(dispatch);
  const { handleGeneration } = useHandleGeneration(dispatch, emotion);
  const { handleImageUpload } = useHandleImageUpload(dispatch)
  const { capture } = useCapture(dispatch, webcamRef)

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
          <GenerateImageComponent />
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
                  {err ? (
                    <>
                      <div className={styles.errorLabel}>No face detected. Please retake the picture.</div>
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
                      </div>
                    </>
                  ):(
                    <>
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