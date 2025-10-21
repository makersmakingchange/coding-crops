import { CropType, GrowthStage, Tile } from "./Tile";

export class FarmManager {
    private day: number;
    private gridSize: number;
    private grid: any[];

    constructor() {
        this.day = 1;
        this.gridSize = 3;
        this.grid = [];
        this.initializeGrid();

        this.updateUI();
    }

    initializeGrid() {
        this.grid = [];
        for (let i = 0; i < this.gridSize; i++) {
            const row = [];
            for (let j = 0; j < this.gridSize; j++) {
                row.push(new Tile());
            }
            this.grid.push(row);
        }
    }

    plant(row: number, col: number) {
        if (this.isValidCoordinate(row, col)) {
            if (this.grid[row][col].plant(CropType.Sunflower)) {
                this.updateUI();
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
                this.updateUI();
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
                this.updateUI();
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

        // Process growth for all plants
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const tile = this.grid[i][j];

                if (tile.crop && tile.watered) {
                    // Plants grow if watered
                    if (tile.growthStage < 3) {
                        tile.growthStage++;

                        // Update plant emoji based on growth stage
                        if (tile.growthStage === 1) {
                            tile.crop = '🌱'; // Seedling
                        } else if (tile.growthStage === 2) {
                            tile.crop = '🌿'; // Growing
                        } else if (tile.growthStage === 3) {
                            tile.crop = '🌻'; // Mature
                        }
                    }
                }

                // Reset watering for the next day
                tile.watered = false;
            }
        }

        this.updateUI();
        return this.day;
    }

    isValidCoordinate(row: number, col: number) {
        return row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize;
    }


    updateUI() {
        // Update day counter
        // @ts-ignore
        let dayCount = document.getElementById('dayCount').textContent;
        if (dayCount) {
            dayCount = this.day.toString();
        }

        // Update farm grid
        const farmGrid = document.getElementById('farmGrid');
        // @ts-ignore
        farmGrid.innerHTML = '';

        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                if (this.grid[i][j].watered) {
                    tile.classList.add('watered');
                }

                if (this.grid[i][j].crop) {
                    tile.textContent = this.grid[i][j].crop;
                }

                // Add data attributes for position
                tile.dataset.row = i.toString();
                tile.dataset.col = j.toString();

                this.labelTile(i, j, tile);

                // Add click handler for debugging/manual interaction
                tile.addEventListener('change', () => {
                    console.log(`Updated tile at ${i},${j}`);
                    console.log(this.grid[i][j]);
                });

                // @ts-ignore
                farmGrid.appendChild(tile);
            }
        }
    }

    reset() {
        this.day = 1;
        this.initializeGrid();
        this.updateUI();
    }

    labelTile(i : number, j : number, tile : HTMLElement) {
        tile.tabIndex = 0;
        tile.setAttribute('role', 'button');

        // Add descriptive aria label
        let ariaLabel = `Farm tile at row ${i+1}, column ${j+1}`;
        if (this.grid[i][j].crop) {
            ariaLabel += `, contains ${this.grid[i][j].crop}`;
            if (this.grid[i][j].growthStage === 1) {
                ariaLabel += ' seedling';
            } else if (this.grid[i][j].growthStage === 2) {
                ariaLabel += ' growing plant';
            } else if (this.grid[i][j].growthStage === 3) {
                ariaLabel += ' mature plant';
            }
        } else {
            ariaLabel += ', empty';
        }
        if (this.grid[i][j].watered) {
            ariaLabel += ', watered';
        } else {
            ariaLabel += ', not watered';
        }
        tile.setAttribute('aria-label', ariaLabel);
    }

}