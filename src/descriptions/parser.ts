export interface ContentPart {
    text: string;
    blockType?: string;
    inputs?: string[];
    className?: string;
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
    const regex = /\{(.*?)\}(?:\[(.*?)\])?/g;
    const parts: ContentPart[] = [];

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content))) {
        if (match.index > lastIndex) {
            parts.push({
                text: content.slice(lastIndex, match.index)
            });
        }

        const blockText = match[1];
        const className = match[2];

        const matchedType = Object.keys(blockTypes).find(type =>
            blockText.includes(type)
        );

        const subParts = [...blockText.matchAll(/\((.*?)\)/g)]
            .map(match => match[1]);

        parts.push({
            text: blockText,
            blockType: matchedType ?? blockText,
            inputs: subParts,
            className
        });

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
        parts.push({
            text: content.slice(lastIndex)
        });
    }

    return parts;
}