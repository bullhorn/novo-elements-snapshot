import { FactoryProvider, InjectionToken } from '@angular/core';
import type { DateLike, NovoDateSelectionStrategy } from '../../date-picker/date-picker.types';
/** Injection token used to customize the date range selection behavior. */
export declare const NOVO_DATE_SELECTION_STRATEGY: InjectionToken<NovoDateSelectionStrategy<string | number | Date>>;
/** Provides the default date selection behavior. Single Date */
export declare class DefaultDateSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
    selectionFinished(date: DateLike | null, currentValue: DateLike[], event: Event): DateLike[];
    createPreview(activeDate: DateLike | null, [currentDate]: DateLike[]): (string | number | Date)[];
    isSelected(activeDate: DateLike | null, [currentDate]: DateLike[]): boolean;
}
/** @docs-private */
export declare function NOVO_DATE_SELECTION_STRATEGY_PROVIDER_FACTORY(parent: NovoDateSelectionStrategy<unknown>): NovoDateSelectionStrategy<unknown>;
/** @docs-private */
export declare const NOVO_DATE_SELECTION_STRATEGY_PROVIDER: FactoryProvider;
