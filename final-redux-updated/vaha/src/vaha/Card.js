
import React from 'react';
import styles from './vaha.module.css';
import WebcamCapture from './WebcamCapture';

export default function Card() {
    return (
      <div className={styles.card}>
        <WebcamCapture />
      </div>
    );
}