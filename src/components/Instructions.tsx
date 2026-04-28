import React, {useEffect, useState, useRef} from 'react';
import { descriptions } from '../descriptions';
import '../styles/Instructions.css';
import {getLevelConfig} from "../blockly/levelManager";
import A11yAnnouncer from "../accessibility/A11yAnnouncer";

interface InstructionsProps {
    level: number | string;
}

const Instructions: React.FC<InstructionsProps> = ({ level }) => {
    const [showHint, setShowHint] = useState(false);
    const instructionsRef = useRef<HTMLDivElement>(null);

    const hint = descriptions[level]?.hint || 'No hint available for this level.';

    useEffect(() => {
        setShowHint(false);
    }, [level]);

    const toggleHint = () => {
        setShowHint((prev) => {
            const next = !prev;
            if (next) A11yAnnouncer.announce(`Hint, ${hint}`, 0);
            return next;
        });
    };

    return (
        <section
            className="instructions-panel"
            ref={instructionsRef}
            role="region"
            tabIndex={0}
        >
            <div className="instructions-header">
                <div className="instructions-goal-section">
                    <h2 id="instructions-heading" className="instructions-heading">
                        {getLevelConfig(level)?.label} Task
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
                            tabIndex={0}
                        >
                            Hint, {hint}
                        </div>
                    )}
                </div>
            </div>

        </section>
    );
};

export default Instructions;
