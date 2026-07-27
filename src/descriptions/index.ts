/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import level1 from "./level1.json";
import level2 from "./level2.json";
import level3 from "./level3.json";
import basic from "./basic.json";


interface Description {
    steps: Step[];
    level: number | string;
}

export interface Step {
    title: string;
    content: string;
}

export const descriptions: Record<number | string, Description> = {
    1: level1,
    2: level2,
    3: level3,
    basic: basic,
};