import { CropType, GrowthStage, TileState } from "../farm/Tile";

function extractDay(summary: string): number | null {
    const regex = /^Day (\d+)/;  // Regex pattern to match "Day" followed by the number
    const match = summary.match(regex);

    if (match) {
        return parseInt(match[1], 10);  // Extract and parse the day as a number
    }

    return null;  // Return null if no match is found
}

export default class FarmA11y {
    private static summaries: string[] = [];
    private static quickSummaries: string[] = [];

    // Announce a single event
    static announceEvent(text: string) {
        this.summaries.push(text);
        return text; // for screen reader live region
    }

    // Get all summaries (for display)
    static getQuickSummaries(): string[] {
        return this.quickSummaries;
    }

    // Clear summaries (on reset)
    static reset() {
        this.quickSummaries = [];
    }

    static generateEndOfDaySummary(day: number, harvestCount: number, tiles: TileState[][]): string {
        const lastSummary = this.quickSummaries[this.quickSummaries.length - 1];

        // Regex to match end-of-day summary format
        const endOfDayPattern = /^Day \d+, \d+ plants total\./;

        // Only remove last summary if it's the same day AND matches end-of-day format
        if (lastSummary && extractDay(lastSummary) === day && endOfDayPattern.test(lastSummary)) {
            console.log("quickSummary (removed):", lastSummary);
            this.quickSummaries.pop();
        }

        const flat = tiles.flat();

        const planted = flat.filter(t => t.type !== null);
        const growing = planted.filter(t => t.growthStage === GrowthStage.GROWING).length;
        const mature = planted.filter(t => t.growthStage === GrowthStage.MATURE).length;
        const seedling = planted.filter(t => t.growthStage === GrowthStage.SEEDLING).length;

        const summary = `Day ${day}, ${planted.length} plants total. ${seedling} seedlings, ${growing} growing, ${mature} mature. ${harvestCount} crops harvested.`;

        this.quickSummaries.push(summary);
        return summary;
    }


    // Generate a text summary of the farm’s current state
    static generateDaySummary(day: number, harvestCount: number, tiles: TileState[][]): string {
        const flat = tiles.flat();

        const planted = flat.filter(t => t.type !== null);
        const growing = planted.filter(t => t.growthStage === GrowthStage.GROWING).length;
        const mature = planted.filter(t => t.growthStage === GrowthStage.MATURE).length;
        const seedling = planted.filter(t => t.growthStage === GrowthStage.SEEDLING).length;

        const summary = `Day ${day}, ${planted.length} plants total. ${seedling} seedlings, ${growing} growing, ${mature} mature. ${harvestCount} crops harvested.`;

        this.summaries.push(summary);
        return summary;
    }

    // Generate accessible label for a tile
    static getTileLabel(row: number, col: number, tile: TileState): string {
        const crop = tile.type !== null ? CropType[tile.type] : "No crop";
        const stage = GrowthStage[tile.growthStage];
        const watered = tile.watered ? "Watered" : "Not watered";
        return `${stage}, ${crop}, ${watered}`;
    }
}
