import { DateLike, NovoDateSelectionStrategy } from '../date-picker.types';
import * as i0 from "@angular/core";
export declare class RangeSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
    selectionFinished(date: DateLike, currentRange: DateLike[]): (string | number | Date)[];
    createPreview(activeDate: DateLike | null, currentRange: DateLike[]): (string | number | Date)[];
    isSelected(activeDate: DateLike | null, currentRange: DateLike[]): boolean;
    static ɵfac: i0.ɵɵFactoryDef<RangeSelectionStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDef<RangeSelectionStrategy>;
}
