export interface ContentInput {
    text: string;
    className: string;
}

export interface ContentPart {
    text: string;
    blockType?: string;
    inputs?: ContentInput[];
    className?: string;
}

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

        const inputs: ContentInput[] = [];

        // Match:
        // (pumpkin)
        // (row number)[block-variables]
        const inputRegex = /\((.*?)\)(?:\[(.*?)\])?/g;

        let inputMatch: RegExpExecArray | null;

        while ((inputMatch = inputRegex.exec(blockText))) {
            inputs.push({
                text: inputMatch[1],
                className: [
                    "block-input",
                    inputMatch[2]
                ].filter(Boolean).join(" ")
            });
        }

        parts.push({
            text: blockText,
            blockType: blockText,
            inputs,
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

export function returnStepLabel(content: string) {
    return content
        .replace(/\[.*?\]/g, '')
        .replace(/[{}()]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}
