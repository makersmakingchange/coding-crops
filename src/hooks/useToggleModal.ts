/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useEffect} from "react";
import AudioManager, {SoundEffect} from "../audio/AudioManager";

export function useToggleModal(
    dialogRef: React.RefObject<HTMLDialogElement | null>,
    isOpen: boolean,
) {
    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement;
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) {
            AudioManager.play(SoundEffect.OpenModal);
            dialog.showModal();
        }
        if (!isOpen && dialog.open) dialog.close();

        return () => {
            if (previouslyFocused) {
                previouslyFocused.focus();
            }
        };
    }, [isOpen, dialogRef]);
}