
import React, { useContext } from 'react';
import styles from './vaha.module.css';
import WebcamCapture from './WebcamCapture';
import cameraContext from '../context/cameraContext';

export default function Card() {
    const {handleCapture,
           selfieSrc,
           startGeneration,
           setStartGeneration} = useContext(cameraContext)
    
  
    return (
      <div className={styles.card}>
        <WebcamCapture 
          onCapture={handleCapture} 
          capturedImageSrc={selfieSrc}
          startGeneration={startGeneration}
          setStartGeneration={setStartGeneration}
        />
      </div>
    );
}