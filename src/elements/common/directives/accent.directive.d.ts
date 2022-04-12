import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { NovoTheme } from '../theme/theme-options';
export declare class AccentColorDirective {
    private el;
    private theme;
    protected cdr: ChangeDetectorRef;
    private subscription;
    accent: string;
    get hb_textColor(): string;
    constructor(el: ElementRef, theme: NovoTheme, cdr: ChangeDetectorRef);
    onDestroy(): void;
}
