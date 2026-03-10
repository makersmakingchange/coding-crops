import { useEffect } from 'react';

type ShortcutMap = Record<string, () => void>;

export function useKeyboardShortcuts(shortcuts: ShortcutMap, altModifier = false, ctrlModifier = false, timeout = 500) {
    useEffect(() => {
        let buffer = '';
        let timer: number | undefined;

        const isTypingTarget = (el: EventTarget | null): boolean => {
            if (!(el instanceof HTMLElement)) return false;
            return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable;
        };

        const handler = (e: KeyboardEvent) => {
            const cmdOrCtrl = e.metaKey || e.ctrlKey;
            if (e.repeat || isTypingTarget(e.target)) return;
            if (altModifier && !e.altKey) return;
            if (ctrlModifier && !cmdOrCtrl) return;

            // Detect if it's a Ctrl + / or just /
            if (cmdOrCtrl && e.key === '/') {
                e.preventDefault();
                if (shortcuts['ctrl+/']) {
                    shortcuts['ctrl+/']();  // Execute the Ctrl + / shortcut
                }
                return;
            }

            buffer += e.key.toLowerCase();

            if (timer) window.clearTimeout(timer);
            timer = window.setTimeout(() => (buffer = ''), timeout);

            for (const seq in shortcuts) {
                if (buffer.endsWith(seq)) {
                    e.preventDefault();
                    buffer = '';
                    shortcuts[seq]();
                    break;
                }
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [shortcuts]);
}