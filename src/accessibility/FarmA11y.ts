/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import { CropType, GrowthStage, TileState } from "../farm/Tile";
import farmManager from "../farm/FarmManagerSingleton";

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
        return text;
    }

    // Get all summaries (for display)
    static getQuickSummaries(): string[] {
        return this.quickSummaries;
    }

    // Get detailed summaries
    static getSummaries(): string[] {
        return this.summaries;
    }

    // Clear summaries (on reset)
    static reset() {
        this.quickSummaries = [];
        this.summaries = [];
    }

    private static getCropName(type: CropType, count: number): string {
        switch (type) {
            case CropType.Corn:
                return count === 1 ? "Corn" : "Corn";

            default:
                return `${CropType[type]}${count !== 1 ? "s" : ""}`;
        }
    }

    private static getStageSummary(
        tiles: TileState[],
        stage: GrowthStage,
        stageName: string
    ): string {
        const crops = new Map<CropType, number>();

        for (const tile of tiles) {
            if (tile.type === null || tile.growthStage !== stage) {
                continue;
            }

            crops.set(
                tile.type,
                (crops.get(tile.type) ?? 0) + 1
            );
        }

        if (crops.size === 0) {
            return "";
        }

        const description = [...crops.entries()]
            .map(([type, count]) =>
                `${count} ${this.getCropName(type, count)}`
            )
            .join(", ");

        return `${stageName}: ${description}`;
    }

    static getHarvestSummary(
        harvestedByCrop: Record<CropType, number>,
    ): string {
        const harvested = Object.entries(harvestedByCrop)
            .map(([type, count]) => ({
                type: Number(type) as CropType,
                count
            }))
            .filter(({ count }) => count > 0)
            .map(({ type, count }) =>
                `${farmManager.getCropEmoji(type)} : ${count}`
            );

        if (harvested.length === 0) {
            return "";
        }
        return `Harvested: ${harvested.join(", ")}`;
    }

    static getHarvestLabel(
        harvestedByCrop: Record<CropType, number>,
    ): string {
        const harvested = Object.entries(harvestedByCrop)
            .map(([type, count]) => ({
                type: Number(type) as CropType,
                count
            }))
            .map(({ type, count }) =>
                `${count} ${this.getCropName(type, count)}`
            );

        return `Harvested ${harvested.join(", ")}`;
    }

    static generateEndOfDaySummary(
        day: number,
        harvestedByCrop: Record<CropType, number>,
        tiles: TileState[][]
    ): string {
        const flat = tiles.flat();
        const planted = flat.filter(t => t.type !== null);

        const details = [
            this.getStageSummary(planted, GrowthStage.SEEDLING, "Seedling"),
            this.getStageSummary(planted, GrowthStage.GROWING, "Growing"),
            this.getStageSummary(planted, GrowthStage.MATURE, "Mature"),
        ].filter(Boolean);

        const harvested = this.getHarvestSummary(harvestedByCrop);

        const summary =
            `Day ${day}, ${planted.length} plants total.` +
            (details.length ? ` ${details.join(". ")}.` : "") +
            (harvested ? ` ${harvested}.` : "");

        this.quickSummaries.push(summary);
        this.summaries.push(summary);

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
