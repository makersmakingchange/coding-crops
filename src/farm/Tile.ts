export enum GrowthStage {
    EMPTY,
    SEEDLING,
    GROWING,
    MATURE,
}

export enum CropType {
    Sunflower,
    Corn,
    Pumpkin
}

export interface TileState {
    type: CropType | null;
    growthStage: GrowthStage;
    watered: boolean;
}

export class Tile {
    private type: CropType | null;
    private watered: boolean;
    private growthStage: GrowthStage;

    constructor() {
        this.type = null;
        this.watered = false;
        this.growthStage = GrowthStage.EMPTY;
    }

    getTileState(): TileState {
        return {
            type: this.type,
            growthStage: this.growthStage,
            watered: this.watered,
        };
    }

    plant(type : CropType): boolean {
        if (this.growthStage === GrowthStage.EMPTY) {
            this.type = type;
            this.growthStage++; // EMPTY -> SEEDLING
            return true;
        }
        return false;
    }

    harvest(): boolean {
        if (this.growthStage === GrowthStage.MATURE) {
            this.type = null;
            this.growthStage = GrowthStage.EMPTY;
            return true;
        }
        return false;
    }

    water(): boolean {
        if (this.growthStage === GrowthStage.EMPTY) {
            return false;
        }
        this.watered = true;
        return true;
    }

    nextDay(): void {
        if (!this.watered || this.growthStage === GrowthStage.EMPTY || this.growthStage === GrowthStage.MATURE) {
            this.watered = false;
            return;
        }

        this.growthStage++;
        this.watered = false;
    }

}