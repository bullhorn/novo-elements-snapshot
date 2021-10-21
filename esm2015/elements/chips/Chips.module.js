// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '../common';
import { NovoIconModule } from '../icon';
// APP
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoChipAvatar, NovoChipElement, NovoChipRemove } from './Chip';
import { NOVO_CHIPS_DEFAULT_OPTIONS } from './ChipDefaults';
import { NovoChipInput } from './ChipInput';
import { NovoChipList } from './ChipList';
import { NovoChipsElement } from './Chips';
import { NovoRowChipElement, NovoRowChipsElement } from './RowChips';
import * as i0 from "@angular/core";
export class NovoChipsModule {
}
NovoChipsModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoChipsModule });
NovoChipsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoChipsModule_Factory(t) { return new (t || NovoChipsModule)(); }, providers: [
        ErrorStateMatcher,
        {
            provide: NOVO_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: ["Enter" /* Enter */],
            },
        },
    ], imports: [[CommonModule, FormsModule, NovoPickerModule, NovoIconModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoChipsModule, { declarations: [NovoChipElement,
        NovoChipAvatar,
        NovoChipRemove,
        NovoChipInput,
        NovoChipList,
        NovoChipsElement,
        NovoRowChipElement,
        NovoRowChipsElement], imports: [CommonModule, FormsModule, NovoPickerModule, NovoIconModule], exports: [NovoChipElement,
        NovoChipAvatar,
        NovoChipRemove,
        NovoChipInput,
        NovoChipList,
        NovoChipsElement,
        NovoRowChipElement,
        NovoRowChipsElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoChipsModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, NovoPickerModule, NovoIconModule],
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
                        useValue: {
                            separatorKeyCodes: ["Enter" /* Enter */],
                        },
                    },
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NoaXBzL0NoaXBzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pDLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDekUsT0FBTyxFQUEyQiwwQkFBMEIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sWUFBWSxDQUFDOztBQWtDckUsTUFBTSxPQUFPLGVBQWU7O21EQUFmLGVBQWU7NkdBQWYsZUFBZSxtQkFWZjtRQUNULGlCQUFpQjtRQUNqQjtZQUNFLE9BQU8sRUFBRSwwQkFBMEI7WUFDbkMsUUFBUSxFQUFFO2dCQUNSLGlCQUFpQixFQUFFLHFCQUFXO2FBQ0o7U0FDN0I7S0FDRixZQTdCUSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDO3dGQStCM0QsZUFBZSxtQkE3QnhCLGVBQWU7UUFDZixjQUFjO1FBQ2QsY0FBYztRQUNkLGFBQWE7UUFDYixZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLGtCQUFrQjtRQUNsQixtQkFBbUIsYUFUWCxZQUFZLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsYUFZbkUsZUFBZTtRQUNmLGNBQWM7UUFDZCxjQUFjO1FBQ2QsYUFBYTtRQUNiLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLG1CQUFtQjtrREFZVixlQUFlO2NBaEMzQixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLENBQUM7Z0JBQ3RFLFlBQVksRUFBRTtvQkFDWixlQUFlO29CQUNmLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxhQUFhO29CQUNiLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGVBQWU7b0JBQ2YsY0FBYztvQkFDZCxjQUFjO29CQUNkLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixnQkFBZ0I7b0JBQ2hCLGtCQUFrQjtvQkFDbEIsbUJBQW1CO2lCQUNwQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsaUJBQWlCO29CQUNqQjt3QkFDRSxPQUFPLEVBQUUsMEJBQTBCO3dCQUNuQyxRQUFRLEVBQUU7NEJBQ1IsaUJBQWlCLEVBQUUscUJBQVc7eUJBQ0o7cUJBQzdCO2lCQUNGO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBFcnJvclN0YXRlTWF0Y2hlciB9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJy4uL2ljb24nO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvUGlja2VyTW9kdWxlIH0gZnJvbSAnLi8uLi9waWNrZXIvUGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQ2hpcEF2YXRhciwgTm92b0NoaXBFbGVtZW50LCBOb3ZvQ2hpcFJlbW92ZSB9IGZyb20gJy4vQ2hpcCc7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNEZWZhdWx0T3B0aW9ucywgTk9WT19DSElQU19ERUZBVUxUX09QVElPTlMgfSBmcm9tICcuL0NoaXBEZWZhdWx0cyc7XG5pbXBvcnQgeyBOb3ZvQ2hpcElucHV0IH0gZnJvbSAnLi9DaGlwSW5wdXQnO1xuaW1wb3J0IHsgTm92b0NoaXBMaXN0IH0gZnJvbSAnLi9DaGlwTGlzdCc7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNFbGVtZW50IH0gZnJvbSAnLi9DaGlwcyc7XG5pbXBvcnQgeyBOb3ZvUm93Q2hpcEVsZW1lbnQsIE5vdm9Sb3dDaGlwc0VsZW1lbnQgfSBmcm9tICcuL1Jvd0NoaXBzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE5vdm9QaWNrZXJNb2R1bGUsIE5vdm9JY29uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b0NoaXBFbGVtZW50LFxuICAgIE5vdm9DaGlwQXZhdGFyLFxuICAgIE5vdm9DaGlwUmVtb3ZlLFxuICAgIE5vdm9DaGlwSW5wdXQsXG4gICAgTm92b0NoaXBMaXN0LFxuICAgIE5vdm9DaGlwc0VsZW1lbnQsXG4gICAgTm92b1Jvd0NoaXBFbGVtZW50LFxuICAgIE5vdm9Sb3dDaGlwc0VsZW1lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvQ2hpcEVsZW1lbnQsXG4gICAgTm92b0NoaXBBdmF0YXIsXG4gICAgTm92b0NoaXBSZW1vdmUsXG4gICAgTm92b0NoaXBJbnB1dCxcbiAgICBOb3ZvQ2hpcExpc3QsXG4gICAgTm92b0NoaXBzRWxlbWVudCxcbiAgICBOb3ZvUm93Q2hpcEVsZW1lbnQsXG4gICAgTm92b1Jvd0NoaXBzRWxlbWVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAge1xuICAgICAgcHJvdmlkZTogTk9WT19DSElQU19ERUZBVUxUX09QVElPTlMsXG4gICAgICB1c2VWYWx1ZToge1xuICAgICAgICBzZXBhcmF0b3JLZXlDb2RlczogW0tleS5FbnRlcl0sXG4gICAgICB9IGFzIE5vdm9DaGlwc0RlZmF1bHRPcHRpb25zLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DaGlwc01vZHVsZSB7fVxuIl19