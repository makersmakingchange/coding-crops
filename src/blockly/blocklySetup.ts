import {ToolboxDefinition} from "blockly/core/utils/toolbox";

import * as Blockly from 'blockly';
import DarkTheme from '@blockly/theme-dark';
import {installAllBlocks as installColourBlocks} from '@blockly/field-colour';
import {KeyboardNavigation} from "@blockly/keyboard-navigation";
import {CrossTabCopyPaste} from "@blockly/plugin-cross-tab-copy-paste";
import {javascriptGenerator} from 'blockly/javascript';

import {farmBlocks} from './blocks/farmBlocks';
import {forBlock} from './generators/farmGenerators';

import {save, load} from './serialization';
import {toolboxMap} from './toolboxes';
import '../styles/index.css';
import {WorkspaceSvg} from "blockly";
import {copy} from "blockly/core/clipboard";

export class CustomToolbox extends Blockly.Toolbox {
    protected override onKeyDown_(e: KeyboardEvent) {}
}

function registerNavigationDeferringToolbox() {
    Blockly.registry.register(
        Blockly.registry.Type.TOOLBOX,
        Blockly.registry.DEFAULT,
        CustomToolbox,
        true,
    );
}

let keyboardStylesRegistered = false;
let copyPastePluginInitialized = false;
let workspaceInitialized = false;
let workspaceId = 'workspace';
let keyboardNavInstance: KeyboardNavigation | null = null;

export function setupBlockly(blocklyContainer: HTMLElement,
                             level: number,
                             onWorkspaceChange?: () => void,) {
    if (!keyboardStylesRegistered) {
        KeyboardNavigation.registerKeyboardNavigationStyles();
        registerNavigationDeferringToolbox();
        keyboardStylesRegistered = true;
    }
    if (!copyPastePluginInitialized) {
        const crossTabOptions = {
            contextMenu: false,
            shortcut: true,
        };
        const plugin = new CrossTabCopyPaste();
        // @ts-ignore
        plugin.init(crossTabOptions, () => {
            console.log('Use this error callback to handle TypeError while pasting');
        });

        addBlocks();
        copyPastePluginInitialized = true;
    }

    if (!workspaceInitialized) {
        const ws = Blockly.inject(blocklyContainer, {
            toolbox: toolboxMap[level],
            renderer: 'zelos',
            theme: DarkTheme,
            grid:
                {spacing: 15,
                    length: 3,
                    colour: '#333',
                    snap: true},
            trashcan: true,
        });
        workspaceInitialized = true;
        workspaceId = ws.id;

        if (onWorkspaceChange) {
            ws.addChangeListener((event) => {
                if (
                    event.type === Blockly.Events.BLOCK_CREATE ||
                    event.type === Blockly.Events.BLOCK_DELETE ||
                    event.type === Blockly.Events.BLOCK_MOVE ||
                    event.type === Blockly.Events.BLOCK_CHANGE
                ) {
                    onWorkspaceChange();
                }
            });
        }

        ws.addChangeListener(Blockly.Events.disableOrphans);

        if (!keyboardNavInstance) {
            keyboardNavInstance = new KeyboardNavigation(ws, { allowCrossWorkspacePaste: true });
        }

        // load(ws);
    }

    return Blockly.common.getWorkspaceById(workspaceId) as WorkspaceSvg
}



export function updateToolboxMap(ws: WorkspaceSvg, level: number) {
    ws.updateToolbox(toolboxMap[level]);

    return ws;
}

export function focusBlocklyWorkspace() {
    const ws = Blockly.common.getWorkspaceById(workspaceId) as WorkspaceSvg;
    const focusManager = Blockly.getFocusManager();
    focusManager.focusNode(ws.getTopBlocks()[0]);
}

export function focusBlocklyToolbox() {
    // const tb = Blockly.common.tool
    // const focusManager = Blockly.getFocusManager();
    // focusManager.focusNode(tb);
}

function addBlocks() {
    installColourBlocks({
        javascript: javascriptGenerator,
    });
    Blockly.common.defineBlocks(farmBlocks);
    Object.assign(javascriptGenerator.forBlock, forBlock);
}