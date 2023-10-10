// @flow

import React, { useState } from 'react';
import styles from './vaha.module.css';
import WebcamCapture from './WebcamCapture';

export default function Card({currentStep, setCurrentStep}) {
    const [selfieSrc, setSelfieSrc] = useState(null);

    const handleCapture = (imageSrc, emotion) => {
      setSelfieSrc(imageSrc);
    };
  
    return (
      <div className={styles.card}>
        <WebcamCapture currentStep={currentStep} setCurrentStep={setCurrentStep} onCapture={handleCapture} capturedImageSrc={selfieSrc} />
      </div>
    );
}