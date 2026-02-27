import React, {useEffect} from "react";

export function useToggleDialog(
    dialogRef: React.RefObject<HTMLDialogElement | null>,
    isOpen: boolean
) {
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
}