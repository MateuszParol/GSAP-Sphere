import React from 'react'
import { points } from '../../data/points'

export default function Legend() {
    return (
        <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '20px',
            borderRadius: '12px',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontFamily: "'Courier New', Courier, monospace",
            color: 'white',
            zIndex: 10,
            maxWidth: '300px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
        }}>
            <h3 style={{
                margin: '0 0 15px 0',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                paddingBottom: '5px'
            }}>
                Navigation
            </h3>
            <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
            }}>
                {points.map(point => (
                    <li key={point.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        cursor: 'default'
                    }}>
                        <span style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            backgroundColor: point.color,
                            borderRadius: '50%',
                            marginRight: '10px',
                            boxShadow: `0 0 8px ${point.color}`
                        }}></span>
                        <span style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            letterSpacing: '1px'
                        }}>
                            {point.label}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
