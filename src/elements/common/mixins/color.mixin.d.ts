import { ElementRef } from '@angular/core';
import { Constructor } from './constructor';
/** @docs-private */
export interface CanColor {
    /** Theme color palette for the component. */
    color: ThemePalette;
    /** Default color to fall back to if no value is set. */
    defaultColor: ThemePalette | undefined;
}
/** @docs-private */
export declare type CanColorCtor = Constructor<CanColor>;
/** @docs-private */
export interface HasElementRef {
    _elementRef: ElementRef;
}
/** Possible color palette values. */
export declare type ThemePalette = 'primary' | 'accent' | 'warn' | undefined;
/** Mixin to augment a directive with a `color` property. */
export declare function mixinColor<T extends Constructor<HasElementRef>>(base: T, defaultColor?: ThemePalette): CanColorCtor & T;
