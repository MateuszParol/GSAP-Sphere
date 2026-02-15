import React from 'react'
import { points } from '../../data/points'
import PointMarker from './PointMarker'

export default function PointsGroup({ onPointClick }) {
    return (
        <group>
            {points.map((point) => (
                <PointMarker
                    key={point.id}
                    point={point}
                    onClick={onPointClick}
                />
            ))}
        </group>
    )
}
