import React, {useEffect, useRef, useState} from 'react';
import {updateToolboxMap, setupBlockly} from '../blockly/blocklySetup';
import {javascriptGenerator} from 'blockly/javascript';

import * as levelManager from '../blockly/levelManager';
import {WorkspaceSvg} from "blockly";
import farmManager from "../farm/FarmManagerSingleton";

interface BlocklyProps {
    level: number,
    runMode: "all" | "day"
}

const BlocklyWorkspace: React.FC<BlocklyProps> = ({level, runMode}) => {
    const blocklyDiv = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<WorkspaceSvg | null>(null);

    const [startedDayMode, setStartedDayMode] = useState(false);
    const [hasActions, setHasActions] = useState(true);

    useEffect(() => {
        if (!blocklyDiv.current) return;

        if (!workspaceRef.current) {
            workspaceRef.current = setupBlockly(blocklyDiv.current, level);
        } else {
            updateToolboxMap(workspaceRef.current, level);
        }

        if (workspaceRef.current) {
            levelManager.load(workspaceRef.current, level);
        }

        if (runMode === "all") {
            setStartedDayMode(false);
        }

        const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
        farmManager.storeGeneratedCode(code);


        // Cleanup on unmount
        return () => {
            // if (workspaceRef.current) {
            //     workspaceRef.current.dispose();
            //     workspaceRef.current = null;
            // }
        };
    }, [level, runMode]);

    const handleRunCode = () => {
        if (!workspaceRef.current) return;

        const code = javascriptGenerator.workspaceToCode(workspaceRef.current);

        if (runMode === "day") {
            if (!startedDayMode) {
                // First click: start simulation
                console.log("Starting 1-Day run: loading code and running first day");
                farmManager.reset();
                farmManager.storeGeneratedCode(code);
                farmManager.executeGeneratedCode();
                farmManager.runDay();
                setStartedDayMode(true);
            } else {
                console.log("Advancing to next day…");
                farmManager.runDay();
            }
            setHasActions(farmManager.hasActions?.() ?? true);
        } else {
            // "Run All Days" mode
            farmManager.storeGeneratedCode(code);
            farmManager.runAllDays();
            setHasActions(false);
        }
    };

    return (
        <div className="blockly-panel">
            <div id="blocklyDiv" ref={blocklyDiv}></div>
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
                        : startedDayMode
                            ? "Next Day"
                            : "Run Day By Day"}
                </button>
            </div>
            <div id="shortcuts"></div>
        </div>
    );
};

export default BlocklyWorkspace;