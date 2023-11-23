import React, { useContext, useEffect } from 'react';
import cameraContext from '../context/cameraContext';
import styles from './vaha.module.css';
import finalResultsImage from '../assets/final_results.png';

export default function GenerateImage() {
  const {
    emotion,
    generationProgress,
    generatedImage,
    handleRetake,
    handleGeneration,
    // setCurrentStep
  } = useContext(cameraContext);

  useEffect(() => {
    if (generatedImage && generatedImage.length > 0) {
      console.log('New images have been generated:', generatedImage);
    }
  }, [generatedImage]);

    return (
        <div className={styles.generateContainer}>
            {/* Show progress bar while generating images */}
            {generationProgress < 100 && (
                <>
                    <img 
                        src={finalResultsImage}
                        alt="Generating..."
                        className={styles.blurredSelfie} 
                        width={837}
                        height={479}
                    />
                    <div className={styles.progressBar} style={{width: `${generationProgress}%`}}></div>
                </>
            )}

            {/* Once generation is complete, display generated images */}
            {generationProgress === 100 && generatedImage && generatedImage.map((imageSrc, index) => (
                <img 
                    key={index}
                    src={imageSrc}
                    alt={`Generated ${index}`}
                    className={styles.generateContainer.img}
                    width={250}
                    height={250}
                />
            ))}

            {/* Display the emotion label and buttons */}
            <div className={styles.emotionLabel}>
                Generation based on predicted emotion: {emotion}
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
                            Re-generate
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
}