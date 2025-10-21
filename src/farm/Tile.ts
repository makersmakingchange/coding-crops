export const enum GrowthStage {
    EMPTY,
    SEEDLING,
    GROWING,
    MATURE,
}

export const enum CropType {
    Sunflower,
    Corn,
    Pumpkin
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
        this.growthStage++;
        return true;
    }

}