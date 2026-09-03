import {useRef} from "react";
import {useToggleModal} from "../hooks/useToggleModal";
import AudioManager, {SoundEffect} from "../audio/AudioManager";
import {useKeyboardShortcuts} from "../hooks/useKeyboardShortcuts";
import {focusBlocklyToolbox, focusBlocklyWorkspace, toggleShortcutDialog} from "../blockly/blocklySetup";

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
                                                 isOpen,
                                                 onClose,
                                             }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useToggleModal(dialogRef, isOpen);
    if (!isOpen) return null;

    const handleCancel = (e: React.SyntheticEvent) => {
        e.preventDefault();
        AudioManager.play(SoundEffect.OpenModal);
        onClose();
    };

    return (
        <dialog
            ref={dialogRef}
            className="info-modal"
            aria-labelledby="info-title"
            aria-describedby="info-description"
            onCancel={handleCancel}
        >
            <h2 id="info-title">Welcome!</h2>

            <div
                className="info-description">
                <p>
                    Welcome to Coding Crops, where we use code to harvest crops! Crops take 2 days to fully grow, and must be watered each day.
                    Once they are fully grown, they can be harvested using the harvest block.
                    <br/><br/>
                    Some keyboard shortcuts that can help you get around the page include:
                    <br/>
                    <kbd>W</kbd> for workspace,
                    <br/>
                    <kbd>T</kbd> for toolbox,
                    <br/>
                    <kbd>Alt</kbd>
                    <span className="sr-only">and</span>
                    <span aria-hidden="true"> + </span>
                    <kbd>Shift</kbd>
                    <span className="sr-only">then</span>
                    <span aria-hidden="true"> + </span>
                    <kbd>A</kbd> to toggle screen reader mode,
                    <br/>
                    <kbd>/</kbd> for the shortcuts menu,
                    <br/>
                    <kbd>Ctrl</kbd>
                    <span className="sr-only">and</span>
                    <span aria-hidden="true"> + </span>
                    <kbd>/</kbd> to open the command palette.
                </p>
            </div>

            <form method="dialog" className="dialog-footer">
                <button
                    type="button"
                    className="close-button"
                    onClick={onClose}
                >
                    Close
                </button>
            </form>
        </dialog>
    );
};

export default InfoModal;