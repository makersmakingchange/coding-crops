import * as Blockly from 'blockly';

class FarmFieldNumber extends Blockly.FieldNumber {
    ariaTypeName?: string;

    constructor(value?: string | number,
                min?: string | number | null,
                max?: string | number | null,
                precision?: string | number | null,
                validator?: Blockly.FieldNumberValidator | null,
                config?: Blockly.FieldNumberConfig) {
        super(value, min, max, precision, validator);

        this.ariaTypeName = config?.ariaTypeName ?? 'Number';
    }

    static fromJson(options: any) {
        return new FarmFieldNumber(
            options.value,
            options.min,
            options.max,
            options.precision,
            undefined,
            options
        );
    }

    override getAriaTypeName(): string | null {
        return this.ariaTypeName ?? super.getAriaTypeName();
    }
}

export function registerFarmFieldNumber() {
    Blockly.fieldRegistry.register('farm_field_number', FarmFieldNumber);
}

export default FarmFieldNumber;