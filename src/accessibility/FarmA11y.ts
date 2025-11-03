import { CropType, GrowthStage, TileState } from "../farm/Tile";

export default class FarmA11y {
    private static summaries: string[] = [];

    // Announce a single event
    static announceEvent(text: string) {
        this.summaries.push(text);
        return text; // for screen reader live region
    }

    // Get all summaries (for display)
    static getSummaries(): string[] {
        return this.summaries;
    }

    // Clear summaries (on reset)
    static reset() {
        this.summaries = [];
    }

    // Generate a text summary of the farm’s current state
    static generateDaySummary(day: number, tiles: TileState[][]): string {
        const flat = tiles.flat();

        const planted = flat.filter(t => t.type !== null);
        const growing = planted.filter(t => t.growthStage === GrowthStage.GROWING).length;
        const mature = planted.filter(t => t.growthStage === GrowthStage.MATURE).length;
        const seedling = planted.filter(t => t.growthStage === GrowthStage.SEEDLING).length;

        const summary = `Day ${day}: ${planted.length} plants total. ${seedling} seedlings, ${growing} growing, ${mature} mature.`;

        this.summaries.push(summary);
        return summary;
    }

    // Generate accessible label for a tile
    static getTileLabel(row: number, col: number, tile: TileState): string {
        const crop = tile.type !== null ? CropType[tile.type] : "No crop";
        const stage = GrowthStage[tile.growthStage];
        return `${stage}, ${crop}`;
    }
}
