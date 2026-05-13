/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

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
        const flat = tiles.flat();
        const planted = flat.filter(t => t.type !== null);

        const counts = {
            seedlings: planted.filter(t => t.growthStage === GrowthStage.SEEDLING).length,
            growing: planted.filter(t => t.growthStage === GrowthStage.GROWING).length,
            mature: planted.filter(t => t.growthStage === GrowthStage.MATURE).length,
            harvested: harvestCount
        };

        const details = [
            counts.seedlings > 0 && `${counts.seedlings} seedlings`,
            counts.growing > 0 && `${counts.growing} growing`,
            counts.mature > 0 && `${counts.mature} mature`,
            counts.harvested > 0 && `${counts.harvested} crops harvested`
        ].filter(Boolean);

        const summary =
            `Day ${day}, ${planted.length} plants total.` +
            (details.length ? ` ${details.join(", ")}.` : "");

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
        return `Row ${row + 1}, Column ${col + 1}, ${stage}, ${crop}, ${watered}`;
    }
}
