/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useEffect, useRef, useState} from 'react';
import '../styles/CommandModal.css';
import BlocklyWorkspace from "./BlocklyWorkspace";
import {focusBlocklyWorkspace} from "../blockly/blocklySetup";
import {useToggleModal} from "../hooks/useToggleModal";
import {toggleShortcutDialog} from "../blockly/blocklySetup";

export type Command = {
    label: string;
    action: () => void;
};

type CommandModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCommandSelect: (command: Command) => void;
    resetGame: () => void;
    runMode: "day" | "all";
};

const CommandModal: React.FC<CommandModalProps> = ({ isOpen, onClose, onCommandSelect, resetGame, runMode }) => {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);


    const actionCommand = useRef<Command | null>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const commandModalRef = useRef<HTMLDialogElement>(null);
    useToggleModal(commandModalRef, isOpen);

    const handleCancel = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onClose();
    };

    const commands: Command[] = [
        { label: 'Run Code', action: () => (document.querySelector('#runCodeButton') as HTMLElement)?.click() },
        { label: 'Go to Toolbox', action: () => (document.querySelector('.blocklyToolbox') as HTMLElement)?.focus() },
        { label: 'Go to Workspace', action: () => focusBlocklyWorkspace() },
        { label: 'Go to Farm Field', action: () => (document.querySelector('.tile') as HTMLElement)?.focus() },
        { label: 'Go to Instructions Panel', action: () => (document.querySelector('#instructionsPanel') as HTMLElement)?.focus() },
        { label: 'Go to Level Button', action: () => (document.querySelector('.level-selector') as HTMLElement)?.focus() },
        { label: 'Go to Run Code Button', action: () => (document.querySelector('.run-code-button') as HTMLElement)?.focus() },
        { label: 'Go to Updates Button', action: () => (document.querySelector('.update-button') as HTMLElement)?.focus() },
        { label: 'Change to Run All Blocks', action: () => {if (runMode === "day") (document.querySelector('#runModeButton') as HTMLElement)?.click() }},
        { label: 'Change to Run One Day', action: () => {if (runMode === "all") (document.querySelector('#runModeButton') as HTMLElement)?.click() }},
        { label: 'Reset Farm', action: () => resetGame() },
        { label: 'Show Updates', action: () => (document.querySelector('.update-button') as HTMLElement)?.click() },
        { label: 'Open Shortcuts Menu', action: () => toggleShortcutDialog() },
    ];

    const filteredCommands = commands.filter(cmd => cmd.label.toLowerCase().includes(query.toLowerCase()));

    useEffect(() => {
        const activeItem = document.getElementById(`command-${activeIndex}`);
        if (activeItem) {
            activeItem.focus();
        }
    }, [activeIndex]);

    function isAlphanumericOrSpace(input: string): boolean {
        return /^[a-zA-Z0-9 ]*$/.test(input);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const previouslyFocused = document.activeElement as HTMLElement;
            console.log("Previously focused element:", previouslyFocused);
            if (document.activeElement?.id === 'commandInput') {
                document.getElementById('command-0')?.focus();
                setActiveIndex(0);
                document.getElementById(`command-0`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                setActiveIndex((prev) => {
                    const next = (prev + 1) % filteredCommands.length;
                    document.getElementById(`command-${next}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    return next;
                });

            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prev) => {
                const next = (prev - 1 + filteredCommands.length) % filteredCommands.length;
                document.getElementById(`command-${next}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                return next;
            });
        } else if ((e.key === 'Enter') || (e.key === 'Space')) {
            e.preventDefault();
            actionCommand.current = filteredCommands[activeIndex];
            onCommandSelect(filteredCommands[activeIndex]);
            onClose();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            actionCommand.current = null;
            onClose();
        } else if (isAlphanumericOrSpace(e.key) && e.key !== ' ') {
            document.getElementById('commandInput')?.focus();
        }
    };

    return (
        <dialog
            ref={commandModalRef}
            onCancel={handleCancel}
            className={`command-modal ${isOpen ? 'open' : ''}`}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-labelledby="command-palette-title"
            aria-description="Arrow down to browse the commands and press enter to select an option. You can also start typing to search through the list of commands."
            aria-hidden={!isOpen}
        >
            <div className="command-palette-header">
                <h3 id="command-palette-title">Command Palette</h3>
            </div>

            <input
                id="commandInput"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands"
                className="command-input"
                aria-label="Search commands"
                aria-description="Arrow down to browse the commands and press enter to select an option. You can also start typing to search through the list of commands."
                aria-roledescription="combo box"
            />

            <ul
                ref={listRef}
                id="suggestions-list"
                className="suggestions-list"
                role="listbox"
                aria-label="Command suggestions"
                aria-activedescendant={`command-${activeIndex}`}
            >
                {filteredCommands.map((command, index) => (
                    <li
                        key={index}
                        id={`command-${index}`}
                        className={`suggestion-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => {
                            onCommandSelect(command);
                            onClose();
                        }}
                        role="option"
                        aria-label={command.label}
                        aria-selected={activeIndex === index}
                        tabIndex={-1}
                    >
                        {command.label}
                    </li>
                ))}
            </ul>
        </dialog>
    );
};

export default CommandModal;