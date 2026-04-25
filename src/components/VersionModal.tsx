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
                    <b>v{__APP_VERSION__}</b>
                    {"\n"}• blockly: add-screen-reader-support-experimental
                    {"\n"}• blockly-keyboard-experimentation: add-screen-reader-support-experimental
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