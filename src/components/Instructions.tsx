/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useEffect, useState, useRef} from 'react';
import {descriptions, Step} from '../descriptions';
import '../styles/Instructions.css';
import {getLevelConfig} from "../blockly/levelManager";
import A11yAnnouncer from "../accessibility/A11yAnnouncer";
import next from '../assets/next-icon.svg';
import prev from '../assets/prev-icon.svg';
import {blockTypes, parseContent} from "../descriptions/parser";

interface InstructionsProps {
    level: number | string;
}

const Instructions: React.FC<InstructionsProps> = ({ level }) => {
    const [showHint, setShowHint] = useState(false);
    const instructionsRef = useRef<HTMLDivElement>(null);
    const [stepIndex, setStepIndex] = useState(0);
    const stepsRef = useRef<Step[]>(descriptions[level]?.steps);

    const fallbackSteps = descriptions["basic"]?.steps ?? [
        {
            "level": "basic",
            "steps": [
                {
                    "title": "Goal",
                    "content": "Test blocks."
                },
                {
                    "title": "Step 1",
                    "content": "Test [Farm] blocks."
                }
            ]
        }
    ];

    useEffect(() => {
        setShowHint(false);
        setStepIndex(0);
        stepsRef.current = descriptions[level]?.steps ?? fallbackSteps;
    }, [level]);

    const goPrev = () => {
        setStepIndex(prev => Math.max(prev - 1, 0));
    };

    const goNext = () => {
        setStepIndex(prev => Math.min(prev + 1, stepsRef.current?.length - 1));
    };

    function isCropDropdown(text: string): boolean {
        return (text.includes("sunflower") || text.includes("corn") || text.includes("pumpkin"));
    }

    return (
        <div
            id="instructionsPanel"
            className="instructions-panel"
            ref={instructionsRef}
            role="region"
            tabIndex={0}
        >
            <div className="instructions-container" aria-live={"polite"}>
                <div className="instructions-header">
                    <h2 id="instructions-heading" className="instructions-heading">
                        {stepsRef.current[stepIndex].title} of {getLevelConfig(level)?.label}
                    </h2>
                </div>

                <div className="instructions-content">
                    <p>
                        {parseContent(stepsRef.current[stepIndex].content).map((part, index) =>
                                part.blockType ? (
                                    <span
                                        key={index}
                                        className={
                                            part.className ??
                                            blockTypes[part.blockType]?.className ??
                                            "block-default"
                                        }
                                    >
                    {part.text.split(/(\(.*?\))/g).map((text, i) =>
                        text.startsWith("(") && text.endsWith(")") ? (
                            <span key={i} className={isCropDropdown(text.toLowerCase())? "crop-block-input" : "block-input"}>
                                {text.slice(1, -1)}
                            </span>
                        ) : (
                            <React.Fragment key={i}>
                                {text}
                            </React.Fragment>
                        )
                    )}
                </span>
                                ) : (
                                    <React.Fragment key={index}>
                                        {part.text}
                                    </React.Fragment>
                                )
                        )}
                    </p>
                </div>

                <div className="instructions-nav">
                    <button
                        onClick={goPrev}
                        className="icon"
                        disabled={stepIndex === 0}
                        aria-disabled={stepIndex === 0}
                        aria-label="Previous step"
                        tabIndex={0}
                    >
                        <img src={prev} alt="Previous step" width="100%" height="100%" />
                    </button>

                    <span id="stepNumber" style={{ margin: '0 10px' }} aria-labelledby="#stepNumberLabel" aria-hidden={"true"}>
                        {stepIndex + 1} / {stepsRef.current.length}
                    </span>

                    <div id="stepNumberLabel" className="sr-only">
                        {stepIndex + 1} out of {stepsRef.current.length}
                    </div>

                    <button
                        onClick={goNext}
                        className="icon"
                        disabled={stepIndex === stepsRef.current.length - 1}
                        aria-disabled={stepIndex === stepsRef.current.length - 1}
                        aria-label="Next step"
                        tabIndex={0}
                    >
                        <img src={next} alt="Next step" width="100%" height="100%" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Instructions;
