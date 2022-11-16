import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoTitle } from './typography/title/title.component';
import { NovoText } from './typography/text/text.component';
import { NovoLink } from './typography/link/link.component';
import { NovoLabel } from './typography/label/label.component';
import { NovoCaption } from './typography/caption/caption.component';
import { NovoOptionModule } from './option';
import { NovoTemplate } from './novo-template/novo-template.directive';
import { VisibleDirective } from './directives/visible.directive';
import { ThemeColorDirective } from './directives/theme.directive';
import { SwitchCasesDirective } from './directives/switch-cases.directive';
import { GapDirective, MarginDirective, PaddingDirective } from './directives/space.directive';
import { FlexDirective } from './directives/flex.directive';
import { FillColorDirective } from './directives/fill.directive';
import { TextColorDirective } from './directives/color.directive';
import { BorderDirective } from './directives/border.directive';
import { BackgroundColorDirective } from './directives/bg.directive';
import { AccentColorDirective } from './directives/accent.directive';
import * as i0 from "@angular/core";
export class NovoCommonModule {
}
NovoCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCommonModule, declarations: [NovoTemplate,
        NovoText,
        NovoTitle,
        NovoCaption,
        NovoLabel,
        NovoLink,
        MarginDirective,
        PaddingDirective,
        BackgroundColorDirective,
        TextColorDirective,
        BorderDirective,
        GapDirective,
        AccentColorDirective,
        FillColorDirective,
        FlexDirective,
        ThemeColorDirective,
        SwitchCasesDirective,
        VisibleDirective], imports: [CommonModule, NovoOptionModule], exports: [NovoTemplate,
        NovoText,
        NovoTitle,
        NovoCaption,
        NovoLabel,
        NovoLink,
        MarginDirective,
        PaddingDirective,
        BackgroundColorDirective,
        TextColorDirective,
        BorderDirective,
        GapDirective,
        AccentColorDirective,
        FillColorDirective,
        FlexDirective,
        ThemeColorDirective,
        SwitchCasesDirective,
        VisibleDirective] });
NovoCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCommonModule, imports: [[CommonModule, NovoOptionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoOptionModule],
                    exports: [
                        NovoTemplate,
                        NovoText,
                        NovoTitle,
                        NovoCaption,
                        NovoLabel,
                        NovoLink,
                        MarginDirective,
                        PaddingDirective,
                        BackgroundColorDirective,
                        TextColorDirective,
                        BorderDirective,
                        GapDirective,
                        AccentColorDirective,
                        FillColorDirective,
                        FlexDirective,
                        ThemeColorDirective,
                        SwitchCasesDirective,
                        VisibleDirective,
                    ],
                    declarations: [
                        NovoTemplate,
                        NovoText,
                        NovoTitle,
                        NovoCaption,
                        NovoLabel,
                        NovoLink,
                        MarginDirective,
                        PaddingDirective,
                        BackgroundColorDirective,
                        TextColorDirective,
                        BorderDirective,
                        GapDirective,
                        AccentColorDirective,
                        FillColorDirective,
                        FlexDirective,
                        ThemeColorDirective,
                        SwitchCasesDirective,
                        VisibleDirective,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbW1vbi9jb21tb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDNUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9GLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBNkNyRSxNQUFNLE9BQU8sZ0JBQWdCOzs4R0FBaEIsZ0JBQWdCOytHQUFoQixnQkFBZ0IsaUJBcEJ6QixZQUFZO1FBQ1osUUFBUTtRQUNSLFNBQVM7UUFDVCxXQUFXO1FBQ1gsU0FBUztRQUNULFFBQVE7UUFDUixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLHdCQUF3QjtRQUN4QixrQkFBa0I7UUFDbEIsZUFBZTtRQUNmLFlBQVk7UUFDWixvQkFBb0I7UUFDcEIsa0JBQWtCO1FBQ2xCLGFBQWE7UUFDYixtQkFBbUI7UUFDbkIsb0JBQW9CO1FBQ3BCLGdCQUFnQixhQXZDUixZQUFZLEVBQUUsZ0JBQWdCLGFBRXRDLFlBQVk7UUFDWixRQUFRO1FBQ1IsU0FBUztRQUNULFdBQVc7UUFDWCxTQUFTO1FBQ1QsUUFBUTtRQUNSLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsd0JBQXdCO1FBQ3hCLGtCQUFrQjtRQUNsQixlQUFlO1FBQ2YsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsZ0JBQWdCOytHQXVCUCxnQkFBZ0IsWUExQ2xCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDOzRGQTBDOUIsZ0JBQWdCO2tCQTNDNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7b0JBQ3pDLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFFBQVE7d0JBQ1IsU0FBUzt3QkFDVCxXQUFXO3dCQUNYLFNBQVM7d0JBQ1QsUUFBUTt3QkFDUixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsd0JBQXdCO3dCQUN4QixrQkFBa0I7d0JBQ2xCLGVBQWU7d0JBQ2YsWUFBWTt3QkFDWixvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFDbEIsYUFBYTt3QkFDYixtQkFBbUI7d0JBQ25CLG9CQUFvQjt3QkFDcEIsZ0JBQWdCO3FCQUNqQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osWUFBWTt3QkFDWixRQUFRO3dCQUNSLFNBQVM7d0JBQ1QsV0FBVzt3QkFDWCxTQUFTO3dCQUNULFFBQVE7d0JBQ1IsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLHdCQUF3Qjt3QkFDeEIsa0JBQWtCO3dCQUNsQixlQUFlO3dCQUNmLFlBQVk7d0JBQ1osb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLGFBQWE7d0JBQ2IsbUJBQW1CO3dCQUNuQixvQkFBb0I7d0JBQ3BCLGdCQUFnQjtxQkFDakI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9UaXRsZSB9IGZyb20gJy4vdHlwb2dyYXBoeS90aXRsZS90aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b1RleHQgfSBmcm9tICcuL3R5cG9ncmFwaHkvdGV4dC90ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvTGluayB9IGZyb20gJy4vdHlwb2dyYXBoeS9saW5rL2xpbmsuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9MYWJlbCB9IGZyb20gJy4vdHlwb2dyYXBoeS9sYWJlbC9sYWJlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0NhcHRpb24gfSBmcm9tICcuL3R5cG9ncmFwaHkvY2FwdGlvbi9jYXB0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvT3B0aW9uTW9kdWxlIH0gZnJvbSAnLi9vcHRpb24nO1xuaW1wb3J0IHsgTm92b1RlbXBsYXRlIH0gZnJvbSAnLi9ub3ZvLXRlbXBsYXRlL25vdm8tdGVtcGxhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFZpc2libGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdmlzaWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGhlbWVDb2xvckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy90aGVtZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU3dpdGNoQ2FzZXNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc3dpdGNoLWNhc2VzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHYXBEaXJlY3RpdmUsIE1hcmdpbkRpcmVjdGl2ZSwgUGFkZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zcGFjZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRmxleERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9mbGV4LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGaWxsQ29sb3JEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZmlsbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGV4dENvbG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NvbG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCb3JkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYm9yZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kQ29sb3JEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYmcuZGlyZWN0aXZlJztcbmltcG9ydCB7IEFjY2VudENvbG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2FjY2VudC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9UZW1wbGF0ZSxcbiAgICBOb3ZvVGV4dCxcbiAgICBOb3ZvVGl0bGUsXG4gICAgTm92b0NhcHRpb24sXG4gICAgTm92b0xhYmVsLFxuICAgIE5vdm9MaW5rLFxuICAgIE1hcmdpbkRpcmVjdGl2ZSxcbiAgICBQYWRkaW5nRGlyZWN0aXZlLFxuICAgIEJhY2tncm91bmRDb2xvckRpcmVjdGl2ZSxcbiAgICBUZXh0Q29sb3JEaXJlY3RpdmUsXG4gICAgQm9yZGVyRGlyZWN0aXZlLFxuICAgIEdhcERpcmVjdGl2ZSxcbiAgICBBY2NlbnRDb2xvckRpcmVjdGl2ZSxcbiAgICBGaWxsQ29sb3JEaXJlY3RpdmUsXG4gICAgRmxleERpcmVjdGl2ZSxcbiAgICBUaGVtZUNvbG9yRGlyZWN0aXZlLFxuICAgIFN3aXRjaENhc2VzRGlyZWN0aXZlLFxuICAgIFZpc2libGVEaXJlY3RpdmUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9UZW1wbGF0ZSxcbiAgICBOb3ZvVGV4dCxcbiAgICBOb3ZvVGl0bGUsXG4gICAgTm92b0NhcHRpb24sXG4gICAgTm92b0xhYmVsLFxuICAgIE5vdm9MaW5rLFxuICAgIE1hcmdpbkRpcmVjdGl2ZSxcbiAgICBQYWRkaW5nRGlyZWN0aXZlLFxuICAgIEJhY2tncm91bmRDb2xvckRpcmVjdGl2ZSxcbiAgICBUZXh0Q29sb3JEaXJlY3RpdmUsXG4gICAgQm9yZGVyRGlyZWN0aXZlLFxuICAgIEdhcERpcmVjdGl2ZSxcbiAgICBBY2NlbnRDb2xvckRpcmVjdGl2ZSxcbiAgICBGaWxsQ29sb3JEaXJlY3RpdmUsXG4gICAgRmxleERpcmVjdGl2ZSxcbiAgICBUaGVtZUNvbG9yRGlyZWN0aXZlLFxuICAgIFN3aXRjaENhc2VzRGlyZWN0aXZlLFxuICAgIFZpc2libGVEaXJlY3RpdmUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Db21tb25Nb2R1bGUge31cbiJdfQ==