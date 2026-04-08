import React, { useRef } from "react";
import { useToggleModal } from "../hooks/useToggleModal";
import blocklyAttr from '../assets/built-with-blockly-badge.png';
import mmcLogo from '../assets/MMC_Logo_White.svg';
import nssLogo from '../assets/NSS_Logo_White.svg';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export function VersionModal({ isOpen, onClose }: Props) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useToggleModal(dialogRef, isOpen);

    const handleCancel = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <dialog ref={dialogRef}
                onClose={onClose}
                className="version-modal"
                onCancel={handleCancel}
        >
            <h2>Application Info</h2>

            <div className="version-modal-content">
                <div style={{ whiteSpace: "pre-line" }}>
                    v{__APP_VERSION__}
                    {"\n"}• blockly: {__BLOCKLY_VERSION__}
                    {"\n"}• blockly-keyboard-experimentation: {__PLUGIN_VERSION__}
                    {"\n"}• Commit: {__GIT_HASH__}
                    {"\n"}• Build:{" "}
                    {new Date(__BUILD_DATE__).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })}
                </div>
            </div>
            <br />
            <div className="attr-icons">
                <img src={blocklyAttr} alt="Built with Blockly" className="built-with-blockly-badge" aria-hidden="true"/>
                <img src={mmcLogo} alt="Makers Making Change logo" className="nss-mmc-logo" aria-hidden="true"/>
                <img src={nssLogo} alt="Neil Squire Society logo" className="nss-mmc-logo" aria-hidden="true"/>
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
}

export default VersionModal;