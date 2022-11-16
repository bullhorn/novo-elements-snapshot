import { DateLike, NovoDateSelectionStrategy } from 'novo-elements/types';
import * as i0 from "@angular/core";
export declare class MultiDateSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
    selectionFinished(dateLike: DateLike | null, currentValue: DateLike[], event: Event): DateLike[];
    createPreview(activeDate: DateLike | null, currentValue: DateLike[]): DateLike[];
    isSelected(activeDate: DateLike | null, currentValue: DateLike[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiDateSelectionStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MultiDateSelectionStrategy>;
}
