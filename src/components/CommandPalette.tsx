import React, {useEffect, useState} from 'react';
import '../styles/CommandPalette.css';
import BlocklyWorkspace from "./BlocklyWorkspace";
import {focusBlocklyWorkspace} from "../blockly/blocklySetup";

export type Command = {
    label: string;
    action: () => void;
};

type CommandPaletteProps = {
    isOpen: boolean;
    onClose: () => void;
    onCommandSelect: (command: Command) => void;
    resetGame: () => void;
};

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onCommandSelect, resetGame }) => {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const previous = document.activeElement as HTMLElement;


    const commands: Command[] = [
        { label: 'Go to Blockly Toolbox', action: () => (document.querySelector('.blocklyToolbox') as HTMLElement)?.focus() },
        { label: 'Go to Blockly Workspace', action: () => focusBlocklyWorkspace() },
        { label: 'Go to Controls Bar', action: () => (document.querySelector('#controls-heading') as HTMLElement)?.focus() },
        { label: 'Go to Farm Grid', action: () => (document.querySelector('.tile') as HTMLElement)?.focus() },
        { label: 'Go to Instructions Panel', action: () => (document.querySelector('.instructions-panel') as HTMLElement)?.focus() },
        { label: 'Go to Level Button', action: () => onCommandSelect({ label: 'Reset Level', action: () => resetGame() }) },
        { label: 'Reset Farm', action: () => onCommandSelect({ label: 'Reset Farm', action: () => resetGame() }) },
        { label: 'Updates', action: () => (document.querySelector('.update-button') as HTMLElement)?.focus() },
        { label: 'Run Code', action: () => (document.querySelector('#runCodeButton') as HTMLElement)?.focus() },
    ];

    const filteredCommands = commands.filter(cmd => cmd.label.toLowerCase().includes(query.toLowerCase()));

    useEffect(() => {
        if (isOpen) {
            setActiveIndex(0); // Reset active index to the first command
            document.getElementById('command-input')?.focus(); // Focus the search input when opened
        }
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
        } else if (e.key === 'ArrowUp') {
            setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === 'Enter') {
            filteredCommands[activeIndex]?.action();
            onClose();
        } else if (e.key === 'Escape') {
            previous?.focus();
            onClose();
        }
    };

    return (
        <div
            className={`command-palette ${isOpen ? 'open' : ''}`}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-labelledby="command-palette-title"
            aria-describedby="command-palette-description"
            aria-hidden={!isOpen} // Hide the dialog from screen readers when it's not open
            aria-live="assertive" // Announce changes to live region
        >
            <div className="command-palette-header">
                <h2 id="command-palette-title">Command Palette</h2>
                <button
                    aria-label="Close Command Palette"
                    className="close-button"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>

            <input
                id="command-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands..."
                className="command-input"
                aria-label="Search commands"
            />

            <ul className="suggestions-list" role="listbox">
                {filteredCommands.map((command, index) => (
                    <li
                        key={index}
                        className={`suggestion-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => {
                            command.action();
                            onClose(); // Close Command Palette after executing command
                        }}
                        role="option"
                        aria-selected={activeIndex === index}
                    >
                        {command.label}
                    </li>
                ))}
            </ul>
        </div>
        //
        // <div className="command-palette" onKeyDown={handleKeyDown} tabIndex={0}>
        //     <input
        //         type="text"
        //         value={query}
        //         onChange={(e) => setQuery(e.target.value)}
        //         placeholder="Search commands..."
        //         className="command-input"
        //     />
        //     <ul className="suggestions-list">
        //         {filteredCommands.map((command, index) => (
        //             <li
        //                 key={index}
        //                 className={`suggestion-item ${activeIndex === index ? 'active' : ''}`}
        //                 onClick={() => {
        //                     command.action();
        //                     onClose();
        //                 }}
        //             >
        //                 {command.label}
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    );
};

export default CommandPalette;