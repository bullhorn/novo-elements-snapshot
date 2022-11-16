// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoRowChipElement, NovoRowChipsElement } from './row-chips';
import { NovoChipsElement } from './chips';
import { NovoChipList } from './chip-list';
import { NovoChipInput } from './chip-input';
import { NOVO_CHIPS_DEFAULT_OPTIONS } from './chip-defaults';
import { NovoChipAvatar, NovoChipElement, NovoChipRemove } from './chip';
import { NovoPickerModule } from 'novo-elements/components/picker';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoFieldModule } from 'novo-elements/components/field';
import { ErrorStateMatcher } from 'novo-elements/common';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9jaGlwcy9jaGlwcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM3QyxPQUFPLEVBQTJCLDBCQUEwQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBa0N6RCxNQUFNLE9BQU8sZUFBZTs7NkdBQWYsZUFBZTs4R0FBZixlQUFlLGlCQTdCeEIsZUFBZTtRQUNmLGNBQWM7UUFDZCxjQUFjO1FBQ2QsYUFBYTtRQUNiLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLG1CQUFtQixhQVRYLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGVBQWUsYUFZcEYsZUFBZTtRQUNmLGNBQWM7UUFDZCxjQUFjO1FBQ2QsYUFBYTtRQUNiLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLG1CQUFtQjs4R0FZVixlQUFlLGFBVmY7UUFDVCxpQkFBaUI7UUFDakI7WUFDRSxPQUFPLEVBQUUsMEJBQTBCO1lBQ25DLFFBQVEsRUFBRTtnQkFDUixpQkFBaUIsRUFBRSxxQkFBVzthQUNKO1NBQzdCO0tBQ0YsWUE3QlEsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUM7NEZBK0I1RSxlQUFlO2tCQWhDM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUM7b0JBQ3ZGLFlBQVksRUFBRTt3QkFDWixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3FCQUNwQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsaUJBQWlCO3dCQUNqQjs0QkFDRSxPQUFPLEVBQUUsMEJBQTBCOzRCQUNuQyxRQUFRLEVBQUU7Z0NBQ1IsaUJBQWlCLEVBQUUscUJBQVc7NkJBQ0o7eUJBQzdCO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b1Jvd0NoaXBFbGVtZW50LCBOb3ZvUm93Q2hpcHNFbGVtZW50IH0gZnJvbSAnLi9yb3ctY2hpcHMnO1xuaW1wb3J0IHsgTm92b0NoaXBzRWxlbWVudCB9IGZyb20gJy4vY2hpcHMnO1xuaW1wb3J0IHsgTm92b0NoaXBMaXN0IH0gZnJvbSAnLi9jaGlwLWxpc3QnO1xuaW1wb3J0IHsgTm92b0NoaXBJbnB1dCB9IGZyb20gJy4vY2hpcC1pbnB1dCc7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNEZWZhdWx0T3B0aW9ucywgTk9WT19DSElQU19ERUZBVUxUX09QVElPTlMgfSBmcm9tICcuL2NoaXAtZGVmYXVsdHMnO1xuaW1wb3J0IHsgTm92b0NoaXBBdmF0YXIsIE5vdm9DaGlwRWxlbWVudCwgTm92b0NoaXBSZW1vdmUgfSBmcm9tICcuL2NoaXAnO1xuaW1wb3J0IHsgTm92b1BpY2tlck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9waWNrZXInO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvaWNvbic7XG5pbXBvcnQgeyBOb3ZvRmllbGRNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvZmllbGQnO1xuaW1wb3J0IHsgRXJyb3JTdGF0ZU1hdGNoZXIgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBOb3ZvUGlja2VyTW9kdWxlLCBOb3ZvSWNvbk1vZHVsZSwgTm92b0ZpZWxkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b0NoaXBFbGVtZW50LFxuICAgIE5vdm9DaGlwQXZhdGFyLFxuICAgIE5vdm9DaGlwUmVtb3ZlLFxuICAgIE5vdm9DaGlwSW5wdXQsXG4gICAgTm92b0NoaXBMaXN0LFxuICAgIE5vdm9DaGlwc0VsZW1lbnQsXG4gICAgTm92b1Jvd0NoaXBFbGVtZW50LFxuICAgIE5vdm9Sb3dDaGlwc0VsZW1lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvQ2hpcEVsZW1lbnQsXG4gICAgTm92b0NoaXBBdmF0YXIsXG4gICAgTm92b0NoaXBSZW1vdmUsXG4gICAgTm92b0NoaXBJbnB1dCxcbiAgICBOb3ZvQ2hpcExpc3QsXG4gICAgTm92b0NoaXBzRWxlbWVudCxcbiAgICBOb3ZvUm93Q2hpcEVsZW1lbnQsXG4gICAgTm92b1Jvd0NoaXBzRWxlbWVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAge1xuICAgICAgcHJvdmlkZTogTk9WT19DSElQU19ERUZBVUxUX09QVElPTlMsXG4gICAgICB1c2VWYWx1ZToge1xuICAgICAgICBzZXBhcmF0b3JLZXlDb2RlczogW0tleS5FbnRlcl0sXG4gICAgICB9IGFzIE5vdm9DaGlwc0RlZmF1bHRPcHRpb25zLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DaGlwc01vZHVsZSB7fVxuIl19