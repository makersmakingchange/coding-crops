/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useRef} from 'react';
import '../styles/Modal.css';
import {Warning} from '../types';
import {useToggleModal} from "../hooks/useToggleModal";
import {useRovingFocus} from "../hooks/useRovingFocus";
import AudioManager, {SoundEffect} from "../audio/AudioManager";

interface UpdatesModalProps {
    isOpen: boolean;
    onClose: () => void;
    summaries: string[];
    warnings?: Warning[];
}

const UpdatesModal: React.FC<UpdatesModalProps> = ({
                                                       isOpen,
                                                       onClose,
                                                       summaries,
                                                       warnings = [],
                                                   }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const summariesFocus = useRovingFocus(summaries.length, "summary");
    const warningsFocus = useRovingFocus(warnings.length, "warning");

    useToggleModal(dialogRef, isOpen);
    if (!isOpen) return null;

    const handleCancel = (e: React.SyntheticEvent) => {
        e.preventDefault();
        AudioManager.play(SoundEffect.OpenModal);
        onClose();
    };

    const handleSummariesFocus = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            summariesFocus.setActiveIndex(i => Math.min(i + 1, summaries.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            summariesFocus.setActiveIndex(i => Math.max(i - 1, 0));
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            warningsFocus.focus(0);
        }
    };

    const handleWarningsFocus = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            warningsFocus.setActiveIndex(i => Math.min(i + 1, warnings.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            warningsFocus.setActiveIndex(i => Math.max(i - 1, 0));
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            summariesFocus.focus(0);
        }
    };

    return (
        <dialog
            role="dialog"
            ref={dialogRef}
            className="updates-modal"
            aria-labelledby="updates-title"
            onCancel={handleCancel}
        >
            <h2 id="updates-title">Farm Updates</h2>

            <div className="updates-body" role="application">

                <div className="summaries-section">
                    <h3 id="summaries-title">Logs</h3>
                    <div
                        className="summaries-content"
                        aria-labelledby="summaries-title"
                        onKeyDown={handleSummariesFocus}
                        onFocus={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                                summariesFocus.focus(0);
                            }
                        }}
                    >

                        <ul aria-labelledby="summaries-title">
                            {summaries.length === 0 ? (
                                <li className="no-updates" tabIndex={0}>No updates yet.</li>
                            ) : (
                                summaries.map((s, i) => (
                                    <li key={i}
                                        id={`summary-${i}`}
                                        tabIndex={i === summariesFocus.activeIndex ? 0 : -1}>{s}</li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
                {warnings.length > 0 && (
                <div className="warning-section">
                    <h3 id="warning-title">Warnings</h3>

                        <div
                            aria-labelledby="warning-title"
                            className="warning-content"
                            onKeyDown={handleWarningsFocus}
                            onFocus={(e) => {
                                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                                    warningsFocus.focus(0);
                                }
                            }}>
                            <ul aria-labelledby="warning-title">
                                {warnings
                                    .sort((a, b) => a.day - b.day)
                                    .map((w, i) => (
                                        <li key={i}
                                            id={`warning-${i}`}
                                            tabIndex={i === warningsFocus.activeIndex ? 0 : -1}>
                                            Day {w.day}: {w.message}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            <form method="dialog" className="dialog-footer">
                <button
                    type="button"
                    className="close-button"
                    onClick={onClose}
                >Close</button>
            </form>
        </dialog>
    );
};

export default UpdatesModal;
