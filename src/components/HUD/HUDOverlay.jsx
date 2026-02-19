import React from 'react';
import styles from './HUD.module.css';
import Compass from './Compass';
import DataStream from './DataStream';
import FrameCorners from './FrameCorners';

import HUDDecoration from './HUDDecoration';

const HUDOverlay = ({ active = true }) => {
    if (!active) return null;

    return (
        <div className={styles.hudContainer}>
            <FrameCorners />
            <HUDDecoration />
            <Compass />
            <DataStream position="left" />
            <DataStream position="right" />
        </div>
    );
};

export default HUDOverlay;
