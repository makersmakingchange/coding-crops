import React from 'react';
import '../styles/index.css';
import {LevelConfig, LEVELS} from "../blockly/levelManager";

interface LevelSelectorProps {
    onChange: (level: number | string) => void;
    levels?: LevelConfig[];
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ onChange, levels = LEVELS }) => {
    return (
        <select
            aria-label="Select level"
            onChange={(e) => {
                const raw = e.target.value;
                const parsed = parseInt(raw);
                onChange(isNaN(parsed) ? raw : parsed);
            }}
        >
            {levels.map((l) => (
                <option key={l.value} value={l.value}>
                    {l.label}
                </option>
            ))}
        </select>

    );
};

export default LevelSelector;
