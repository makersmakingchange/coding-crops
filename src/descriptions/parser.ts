export interface ContentPart {
    text: string;
    blockType?: string;
}

export const blockTypes: Record<string, Record<string, string>> = {
    "harvest": { className: "block-harvest" },
    "plant": { className: "block-plant" },
    "water": { className: "block-water" },
    "next day": { className: "block-next-day" },
    "Run All Days": { className: "button-run-all-days" },
    "Run One Day": { className: "button-run-one-day" },
    "begin": {className: "block-begin"},
    "Farm": {className: "category-farm"}
};

export function parseContent(content: string): ContentPart[] {
    const regex = /\{(.*?)}/g;
    const parts: ContentPart[] = [];

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content))) {
        if (match.index > lastIndex) {
            parts.push({ text: content.slice(lastIndex, match.index) });
        }

        const matchedType = Object.keys(blockTypes).find(type => {
            if (match) {
                return match[1].includes(type);
            }
            return false;
        });

        parts.push({
            text: match[1],
            blockType: matchedType ? matchedType : match[1],
        });

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
        parts.push({ text: content.slice(lastIndex) });
    }

    return parts;
}