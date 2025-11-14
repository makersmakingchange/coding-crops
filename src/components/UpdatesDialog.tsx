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
    const dialogRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // Focus trap
    useEffect(() => {
        if (isOpen && dialogRef.current) {
            const previouslyFocused = document.activeElement as HTMLElement;
            dialogRef.current.focus();

            return () => previouslyFocused?.focus();
        }
    }, [isOpen]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose();

        if (['ArrowUp', 'ArrowDown'].includes(e.key) && listRef.current) {
            const items = Array.from(listRef.current.querySelectorAll('li'));
            const active = document.activeElement;
            const index = items.findIndex(item => item === active);

            if (e.key === 'ArrowUp' && index > 0) items[index - 1].focus();
            if (e.key === 'ArrowDown' && index < items.length - 1) items[index + 1].focus();

            e.preventDefault();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="updates-dialog-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="updates-title"
            onKeyDown={handleKeyDown}
            ref={dialogRef}
            tabIndex={-1}
        >
            <div className="updates-dialog">
                <h2 id="updates-title">Farm Updates</h2>

                {warnings.length > 0 && (
                    <div role="alert" className="warning-section">
                        <h3>Warnings</h3>
                        <ul>
                            {warnings.map((w, i) => (
                                <li key={i} tabIndex={0}>{w}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <ul ref={listRef}>
                    {summaries.map((s, i) => (
                        <li key={i} tabIndex={0}>{s}</li>
                    ))}
                </ul>

                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>
    );
};

export default UpdatesDialog;