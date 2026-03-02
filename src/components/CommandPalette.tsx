import React, {useEffect, useRef, useState} from 'react';
import '../styles/CommandPalette.css';
import BlocklyWorkspace from "./BlocklyWorkspace";
import {focusBlocklyWorkspace} from "../blockly/blocklySetup";
import {useToggleDialog} from "../hooks/useToggleDialog";

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


    const actionCommand = useRef<Command | null>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const commandPaletteRef = useRef<HTMLDialogElement>(null);
    useToggleDialog(commandPaletteRef, isOpen, actionCommand);

    const handleCancel = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onClose();
    };

    const commands: Command[] = [
        { label: 'Go to Blockly Toolbox', action: () => (document.querySelector('.blocklyToolbox') as HTMLElement)?.focus() },
        { label: 'Go to Blockly Workspace', action: () => focusBlocklyWorkspace() },
        { label: 'Go to Controls Bar', action: () => (document.querySelector('#controls-heading') as HTMLElement)?.focus() },
        { label: 'Go to Farm Grid', action: () => (document.querySelector('.tile') as HTMLElement)?.focus() },
        { label: 'Go to Instructions Panel', action: () => (document.querySelector('.instructions-panel') as HTMLElement)?.focus() },
        { label: 'Go to Level Button', action: () => (document.querySelector('.instructions-panel') as HTMLElement)?.focus() },
        { label: 'Reset Farm', action: () => resetGame() },
        { label: 'Change Run Mode', action: () => (document.querySelector('.run-mode-button') as HTMLElement)?.focus() },
        { label: 'Updates', action: () => (document.querySelector('.update-button') as HTMLElement)?.focus() },
        { label: 'Run Code', action: () => (document.querySelector('#runCodeButton') as HTMLElement)?.focus() },
        { label: 'Open Shortcuts Menu', action: () => (document.querySelector('#pauseButton') as HTMLElement)?.focus() },
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
            const previouslyFocused = document.activeElement as HTMLElement;
            if (previouslyFocused && !previouslyFocused.classList.contains('suggestions-list')) {
                document.getElementById('suggestions-list')?.focus();
                setActiveIndex(0);
            } else {
                setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
            }
        } else if (e.key === 'ArrowUp') {
            setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === 'Enter') {
            actionCommand.current = filteredCommands[activeIndex];
            onCommandSelect(filteredCommands[activeIndex]);
            onClose();
        } else if (e.key === 'Escape') {
            actionCommand.current = null;
            onClose();
        }
    };

    return (
        <dialog
            ref={commandPaletteRef}
            onCancel={handleCancel}
            className={`command-palette ${isOpen ? 'open' : ''}`}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-labelledby="command-palette-title"
            aria-hidden={!isOpen}
            aria-live="assertive" // Announce changes to live region
        >
            <div className="command-palette-header">
                <h3 id="command-palette-title">Command Palette</h3>
            </div>

            <input
                id="command-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands"
                className="command-input"
                aria-label="Search commands"
            />

            <ul
                ref={listRef}
                id="suggestions-list"
                className="suggestions-list"
                role="listbox"
                aria-label="Command suggestions"
                aria-activedescendant={`command-${activeIndex}`}
                tabIndex={0}
            >
                {filteredCommands.map((command, index) => (
                    <li
                        key={index}
                        id={`command-${index}`}
                        className={`suggestion-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => {
                            actionCommand.current = filteredCommands[activeIndex];
                            onCommandSelect(filteredCommands[activeIndex]);
                            onClose();
                        }}
                        role="option"
                        aria-label={command.label}
                        aria-selected={activeIndex === index}
                    >
                        {command.label}
                    </li>
                ))}
            </ul>
        </dialog>
    );
};

export default CommandPalette;