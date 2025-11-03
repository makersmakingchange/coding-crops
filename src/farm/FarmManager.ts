import { CropType, GrowthStage, Tile, TileState } from "./Tile";

export class FarmManager {
    private day: number;
    private gridSize: number;
    private grid: Tile[][];
    private listeners: (() => void)[] = [];

    private actionQueue: (() => void)[] = [];
    private processingQueue = false;

    constructor() {
        this.day = 1;
        this.gridSize = 3;
        this.grid = this.initializeGrid();
    }

    subscribe(listener: () => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(fn => fn !== listener);
        };
    }

    private notify() {
        this.listeners.forEach(fn => fn());
    }

    initializeGrid(): Tile[][] {
        const grid: Tile[][] = [];
        for (let i = 0; i < this.gridSize; i++) {
            const row = [];
            for (let j = 0; j < this.gridSize; j++) {
                row.push(new Tile());
            }
            grid.push(row);
        }
        return grid;
    }

    getTileState(): TileState[][] {
        return this.grid.map(row =>
            row.map(tile => ({ ...tile.getTileState() })) // clone the object
        );
    }

    getDay(): number {
        return this.day;
    }

    plant(row: number, col: number): boolean {
        if (this.isValidCoordinate(row, col)) {
            if (this.grid[row][col].plant(CropType.Sunflower)) {
                this.notify()
                return true;
            } else {
                console.log(`Cannot plant: Tile at ${row},${col} already has a plant`);
            }
        } else {
            console.log(`Invalid coordinates: ${row},${col}`);
        }
        return false;
    }

    harvest(row: number, col: number) {
        if (this.isValidCoordinate(row, col)) {
            if (this.grid[row][col].harvest()) {
                this.notify();
                return true;
            } else {
                console.log(`Nothing to harvest at ${row},${col}`);
            }
        } else {
            console.log(`Invalid coordinates: ${row},${col}`);
        }
        return false;
    }

    water(row: number, col: number) {
        if (this.isValidCoordinate(row, col)) {
            if (this.grid[row][col].water()) {
                this.notify();
                return true;
            }
            console.log(`Tile at ${row},${col} is empty`);
        } else {
            console.log(`Invalid coordinates: ${row},${col}`);
        }
        return false;
    }

    nextDay() {
        this.day++;

        for (const row of this.grid) {
            for (const tile of row) {
                tile.nextDay();
            }
        }
        this.notify();
    }

    isValidCoordinate(row: number, col: number): boolean {
        return row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize;
    }

    reset(): void {
        this.day = 1;
        this.grid = this.initializeGrid();
        this.notify();
    }

    enqueue(action: () => void) {
        this.actionQueue.push(action);
        this.processQueue();
    }

    private async processQueue() {
        if (this.processingQueue) return; // already running
        this.processingQueue = true;

        while (this.actionQueue.length > 0) {
            const action = this.actionQueue.shift()!;
            action();
            // Wait one frame before next action so React can re-render
            await new Promise(r => setTimeout(r, 300));
        }

        this.processingQueue = false;
    }
}