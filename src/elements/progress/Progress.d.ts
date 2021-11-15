import { AfterContentInit, QueryList } from '@angular/core';
import { NovoProgressBarElement } from './ProgressBar';
import { ProgressAppearance } from './ProgressConstants';
export declare class NovoProgressElement implements AfterContentInit {
    color: string;
    theme: string;
    total: number;
    radius: number;
    striped: boolean;
    private _appearance;
    private _disabled;
    get appearance(): ProgressAppearance;
    set appearance(value: ProgressAppearance);
    get disabled(): boolean;
    set disabled(value: boolean);
    _bars: QueryList<NovoProgressBarElement>;
    ngAfterContentInit(): void;
    private _updateBarAppearance;
    private _updateBarRadius;
}
