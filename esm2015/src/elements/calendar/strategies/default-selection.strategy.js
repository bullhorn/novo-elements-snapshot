import { Injectable, InjectionToken, Optional, SkipSelf } from '@angular/core';
import { isSameDay } from 'date-fns';
/** Injection token used to customize the date range selection behavior. */
export const NOVO_DATE_SELECTION_STRATEGY = new InjectionToken('NOVO_DATE_SELECTION_STRATEGY');
/** Provides the default date selection behavior. Single Date */
export class DefaultDateSelectionStrategy {
    selectionFinished(date, currentValue, event) {
        return [date];
    }
    createPreview(activeDate, [currentDate]) {
        return [activeDate];
    }
    isSelected(activeDate, [currentDate]) {
        return isSameDay(activeDate, currentDate);
    }
}
DefaultDateSelectionStrategy.decorators = [
    { type: Injectable }
];
/** @docs-private */
export function NOVO_DATE_SELECTION_STRATEGY_PROVIDER_FACTORY(parent) {
    return parent || new DefaultDateSelectionStrategy();
}
/** @docs-private */
export const NOVO_DATE_SELECTION_STRATEGY_PROVIDER = {
    provide: NOVO_DATE_SELECTION_STRATEGY,
    deps: [[new Optional(), new SkipSelf(), NOVO_DATE_SELECTION_STRATEGY]],
    useFactory: NOVO_DATE_SELECTION_STRATEGY_PROVIDER_FACTORY,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1zZWxlY3Rpb24uc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvY2FsZW5kYXIvc3RyYXRlZ2llcy9kZWZhdWx0LXNlbGVjdGlvbi5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW1CLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR3JDLDJFQUEyRTtBQUMzRSxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRyxJQUFJLGNBQWMsQ0FBNEIsOEJBQThCLENBQUMsQ0FBQztBQUUxSCxnRUFBZ0U7QUFFaEUsTUFBTSxPQUFPLDRCQUE0QjtJQUN2QyxpQkFBaUIsQ0FBQyxJQUFxQixFQUFFLFlBQXdCLEVBQUUsS0FBWTtRQUM3RSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUEyQixFQUFFLENBQUMsV0FBVyxDQUFhO1FBQ2xFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsVUFBVSxDQUFDLFVBQTJCLEVBQUUsQ0FBQyxXQUFXLENBQWE7UUFDL0QsT0FBTyxTQUFTLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7OztZQVpGLFVBQVU7O0FBZVgsb0JBQW9CO0FBQ3BCLE1BQU0sVUFBVSw2Q0FBNkMsQ0FBQyxNQUEwQztJQUN0RyxPQUFPLE1BQU0sSUFBSSxJQUFJLDRCQUE0QixFQUFFLENBQUM7QUFDdEQsQ0FBQztBQUVELG9CQUFvQjtBQUNwQixNQUFNLENBQUMsTUFBTSxxQ0FBcUMsR0FBb0I7SUFDcEUsT0FBTyxFQUFFLDRCQUE0QjtJQUNyQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO0lBQ3RFLFVBQVUsRUFBRSw2Q0FBNkM7Q0FDMUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZhY3RvcnlQcm92aWRlciwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNTYW1lRGF5IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHR5cGUgeyBEYXRlTGlrZSwgTm92b0RhdGVTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4uLy4uL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLnR5cGVzJztcblxuLyoqIEluamVjdGlvbiB0b2tlbiB1c2VkIHRvIGN1c3RvbWl6ZSB0aGUgZGF0ZSByYW5nZSBzZWxlY3Rpb24gYmVoYXZpb3IuICovXG5leHBvcnQgY29uc3QgTk9WT19EQVRFX1NFTEVDVElPTl9TVFJBVEVHWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxOb3ZvRGF0ZVNlbGVjdGlvblN0cmF0ZWd5PignTk9WT19EQVRFX1NFTEVDVElPTl9TVFJBVEVHWScpO1xuXG4vKiogUHJvdmlkZXMgdGhlIGRlZmF1bHQgZGF0ZSBzZWxlY3Rpb24gYmVoYXZpb3IuIFNpbmdsZSBEYXRlICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVmYXVsdERhdGVTZWxlY3Rpb25TdHJhdGVneSBpbXBsZW1lbnRzIE5vdm9EYXRlU2VsZWN0aW9uU3RyYXRlZ3k8RGF0ZUxpa2VbXT4ge1xuICBzZWxlY3Rpb25GaW5pc2hlZChkYXRlOiBEYXRlTGlrZSB8IG51bGwsIGN1cnJlbnRWYWx1ZTogRGF0ZUxpa2VbXSwgZXZlbnQ6IEV2ZW50KTogRGF0ZUxpa2VbXSB7XG4gICAgcmV0dXJuIFtkYXRlXTtcbiAgfVxuXG4gIGNyZWF0ZVByZXZpZXcoYWN0aXZlRGF0ZTogRGF0ZUxpa2UgfCBudWxsLCBbY3VycmVudERhdGVdOiBEYXRlTGlrZVtdKSB7XG4gICAgcmV0dXJuIFthY3RpdmVEYXRlXTtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQoYWN0aXZlRGF0ZTogRGF0ZUxpa2UgfCBudWxsLCBbY3VycmVudERhdGVdOiBEYXRlTGlrZVtdKSB7XG4gICAgcmV0dXJuIGlzU2FtZURheShhY3RpdmVEYXRlLCBjdXJyZW50RGF0ZSk7XG4gIH1cbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBOT1ZPX0RBVEVfU0VMRUNUSU9OX1NUUkFURUdZX1BST1ZJREVSX0ZBQ1RPUlkocGFyZW50OiBOb3ZvRGF0ZVNlbGVjdGlvblN0cmF0ZWd5PHVua25vd24+KSB7XG4gIHJldHVybiBwYXJlbnQgfHwgbmV3IERlZmF1bHREYXRlU2VsZWN0aW9uU3RyYXRlZ3koKTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBOT1ZPX0RBVEVfU0VMRUNUSU9OX1NUUkFURUdZX1BST1ZJREVSOiBGYWN0b3J5UHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IE5PVk9fREFURV9TRUxFQ1RJT05fU1RSQVRFR1ksXG4gIGRlcHM6IFtbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBOT1ZPX0RBVEVfU0VMRUNUSU9OX1NUUkFURUdZXV0sXG4gIHVzZUZhY3Rvcnk6IE5PVk9fREFURV9TRUxFQ1RJT05fU1RSQVRFR1lfUFJPVklERVJfRkFDVE9SWSxcbn07XG4iXX0=