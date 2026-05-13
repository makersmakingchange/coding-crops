/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

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

    const hasMounted = useRef(false);
    const [focusedPos, setFocusedPos] = useState({ row: 0, col: 0 });

    const handleGridFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!gridRef.current?.contains(e.relatedTarget as Node)) {
            setFocusedPos({ row: 0, col: 0 });
            tileRefs.current[0]?.[0]?.focus(); // Focus on the first tile (0, 0)
        }
    };

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }
        const tile = tileRefs.current[focusedPos.row]?.[focusedPos.col];
        tile?.focus();
    }, [focusedPos.row, focusedPos.col]);

    const moveFocus = (rowDelta: number, colDelta: number) => {
        setFocusedPos(prev => ({
            row: Math.max(0, Math.min(rows - 1, prev.row + rowDelta)),
            col: Math.max(0, Math.min(cols - 1, prev.col + colDelta)),
        }));
    };

    return (
    <div className="grid-container">
        <h3 className="sr-only">Farm</h3>
        <div
            className="farm-grid"
            role="grid"
            aria-label={`Farm field, Day ${dayCount}. 3 rows and 3 columns.`}
            ref={gridRef}
            onFocus={handleGridFocus}
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
                            isFocused={rowIndex === focusedPos.row && colIndex === focusedPos.col}
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
