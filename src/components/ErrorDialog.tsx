import React, { useEffect, useRef } from 'react';
import '../styles/ErrorDialog.css';

interface ErrorDialogProps {
    message: string | null;
    onClose: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ message, onClose }) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (message && dialogRef.current) {
            const previous = document.activeElement as HTMLElement;
            dialogRef.current.focus();
            return () => previous?.focus();
        }
    }, [message]);

    if (!message) return null;

    return (
        <div
            className="error-dialog-overlay"
            role="alertdialog"
            aria-modal="true"
            ref={dialogRef}
            tabIndex={-1}
        >
            <div className="error-dialog">
                <h2>Error</h2>
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default ErrorDialog;