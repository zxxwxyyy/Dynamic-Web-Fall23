import React from 'react';
import styles from './vaha.module.css';

const Stepper = ({ currentStep }) => {
    const icons = [
        <span className={`material-symbols-outlined ${styles.buttonIcon}`}>
            photo_camera
        </span>,
        <span className="material-symbols-outlined">
            sentiment_very_satisfied
        </span>,
        <span className="material-symbols-outlined">
            image
        </span>
    ];
    return (
        <div className={styles.stepper}>
            {icons.map((icon, index) => (
                <span 
                    key={index} 
                    // Conditionally sets the active style based on the current step.
                    className={`${styles.icon} ${currentStep === index + 1 ? styles.active : ''}`}
                >
                    {icon}
                </span>
            ))}
        </div>
    );
};

export default Stepper;