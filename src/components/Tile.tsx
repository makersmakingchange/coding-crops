import React, {forwardRef} from 'react';
import {CropType, GrowthStage, TileState} from '../farm/Tile';
import FarmA11y from '../accessibility/FarmA11y';

interface TileProps {
    tile: TileState;
    row: number;
    col: number;
    moveFocus: (rowDelta: number, colDelta: number) => void;
    isFocused?: boolean;
}

const getPlantEmoji = (growthStage: GrowthStage, cropType: CropType | null): string => {
    if (cropType === null) return '';
    switch (growthStage) {
        case GrowthStage.SEEDLING:
            return '🌱';
        case GrowthStage.GROWING:
            return '🌿';
        case GrowthStage.MATURE:
            return cropType === CropType.Sunflower ? '🌻'
                : cropType === CropType.Corn ? '🌽'
                    : '🎃';
        default:
            return '';
    }
};

const Tile = forwardRef<HTMLDivElement, TileProps>(({ tile, row, col, moveFocus, isFocused }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
            case 'ArrowUp':
                moveFocus(-1, 0);
                e.preventDefault();
                break;
            case 'ArrowDown':
                moveFocus(1, 0);
                e.preventDefault();
                break;
            case 'ArrowLeft':
                moveFocus(0, -1);
                e.preventDefault();
                break;
            case 'ArrowRight':
                moveFocus(0, 1);
                e.preventDefault();
                break;
        }
    };

    return (
        <div
            ref={ref}
            role="gridcell"
            aria-label={FarmA11y.getTileLabel(row, col, tile)}
            className={`tile ${tile.watered ? 'tile-watered' : ``} tile-${tile.growthStage}`}
            tabIndex={isFocused ? 0 : -1}
            onKeyDown={handleKeyDown}
        >
      <span id={`tile-${row}-${col}`}>
        {getPlantEmoji(tile.growthStage, tile.type)}
      </span>
        </div>
    );
});

export default React.memo(Tile)
