// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorStateMatcher } from 'novo-elements/elements/common';
import { NovoFieldModule } from 'novo-elements/elements/field';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoPickerModule } from 'novo-elements/elements/picker';
import { NovoChipAvatar, NovoChipElement, NovoChipRemove } from './Chip';
import { NOVO_CHIPS_DEFAULT_OPTIONS } from './ChipDefaults';
import { NovoChipInput } from './ChipInput';
import { NovoChipList } from './ChipList';
import { NovoChipsElement } from './Chips';
import { NovoRowChipElement, NovoRowChipsElement } from './RowChips';
import * as i0 from "@angular/core";
export class NovoChipsModule {
}
NovoChipsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoChipsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoChipsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoChipsModule, declarations: [NovoChipElement,
        NovoChipAvatar,
        NovoChipRemove,
        NovoChipInput,
        NovoChipList,
        NovoChipsElement,
        NovoRowChipElement,
        NovoRowChipsElement], imports: [CommonModule, FormsModule, NovoPickerModule, NovoIconModule, NovoFieldModule], exports: [NovoChipElement,
        NovoChipAvatar,
        NovoChipRemove,
        NovoChipInput,
        NovoChipList,
        NovoChipsElement,
        NovoRowChipElement,
        NovoRowChipsElement] });
NovoChipsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoChipsModule, providers: [
        ErrorStateMatcher,
        {
            provide: NOVO_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: ["Enter" /* Enter */],
            },
        },
    ], imports: [[CommonModule, FormsModule, NovoPickerModule, NovoIconModule, NovoFieldModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoChipsModule, decorators: [{
            type: NgModule,
            args: [{
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
                            useValue: {
                                separatorKeyCodes: ["Enter" /* Enter */],
                            },
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2hpcHMvQ2hpcHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDekUsT0FBTyxFQUEyQiwwQkFBMEIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sWUFBWSxDQUFDOztBQWlDckUsTUFBTSxPQUFPLGVBQWU7OzZHQUFmLGVBQWU7OEdBQWYsZUFBZSxpQkE3QnhCLGVBQWU7UUFDZixjQUFjO1FBQ2QsY0FBYztRQUNkLGFBQWE7UUFDYixZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLGtCQUFrQjtRQUNsQixtQkFBbUIsYUFUWCxZQUFZLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxlQUFlLGFBWXBGLGVBQWU7UUFDZixjQUFjO1FBQ2QsY0FBYztRQUNkLGFBQWE7UUFDYixZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLGtCQUFrQjtRQUNsQixtQkFBbUI7OEdBWVYsZUFBZSxhQVZmO1FBQ1QsaUJBQWlCO1FBQ2pCO1lBQ0UsT0FBTyxFQUFFLDBCQUEwQjtZQUNuQyxRQUFRLEVBQUU7Z0JBQ1IsaUJBQWlCLEVBQUUscUJBQVc7YUFDSjtTQUM3QjtLQUNGLFlBN0JRLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDOzRGQStCNUUsZUFBZTtrQkFoQzNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDO29CQUN2RixZQUFZLEVBQUU7d0JBQ1osZUFBZTt3QkFDZixjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQixtQkFBbUI7cUJBQ3BCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLG1CQUFtQjtxQkFDcEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULGlCQUFpQjt3QkFDakI7NEJBQ0UsT0FBTyxFQUFFLDBCQUEwQjs0QkFDbkMsUUFBUSxFQUFFO2dDQUNSLGlCQUFpQixFQUFFLHFCQUFXOzZCQUNKO3lCQUM3QjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIEFQUFxuaW1wb3J0IHsgS2V5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBFcnJvclN0YXRlTWF0Y2hlciB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9GaWVsZE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZmllbGQnO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2ljb24nO1xuaW1wb3J0IHsgTm92b1BpY2tlck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvcGlja2VyJztcbmltcG9ydCB7IE5vdm9DaGlwQXZhdGFyLCBOb3ZvQ2hpcEVsZW1lbnQsIE5vdm9DaGlwUmVtb3ZlIH0gZnJvbSAnLi9DaGlwJztcbmltcG9ydCB7IE5vdm9DaGlwc0RlZmF1bHRPcHRpb25zLCBOT1ZPX0NISVBTX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJy4vQ2hpcERlZmF1bHRzJztcbmltcG9ydCB7IE5vdm9DaGlwSW5wdXQgfSBmcm9tICcuL0NoaXBJbnB1dCc7XG5pbXBvcnQgeyBOb3ZvQ2hpcExpc3QgfSBmcm9tICcuL0NoaXBMaXN0JztcbmltcG9ydCB7IE5vdm9DaGlwc0VsZW1lbnQgfSBmcm9tICcuL0NoaXBzJztcbmltcG9ydCB7IE5vdm9Sb3dDaGlwRWxlbWVudCwgTm92b1Jvd0NoaXBzRWxlbWVudCB9IGZyb20gJy4vUm93Q2hpcHMnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE5vdm9QaWNrZXJNb2R1bGUsIE5vdm9JY29uTW9kdWxlLCBOb3ZvRmllbGRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvQ2hpcEVsZW1lbnQsXG4gICAgTm92b0NoaXBBdmF0YXIsXG4gICAgTm92b0NoaXBSZW1vdmUsXG4gICAgTm92b0NoaXBJbnB1dCxcbiAgICBOb3ZvQ2hpcExpc3QsXG4gICAgTm92b0NoaXBzRWxlbWVudCxcbiAgICBOb3ZvUm93Q2hpcEVsZW1lbnQsXG4gICAgTm92b1Jvd0NoaXBzRWxlbWVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9DaGlwRWxlbWVudCxcbiAgICBOb3ZvQ2hpcEF2YXRhcixcbiAgICBOb3ZvQ2hpcFJlbW92ZSxcbiAgICBOb3ZvQ2hpcElucHV0LFxuICAgIE5vdm9DaGlwTGlzdCxcbiAgICBOb3ZvQ2hpcHNFbGVtZW50LFxuICAgIE5vdm9Sb3dDaGlwRWxlbWVudCxcbiAgICBOb3ZvUm93Q2hpcHNFbGVtZW50LFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICB7XG4gICAgICBwcm92aWRlOiBOT1ZPX0NISVBTX0RFRkFVTFRfT1BUSU9OUyxcbiAgICAgIHVzZVZhbHVlOiB7XG4gICAgICAgIHNlcGFyYXRvcktleUNvZGVzOiBbS2V5LkVudGVyXSxcbiAgICAgIH0gYXMgTm92b0NoaXBzRGVmYXVsdE9wdGlvbnMsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NoaXBzTW9kdWxlIHt9XG4iXX0=