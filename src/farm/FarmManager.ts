import {CropType, Tile, TileState} from "./Tile";

export class FarmManager {
    private day: number;
    private harvestCount: number = 0;
    private gridSize: number;
    private grid: Tile[][];
    private listeners: (() => void)[] = [];

    private actionQueue: (() => void)[] = [];
    private processingQueue = false;

    private generatedCode: string | null = null;
    private isPausedAtNextDay: boolean = false;

    constructor() {
        this.day = 1;
        this.isPausedAtNextDay = false;
        this.harvestCount = 0;
        this.gridSize = 3;
        this.grid = this.initializeGrid();
    }

    hasActions = () => this.actionQueue.length > 0;

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
            row.map(tile => ({...tile.getTileState()})) // clone the object
        );
    }

    getDay(): number { return this.day; }
    getCropsHarvested(): number { return this.harvestCount; }

    plant(row: number, col: number): boolean {
        const r = row - 1;
        const c = col - 1;

        if (!this.isValidCoordinate(r, c)) {
            console.log(`Invalid coordinates: ${row},${col}`); // original values
            return false;
        }

        const tile = this.grid[r][c];
        if (!tile.plant(CropType.Sunflower)) {
            console.log(`Cannot plant: Tile at ${row},${col} already has a plant`);
            return false;
        }

        this.notify();
        return true;
    }

    harvest(row: number, col: number): boolean {
        const r = row - 1;
        const c = col - 1;

        if (!this.isValidCoordinate(r, c)) {
            console.log(`Invalid coordinates: ${row},${col}`);
            return false;
        }

        const tile = this.grid[r][c];
        if (!tile.harvest()) {
            console.log(`Nothing to harvest at ${row},${col}`);
            return false;
        }

        this.harvestCount++;
        this.notify();
        return true;
    }


    water(row: number, col: number): boolean {
        const r = row - 1;
        const c = col - 1;

        if (!this.isValidCoordinate(r, c)) {
            console.log(`Invalid coordinates: ${row},${col}`);
            return false;
        }

        const tile = this.grid[r][c];
        if (!tile.water()) {
            console.log(`Tile at ${row},${col} is empty`);
            return false;
        }

        this.notify();
        return true;
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
        this.harvestCount = 0;
        this.grid = this.initializeGrid();
        this.generatedCode = null;
        this.processingQueue = false;
        this.isPausedAtNextDay = false;
        this.actionQueue = [];
        this.notify();
    }

    enqueue(action: (() => void) & { isNextDay?: boolean }) {
        this.actionQueue.push(action);
    }

    // Enqueue a function that will run the next day
    enqueueNextDay() {
        const nextDayFn = (() => this.nextDay()) as (() => void) & { isNextDay?: boolean };
        nextDayFn.isNextDay = true;
        this.enqueue(nextDayFn);
    }

    private async processQueue() {
        if (this.processingQueue) return;  // Prevent concurrent queue processing
        this.processingQueue = true;

        while (this.actionQueue.length > 0) {
            const action = this.actionQueue.shift()!;

            action();

            // Wait for one frame to allow React to re-render before continuing
            await new Promise(r => setTimeout(r, 300));
        }

        this.processingQueue = false;
    }

    // Store generated code
    storeGeneratedCode(code: string) {
        this.generatedCode = code;
    }

    // Execute the generated code actions
    executeGeneratedCode() {
        if (!this.generatedCode) return;

        const farmManager = this;
        new Function("farmManager", this.generatedCode)(farmManager);
    }

    // Run all blocks in the workspace
    runAllDays() {
        if (!this.generatedCode) return;

        try {
            console.log("Running all blocks:\n", this.generatedCode);

            this.executeGeneratedCode();

            // Execute all actions in the queue
            this.processQueue();

        } catch (err) {
            console.error("Error running all days:", err);
            window.dispatchEvent(
                new CustomEvent("farm:error", {detail: String(err)})
            );
        }
    }

    // Run up to the block/action before Next Day until the next click
    async runDay() {
        if (this.actionQueue.length === 0) {
            console.log("No actions left.");
            this.isPausedAtNextDay = false;
            return;
        }

        try {
            while (this.actionQueue.length > 0) {
                const action = this.actionQueue[0]!;
                console.log("Running action:", action);

                if ((action as any).isNextDay) {
                    if (!this.isPausedAtNextDay) {
                        console.log("Next Day block reached. Pausing until next click.");
                        this.isPausedAtNextDay = true;
                        return;
                    } else {
                        console.log("Executing nextDay now.");
                        this.actionQueue.shift()!();
                        await new Promise(r => setTimeout(r, 300));
                        this.isPausedAtNextDay = false;
                    }
                }

                if (this.actionQueue.length > 0) {
                    this.actionQueue.shift()!();
                    await new Promise(r => setTimeout(r, 300));
                }
            }
        } catch (err) {
            window.dispatchEvent(
                new CustomEvent("farm:error", {detail: String(err)})
            );
        }
    }
}