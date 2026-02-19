import React from 'react';
import styles from './HUD.module.css';

const DataStream = ({ position = 'left' }) => {
    const isLeft = position === 'left';

    return (
        <div className={isLeft ? styles.dataLeft : styles.dataRight}>
            <div className={styles.dataHeader}>SYS_MONITOR_{isLeft ? 'A' : 'B'}</div>
            <div className={styles.dataRow}>
                <span>CPU_LOAD:</span>
                <span className={styles.dataValue}>{Math.floor(Math.random() * 100)}%</span>
            </div>
            <div className={styles.dataRow}>
                <span>MEM_USAGE:</span>
                <span className={styles.dataValue}>{Math.floor(Math.random() * 40 + 20)}TB</span>
            </div>
            <div className={styles.dataRow}>
                <span>NET_LINK:</span>
                <span className={styles.dataValue} style={{ color: '#00ff00' }}>SECURE</span>
            </div>
            <div className={styles.dataRow}>
                <span>COORDS:</span>
                <span className={styles.dataValue}>{Math.floor(Math.random() * 999)}.{Math.floor(Math.random() * 99)}</span>
            </div>
        </div>
    );
};

export default DataStream;
