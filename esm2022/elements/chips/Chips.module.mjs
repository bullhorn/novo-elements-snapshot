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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoChipsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NovoChipsModule, declarations: [NovoChipElement,
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
            NovoRowChipsElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoChipsModule, providers: [
            ErrorStateMatcher,
            {
                provide: NOVO_CHIPS_DEFAULT_OPTIONS,
                useValue: {
                    separatorKeyCodes: ["Enter" /* Key.Enter */],
                },
            },
        ], imports: [CommonModule, FormsModule, NovoPickerModule, NovoIconModule, NovoFieldModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoChipsModule, decorators: [{
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
                                separatorKeyCodes: ["Enter" /* Key.Enter */],
                            },
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2hpcHMvQ2hpcHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDekUsT0FBTyxFQUEyQiwwQkFBMEIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sWUFBWSxDQUFDOztBQWlDckUsTUFBTSxPQUFPLGVBQWU7K0dBQWYsZUFBZTtnSEFBZixlQUFlLGlCQTdCeEIsZUFBZTtZQUNmLGNBQWM7WUFDZCxjQUFjO1lBQ2QsYUFBYTtZQUNiLFlBQVk7WUFDWixnQkFBZ0I7WUFDaEIsa0JBQWtCO1lBQ2xCLG1CQUFtQixhQVRYLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGVBQWUsYUFZcEYsZUFBZTtZQUNmLGNBQWM7WUFDZCxjQUFjO1lBQ2QsYUFBYTtZQUNiLFlBQVk7WUFDWixnQkFBZ0I7WUFDaEIsa0JBQWtCO1lBQ2xCLG1CQUFtQjtnSEFZVixlQUFlLGFBVmY7WUFDVCxpQkFBaUI7WUFDakI7Z0JBQ0UsT0FBTyxFQUFFLDBCQUEwQjtnQkFDbkMsUUFBUSxFQUFFO29CQUNSLGlCQUFpQixFQUFFLHlCQUFXO2lCQUNKO2FBQzdCO1NBQ0YsWUE3QlMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsZUFBZTs7NEZBK0IzRSxlQUFlO2tCQWhDM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUM7b0JBQ3ZGLFlBQVksRUFBRTt3QkFDWixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3FCQUNwQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsaUJBQWlCO3dCQUNqQjs0QkFDRSxPQUFPLEVBQUUsMEJBQTBCOzRCQUNuQyxRQUFRLEVBQUU7Z0NBQ1IsaUJBQWlCLEVBQUUseUJBQVc7NkJBQ0o7eUJBQzdCO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gQVBQXG5pbXBvcnQgeyBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IEVycm9yU3RhdGVNYXRjaGVyIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0ZpZWxkTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvaWNvbic7XG5pbXBvcnQgeyBOb3ZvUGlja2VyTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9waWNrZXInO1xuaW1wb3J0IHsgTm92b0NoaXBBdmF0YXIsIE5vdm9DaGlwRWxlbWVudCwgTm92b0NoaXBSZW1vdmUgfSBmcm9tICcuL0NoaXAnO1xuaW1wb3J0IHsgTm92b0NoaXBzRGVmYXVsdE9wdGlvbnMsIE5PVk9fQ0hJUFNfREVGQVVMVF9PUFRJT05TIH0gZnJvbSAnLi9DaGlwRGVmYXVsdHMnO1xuaW1wb3J0IHsgTm92b0NoaXBJbnB1dCB9IGZyb20gJy4vQ2hpcElucHV0JztcbmltcG9ydCB7IE5vdm9DaGlwTGlzdCB9IGZyb20gJy4vQ2hpcExpc3QnO1xuaW1wb3J0IHsgTm92b0NoaXBzRWxlbWVudCB9IGZyb20gJy4vQ2hpcHMnO1xuaW1wb3J0IHsgTm92b1Jvd0NoaXBFbGVtZW50LCBOb3ZvUm93Q2hpcHNFbGVtZW50IH0gZnJvbSAnLi9Sb3dDaGlwcyc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTm92b1BpY2tlck1vZHVsZSwgTm92b0ljb25Nb2R1bGUsIE5vdm9GaWVsZE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9DaGlwRWxlbWVudCxcbiAgICBOb3ZvQ2hpcEF2YXRhcixcbiAgICBOb3ZvQ2hpcFJlbW92ZSxcbiAgICBOb3ZvQ2hpcElucHV0LFxuICAgIE5vdm9DaGlwTGlzdCxcbiAgICBOb3ZvQ2hpcHNFbGVtZW50LFxuICAgIE5vdm9Sb3dDaGlwRWxlbWVudCxcbiAgICBOb3ZvUm93Q2hpcHNFbGVtZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0NoaXBFbGVtZW50LFxuICAgIE5vdm9DaGlwQXZhdGFyLFxuICAgIE5vdm9DaGlwUmVtb3ZlLFxuICAgIE5vdm9DaGlwSW5wdXQsXG4gICAgTm92b0NoaXBMaXN0LFxuICAgIE5vdm9DaGlwc0VsZW1lbnQsXG4gICAgTm92b1Jvd0NoaXBFbGVtZW50LFxuICAgIE5vdm9Sb3dDaGlwc0VsZW1lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5PVk9fQ0hJUFNfREVGQVVMVF9PUFRJT05TLFxuICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgc2VwYXJhdG9yS2V5Q29kZXM6IFtLZXkuRW50ZXJdLFxuICAgICAgfSBhcyBOb3ZvQ2hpcHNEZWZhdWx0T3B0aW9ucyxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2hpcHNNb2R1bGUge31cbiJdfQ==