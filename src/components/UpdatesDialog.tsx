import React, { useEffect, useRef } from 'react';
import '../styles/UpdatesDialog.css';

interface UpdatesDialogProps {
    isOpen: boolean;
    onClose: () => void;
    summaries: string[];
    warnings?: string[];
}

const UpdatesDialog: React.FC<UpdatesDialogProps> = ({
                                                         isOpen,
                                                         onClose,
                                                         summaries,
                                                         warnings = [],
                                                     }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const listRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            if (!dialog.open) dialog.showModal();
        } else {
            if (dialog.open) dialog.close();
        }
    }, [isOpen]);

    // Close dialog on cancel (ESC or backdrop click)
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
                        {warnings.map((w, i) => (
                            <li key={i} tabIndex={0}>{w}</li>
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
                            <li ref={listRef}
                                key={i}
                                tabIndex={0}>{s}</li>
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
