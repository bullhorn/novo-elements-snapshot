import { ElementRef } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { NovoChipElement } from './Chip';
import { NovoChipsElement } from './Chips';
import * as i0 from "@angular/core";
export declare class NovoRowChipElement extends NovoChipElement {
    onSelect(e: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoRowChipElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoRowChipElement, "novo-row-chip", never, {}, {}, never, ["*"]>;
}
export declare class NovoRowChipsElement extends NovoChipsElement {
    closeOnSelect: boolean;
    constructor(element: ElementRef, componentUtils: ComponentUtils, labels: NovoLabelService);
    onKeyDown(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoRowChipsElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoRowChipsElement, "novo-row-chips", never, { "closeOnSelect": "closeOnSelect"; }, {}, never, never>;
}
