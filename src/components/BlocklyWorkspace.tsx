import React, {useEffect, useRef, useState} from 'react';
import {updateToolboxMap, setupBlockly} from '../blockly/blocklySetup';
import {javascriptGenerator} from 'blockly/javascript';

import * as levelManager from '../blockly/levelManager';
import {WorkspaceSvg} from "blockly";
import farmManager from "../farm/FarmManagerSingleton";

interface BlocklyProps {
    level: number,
    runMode: "all" | "day"
    hasActions: boolean;
    setHasActions: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlocklyWorkspace: React.FC<BlocklyProps> = ({
                                                      level,
                                                      runMode,
                                                      hasActions,
                                                      setHasActions }) => {
    const blocklyDiv = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<WorkspaceSvg | null>(null);

    useEffect(() => {
        if (!blocklyDiv.current) return;

        if (!workspaceRef.current) {
            workspaceRef.current = setupBlockly(blocklyDiv.current, level, () => {
                window.dispatchEvent(new CustomEvent("farm:reset-summaries"));
                setHasActions(true);
            });

        } else {
            updateToolboxMap(workspaceRef.current, level);
        }

        if (workspaceRef.current) {
            levelManager.load(workspaceRef.current, level);
        }

        const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
        farmManager.storeGeneratedCode(code);

        window.dispatchEvent(new CustomEvent("farm:reset-summaries"));
        setHasActions(true);
        // Cleanup on unmount
        return () => {
            // if (workspaceRef.current) {
            //     workspaceRef.current.dispose();
            //     workspaceRef.current = null;
            // }
        };
    }, [level]);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent("farm:reset-summaries"));
        setHasActions(true);
    }, [runMode]);

    const handleRunCode = async () => {
        if (!workspaceRef.current) return;

        const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
        console.log("Generated code:", code);

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
            window.dispatchEvent(new CustomEvent("farm:reset-summaries"));
            farmManager.storeGeneratedCode(code);
            await farmManager.runAllDays();
            setHasActions(farmManager.hasActions?.() ?? true);
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
                        : "Run One Day"}
                </button>
            </div>
            <div id="shortcuts"></div>
        </div>
    );
};

export default BlocklyWorkspace;