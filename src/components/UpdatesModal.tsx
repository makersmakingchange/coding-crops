import React, { useEffect, useRef } from 'react';
import '../styles/Modal.css';
import { Warning } from '../types';
import {useToggleModal} from "../hooks/useToggleModal";

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

    useToggleModal(dialogRef, isOpen);

    const handleCancel = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <dialog
            ref={dialogRef}
            className="updates-modal"
            aria-labelledby="updates-title"
            onCancel={handleCancel}
        >
            <h2 id="updates-title">Farm Updates</h2>

            {warnings.length > 0 && (
                <section role="alert" className="warning-section">
                    <h3>Warnings</h3>
                    <ul>
                        {warnings
                            .sort((a, b) => a.day - b.day)
                            .map((w, i) => (
                                <li key={i} tabIndex={0}>
                                    Day {w.day}: {w.message}
                                </li>
                            ))}
                    </ul>
                </section>
            )}

            <div className="updates-modal-content">
                <ul>
                    {summaries.length === 0 ? (
                        <li className="no-updates" tabIndex={0}>No updates yet.</li>
                    ) : (
                        summaries.map((s, i) => (
                            <li key={i} tabIndex={0}>{s}</li>
                        ))
                    )}
                </ul>
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
