// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '../common';
import { NovoFieldModule } from '../field';
import { NovoIconModule } from '../icon';
// APP
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoChipAvatar, NovoChipElement, NovoChipRemove } from './Chip';
import { NOVO_CHIPS_DEFAULT_OPTIONS } from './ChipDefaults';
import { NovoChipInput } from './ChipInput';
import { NovoChipList } from './ChipList';
import { NovoChipsElement } from './Chips';
import { NovoRowChipElement, NovoRowChipsElement } from './RowChips';
const ɵ0 = {
    separatorKeyCodes: ["Enter" /* Enter */],
};
export class NovoChipsModule {
}
NovoChipsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, NovoPickerModule, NovoIconModule, NovoFieldModule],
                declarations: [
                    NovoChipElement,
                    NovoChipAvatar,
                    NovoChipRemove,
                    NovoChipInput,
                    NovoChipList,
                    NovoChipsElement,
                    NovoRowChipElement,
                    NovoRowChipsElement,
                ],
                exports: [
                    NovoChipElement,
                    NovoChipAvatar,
                    NovoChipRemove,
                    NovoChipInput,
                    NovoChipList,
                    NovoChipsElement,
                    NovoRowChipElement,
                    NovoRowChipsElement,
                ],
                providers: [
                    ErrorStateMatcher,
                    {
                        provide: NOVO_CHIPS_DEFAULT_OPTIONS,
                        useValue: ɵ0,
                    },
                ],
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2NoaXBzL0NoaXBzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDekMsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUN6RSxPQUFPLEVBQTJCLDBCQUEwQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxZQUFZLENBQUM7V0EyQnJEO0lBQ1IsaUJBQWlCLEVBQUUscUJBQVc7Q0FDSjtBQUlsQyxNQUFNLE9BQU8sZUFBZTs7O1lBaEMzQixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDO2dCQUN2RixZQUFZLEVBQUU7b0JBQ1osZUFBZTtvQkFDZixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixZQUFZO29CQUNaLGdCQUFnQjtvQkFDaEIsa0JBQWtCO29CQUNsQixtQkFBbUI7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxlQUFlO29CQUNmLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxhQUFhO29CQUNiLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGlCQUFpQjtvQkFDakI7d0JBQ0UsT0FBTyxFQUFFLDBCQUEwQjt3QkFDbkMsUUFBUSxJQUVvQjtxQkFDN0I7aUJBQ0Y7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IEVycm9yU3RhdGVNYXRjaGVyIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7IE5vdm9GaWVsZE1vZHVsZSB9IGZyb20gJy4uL2ZpZWxkJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbic7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9QaWNrZXJNb2R1bGUgfSBmcm9tICcuLy4uL3BpY2tlci9QaWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9DaGlwQXZhdGFyLCBOb3ZvQ2hpcEVsZW1lbnQsIE5vdm9DaGlwUmVtb3ZlIH0gZnJvbSAnLi9DaGlwJztcbmltcG9ydCB7IE5vdm9DaGlwc0RlZmF1bHRPcHRpb25zLCBOT1ZPX0NISVBTX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJy4vQ2hpcERlZmF1bHRzJztcbmltcG9ydCB7IE5vdm9DaGlwSW5wdXQgfSBmcm9tICcuL0NoaXBJbnB1dCc7XG5pbXBvcnQgeyBOb3ZvQ2hpcExpc3QgfSBmcm9tICcuL0NoaXBMaXN0JztcbmltcG9ydCB7IE5vdm9DaGlwc0VsZW1lbnQgfSBmcm9tICcuL0NoaXBzJztcbmltcG9ydCB7IE5vdm9Sb3dDaGlwRWxlbWVudCwgTm92b1Jvd0NoaXBzRWxlbWVudCB9IGZyb20gJy4vUm93Q2hpcHMnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE5vdm9QaWNrZXJNb2R1bGUsIE5vdm9JY29uTW9kdWxlLCBOb3ZvRmllbGRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvQ2hpcEVsZW1lbnQsXG4gICAgTm92b0NoaXBBdmF0YXIsXG4gICAgTm92b0NoaXBSZW1vdmUsXG4gICAgTm92b0NoaXBJbnB1dCxcbiAgICBOb3ZvQ2hpcExpc3QsXG4gICAgTm92b0NoaXBzRWxlbWVudCxcbiAgICBOb3ZvUm93Q2hpcEVsZW1lbnQsXG4gICAgTm92b1Jvd0NoaXBzRWxlbWVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9DaGlwRWxlbWVudCxcbiAgICBOb3ZvQ2hpcEF2YXRhcixcbiAgICBOb3ZvQ2hpcFJlbW92ZSxcbiAgICBOb3ZvQ2hpcElucHV0LFxuICAgIE5vdm9DaGlwTGlzdCxcbiAgICBOb3ZvQ2hpcHNFbGVtZW50LFxuICAgIE5vdm9Sb3dDaGlwRWxlbWVudCxcbiAgICBOb3ZvUm93Q2hpcHNFbGVtZW50LFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICB7XG4gICAgICBwcm92aWRlOiBOT1ZPX0NISVBTX0RFRkFVTFRfT1BUSU9OUyxcbiAgICAgIHVzZVZhbHVlOiB7XG4gICAgICAgIHNlcGFyYXRvcktleUNvZGVzOiBbS2V5LkVudGVyXSxcbiAgICAgIH0gYXMgTm92b0NoaXBzRGVmYXVsdE9wdGlvbnMsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NoaXBzTW9kdWxlIHt9XG4iXX0=