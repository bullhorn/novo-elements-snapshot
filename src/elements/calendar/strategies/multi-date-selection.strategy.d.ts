import type { DateLike, NovoDateSelectionStrategy } from '../../date-picker/date-picker.types';
export declare class MultiDateSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
    selectionFinished(dateLike: DateLike | null, currentValue: DateLike[], event: Event): DateLike[];
    createPreview(activeDate: DateLike | null, currentValue: DateLike[]): (string | number | Date)[];
    isSelected(activeDate: DateLike | null, currentValue: DateLike[]): boolean;
}
