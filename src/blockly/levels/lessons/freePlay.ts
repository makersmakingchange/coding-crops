/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import {BlockDef, processBlocks} from "../../levelManager";

// Define your level blocks in order
const freePlayBlocks: BlockDef[] = [
];

export const freePlay = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(freePlayBlocks)],
    },
};
