import {useEffect, useRef, useState} from 'react';
import BlocklyWorkspace from './components/BlocklyWorkspace';
import FarmGrid from './components/FarmGrid';
import LevelSelector from './components/LevelSelector';
import {getLevelConfig, LEVELS, SCENARIO_LEVELS} from "./blockly/levelManager";
import Instructions from './components/Instructions';
import UpdatesModal from "./components/UpdatesModal";
import ErrorDialog from "./components/ErrorDialog";
import VersionModal from "./components/VersionModal";
import farmManager from './farm/FarmManagerSingleton';
import FarmA11y from './accessibility/FarmA11y';
import { Warning } from './types';
import icon from './assets/favicon.png';
import blocklyAttr from './assets/built-with-blockly-badge.png';
import nssLogo from './assets/NSS_Logo_White.svg';
import mmcLogo from './assets/MMC_Logo_White.svg';
import './styles/index.css';
import A11yAnnouncer from "./accessibility/A11yAnnouncer";
import {FarmEvents} from "./farm/FarmEvents";
import {useKeyboardShortcuts} from "./hooks/useKeyboardShortcuts";
import {useFarmEndDay} from "./hooks/useFarmEndDay";
import CommandModal from "./components/CommandModal";
import type {Command} from "./components/CommandModal";
import {focusBlocklyToolbox, focusBlocklyWorkspace, toggleShortcutDialog} from "./blockly/blocklySetup";

type AppProps = {
    mode?: 'internal' | 'production' | 'testing';
}

function App({mode = 'production'}: AppProps) {
    const [level, setLevel] = useState(mode == "internal" ? "basic" : 1);
    const [tileData, setTileData] = useState(farmManager.getTileState());
    const [summaries, setSummaries] = useState(FarmA11y.getQuickSummaries());

    const [runMode, setRunMode] = useState<'all' | 'day'>('all');
    const runModeRef = useRef(runMode);

    const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
    const [isVersionOpen, setVersionOpen] = useState(false);
    const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);

    const [warnings, setWarnings] = useState<Warning[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const liveRegionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
        if (link) link.href = icon;
    }, []);

    useEffect(() => {
        A11yAnnouncer.register(liveRegionRef.current);
    }, []);

    useEffect(() => {
        const unsubscribe = farmManager.subscribe(() => {
            setTileData(farmManager.getTileState());

            // todo: add summary after every action for verbose debugging
        });

        runModeRef.current = runMode;

        return unsubscribe;
        }, [runMode]);

    useEffect(() => {
        const handler = () => {
            FarmA11y.reset();
            setWarnings([]);
            setSummaries([...FarmA11y.getQuickSummaries()]);
        };
        FarmEvents.on("farm:reset-summaries", handler);
        return () => FarmEvents.off("farm:reset-summaries", handler);
    }, []);

    useEffect(() => {
        const handler = (e: any) => {
            const { message, type } = e.detail;
            if (type === "warning") {
                const day = farmManager.getDay();
                setWarnings(prev => [...prev, { day, message }]);
            }
        };

        FarmEvents.on("farm:update", handler);
        return () => FarmEvents.off("farm:update", handler);
    }, []);

    useEffect(() => {
        const handler = (e: any) => setErrorMessage(e.detail);
        FarmEvents.on('farm:error', handler);
        return () => FarmEvents.off('farm:error', handler);
    }, []);

    useFarmEndDay(runModeRef, setSummaries);

    useKeyboardShortcuts({
        gt: () => {
            console.log("Go to Toolbox");
            (document.querySelector('.blocklyToolbox') as HTMLElement | null)?.focus();
        },
        gu: () => {
            console.log("Go to Updates button");
            (document.querySelector('.update-button') as HTMLElement | null)?.focus();
        },
        gr: () => {
            console.log("Go to run button");
            (document.querySelector('#runCodeButton') as HTMLElement | null)?.focus();
        },
        gc: () => {
            console.log("Go to controls bar");
            (document.querySelector('#controls-heading') as HTMLElement | null)?.focus();
        },
        gf: () => {
            console.log("Go to farm grid");
            (document.querySelector('.tile') as HTMLElement | null)?.focus()
        },
        gi: () => {
            console.log("Go to instructions panel");
            (document.querySelector('.instructions-panel') as HTMLElement | null)?.focus()
        },
    }, true);

    useKeyboardShortcuts({
        t: () => focusBlocklyToolbox(),
        w: () => focusBlocklyWorkspace(),
        '/': () => toggleShortcutDialog(),
    })

    useKeyboardShortcuts({
        'ctrl+/' : () => toggleCommandPalette(),
    }, false, true)

    const resetGame = () => {
        farmManager.reset();
        setTileData(farmManager.getTileState());
        FarmEvents.dispatch.resetSummaries();
        A11yAnnouncer.announce(`Farm reset. Day ${farmManager.getDay()}.`, 0);
    };

    const changeLevel = (levelNum: string | number) => {
        setLevel(levelNum);
        resetGame();
        A11yAnnouncer.announce(`Level changed to ${getLevelConfig(levelNum)?.label}. Day ${farmManager.getDay()}.`, 0);
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

    const toggleCommandPalette = () => {
        setCommandPaletteOpen(!isCommandPaletteOpen);

    };

    const handleCommandSelect = (command: Command) => {
        // Execute the command
        command.action();
    };

    const toggleRunMode = () => {
        setRunMode(prevMode => (prevMode === 'all' ? 'day' : 'all'));
        resetGame();
    };

    return (
        <div id="app" className="App" role="application">
            <UpdatesModal
                isOpen={isUpdatesOpen}
                onClose={() => setIsUpdatesOpen(false)}
                summaries={summaries}
                warnings={warnings}
            />
            <ErrorDialog
                message={errorMessage}
                onClose={() => setErrorMessage(null)}
            />
            {isCommandPaletteOpen && (
                <CommandModal
                    isOpen={isCommandPaletteOpen}
                    onClose={() => setCommandPaletteOpen(false)}
                    onCommandSelect={handleCommandSelect}
                    resetGame={resetGame}
                />
            )}
            <div className="App-body">
                <a href="#main-content" className="skip-to-main-content-link">Skip to workspace</a>
                <a href="#game-panel" className="skip-to-game-panel-link">Skip to game panel</a>
                <header className="App-header">
                    <h1 className="App-title">
                        <img src={icon} alt="Coding crops logo" className="App-icon" aria-hidden="true"/>CodingCrops
                    </h1>
                    <span className="divider" aria-hidden="true">|</span>
                    <div className="header-icons">
                        <a href="https://developers.google.com/blockly" target="_self" rel="noopener noreferrer">
                            <img src={blocklyAttr} alt="Built with Blockly" className="built-with-blockly-badge"/>
                        </a>
                        <a href="https://www.makersmakingchange.com/" target="_self" rel="noopener noreferrer">
                            <img src={mmcLogo} alt="Makers Making Change logo" className="nss-mmc-logo" aria-hidden="true"/>
                        </a>
                        <a href="https://www.neilsquire.ca/" target="_self" rel="noopener noreferrer">
                            <img src={nssLogo} alt="Neil Squire Society logo" className="nss-mmc-logo" aria-hidden="true"/>
                        </a>
                    </div>
                    <section className="controls-bar" aria-keyshortcuts="Alt+G+C">
                        <h2 id="controls-heading" className="sr-only" tabIndex={0}>Farm Controls</h2>
                        <button onClick={resetGame}>Reset Farm</button>
                        <button
                            onClick={toggleRunMode}
                            className={`run-mode-button${runMode === 'all' ? ' all' : ' day'}`}
                            aria-pressed={runMode === 'all'}
                            aria-label={runMode === 'all' ? 'Change to Run 1 Day Mode' : 'Change to Run All Blocks Mode'}
                        >
                            <span>{runMode === 'all' ? 'Change To Run 1 Day' : 'Change To Run All Blocks'}</span>
                        </button>
                        <LevelSelector
                            onChange={changeLevel}
                            levels={mode === 'internal' ? SCENARIO_LEVELS : LEVELS}
                        />
                    </section>
                </header>

                <div className="App-bottom-panel">
                    <main id="main-content">
                        <Instructions level={level} />
                        <BlocklyWorkspace
                            level={level}
                            runMode={runMode}
                        />
                    </main>

                    <div className="game-panel" id="game-panel">
                        <h2 className="sr-only">Farm Stats</h2>
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
                            <button className="update-button" onClick={() => setIsUpdatesOpen(true)}
                                    aria-label="Updates"
                                    aria-description="Read history of current farm changes, escape to leave">
                                Updates
                            </button>

                            <div id="version-footer">
                                <button
                                    tabIndex={-1}
                                    className="version-button"
                                    onClick={() => setVersionOpen(true)}>
                                    v{__APP_VERSION__}: &nbsp;&nbsp;
                                    {new Date(__BUILD_DATE__).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </button>

                                <VersionModal
                                    isOpen={isVersionOpen}
                                    onClose={() => setVersionOpen(false)}
                                />
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
        </div>

    );
}

export default App;