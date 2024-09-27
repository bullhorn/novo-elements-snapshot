import { NovoBaseTextElement } from '../base/base-text.component';
import * as i0 from "@angular/core";
/**
 * Tag Example
 * <novo-text size="small" disabled>Label</novo-text
 * <novo-text small disabled>Label</novo-text>
 * <novo-text large disabled>Label</novo-text>
 * <novo-text error>Label</novo-text>
 * <novo-text muted>Label</novo-text>
 * <novo-text class="tc-grapefruit">Label</novo-text>
 * <novo-text color="grapefruit">Label</novo-text>
 */
export declare class NovoText extends NovoBaseTextElement {
    block: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoText, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoText, "novo-text,[novo-text]", never, { "block": { "alias": "block"; "required": false; }; }, {}, never, ["*"], false, never>;
}
