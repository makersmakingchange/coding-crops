import { useState, useRef, useEffect } from 'react';
import BlocklyWorkspace from './components/BlocklyWorkspace';
import FarmGrid from './components/FarmGrid';
import LevelSelector from './components/LevelSelector';
import Instructions from './components/Instructions';
import farmManager from './farm/FarmManagerSingleton';
import FarmA11y from './accessibility/FarmA11y';
import './styles/index.css';

function App() {
    const [level, setLevel] = useState(1);
    const [tileData, setTileData] = useState(farmManager.getTileState());
    const [summaries, setSummaries] = useState(FarmA11y.getQuickSummaries());
    const [runMode, setRunMode] = useState<'all' | 'day'>('all');
    const runModeRef = useRef(runMode);
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
                        ? summary[summary.length - 1]
                        : `Farm updated.`;
            }

            runModeRef.current = runMode;
        });
    }, [runMode]);

    const resetGame = () => {
        farmManager.reset();
        FarmA11y.reset();
        setTileData(farmManager.getTileState());
        setSummaries([...FarmA11y.getQuickSummaries()]);
        if (liveRegionRef.current) {
            liveRegionRef.current.textContent = `Game reset. Day ${farmManager.getDay()}.`;
        }
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
            <div className="App-body">
                <BlocklyWorkspace
                    level={level}
                    runMode={runMode}
                />
                <div className="game-panel">
                    <div className="game-controls">
                        <button onClick={readSummaries}
                                className="update-button"
                                aria-label="Read farm updates">Updates</button>
                        <LevelSelector onChange={changeLevel}/>
                        <button onClick={resetGame}>Reset Game</button>
                        <button
                            onClick={toggleRunMode}
                            className={`run-mode-button${runMode === 'all' ? '-all' : '-day'}`}
                            aria-pressed={runMode === 'all'}
                            aria-label={runMode === 'all' ? 'Switch to Run 1 Day Mode' : 'Switch to Run All Blocks Mode'}
                        >
                            <span>{runMode === 'all' ? 'Run All Blocks' : 'Run 1 Day'}</span>
                        </button>
                    </div>
                    <Instructions level={level} />
                    <div className="game-container" id="gameContainer">
                        <div
                            className="farm-info"
                            aria-label={`Day ${farmManager.getDay()}, Harvested ${farmManager.getCropsHarvested()}`}
                        >
                            Day: <span id="dayCount">{farmManager.getDay()}</span> |
                            Harvested: <span id="harvestCount">{farmManager.getCropsHarvested()}</span>
                        </div>
                        <FarmGrid
                            tiles={tileData}
                            ariaLiveRef={liveRegionRef}
                            dayCount={farmManager.getDay()}
                        />
                        <div className="farm-summary">
                            {summaries.map((s, i) => (
                                <div key={i}>{s}</div>
                            ))}
                        </div>
                        <div
                            aria-live="polite"
                            role="status"
                            aria-atomic="true"
                            className="sr-only"
                            ref={liveRegionRef}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default App;
