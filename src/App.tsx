import { useState, useRef, useEffect } from 'react';
import BlocklyWorkspace from './components/BlocklyWorkspace';
import FarmGrid from './components/FarmGrid';
import LevelSelector from './components/LevelSelector';
import Instructions from './components/Instructions';
import UpdatesDialog from "./components/UpdatesDialog";
import ErrorDialog from "./components/ErrorDialog";
import farmManager from './farm/FarmManagerSingleton';
import FarmA11y from './accessibility/FarmA11y';
import { Warning } from './types';
import './styles/index.css';

function App() {
    const [level, setLevel] = useState(1);
    const [tileData, setTileData] = useState(farmManager.getTileState());
    const [summaries, setSummaries] = useState(FarmA11y.getQuickSummaries());
    const [runMode, setRunMode] = useState<'all' | 'day'>('all');
    const [hasActions, setHasActions] = useState(true);
    const runModeRef = useRef(runMode);
    const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);
    const [warnings, setWarnings] = useState<Warning[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const liveRegionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        farmManager.subscribe(() => {
            const tiles = farmManager.getTileState();
            setTileData(tiles);

            const summary = FarmA11y.generateEndOfDaySummary(farmManager.getDay(), farmManager.getCropsHarvested(), tiles);
            setSummaries(FarmA11y.getQuickSummaries());

            if (liveRegionRef.current) {
                liveRegionRef.current.textContent =
                    runModeRef.current === 'day'
                        ? summary
                        : `Farm updated.`;
            }

            runModeRef.current = runMode;
        });
    }, [runMode]);

    useEffect(() => {
        const handler = () => {
            FarmA11y.reset();
            setWarnings([]);
        };
        window.addEventListener("farm:reset-summaries", handler);
        return () => window.removeEventListener("farm:reset-summaries", handler);
    }, []);

    useEffect(() => {
        const handler = (e: any) => {
            const { message, type } = e.detail;
            if (type === "warning") {
                const day = farmManager.getDay();
                setWarnings(prev => [...prev, { day, message }]);
            }
        };

        window.addEventListener("farm:update", handler);
        return () => window.removeEventListener("farm:update", handler);
    }, []);

    useEffect(() => {
        const handler = (e: any) => setErrorMessage(e.detail);
        window.addEventListener('farm:error', handler);
        return () => window.removeEventListener('farm:error', handler);
    }, []);

    useEffect(() => {
        const handleShortcuts = (e: KeyboardEvent) => {
            if (document.activeElement?.closest('.blocklyDiv')) return;

            if (e.altKey && e.key === '1')
                (document.querySelector('.blocklyToolbox') as HTMLElement | null)?.focus();

            if (e.altKey && e.key === '2')
                (document.querySelector('.update-button') as HTMLElement | null)?.focus();

            if (e.altKey && e.key === '3')
                (document.querySelector('.instructions-panel') as HTMLElement | null)?.focus();

            if (e.altKey && e.key === '4')
                (document.querySelector('.farm-info') as HTMLElement | null)?.focus();

            if (e.altKey && e.key === '5')
                (document.querySelector('.farm-grid') as HTMLElement | null)?.focus();

            if ((e.altKey && e.key === 'r') || (e.altKey && e.key === 'R') )
                (document.querySelector('#runCodeButton') as HTMLElement | null)?.focus();
        };

        window.addEventListener('keydown', handleShortcuts);
        return () => window.removeEventListener('keydown', handleShortcuts);
    }, []);

    const resetGame = () => {
        farmManager.reset();
        FarmA11y.reset();
        setWarnings([]);
        setHasActions(true);
        setTileData(farmManager.getTileState());
        setSummaries([...FarmA11y.getQuickSummaries()]);
        if (liveRegionRef.current) {
            liveRegionRef.current.textContent = `Game reset. Day ${farmManager.getDay()}.`;
        }
        setHasActions?.(true);
    };

    const changeLevel = (levelNum: number) => {
        setLevel(levelNum);
        resetGame();
        if (liveRegionRef.current) {
            liveRegionRef.current.textContent = `Level changed to ${levelNum}. Day ${farmManager.getDay()}.`;
        }
    };

    const readSummaries = () => {
        if (liveRegionRef.current) {
            // Get the latest summaries from FarmA11y directly (not from state)
            const latestSummaries = FarmA11y.getQuickSummaries();

            liveRegionRef.current.textContent = '';
            setTimeout(() => {
                liveRegionRef.current!.textContent = latestSummaries.join('. ');
            }, 50);

        }
    };

    const toggleRunMode = () => {
        setRunMode(prevMode => (prevMode === 'all' ? 'day' : 'all'));
        resetGame();
    };

    return (
        <div id="app" className="App">
            <UpdatesDialog
                isOpen={isUpdatesOpen}
                onClose={() => setIsUpdatesOpen(false)}
                summaries={summaries}
                warnings={warnings}
            />
            <ErrorDialog
                message={errorMessage}
                onClose={() => setErrorMessage(null)}
            />
            <div className="App-body">
                <BlocklyWorkspace
                    level={level}
                    runMode={runMode}
                    hasActions={hasActions}
                    setHasActions={setHasActions}
                />
                <div className="game-panel">
                    <div className="game-controls">
                        <button className="update-button" onClick={() => setIsUpdatesOpen(true)}
                                aria-label="Read history of current farm changes, escape to leave">
                            Updates
                        </button>
                        {/*<button onClick={readSummaries}*/}
                        {/*        className="update-button"*/}
                        {/*        aria-label="Quick status updates">Updates</button>*/}
                        <LevelSelector onChange={changeLevel}/>
                        <button onClick={resetGame}>Reset Farm</button>
                        <button
                            onClick={toggleRunMode}
                            className={`run-mode-button${runMode === 'all' ? '-all' : '-day'}`}
                            aria-pressed={runMode === 'all'}
                            aria-label={runMode === 'all' ? 'Switch to Run 1 Day Mode' : 'Switch to Run All Blocks Mode'}
                    >
                            <span>{runMode === 'all' ? 'Change To Run 1 Day' : 'Change To Run All Blocks'}</span>
                        </button>
                    </div>
                    <Instructions level={level} />
                    <div className="game-container" id="gameContainer">
                        <div
                            className="farm-info"
                            aria-label={`Day ${farmManager.getDay()}, ${farmManager.getCropsHarvested()} crops harvested`}
                            tabIndex={0}
                        >
                            Day: <span id="dayCount">{farmManager.getDay()}</span> |
                            Harvested: <span id="harvestCount">{farmManager.getCropsHarvested()}</span>
                        </div>
                        <FarmGrid
                            tiles={tileData}
                            ariaLiveRef={liveRegionRef}
                            dayCount={farmManager.getDay()}
                        />
                        <div
                            aria-live="polite"
                            role="status"
                            aria-atomic="true"
                            className="sr-only"
                            ref={liveRegionRef}
                        />
                    </div>
                    <div id="version-footer">
                        {`App v${__APP_VERSION__} 
                        • Blockly: add-screen-reader-support-experimental 
                        • Commit ${__GIT_HASH__} 
                        • Build ${new Date(__BUILD_DATE__).toLocaleString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        })}`}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default App;
