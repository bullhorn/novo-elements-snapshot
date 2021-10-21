import { DateLike, NovoDateSelectionStrategy } from '../date-picker.types';
import * as i0 from "@angular/core";
export declare class MultiDateSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
    selectionFinished(dateLike: DateLike | null, currentValue: DateLike[], event: Event): DateLike[];
    createPreview(activeDate: DateLike | null, currentValue: DateLike[]): (string | number | Date)[];
    isSelected(activeDate: DateLike | null, currentValue: DateLike[]): boolean;
    static ɵfac: i0.ɵɵFactoryDef<MultiDateSelectionStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDef<MultiDateSelectionStrategy>;
}
