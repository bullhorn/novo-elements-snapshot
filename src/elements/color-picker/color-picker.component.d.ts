import { EventEmitter, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Color, HSL, HSLA, HSV, HSVA, RGB, RGBA } from '../../utils/color-utils/ColorUtils';
export declare class NovoColorPickerComponent implements OnInit, OnChanges, OnDestroy {
    /** Pixel value for picker width */
    width: string | number;
    /** Color squares to display */
    colors: string[];
    color: HSLA | HSVA | RGBA | string;
    onChange: EventEmitter<any>;
    onChangeComplete: EventEmitter<any>;
    onSwatchHover: EventEmitter<any>;
    hsl: HSL;
    hsv: HSV;
    rgb: RGB;
    hex: string;
    currentColor: Color;
    changes: Subscription;
    swatchStyle: {
        [key: string]: string;
    };
    input: {
        [key: string]: string;
    };
    focus(color: string): {
        boxShadow: string;
    };
    handleBlockChange({ hex, $event }: any): void;
    handleValueChange({ data, $event }: any): void;
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    setState(data: Color): void;
    handleChange(data: any, $event: any): void;
    /** hook for components after a complete change */
    afterValidChange(): void;
    handleSwatchHover($event: any): void;
}
