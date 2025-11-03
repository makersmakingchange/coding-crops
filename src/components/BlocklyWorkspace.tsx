import React, { useEffect, useRef } from 'react';
import { updateToolboxMap, setupBlockly } from '../blockly/blocklySetup';
import {javascriptGenerator} from 'blockly/javascript';

import * as levelManager from '../farm/LevelManager';
import {WorkspaceSvg} from "blockly";

interface BlocklyProps {
    level: number;
}

const BlocklyWorkspace: React.FC<BlocklyProps> = ({level}) => {
    const blocklyDiv = useRef<HTMLDivElement>(null);
    const workspaceRef  = useRef<WorkspaceSvg | null>(null);

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

        // Cleanup on unmount
        return () => {
            // if (workspaceRef.current) {
            //     workspaceRef.current.dispose();
            //     workspaceRef.current = null;
            // }
        };
    }, [level]);

    const runCode = () => {
        if (!workspaceRef.current) return;

        const code = javascriptGenerator.workspaceToCode(workspaceRef.current);

        try {
            console.log("Running generated code:\n", code);
            new Function(code)(); // Execute the generated Blockly code
        } catch (err) {
            console.error("Error running Blockly code:", err);
        }
    };

    return (
        <div className="blockly-panel">
            <div id="blocklyDiv" ref={blocklyDiv}></div>
            <button id="runCodeButton" onClick={runCode} className="run-code-button">Run Code</button>
            <div id="shortcuts"></div>
        </div>
    );
};

export default BlocklyWorkspace;