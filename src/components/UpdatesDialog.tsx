import React, { useEffect, useRef } from 'react';
import '../styles/UpdatesDialog.css';
import { Warning } from '../types';

interface UpdatesDialogProps {
    isOpen: boolean;
    onClose: () => void;
    summaries: string[];
    warnings?: Warning[];
}

const UpdatesDialog: React.FC<UpdatesDialogProps> = ({
                                                         isOpen,
                                                         onClose,
                                                         summaries,
                                                         warnings = [],
                                                     }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement;
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            if (!dialog.open) dialog.showModal();
        } else {
            if (dialog.open) dialog.close();
        }
        return () => previouslyFocused?.focus();
    }, [isOpen]);

    const handleCancel = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <dialog
            ref={dialogRef}
            className="updates-dialog"
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

            <div className="updates-dialog-content">
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

export default UpdatesDialog;
