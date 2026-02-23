import React, {useEffect, useRef, useState} from 'react';
import {updateToolboxMap, setupBlockly} from '../blockly/blocklySetup';
import {javascriptGenerator} from 'blockly/javascript';

import * as levelManager from '../blockly/levelManager';
import { getLevelConfig } from '../blockly/levelManager';
import {WorkspaceSvg} from "blockly";
import farmManager from "../farm/FarmManagerSingleton";
import {FarmEvents} from "../farm/FarmEvents";

interface BlocklyProps {
    level: number | string,
    runMode: "all" | "day"
    hasActions: boolean;
    setHasActions: React.Dispatch<React.SetStateAction<boolean>>;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlocklyWorkspace: React.FC<BlocklyProps> = ({
                                                      level,
                                                      runMode,
                                                      hasActions,
                                                      setHasActions,
                                                      setIsRunning }) => {
    const blocklyDiv = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<WorkspaceSvg | null>(null);
    const runModeRef = useRef(runMode);

    useEffect(() => {
        if (!blocklyDiv.current) return;

        const config = getLevelConfig(level);
        const toolboxLevel = config?.toolboxLevel ?? 1;

        if (!workspaceRef.current) {
            workspaceRef.current = setupBlockly(blocklyDiv.current, toolboxLevel, () => {
                FarmEvents.dispatch.resetSummaries();
                if (runModeRef.current === "day") {
                    setHasActions(false);
                } else {
                    setHasActions(true);
                }
            });

        } else {
            updateToolboxMap(workspaceRef.current, toolboxLevel);
        }

        if (workspaceRef.current) {
            levelManager.load(workspaceRef.current, level);
        }

        const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
        farmManager.storeGeneratedCode(code);

        FarmEvents.dispatch.resetSummaries();
        // Cleanup on unmount
        return () => {
            // if (workspaceRef.current) {
            //     workspaceRef.current.dispose();
            //     workspaceRef.current = null;
            // }
        };
    }, [level]);

    useEffect(() => {
        runModeRef.current = runMode;
        FarmEvents.dispatch.resetSummaries();
        setHasActions(true);
    }, [runMode]);

    useEffect(() => {
        const handleShortcuts = (e: KeyboardEvent) => {
            const cmdOrCtrl = e.metaKey || e.ctrlKey;

            if (cmdOrCtrl && e.key === 'Enter')
                (handleRunCode());
        };

        window.addEventListener('keydown', handleShortcuts);
        return () => window.removeEventListener('keydown', handleShortcuts);
    }, []);

    const handleRunCode = async () => {
        if (!workspaceRef.current) return;

        const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
        console.log("Generated code:", code);
        setIsRunning(true);

        if (runMode === "day") {
            if (!farmManager.hasActions?.()) {
                console.log("Starting 1-Day run: loading code");
                farmManager.reset();
                farmManager.storeGeneratedCode(code);
                farmManager.executeGeneratedCode();
            } else {
                console.log("Advancing to next day…");
            }
            await farmManager.runDay();
            setHasActions(farmManager.hasActions?.() ?? true);
        } else {
            // "Run All Days" mode
            farmManager.reset();
            FarmEvents.dispatch.resetSummaries();
            farmManager.storeGeneratedCode(code);
            await farmManager.runAllDays();
            setHasActions(farmManager.hasActions?.() ?? true);
        }

        setIsRunning(false);
    };

    return (
        <div className="blockly-panel">
            <h2 id="code-workspace-heading"
                className="sr-only">Code Workspace</h2>
            <div id="blocklyDiv" ref={blocklyDiv} role="application"></div>
            <div className="run-controls">
                <button
                    id="runCodeButton"
                    className="run-code-button"
                    onClick={handleRunCode}
                    disabled={!hasActions}
                    aria-label={`Run ${runMode === 'all' ? 'All Days' : '1 Day'}`}
                    tabIndex={0}
                >
                    {runMode === "all"
                        ? "Run All Days"
                        : "Run One Day"}
                </button>
            </div>
            <div id="shortcuts"></div>
        </div>
    );
};

export default BlocklyWorkspace;