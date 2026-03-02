import React, {useEffect} from "react";
import type {Command} from "../components/CommandPalette";

export function useToggleDialog(
    dialogRef: React.RefObject<HTMLDialogElement | null>,
    isOpen: boolean,
    actionCommand?: React.RefObject<Command | null>
) {
    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement;
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) dialog.showModal();
        if (!isOpen && dialog.open) dialog.close();

        return () => {
            if (actionCommand?.current) actionCommand.current.action();
            else previouslyFocused?.focus();
        }
    }, [isOpen]);
}