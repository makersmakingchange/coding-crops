/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

declare const __APP_VERSION__: string;
declare const __PLUGIN_VERSION__: string;
declare const __BLOCKLY_VERSION__: string;
declare const __GIT_HASH__: string;
declare const __BUILD_DATE__: string;

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const value: string;
    export default value;
}
