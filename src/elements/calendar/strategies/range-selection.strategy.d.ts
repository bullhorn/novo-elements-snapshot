import type { DateLike, NovoDateSelectionStrategy } from '../../date-picker/date-picker.types';
export declare class RangeSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
    selectionFinished(date: DateLike, currentRange: DateLike[]): (string | number | Date)[];
    createPreview(activeDate: DateLike | null, currentRange: DateLike[]): (string | number | Date)[];
    isSelected(activeDate: DateLike | null, currentRange: DateLike[]): boolean;
}
