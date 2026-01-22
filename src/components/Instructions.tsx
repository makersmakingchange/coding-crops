import React, {useEffect, useState} from 'react';
import { descriptions } from '../descriptions';

interface InstructionsProps {
    level: number;
}

const Instructions: React.FC<InstructionsProps> = ({ level }) => {
    const [showHint, setShowHint] = useState(false);

    const hint = descriptions[level]?.hint || 'No hint available for this level.';

    useEffect(() => {
        setShowHint(false);
    }, [level]);

    const toggleHint = () => {
        setShowHint((prev) => !prev);
    };

    return (
        <div
            className="instructions-panel"
            style={{
                backgroundColor: '#1e1e1e',
                padding: '12px 20px',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                color: '#e0e0e0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'space-between',  // Position the content to the left and right
                alignItems: 'flex-start',  // Align items to the top of the container
            }}
            role="region"
            aria-live="polite"
            aria-label={`Instructions for level ${level}`}
            tabIndex={0}
        >

            <div style={{ flex: 1 }}>
                <p>{descriptions[level]?.goal || 'No instructions available for this level.'}</p>

                <button
                    onClick={toggleHint}
                    style={{
                        backgroundColor: '#184e77',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        marginTop: '10px',
                        borderRadius: '5px',
                    }}
                    aria-expanded={showHint ? 'true' : 'false'}
                    aria-controls="hint-text"
                >
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
            </div>

            {/* Hint Section */}
            {showHint && (
                <div
                    id="hint-text"
                    style={{
                        marginLeft: '20px',  // Space between the instructions and the hint
                        fontStyle: 'italic',
                        color: '#d0d0d0',
                        width: '200px', // Restrict the width of the hint
                        whiteSpace: 'pre-wrap',  // Allow hint text to wrap properly
                    }}
                >
                    {hint}
                </div>
            )}
        </div>
    );
};

export default Instructions;
