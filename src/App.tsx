import { useState, useRef, useEffect } from 'react';
import BlocklyWorkspace from './components/BlocklyWorkspace';
import FarmGrid from './components/FarmGrid';
import LevelSelector from './components/LevelSelector';
import Instructions from './components/Instructions';
import farmManager from './farm/farmManagerSingleton';
import FarmA11y from './accessibility/FarmA11y';
import './styles/index.css';

function App() {
    const [level, setLevel] = useState(1);
    const [instructions, setInstructions] = useState("Welcome! Drag blocks to start planting.");
    const [tileData, setTileData] = useState(farmManager.getTileState());
    const [summaries, setSummaries] = useState(FarmA11y.getSummaries());
    const liveRegionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        farmManager.subscribe(() => {
            const tiles = farmManager.getTileState();
            setTileData(tiles);

            const summary = FarmA11y.generateDaySummary(farmManager.getDay(), tiles);
            setSummaries(FarmA11y.getSummaries());

            if (liveRegionRef.current) {
                liveRegionRef.current.textContent = `Farm updated`;
            }
        });
    }, []);

    const resetGame = () => {
        farmManager.reset();
        setTileData(farmManager.getTileState());
        const tiles = farmManager.getTileState();
        setTileData(tiles);
        setSummaries([...FarmA11y.getSummaries()]);
        if (liveRegionRef.current) {
            liveRegionRef.current.textContent = `Game reset. Day ${farmManager.getDay()}.`;
        }
    };

    const changeLevel = (levelNum: number) => {
        setLevel(levelNum);
        farmManager.reset();

        const tiles = farmManager.getTileState();
        setTileData(tiles);
        setSummaries([...FarmA11y.getSummaries()]);
        if (liveRegionRef.current) {
            liveRegionRef.current.textContent = `Level changed to ${levelNum}. Day ${farmManager.getDay()}.`;
        }
    };

    const readSummaries = () => {
        if (liveRegionRef.current) {
            // Join all summaries into one string and announce it
            liveRegionRef.current.textContent = summaries.join('. ');
        }
    };

    return (
        <div id="app" className="App">
            <div className="App-body">
                <BlocklyWorkspace
                    level={level}
                />
                <div className="game-panel">
                    <div className="game-controls">
                        <LevelSelector onChange={changeLevel}/>
                        <button onClick={resetGame}>Reset Game</button>
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
                        <button onClick={readSummaries} className="update-button">Updates</button>
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
                            aria-live="assertive"
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
