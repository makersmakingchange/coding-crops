/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { useToggleModal } from "../hooks/useToggleModal";
import blocklyAttr from '../assets/built-with-blockly-badge.png';
import mmcLogo from '../assets/MMC_Logo_White.svg';
import nssLogo from '../assets/NSS_Logo_White.svg';
import AudioManager, {SoundEffect} from "../audio/AudioManager";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export function VersionModal({ isOpen, onClose }: Props) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useToggleModal(dialogRef, isOpen);

    const handleCancel = (e: React.SyntheticEvent) => {
        e.preventDefault();
        AudioManager.play(SoundEffect.OpenModal);
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
                    Blockly is an open-source developer library from the Raspberry Pi Foundation, originally developed at Google. It creates a visual programming interface that uses drag-and-drop blocks.
                    Read more about our project <a href="https://www.makersmakingchange.com/blockly">here</a>.

                    {"\n"}
                    {"\n"}<b>v{__APP_VERSION__}</b>
                    {"\n"}• blockly: v{__BLOCKLY_VERSION__}
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

                    {"\n"}
                    {"\n"}@license
                    {"\n"} Copyright 2025 Makers Making Change
                    {"\n"} SPDX-License-Identifier: Apache-2.0
                </div>
            </div>
            <div className="cc-attr">
                <a href="https://codingcrops.com/">CodingCrops</a> © 2025 by <a
                href="https://www.makersmakingchange.com/">Makers Making Change</a> is licensed under <a
                href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> <img
                src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt=""
                style={{
                    maxWidth: "1em",
                    maxHeight: "1em",
                    marginLeft: ".2em"}}/><img
                src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt=""
                style={{
                    maxWidth: "1em",
                    maxHeight: "1em",
                    marginLeft: ".2em"}}/><img
                src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt=""
                style={{
                    maxWidth: "1em",
                    maxHeight: "1em",
                    marginLeft: ".2em"}}/>
            </div>
            <br/>
            <div className="attr-icons">
                <a href="https://www.blockly.com" target="_blank" rel="noopener noreferrer">
                    <img src={blocklyAttr} alt="Blockly website" className="built-with-blockly-badge" aria-hidden="true"/>
                </a>
                <a href="https://www.makersmakingchange.com/" target="_blank" rel="noopener noreferrer">
                    <img src={mmcLogo} alt="Makers Making Change website" className="nss-mmc-logo" aria-hidden="true"/>
                </a>
                <a href="https://www.neilsquire.ca/" target="_blank" rel="noopener noreferrer">
                    <img src={nssLogo} alt="Neil Squire Society website" className="nss-mmc-logo" aria-hidden="true"/>
                </a>
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