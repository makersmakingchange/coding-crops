/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import FarmA11y from '../accessibility/FarmA11y';
import A11yAnnouncer from '../accessibility/A11yAnnouncer';
import farmManager from '../farm/FarmManagerSingleton';
import { FarmEvents } from '../farm/FarmEvents';

export function useFarmEndDay(
    runModeRef: React.RefObject<'all' | 'day'>,
    setSummaries: (s: string[]) => void
) {
    useEffect(() => {
        const handler = () => {
            const tiles = farmManager.getTileState();
            FarmA11y.generateDaySummary(farmManager.getDay(), farmManager.getHarvestedByCrop(), tiles);
            let sums = FarmA11y.getQuickSummaries();

            if (runModeRef.current === 'day') {
                FarmA11y.generateDetailedDaySummary(farmManager.getDay(), farmManager.getHarvestedByCrop(), tiles);
                sums = FarmA11y.getAllSummaries();
                A11yAnnouncer.announce(sums[sums.length - 1]);
            }
            setSummaries([...sums]);
        };

        FarmEvents.on('farm:end-day', handler);
        return () => FarmEvents.off('farm:end-day', handler);
    }, [runModeRef, setSummaries]);
}