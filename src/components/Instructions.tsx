import React, {useEffect, useState, useRef} from 'react';
import { descriptions } from '../descriptions';
import '../styles/Instructions.css';

interface InstructionsProps {
    level: number;
}

const Instructions: React.FC<InstructionsProps> = ({ level }) => {
    const [showHint, setShowHint] = useState(false);
    const instructionsRef = useRef<HTMLDivElement>(null);

    const hint = descriptions[level]?.hint || 'No hint available for this level.';

    useEffect(() => {
        instructionsRef.current?.focus();
    }, [level]);

    useEffect(() => {
        setShowHint(false);
    }, [level]);

    const toggleHint = () => {
        setShowHint((prev) => !prev);
    };

    return (
        <section
            className="instructions-panel"
            ref={instructionsRef}
            role="region"
            aria-live="polite"
            tabIndex={0}
        >
            <div className="instructions-header">
                <div className="instructions-goal-section">
                    <h2 id="instructions-heading" className="instructions-heading">
                        Level {level} Task
                    </h2>

                    <p>{descriptions[level]?.goal || 'No instructions available for this level.'}</p>

                </div>
                <div className="instructions-hint">

                    <button
                        onClick={toggleHint}
                        className="hint-button"
                        aria-expanded={showHint ? 'true' : 'false'}
                        aria-controls="hint-text"
                    >
                        {showHint ? 'Hide Hint' : 'Show Hint'}
                    </button>

                    {/* Hint Section */}
                    {showHint && (
                        <div
                            id="hint-text"
                            className="hint-text"
                        >
                            {hint}
                        </div>
                    )}
                </div>
            </div>

        </section>
    );
};

export default Instructions;
