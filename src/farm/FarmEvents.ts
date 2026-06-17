/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

export const FarmEvents = {
    dispatch: {
        resetSummaries: () => window.dispatchEvent(new CustomEvent('farm:reset-summaries')),
        endDay: () => window.dispatchEvent(new CustomEvent('farm:end-day')),
        error: (msg: string) => window.dispatchEvent(new CustomEvent('farm:error', { detail: msg })),
        update: (detail: object) => window.dispatchEvent(new CustomEvent('farm:update', { detail })),
    },
    on: (event: string, handler: EventListener) => window.addEventListener(event, handler),
    off: (event: string, handler: EventListener) => window.removeEventListener(event, handler),
} as const;