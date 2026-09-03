/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useEffect, useRef, useState} from "react";
import {useRovingFocus} from "../hooks/useRovingFocus";
import {useToggleModal} from "../hooks/useToggleModal";
import AudioManager, {SoundEffect} from "../audio/AudioManager";
import "../styles/ShortcutsModal.css";

interface Shortcut {
    keys: string[][];
    description: string;
}

interface ShortcutGroup {
    heading: string;
    shortcuts: Shortcut[];
}

const SHORTCUT_GROUPS: ShortcutGroup[] = [
    {
        heading: "General",
        shortcuts: [
            {keys: [["W"]], description: "Focus the workspace"},
            {keys: [["/"]], description: "Toggle this shortcuts menu"},
            {keys: [["?"]], description: "Toggle quick help"},
            {keys: [["U"]], description: "Show Updates"},
            {keys: [["Ctrl", "/"]], description: "Open the command palette"},
            {keys: [["Alt", "R", "A"]], description: "Run all days"},
            {keys: [["Alt", "R", "O"]], description: "Run one days"},
            {keys: [["Alt", "R", "I"]], description: "Repeat current instruction"},
            {keys: [["Alt", "P"]], description: "Previous instruction"},
            {keys: [["Alt", "N"]], description: "Next instruction"},
            {keys: [["Alt", "Shift", "A"]], description: "Toggle screenreader mode"},
        ],
    },
    {
        heading: "Navigation (hold Alt)",
        shortcuts: [
            {keys: [["Alt", "G", "T"]], description: "Go to the toolbox"},
            {keys: [["Alt", "G", "R"]], description: "Go to the Run All Day button"},
            {keys: [["Alt", "G", "U"]], description: "Go to the Updates button"},
            {keys: [["Alt", "G", "C"]], description: "Go to the Farm Controls"},
            {keys: [["Alt", "G", "F"]], description: "Go to the Farm"},
            {keys: [["Alt", "G", "I"]], description: "Go to the Instructions panel"},
        ],
    },
    {
        heading: "General Workspace Shortcuts (only works in the workspace)",
        shortcuts: [
            {keys: [["T"]], description: "Focus the toolbox"},
            {keys: [["Ctrl", "Enter"]], description: "Open menu on block"},
            {keys: [["Enter"]], description: "Edit or Confirm block"},
            {keys: [["Esc"]], description: "Exit"},
            {keys: [["C"]], description: "Clean up workspace"},
            {keys: [["I"]], description: "Block description"},
            {keys: [["Shift", "I"]], description: "Parent block description"},
        ],
    },
    {
        heading: "Workspace Shortcuts to Edit",
        shortcuts: [
            {keys: [["Delete"]], description: "Edit or Confirm block"},
            {keys: [["X"]], description: "Disconnect block"},
            {keys: [["M"]], description: "Move block"},
            {keys: [["Ctrl", "X"]], description: "Cut block"},
            {keys: [["Ctrl", "C"]], description: "Copy block"},
            {keys: [["Ctrl", "V"]], description: "Paste block"},
            {keys: [["D"]], description: "Duplicate block"},
            {keys: [["Ctrl", "Z"]], description: "Undo"},
            {keys: [["Ctrl", "Y"]], description: "Redo"},
        ],
    },
    {
        heading: "Workspace Navigation Shortcuts",
        shortcuts: [
            {keys: [["Up"]], description: "Move cursor up"},
            {keys: [["Down"]], description: "Move cursor down"},
            {keys: [["Right"]], description: "Move cursor right"},
            {keys: [["Left"]], description: "Move cursor left"},
            {keys: [["N"]], description: "Jump to next stack"},
            {keys: [["B"]], description: "Jump to previous stack"},
            {keys: [["Home"]], description: "Jump to block start"},
            {keys: [["End"]], description: "Jump to block end"},
            {keys: [["Page Up"]], description: "Jump to top of stack"},
            {keys: [["Page Down"]], description: "Jump to bottom of stack"},
            {keys: [["Ctrl", "Home"]], description: "Jump to first block"},
            {keys: [["Ctrl", "End"]], description: "Jump to last block"},
            {keys: [["Ctrl", "Arrow"]], description: "Scroll the workspace or flyout"},
            {keys: [["H"]], description: "Move to next flyout heading"},
            {keys: [["Shift", "H"]], description: "Move to previous flyout heading"},
        ],
    },
];

const KeyCombo: React.FC<{keys: string[][]}> = ({keys}) => (
    <span className="shortcut-keys">
        {keys.map((chord, chordIndex) => (
            <React.Fragment key={chordIndex}>
                {chordIndex > 0 && (
                    <>
                        <span className="sr-only">then</span>
                        <span aria-hidden="true" className="key-separator">, </span>
                    </>
                )}
                {chord.map((key, keyIndex) => (
                    <React.Fragment key={keyIndex}>
                        {keyIndex > 0 && (
                            <>
                                <span className="sr-only">then</span>
                                <span aria-hidden="true" className="key-separator"> + </span>
                            </>
                        )}
                        <kbd>{key}</kbd>
                    </React.Fragment>
                ))}
            </React.Fragment>
        ))}
    </span>
);

interface ShortcutsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ShortcutsModal: React.FC<ShortcutsModalProps> = ({isOpen, onClose}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const shortcutsFocus = useRovingFocus(SHORTCUT_GROUPS.flatMap(group => group.shortcuts).length, "shortcut");
    const [activeIndex, setActiveIndex] = useState(0);

    useToggleModal(dialogRef, isOpen);

    // Flat list of rows (group headings excluded) for roving focus.
    const flatShortcuts = SHORTCUT_GROUPS.flatMap(group => group.shortcuts);
    const rowCount = flatShortcuts.length;

    useEffect(() => {
        if (!isOpen) return;
        const rows = listRef.current?.querySelectorAll<HTMLElement>("[data-shortcut-row]");
        rows?.[activeIndex]?.focus();
    }, [activeIndex, isOpen]);

    if (!isOpen) return null;

    const handleCancel = (e: React.SyntheticEvent) => {
        e.preventDefault();
        AudioManager.play(SoundEffect.OpenModal);
        onClose();
    };

    const handleListKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveIndex(i => Math.min(i + 1, rowCount - 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                setActiveIndex(i => Math.max(i - 1, 0));
                break;
            case "Home":
                e.preventDefault();
                setActiveIndex(0);
                break;
            case "End":
                e.preventDefault();
                setActiveIndex(rowCount - 1);
                break;
        }
    };

    // Running index across groups so roving focus works over the whole list.
    let rowIndex = -1;

    return (
        <dialog
            ref={dialogRef}
            className="shortcuts-modal"
            aria-labelledby="shortcuts-title"
            aria-describedby="shortcuts-help"
            onCancel={handleCancel}
        >
            <h2 id="shortcuts-title">Keyboard Shortcuts</h2>
            <p id="shortcuts-help" className="shortcuts-help">
                Use <kbd>↑</kbd> and <kbd>↓</kbd> to move through shortcuts,{" "}
                <kbd>Home</kbd> / <kbd>End</kbd> to jump, and{" "}
                <kbd>
                    <span aria-hidden="true">Esc</span>
                    <span className="sr-only">Escape</span>
                </kbd>{" "} to close.
            </p>

            <div className="shortcuts-body" ref={listRef} onKeyDown={handleListKeyDown} role="application">
                {SHORTCUT_GROUPS.map(group => (
                    <section key={group.heading} aria-labelledby={`shortcut-group-${group.heading}`}>
                        <h3 id={`shortcut-group-${group.heading}`}>{group.heading}</h3>
                        <ul className="shortcuts-list">
                            {group.shortcuts.map(shortcut => {
                                rowIndex++;
                                const index = rowIndex;
                                return (
                                    <li
                                        key={shortcut.description}
                                        data-shortcut-row
                                        tabIndex={index === activeIndex ? 0 : -1}
                                        onFocus={() => setActiveIndex(index)}
                                        className={index === activeIndex ? "active" : undefined}
                                    >
                                        <KeyCombo keys={shortcut.keys}/>
                                        <span className="sr-only">, </span>
                                        <span className="shortcut-description">{shortcut.description}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                ))}
            </div>

            <form method="dialog" className="dialog-footer">
                <button type="button" className="close-button" onClick={onClose}>
                    Close
                </button>
            </form>
        </dialog>
    );
};

export default ShortcutsModal;