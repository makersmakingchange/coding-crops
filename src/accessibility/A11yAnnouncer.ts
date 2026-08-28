/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

export default class A11yAnnouncer {
    private static liveRegion: HTMLElement | null = null;
    private static timeout: ReturnType<typeof setTimeout> | null = null;

    static register(el: HTMLElement | null) {
        this.liveRegion = el;
    }

    static announce(message: string, delay = 10) {
        if (!this.liveRegion) return;

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.liveRegion.textContent = '';

        this.timeout = setTimeout(() => {
            if (this.liveRegion) {
                this.liveRegion.textContent = message;
            }
        }, delay);
    }

    static announceAll(messages: string[], delay = 50) {
        this.announce(messages.join('. '), delay);
    }
}
