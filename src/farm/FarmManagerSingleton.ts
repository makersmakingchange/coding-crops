/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import { FarmManager } from './FarmManager';
import AudioManager from "../audio/AudioManager";

declare global {
    interface Window {
        farmManager: FarmManager;
    }
}

const farmManager = new FarmManager();

AudioManager.initialize();

if (typeof window !== 'undefined') {
    window.farmManager = farmManager;
}

export default farmManager;
