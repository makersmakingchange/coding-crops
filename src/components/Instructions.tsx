import React from 'react';

interface InstructionsProps {
    text: string;
}

const Instructions: React.FC<InstructionsProps> = ({ text }) => {
    return (
        <div style={{
            backgroundColor: '#1e1e1e',
            padding: '12px 20px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            color: '#e0e0e0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
            {text}
        </div>
    );
};

export default Instructions;
