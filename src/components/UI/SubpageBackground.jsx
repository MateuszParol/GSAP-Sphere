import React from 'react';
import styles from './SubpageBackground.module.css';

const SubpageBackground = () => {
    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.gridLayer}></div>
            <div className={styles.vignette}></div>
            <div className={styles.scanline}></div>
        </div>
    );
};

export default SubpageBackground;
