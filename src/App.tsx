import {useEffect, useRef, useState} from 'react';
import BlocklyWorkspace from './components/BlocklyWorkspace';
import FarmGrid from './components/FarmGrid';
import LevelSelector from './components/LevelSelector';
import Instructions from './components/Instructions';
import UpdatesDialog from "./components/UpdatesDialog";
import ErrorDialog from "./components/ErrorDialog";
import farmManager from './farm/FarmManagerSingleton';
import FarmA11y from './accessibility/FarmA11y';
import { Warning } from './types';
import icon from './assets/favicon.png';
import './styles/index.css';
import A11yAnnouncer from "./accessibility/A11yAnnouncer";
import {FarmEvents} from "./farm/FarmEvents";

type AppProps = {
    mode?: 'internal' | 'production' | 'testing';
}

function App({mode = 'production'}: AppProps) {
    const [level, setLevel] = useState(mode == "internal" ? "basic" : 1);
    const [tileData, setTileData] = useState(farmManager.getTileState());
    const [summaries, setSummaries] = useState(FarmA11y.getQuickSummaries());

    const [runMode, setRunMode] = useState<'all' | 'day'>('all');
    const [hasActions, setHasActions] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const runModeRef = useRef(runMode);

    const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);
    const [warnings, setWarnings] = useState<Warning[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const liveRegionRef = useRef<HTMLDivElement | null>(null);

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
            const tiles = farmManager.getTileState();
            FarmA11y.generateEndOfDaySummary(farmManager.getDay(), farmManager.getCropsHarvested(), tiles);
            const sums = FarmA11y.getQuickSummaries();
            setSummaries([...sums]);

            if (runModeRef.current === 'day') {
                A11yAnnouncer.announce(sums[sums.length - 1]);
            } else {
                A11yAnnouncer.announce('Farm updated.');
            }

            // if (liveRegionRef.current) {
            //
            //     liveRegionRef.current.textContent = '';
            //
            //     setTimeout(() => {
            //         // @ts-ignore
            //         liveRegionRef.current.textContent = runModeRef.current === 'day'
            //             ? sums[sums.length - 1]
            //             : 'Farm updated.';
            //     }, 50);
            // }
        };

        FarmEvents.on("farm:end-day", handler);
        return () => FarmEvents.off("farm:end-day", handler);
    }, []);

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

    useEffect(() => {
        type ShortcutAction = () => void;

        const shortcuts: Record<string, ShortcutAction> = {
            gt: () => {
                console.log("Go to Blockly toolbox");
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
            "/": () => console.log("Open command palette"),
        };

        let buffer = "";
        let timer: number | undefined;
        const TIMEOUT = 500; // ms

        const isTypingTarget = (el: EventTarget | null): boolean => {
            if (!(el instanceof HTMLElement)) return false;
            return (
                el.tagName === "INPUT" ||
                el.tagName === "TEXTAREA" ||
                el.isContentEditable
            );
        };

        const handleShortcuts = (e: KeyboardEvent) => {
            if (e.repeat) return;
            if (isTypingTarget(e.target)) return;

            if (!e.altKey) return;

            const key = e.key.toLowerCase();
            buffer += key;

            // Clear buffer after timeout
            if (timer) window.clearTimeout(timer);
            timer = window.setTimeout(() => (buffer = ""), TIMEOUT);

            // Check all shortcuts
            for (const seq in shortcuts) {
                if (buffer.endsWith(seq)) {
                    e.preventDefault();
                    buffer = "";
                    shortcuts[seq]();
                    break;
                }
            }
        };

        window.addEventListener('keydown', handleShortcuts);
        return () => window.removeEventListener('keydown', handleShortcuts);
    }, []);

    const resetGame = () => {
        farmManager.reset();
        setHasActions(true);
        setTileData(farmManager.getTileState());
        FarmEvents.dispatch.resetSummaries();
        A11yAnnouncer.announce(`Farm reset. Day ${farmManager.getDay()}.`, 0);
        setHasActions?.(true);
    };

    const changeLevel = (levelNum: number) => {
        setLevel(levelNum);
        resetGame();
        A11yAnnouncer.announce(`Level changed to ${levelNum}. Day ${farmManager.getDay()}.`, 0);

        // if (liveRegionRef.current) {
        //     liveRegionRef.current.textContent = `Level changed to ${levelNum}. Day ${farmManager.getDay()}.`;
        // }
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
                <a href="#main-content" className="skip-to-main-content-link">Skip to main content</a>
                <header className="App-header">
                    <h1 className="App-title"><img src={icon} alt="Coding crops logo" className="App-icon" aria-hidden="true"/>CodingCrops</h1>
                    <section className="controls-bar" aria-keyshortcuts="Alt+G+C">
                        <h2 id="controls-heading" className="sr-only" tabIndex={0}>Farm Controls</h2>
                        <button onClick={resetGame}>Reset Farm</button>
                        <button
                            onClick={toggleRunMode}
                            className={`run-mode-button${runMode === 'all' ? '-all' : '-day'}`}
                            aria-pressed={runMode === 'all'}
                            aria-label={runMode === 'all' ? 'Change to Run 1 Day Mode' : 'Change to Run All Blocks Mode'}
                        >
                            <span>{runMode === 'all' ? 'Change To Run 1 Day' : 'Change To Run All Blocks'}</span>
                        </button>
                        <LevelSelector onChange={changeLevel}/>

                    </section>
                </header>

                <div className="App-bottom-panel">
                    <main id="main-content">
                        <Instructions level={level} />
                        <BlocklyWorkspace
                            level={level}
                            runMode={runMode}
                            hasActions={hasActions}
                            setHasActions={setHasActions}
                            setIsRunning={setIsRunning}
                        />
                    </main>

                    <div className="game-panel">
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
        </div>

    );
}

export default App;