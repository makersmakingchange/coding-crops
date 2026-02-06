import React, { useState, useEffect, useRef } from 'react';
import Tile from './Tile';
import { TileState, CropType, GrowthStage } from '../farm/Tile';
import '../styles/index.css';

interface FarmGridProps {
    tiles: TileState[][];
    ariaLiveRef: React.RefObject<HTMLDivElement | null>;
    dayCount?: number;
}

const FarmGrid: React.FC<FarmGridProps> = ({ tiles, ariaLiveRef, dayCount }) => {
    const rows = tiles.length;
    const cols = tiles[0].length;

    const gridRef = useRef<HTMLDivElement>(null);
    const tileRefs = useRef<(HTMLDivElement | null)[][]>(
        Array.from({ length: rows }, () => Array(cols).fill(null))
    );

    const [focusedRow, setFocusedRow] = useState(0);
    const [focusedCol, setFocusedCol] = useState(0);

    useEffect(() => {
        const tile = tileRefs.current[focusedRow]?.[focusedCol];
        tile?.focus();
    }, [focusedRow, focusedCol]);

    const moveFocus = (rowDelta: number, colDelta: number) => {
        setFocusedRow(r => Math.max(0, Math.min(rows - 1, r + rowDelta)));
        setFocusedCol(c => Math.max(0, Math.min(cols - 1, c + colDelta)));
    };

    return (
    <div className="grid-container">
        <h3 className="sr-only">Farm</h3>
        <div
            className="farm-grid"
            role="grid"
            aria-label={`Farm grid, Day ${dayCount}. 3 rows and 3 columns.`}
            ref={gridRef}
            style={{
                gridTemplateColumns: `15px repeat(${tiles[0].length}, 105px)`,
                gridTemplateRows: `15px repeat(${tiles.length}, 105px)`,
            }}
        >

            {/* Column headers row */}
            <div role="presentation" className="row-wrapper" style={{ display: 'contents' }}>
                <div aria-hidden="true"></div> {/* Top-left empty corner */}
                {tiles[0].map((_, colIndex) => (
                    <div key={`col-${colIndex}`} aria-hidden="true" className="coord-label">
                        {colIndex + 1}
                    </div>
                ))}
            </div>

            {/* Tile rows */}
            {tiles.map((row, rowIndex) => (
                <div
                    key={`row-${rowIndex}`}
                    role="row"
                    className="row-wrapper"
                    style={{ display: 'contents' }}
                >
                    {/* Row header */}
                    <div aria-hidden="true" className="coord-label">
                        {rowIndex + 1}
                    </div>

                    {/* Tiles */}
                    {row.map((tile, colIndex) => (
                        <Tile
                            key={`tile-${rowIndex}-${colIndex}`}
                            tile={tile}
                            row={rowIndex}
                            col={colIndex}
                            moveFocus={moveFocus}
                            isFocused={rowIndex === focusedRow && colIndex === focusedCol}
                            ref={el => {
                                tileRefs.current[rowIndex][colIndex] = el;
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    </div>
    )
};

export default FarmGrid;
