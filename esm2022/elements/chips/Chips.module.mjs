// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorStateMatcher, NovoCommonModule } from 'novo-elements/elements/common';
import { NovoFieldModule } from 'novo-elements/elements/field';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoPickerModule } from 'novo-elements/elements/picker';
import { NovoChipAvatar, NovoChipElement, NovoChipRemove } from './Chip';
import { NOVO_CHIPS_DEFAULT_OPTIONS } from './ChipDefaults';
import { NovoChipInput } from './ChipInput';
import { NovoChipList } from './ChipList';
import { NovoChipsElement } from './Chips';
import { NovoRowChipElement, NovoRowChipsElement } from './RowChips';
import { AvatarTypePipe } from './pipe/AvatarType.pipe';
import * as i0 from "@angular/core";
export class NovoChipsModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoChipsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.3", ngImport: i0, type: NovoChipsModule, declarations: [NovoChipElement,
            NovoChipAvatar,
            NovoChipRemove,
            NovoChipInput,
            NovoChipList,
            NovoChipsElement,
            NovoRowChipElement,
            NovoRowChipsElement,
            AvatarTypePipe], imports: [CommonModule, FormsModule, NovoPickerModule, NovoIconModule, NovoFieldModule, NovoCommonModule], exports: [NovoChipElement,
            NovoChipAvatar,
            NovoChipRemove,
            NovoChipInput,
            NovoChipList,
            NovoChipsElement,
            NovoRowChipElement,
            NovoRowChipsElement,
            AvatarTypePipe] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoChipsModule, providers: [
            ErrorStateMatcher,
            {
                provide: NOVO_CHIPS_DEFAULT_OPTIONS,
                useValue: {
                    separatorKeyCodes: ["Enter" /* Key.Enter */],
                },
            },
        ], imports: [CommonModule, FormsModule, NovoPickerModule, NovoIconModule, NovoFieldModule, NovoCommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoChipsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoPickerModule, NovoIconModule, NovoFieldModule, NovoCommonModule],
                    declarations: [
                        NovoChipElement,
                        NovoChipAvatar,
                        NovoChipRemove,
                        NovoChipInput,
                        NovoChipList,
                        NovoChipsElement,
                        NovoRowChipElement,
                        NovoRowChipsElement,
                        AvatarTypePipe
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
                        AvatarTypePipe
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2hpcHMvQ2hpcHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDekUsT0FBTyxFQUEyQiwwQkFBMEIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFtQ3hELE1BQU0sT0FBTyxlQUFlOzhHQUFmLGVBQWU7K0dBQWYsZUFBZSxpQkEvQnhCLGVBQWU7WUFDZixjQUFjO1lBQ2QsY0FBYztZQUNkLGFBQWE7WUFDYixZQUFZO1lBQ1osZ0JBQWdCO1lBQ2hCLGtCQUFrQjtZQUNsQixtQkFBbUI7WUFDbkIsY0FBYyxhQVZOLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsYUFhdEcsZUFBZTtZQUNmLGNBQWM7WUFDZCxjQUFjO1lBQ2QsYUFBYTtZQUNiLFlBQVk7WUFDWixnQkFBZ0I7WUFDaEIsa0JBQWtCO1lBQ2xCLG1CQUFtQjtZQUNuQixjQUFjOytHQVlMLGVBQWUsYUFWZjtZQUNULGlCQUFpQjtZQUNqQjtnQkFDRSxPQUFPLEVBQUUsMEJBQTBCO2dCQUNuQyxRQUFRLEVBQUU7b0JBQ1IsaUJBQWlCLEVBQUUseUJBQVc7aUJBQ0o7YUFDN0I7U0FDRixZQS9CUyxZQUFZLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCOzsyRkFpQzdGLGVBQWU7a0JBbEMzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDekcsWUFBWSxFQUFFO3dCQUNaLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3dCQUNuQixjQUFjO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLG1CQUFtQjt3QkFDbkIsY0FBYztxQkFDZjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsaUJBQWlCO3dCQUNqQjs0QkFDRSxPQUFPLEVBQUUsMEJBQTBCOzRCQUNuQyxRQUFRLEVBQUU7Z0NBQ1IsaUJBQWlCLEVBQUUseUJBQVc7NkJBQ0o7eUJBQzdCO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gQVBQXG5pbXBvcnQgeyBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IEVycm9yU3RhdGVNYXRjaGVyLCBOb3ZvQ29tbW9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0ZpZWxkTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvaWNvbic7XG5pbXBvcnQgeyBOb3ZvUGlja2VyTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9waWNrZXInO1xuaW1wb3J0IHsgTm92b0NoaXBBdmF0YXIsIE5vdm9DaGlwRWxlbWVudCwgTm92b0NoaXBSZW1vdmUgfSBmcm9tICcuL0NoaXAnO1xuaW1wb3J0IHsgTm92b0NoaXBzRGVmYXVsdE9wdGlvbnMsIE5PVk9fQ0hJUFNfREVGQVVMVF9PUFRJT05TIH0gZnJvbSAnLi9DaGlwRGVmYXVsdHMnO1xuaW1wb3J0IHsgTm92b0NoaXBJbnB1dCB9IGZyb20gJy4vQ2hpcElucHV0JztcbmltcG9ydCB7IE5vdm9DaGlwTGlzdCB9IGZyb20gJy4vQ2hpcExpc3QnO1xuaW1wb3J0IHsgTm92b0NoaXBzRWxlbWVudCB9IGZyb20gJy4vQ2hpcHMnO1xuaW1wb3J0IHsgTm92b1Jvd0NoaXBFbGVtZW50LCBOb3ZvUm93Q2hpcHNFbGVtZW50IH0gZnJvbSAnLi9Sb3dDaGlwcyc7XG5pbXBvcnQgeyBBdmF0YXJUeXBlUGlwZSB9IGZyb20gJy4vcGlwZS9BdmF0YXJUeXBlLnBpcGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE5vdm9QaWNrZXJNb2R1bGUsIE5vdm9JY29uTW9kdWxlLCBOb3ZvRmllbGRNb2R1bGUsIE5vdm9Db21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvQ2hpcEVsZW1lbnQsXG4gICAgTm92b0NoaXBBdmF0YXIsXG4gICAgTm92b0NoaXBSZW1vdmUsXG4gICAgTm92b0NoaXBJbnB1dCxcbiAgICBOb3ZvQ2hpcExpc3QsXG4gICAgTm92b0NoaXBzRWxlbWVudCxcbiAgICBOb3ZvUm93Q2hpcEVsZW1lbnQsXG4gICAgTm92b1Jvd0NoaXBzRWxlbWVudCxcbiAgICBBdmF0YXJUeXBlUGlwZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0NoaXBFbGVtZW50LFxuICAgIE5vdm9DaGlwQXZhdGFyLFxuICAgIE5vdm9DaGlwUmVtb3ZlLFxuICAgIE5vdm9DaGlwSW5wdXQsXG4gICAgTm92b0NoaXBMaXN0LFxuICAgIE5vdm9DaGlwc0VsZW1lbnQsXG4gICAgTm92b1Jvd0NoaXBFbGVtZW50LFxuICAgIE5vdm9Sb3dDaGlwc0VsZW1lbnQsXG4gICAgQXZhdGFyVHlwZVBpcGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAge1xuICAgICAgcHJvdmlkZTogTk9WT19DSElQU19ERUZBVUxUX09QVElPTlMsXG4gICAgICB1c2VWYWx1ZToge1xuICAgICAgICBzZXBhcmF0b3JLZXlDb2RlczogW0tleS5FbnRlcl0sXG4gICAgICB9IGFzIE5vdm9DaGlwc0RlZmF1bHRPcHRpb25zLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DaGlwc01vZHVsZSB7fVxuIl19