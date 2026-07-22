export interface ContentPart {
    text: string;
    blockType?: string;
}

export const blockTypes: Record<string, Record<string, string>> = {
    "Harvest": { className: "block-harvest" },
    "Plant": { className: "block-plant" },
    "Water": { className: "block-water" },
    "Next Day": { className: "block-next-day" },
    "Run All Days": { className: "button-run-all-days" },
    "Run One Day": { className: "button-run-one-day" },
};

export function parseContent(content: string): ContentPart[] {
    const regex = /\[(.*?)\]/g;
    const parts: ContentPart[] = [];

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content))) {
        if (match.index > lastIndex) {
            parts.push({ text: content.slice(lastIndex, match.index) });
        }

        parts.push({
            text: match[1],
            blockType: match[1],
        });

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
        parts.push({ text: content.slice(lastIndex) });
    }

    return parts;
}