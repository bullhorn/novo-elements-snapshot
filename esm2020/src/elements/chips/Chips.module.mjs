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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2hpcHMvQ2hpcHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN6QyxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3pFLE9BQU8sRUFBMkIsMEJBQTBCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFlBQVksQ0FBQzs7QUFpQ3JFLE1BQU0sT0FBTyxlQUFlOzs2R0FBZixlQUFlOzhHQUFmLGVBQWUsaUJBN0J4QixlQUFlO1FBQ2YsY0FBYztRQUNkLGNBQWM7UUFDZCxhQUFhO1FBQ2IsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixrQkFBa0I7UUFDbEIsbUJBQW1CLGFBVFgsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsZUFBZSxhQVlwRixlQUFlO1FBQ2YsY0FBYztRQUNkLGNBQWM7UUFDZCxhQUFhO1FBQ2IsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixrQkFBa0I7UUFDbEIsbUJBQW1COzhHQVlWLGVBQWUsYUFWZjtRQUNULGlCQUFpQjtRQUNqQjtZQUNFLE9BQU8sRUFBRSwwQkFBMEI7WUFDbkMsUUFBUSxFQUFFO2dCQUNSLGlCQUFpQixFQUFFLHFCQUFXO2FBQ0o7U0FDN0I7S0FDRixZQTdCUSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQzs0RkErQjVFLGVBQWU7a0JBaEMzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQztvQkFDdkYsWUFBWSxFQUFFO3dCQUNaLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQixtQkFBbUI7cUJBQ3BCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxpQkFBaUI7d0JBQ2pCOzRCQUNFLE9BQU8sRUFBRSwwQkFBMEI7NEJBQ25DLFFBQVEsRUFBRTtnQ0FDUixpQkFBaUIsRUFBRSxxQkFBVzs2QkFDSjt5QkFDN0I7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBFcnJvclN0YXRlTWF0Y2hlciB9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvRmllbGRNb2R1bGUgfSBmcm9tICcuLi9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJy4uL2ljb24nO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvUGlja2VyTW9kdWxlIH0gZnJvbSAnLi8uLi9waWNrZXIvUGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQ2hpcEF2YXRhciwgTm92b0NoaXBFbGVtZW50LCBOb3ZvQ2hpcFJlbW92ZSB9IGZyb20gJy4vQ2hpcCc7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNEZWZhdWx0T3B0aW9ucywgTk9WT19DSElQU19ERUZBVUxUX09QVElPTlMgfSBmcm9tICcuL0NoaXBEZWZhdWx0cyc7XG5pbXBvcnQgeyBOb3ZvQ2hpcElucHV0IH0gZnJvbSAnLi9DaGlwSW5wdXQnO1xuaW1wb3J0IHsgTm92b0NoaXBMaXN0IH0gZnJvbSAnLi9DaGlwTGlzdCc7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNFbGVtZW50IH0gZnJvbSAnLi9DaGlwcyc7XG5pbXBvcnQgeyBOb3ZvUm93Q2hpcEVsZW1lbnQsIE5vdm9Sb3dDaGlwc0VsZW1lbnQgfSBmcm9tICcuL1Jvd0NoaXBzJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBOb3ZvUGlja2VyTW9kdWxlLCBOb3ZvSWNvbk1vZHVsZSwgTm92b0ZpZWxkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b0NoaXBFbGVtZW50LFxuICAgIE5vdm9DaGlwQXZhdGFyLFxuICAgIE5vdm9DaGlwUmVtb3ZlLFxuICAgIE5vdm9DaGlwSW5wdXQsXG4gICAgTm92b0NoaXBMaXN0LFxuICAgIE5vdm9DaGlwc0VsZW1lbnQsXG4gICAgTm92b1Jvd0NoaXBFbGVtZW50LFxuICAgIE5vdm9Sb3dDaGlwc0VsZW1lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvQ2hpcEVsZW1lbnQsXG4gICAgTm92b0NoaXBBdmF0YXIsXG4gICAgTm92b0NoaXBSZW1vdmUsXG4gICAgTm92b0NoaXBJbnB1dCxcbiAgICBOb3ZvQ2hpcExpc3QsXG4gICAgTm92b0NoaXBzRWxlbWVudCxcbiAgICBOb3ZvUm93Q2hpcEVsZW1lbnQsXG4gICAgTm92b1Jvd0NoaXBzRWxlbWVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAge1xuICAgICAgcHJvdmlkZTogTk9WT19DSElQU19ERUZBVUxUX09QVElPTlMsXG4gICAgICB1c2VWYWx1ZToge1xuICAgICAgICBzZXBhcmF0b3JLZXlDb2RlczogW0tleS5FbnRlcl0sXG4gICAgICB9IGFzIE5vdm9DaGlwc0RlZmF1bHRPcHRpb25zLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DaGlwc01vZHVsZSB7fVxuIl19