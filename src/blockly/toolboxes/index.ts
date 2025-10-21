import {ToolboxLevel1} from './ToolboxLevel1';
import {ToolboxLevel2} from './ToolboxLevel2';
import {ToolboxLevel3} from './ToolboxLevel3';
import {ToolboxDefinition} from "blockly/core/utils/toolbox";

export const toolboxMap: Record<number, ToolboxDefinition> = {
    1: ToolboxLevel1,
    2: ToolboxLevel2,
    3: ToolboxLevel3,
};