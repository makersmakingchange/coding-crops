export default class A11yAnnouncer {
    private static liveRegion: HTMLElement | null = null;

    static register(el: HTMLElement | null) {
        this.liveRegion = el;
    }

    static announce(message: string, delay = 50) {
        if (!this.liveRegion) return;
        this.liveRegion.textContent = '';
        setTimeout(() => {
            if (this.liveRegion) this.liveRegion.textContent = message;
        }, delay);
    }

    static announceAll(messages: string[], delay = 50) {
        this.announce(messages.join('. '), delay);
    }
}