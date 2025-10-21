import {ToolboxDefinition} from "blockly/core/utils/toolbox";

declare global {
    interface Window {
        farmManager: FarmManager;
    }
}

import * as Blockly from 'blockly';
// import 'blockly/blocks';
import {installAllBlocks as installColourBlocks} from '@blockly/field-colour';
import {KeyboardNavigation} from "@blockly/keyboard-navigation";
import {CrossTabCopyPaste} from "@blockly/plugin-cross-tab-copy-paste";
import {javascriptGenerator} from 'blockly/javascript';


import {farmBlocks} from './blockly/blocks/coreBlocks';
import {forBlock} from './blockly/generators/javascript';
import {save, load} from './blockly/serialization';
import {toolboxMap} from './blockly/toolboxes';
// import {toolbox} from './blockly/toolbox';
import './index.css';
import { FarmManager } from './farm/FarmManager';

// Javascript code
const codeDiv = document.getElementById('generatedCode')?.firstChild;
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');
let farmManager: FarmManager;

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(farmBlocks);
Object.assign(javascriptGenerator.forBlock, forBlock);

if (!blocklyDiv) {
  throw new Error(`div with id 'blocklyDiv' not found`);
}
// const ws = Blockly.inject(blocklyDiv, {toolbox});
const ws = Blockly.inject(blocklyDiv, {
        toolbox: toolboxMap[1],
        renderer: 'zelos',
        trashcan: true,
    });

    const crossTabOptions = {
        // Don't use the context menu options from the ctcp plugin,
        // because the keyboard-navigation plugin provides its own.
        contextMenu: false,
        shortcut: true,
    };
    const plugin = new CrossTabCopyPaste();
    // @ts-ignore
    plugin.init(crossTabOptions, () => {
        console.log('Use this error callback to handle TypeError while pasting');
    });

    // Enable keyboard navigation
    const navigation = new KeyboardNavigation(ws, {
        allowCrossWorkspacePaste: true,
    });

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
  const code = javascriptGenerator.workspaceToCode(ws as Blockly.Workspace);
  if (codeDiv) codeDiv.textContent = code;

  if (outputDiv) outputDiv.innerHTML = '';

  eval(code);
};

if (ws) {
  // Load the initial state from storage and run the code.
  load(ws);
  runCode();

  // Every time the workspace changes state, save the changes to storage.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // UI events are things like scrolling, zooming, etc.
    // No need to save after one of these.
    if (e.isUiEvent) return;
    save(ws);
  });

  // Whenever the workspace changes meaningfully, run the code again.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // Don't run the code when the workspace finishes loading; we're
    // already running it once when the application starts.
    // Don't run the code during drags; we might have invalid state.
    if (
      e.isUiEvent ||
      e.type == Blockly.Events.FINISHED_LOADING ||
      ws.isDragging()
    ) {
      return;
    }
    runCode();
  });
}

farmManager = new FarmManager();

// Reset button functionality
// @ts-ignore
document.getElementById('resetGameBtn').addEventListener('click', () => {
    farmManager.reset();
});

// Level selection functionality
const loadLevel = (level: number) => {
    console.log(`Loading level: ${level}`);
    ws.clear();
    farmManager.reset();

    ws.updateToolbox(toolboxMap[level])
};

// @ts-ignore
document.getElementById('levelSelect').addEventListener('change', (e) => {
    // @ts-ignore
    loadLevel(parseInt(e.target.value));
});

// Load the initial level
loadLevel(1);
