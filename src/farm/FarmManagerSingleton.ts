/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import { FarmManager } from './FarmManager';

declare global {
    interface Window {
        farmManager: FarmManager;
    }
}

const farmManager = new FarmManager();

if (typeof window !== 'undefined') {
    window.farmManager = farmManager;
}

export default farmManager;
