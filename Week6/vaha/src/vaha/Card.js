
import React, { useState } from 'react';
import styles from './vaha.module.css';
import WebcamCapture from './WebcamCapture';

export default function Card(props) {
    const {currentStep, setCurrentStep} = props
    const [selfieSrc, setSelfieSrc] = useState(null);
    const [startGeneration, setStartGeneration] = useState(false);

    const handleCapture = (imageSrc, emotion) => {
      setSelfieSrc(imageSrc);
    };
  
    return (
      <div className={styles.card}>
        <WebcamCapture 
          currentStep={currentStep} 
          setCurrentStep={setCurrentStep} 
          onCapture={handleCapture} 
          capturedImageSrc={selfieSrc}
          startGeneration={startGeneration}
          setStartGeneration={setStartGeneration}
        />
      </div>
    );
}