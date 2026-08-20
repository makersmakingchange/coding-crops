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
            {keys: [["T"]], description: "Focus the toolbox"},
            {keys: [["W"]], description: "Focus the workspace"},
            {keys: [["/"]], description: "Toggle this shortcuts menu"},
            {keys: [["?"]], description: "Toggle the welcome / info dialog"},
            {keys: [["Ctrl", "/"]], description: "Open the command palette"},
            {keys: [["Ctrl", "B"]], description: "Search the toolbox"},
            {keys: [["Alt", "P"]], description: "Previous instruction"},
            {keys: [["Alt", "N"]], description: "Next instruction"},
            {keys: [["Alt", "R"], ["I"]], description: "Repeat current instruction"},
        ],
    },
    {
        heading: "Navigation (hold Alt)",
        shortcuts: [
            {keys: [["Alt", "G"], ["T"]], description: "Go to the toolbox"},
            {keys: [["Alt", "G"], ["U"]], description: "Go to the Updates button"},
            {keys: [["Alt", "G"], ["R"]], description: "Go to the Run One Day button"},
            {keys: [["Alt", "G"], ["C"]], description: "Go to the controls bar"},
            {keys: [["Alt", "G"], ["F"]], description: "Go to the farm grid"},
            {keys: [["Alt", "G"], ["I"]], description: "Go to the instructions panel"},
            {keys: [["Alt", "R"]], description: "Run all days"},
        ],
    },
    {
        heading: "General Workspace Shortcuts",
        shortcuts: [
            {keys: [["Ctrl", "Enter"]], description: "Open menu on block"},
            {keys: [["Enter"]], description: "Edit or Confirm block"},
            {keys: [["Esc"]], description: "Exit"},
            {keys: [["C"]], description: "Clean up workspace"},
        ],
    },
    {
        heading: "Workspace Shortcuts to Edit",
        shortcuts: [
            {keys: [["Delete"]], description: "Edit or Confirm block"},
            {keys: [["X"]], description: "Disconnect"},
            {keys: [["M"]], description: "Move block"},
            {keys: [["Ctrl", "X"]], description: "Cut"},
            {keys: [["Ctrl", "C"]], description: "Copy"},
            {keys: [["Ctrl", "V"]], description: "Paste"},
            {keys: [["D"]], description: "Duplicate"},
            {keys: [["Ctrl", "Z"]], description: "Undo"},
            {keys: [["Ctrl", "Y"]], description: "Redo"},
        ],
    },
    {
        heading: "Code Navigation Shortcuts",
        shortcuts: [
            {keys: [["Up"]], description: "Up"},
            {keys: [["Down"]], description: "Down"},
            {keys: [["Right"]], description: "Right"},
            {keys: [["Left"]], description: "Left"},
            {keys: [["N"]], description: "Next stack"},
            {keys: [["B"]], description: "Previous stack"},
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
                                <span className="sr-only">plus</span>
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