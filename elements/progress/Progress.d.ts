import { AfterContentInit, QueryList } from '@angular/core';
import { NovoProgressBarElement } from './ProgressBar';
import * as i0 from "@angular/core";
export declare enum ProgressAppearance {
    LINEAR = "linear",
    RADIAL = "radial"
}
export declare class NovoProgressElement implements AfterContentInit {
    color: string;
    theme: string;
    total: number;
    radius: number;
    striped: boolean;
    private _appearance;
    private _disabled;
    get appearance(): ProgressAppearance | string;
    set appearance(value: ProgressAppearance | string);
    get disabled(): boolean;
    set disabled(value: boolean);
    _bars: QueryList<NovoProgressBarElement>;
    ngAfterContentInit(): void;
    private _updateBarAppearance;
    private _updateBarRadius;
    static ɵfac: i0.ɵɵFactoryDef<NovoProgressElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoProgressElement, "novo-progress", never, { "color": "color"; "theme": "theme"; "total": "total"; "radius": "radius"; "striped": "striped"; "appearance": "appearance"; "disabled": "disabled"; }, {}, ["_bars"], ["*"]>;
}
