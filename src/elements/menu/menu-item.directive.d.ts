import { ElementRef, TemplateRef } from '@angular/core';
import { NovoOption } from '../common';
/**
 * This is a structural directive now.  Should only be used on `novo-options`
 */
export declare class MenuItemDirective {
    template: TemplateRef<{
        item: any;
    }>;
    elementRef: ElementRef;
    menuItemEnabled: boolean | ((item: any) => boolean);
    menuItemVisible: boolean | ((item: any) => boolean);
    optionRef: NovoOption;
    currentItem: any;
    constructor(template: TemplateRef<{
        item: any;
    }>, elementRef: ElementRef);
}
