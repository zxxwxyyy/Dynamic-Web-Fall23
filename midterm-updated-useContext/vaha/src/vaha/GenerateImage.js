import { useState, useEffect } from "react"
import styles from './vaha.module.css'
import finalResultsImage from '../assets/final_results.png';


export default function GenerateImage(props){
    const {emotion, startGeneration, handleRetake, handleGeneration} = props
    const [generationProgress, setGenerationProgress] = useState(0)
    const [generatedImage, setGeneratedImage] = useState(null)
    const [showProgressBar, setShowProgressBar] = useState(false)


    useEffect(() => {
        // Re-generate the progress bar when user hit Re-generate button
        if (startGeneration) {
            setGenerationProgress(0);
            let interval = setInterval(() => {
                setGenerationProgress(prevProgress => prevProgress + 20);
            }, 800);
            setGeneratedImage(finalResultsImage);

            return () => {
                clearInterval(interval);
            }
        }
    }, [startGeneration]);
    // progress bar effect
    useEffect(()=>{
        let interval;

        if (generationProgress < 100){
            interval = setInterval(()=>{
                setGenerationProgress(prevProgress => prevProgress + 20);
            }, 800)
            setGeneratedImage(finalResultsImage)
        }
        if (generationProgress >= 100){
            setShowProgressBar(false);
            props.setCurrentStep(3)
            setGeneratedImage(finalResultsImage)
        }
        return ()=> {
            clearInterval(interval);
        }
    }, [generationProgress, showProgressBar])
    return (
        <div className={styles.generateContainer}>
            {/* If generation is in progress, show the noisy version of the captured image */}
            {generationProgress < 100 ? (
                <img 
                    src={generatedImage} 
                    alt="Generating..."
                    className={styles.blurredSelfie} 
                    width={837}
                    height={479}
                />
            ) : (
            <>
                <img 
                    src={generatedImage} 
                    alt="Generated"
                    className={styles.selfie}
                    width={837}
                    height={479}
                />
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
            </>
            )}

            {/* Generation progress bar */}
            {generationProgress < 100 && (
                <div className={styles.progressBar} style={{width: `${generationProgress}%`}}></div>
            )}
        </div>
    );
}