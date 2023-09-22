// NG2
import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
// APP
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoCommonModule } from 'novo-elements/elements/common';
import { DYNAMIC_FORM_TEMPLATE } from 'novo-elements/utils';
import { NovoAceEditor } from './AceEditor';
import { NovoAceEditorFormTemplate } from './AceEditorFormTemplate';
import * as i0 from "@angular/core";
export class NovoAceEditorModule {
}
NovoAceEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAceEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoAceEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAceEditorModule, declarations: [NovoAceEditor, NovoAceEditorFormTemplate], imports: [CommonModule, FormsModule, ReactiveFormsModule, NovoCommonModule], exports: [NovoAceEditor] });
NovoAceEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAceEditorModule, providers: [
        {
            provide: DYNAMIC_FORM_TEMPLATE,
            multi: true,
            deps: [NgModuleRef],
            useFactory: (mod) => {
                return {
                    type: NovoAceEditorFormTemplate,
                    ngModuleRef: mod
                };
            }
        }
    ], imports: [[CommonModule, FormsModule, ReactiveFormsModule, NovoCommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAceEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ReactiveFormsModule, NovoCommonModule],
                    declarations: [NovoAceEditor, NovoAceEditorFormTemplate],
                    exports: [NovoAceEditor],
                    providers: [
                        {
                            provide: DYNAMIC_FORM_TEMPLATE,
                            multi: true,
                            deps: [NgModuleRef],
                            useFactory: (mod) => {
                                return {
                                    type: NovoAceEditorFormTemplate,
                                    ngModuleRef: mod
                                };
                            }
                        }
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNlRWRpdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2FkZG9ucy9hY2UtZWRpdG9yL0FjZUVkaXRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxNQUFNO0FBQ04sT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBMkIsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQW9CcEUsTUFBTSxPQUFPLG1CQUFtQjs7aUhBQW5CLG1CQUFtQjtrSEFBbkIsbUJBQW1CLGlCQWhCZixhQUFhLEVBQUUseUJBQXlCLGFBRDdDLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLGFBRWhFLGFBQWE7a0hBZVosbUJBQW1CLGFBZG5CO1FBQ1Q7WUFDSSxPQUFPLEVBQUUscUJBQXFCO1lBQzlCLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ25CLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNoQixPQUFPO29CQUNILElBQUksRUFBRSx5QkFBeUI7b0JBQy9CLFdBQVcsRUFBRSxHQUFHO2lCQUNRLENBQUM7WUFDakMsQ0FBQztTQUNKO0tBQ0osWUFmVSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUM7NEZBaUJoRSxtQkFBbUI7a0JBbEIvQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUM7b0JBQzNFLFlBQVksRUFBRSxDQUFDLGFBQWEsRUFBRSx5QkFBeUIsQ0FBQztvQkFDeEQsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUN4QixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0ksT0FBTyxFQUFFLHFCQUFxQjs0QkFDOUIsS0FBSyxFQUFFLElBQUk7NEJBQ1gsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDOzRCQUNuQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQ0FDaEIsT0FBTztvQ0FDSCxJQUFJLEVBQUUseUJBQXlCO29DQUMvQixXQUFXLEVBQUUsR0FBRztpQ0FDUSxDQUFDOzRCQUNqQyxDQUFDO3lCQUNKO3FCQUNKO2lCQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE5nTW9kdWxlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IERZTkFNSUNfRk9STV9URU1QTEFURSwgRHluYW1pY0Zvcm1UZW1wbGF0ZUFyZ3MgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IE5vdm9BY2VFZGl0b3IgfSBmcm9tICcuL0FjZUVkaXRvcic7XG5pbXBvcnQgeyBOb3ZvQWNlRWRpdG9yRm9ybVRlbXBsYXRlIH0gZnJvbSAnLi9BY2VFZGl0b3JGb3JtVGVtcGxhdGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgTm92b0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9BY2VFZGl0b3IsIE5vdm9BY2VFZGl0b3JGb3JtVGVtcGxhdGVdLFxuICBleHBvcnRzOiBbTm92b0FjZUVkaXRvcl0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgICAgcHJvdmlkZTogRFlOQU1JQ19GT1JNX1RFTVBMQVRFLFxuICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgZGVwczogW05nTW9kdWxlUmVmXSxcbiAgICAgICAgdXNlRmFjdG9yeTogKG1vZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBOb3ZvQWNlRWRpdG9yRm9ybVRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIG5nTW9kdWxlUmVmOiBtb2RcbiAgICAgICAgICAgIH0gYXMgRHluYW1pY0Zvcm1UZW1wbGF0ZUFyZ3M7XG4gICAgICAgIH1cbiAgICB9XG5dXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BY2VFZGl0b3JNb2R1bGUge31cbiJdfQ==