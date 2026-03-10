import { useEffect, useRef } from 'react';
import FarmA11y from '../accessibility/FarmA11y';
import A11yAnnouncer from '../accessibility/A11yAnnouncer';
import farmManager from '../farm/FarmManagerSingleton';
import { FarmEvents } from '../farm/FarmEvents';

export function useFarmEndDay(
    runModeRef: React.MutableRefObject<'all' | 'day'>,
    setSummaries: (s: string[]) => void
) {
    useEffect(() => {
        const handler = () => {
            const tiles = farmManager.getTileState();
            FarmA11y.generateEndOfDaySummary(farmManager.getDay(), farmManager.getCropsHarvested(), tiles);
            const sums = FarmA11y.getQuickSummaries();
            setSummaries([...sums]);

            if (runModeRef.current === 'day') A11yAnnouncer.announce(sums[sums.length - 1]);
        };

        FarmEvents.on('farm:end-day', handler);
        return () => FarmEvents.off('farm:end-day', handler);
    }, []);
}