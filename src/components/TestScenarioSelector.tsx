import React from 'react';
import '../styles/index.css';

const TestScenarioSelector: React.FC<{ onChange: (scenario: number) => void }> = ({ onChange }) => {
    return (
        <select
            aria-label="Select scenario"
            onChange={(e) => onChange(parseInt(e.target.value))}
        >
            <option value="97">Basic Farm</option>
            <option value="98">Plant Grid</option>
            <option value="99">Loops</option>
        </select>
    );
};

export default TestScenarioSelector;
