/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import App from "./App";
import {useEffect, useState} from "react";
import { KeyOSD } from "@microbit/keyosd";

function Testing() {
    useEffect(() => {
        const keyosd = new KeyOSD({
            container: document.body, // Container element (default: document.body)
            enabled: true, // Start capturing immediately (default: true)
            anchor: "bottom-left", // Corner to anchor to (default: "bottom-right")
        });

        return () => keyosd.destroy();
    }, []);

    return (
        <>
            <App />
        </>
    );
}

export default Testing;