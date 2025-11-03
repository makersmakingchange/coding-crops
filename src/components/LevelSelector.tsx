import React from 'react';
import '../styles/index.css';

const LevelSelector: React.FC<{ onChange: (level: number) => void }> = ({ onChange }) => {
    return (
        <select
            aria-label="Select level"
            onChange={(e) => onChange(parseInt(e.target.value))}
        >
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
        </select>
    );
};

export default LevelSelector;
