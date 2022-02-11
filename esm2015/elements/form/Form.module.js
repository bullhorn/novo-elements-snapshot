// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoCommonModule } from '../common/common.module';
import { NovoTemplateService } from './../../services/template/NovoTemplateService';
import { NovoAceEditorModule } from './../ace-editor/AceEditor.module';
import { NovoButtonModule } from './../button/Button.module';
import { NovoChipsModule } from './../chips/Chips.module';
import { NovoNovoCKEditorModule } from './../ckeditor/CKEditor.module';
import { NovoDatePickerModule } from './../date-picker/DatePicker.module';
import { NovoDateTimePickerModule } from './../date-time-picker/DateTimePicker.module';
import { NovoDragulaModule } from './../dragula/Dragula.module';
import { NovoHeaderModule } from './../header/Header.module';
import { NovoModalModule } from './../modal/modal.module';
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoQuickNoteModule } from './../quick-note/QuickNote.module';
// APP
import { NovoRadioModule } from './../radio/Radio.module';
import { NovoSelectModule } from './../select/Select.module';
import { NovoTilesModule } from './../tiles/Tiles.module';
import { NovoTimePickerModule } from './../time-picker/TimePicker.module';
import { NovoTipWellModule } from './../tip-well/TipWell.module';
import { NovoTooltipModule } from './../tooltip/Tooltip.module';
import { NovoAutoSize, NovoControlElement } from './Control';
import { NovoControlGroup } from './ControlGroup';
import { NovoControlTemplates } from './ControlTemplates';
import { NovoDynamicFormElement, NovoFieldsetElement, NovoFieldsetHeaderElement } from './DynamicForm';
import { NovoFormExtrasModule } from './extras/FormExtras.module';
import { ControlConfirmModal, ControlPromptModal } from './FieldInteractionModals';
import { NovoFormElement } from './Form';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/overlay";
import * as i3 from "@angular/cdk/bidi";
import * as i4 from "@angular/cdk/scrolling";
import * as i5 from "@angular/forms";
import * as i6 from "../radio/Radio";
import * as i7 from "../radio/RadioGroup";
import * as i8 from "../tiles/Tiles";
import * as i9 from "../select/Select";
import * as i10 from "../picker/Picker";
import * as i11 from "../picker/extras/picker-results/PickerResults";
import * as i12 from "../picker/extras/entity-picker-results/EntityPickerResults";
import * as i13 from "../picker/extras/checklist-picker-results/ChecklistPickerResults";
import * as i14 from "../picker/extras/grouped-multi-picker-results/GroupedMultiPickerResults";
import * as i15 from "../picker/extras/distributionlist-picker-results/DistributionListPickerResults";
import * as i16 from "../picker/extras/workers-comp-codes-picker-results/WorkersCompCodesPickerResults";
import * as i17 from "../picker/extras/skills-picker-results/SkillsSpecialtyPickerResults";
import * as i18 from "../chips/Chip";
import * as i19 from "../chips/ChipInput";
import * as i20 from "../chips/ChipList";
import * as i21 from "../chips/Chips";
import * as i22 from "../chips/RowChips";
import * as i23 from "../date-picker/DatePicker";
import * as i24 from "../date-picker/DatePickerInput";
import * as i25 from "../date-picker/DateRangeInput";
import * as i26 from "../date-picker/MultiDateInput";
import * as i27 from "../date-picker/month-view/month-view.component";
import * as i28 from "../date-picker/month-select/month-select.component";
import * as i29 from "../date-picker/year-select/year-select.component";
import * as i30 from "../date-picker/calendar/calendar.component";
import * as i31 from "../time-picker/TimePicker";
import * as i32 from "../time-picker/TimePickerInput";
import * as i33 from "../ckeditor/CKEditor";
import * as i34 from "./extras/address/Address";
import * as i35 from "./extras/checkbox/Checkbox";
import * as i36 from "./extras/checkbox/CheckList";
import * as i37 from "./extras/file/FileInput";
import * as i38 from "../quick-note/QuickNote";
import * as i39 from "../quick-note/extras/quick-note-results/QuickNoteResults";
import * as i40 from "../date-time-picker/DateTimePicker";
import * as i41 from "../date-time-picker/DateTimePickerInput";
import * as i42 from "../header/Header";
import * as i43 from "../tooltip/Tooltip.directive";
import * as i44 from "../dragula/Dragula";
import * as i45 from "angular-imask";
import * as i46 from "angular2-text-mask";
import * as i47 from "../tip-well/TipWell";
import * as i48 from "../modal/modal.component";
import * as i49 from "../button/Button";
import * as i50 from "../ace-editor/AceEditor";
import * as i51 from "../common/novo-template/novo-template.directive";
import * as i52 from "../common/typography/text/text.component";
import * as i53 from "../common/typography/title/title.component";
import * as i54 from "../common/typography/caption/caption.component";
import * as i55 from "../common/typography/label/label.component";
import * as i56 from "../common/typography/link/link.component";
import * as i57 from "../common/directives/space.directive";
export class NovoFormModule {
}
NovoFormModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoFormModule });
NovoFormModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoFormModule_Factory(t) { return new (t || NovoFormModule)(); }, providers: [NovoTemplateService], imports: [[
            CommonModule,
            OverlayModule,
            ReactiveFormsModule,
            NovoRadioModule,
            NovoTilesModule,
            NovoSelectModule,
            NovoPickerModule,
            NovoChipsModule,
            NovoDatePickerModule,
            NovoTimePickerModule,
            NovoNovoCKEditorModule,
            NovoFormExtrasModule,
            NovoQuickNoteModule,
            NovoDateTimePickerModule,
            NovoHeaderModule,
            NovoTooltipModule,
            NovoDragulaModule,
            IMaskDirectiveModule,
            TextMaskModule,
            NovoTipWellModule,
            NovoModalModule,
            NovoButtonModule,
            NovoAceEditorModule,
            NovoCommonModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoFormModule, { declarations: [NovoAutoSize,
        NovoControlElement,
        NovoDynamicFormElement,
        NovoFormElement,
        NovoFieldsetElement,
        NovoFieldsetHeaderElement,
        ControlConfirmModal,
        ControlPromptModal,
        NovoControlGroup,
        NovoControlTemplates], imports: [CommonModule,
        OverlayModule,
        ReactiveFormsModule,
        NovoRadioModule,
        NovoTilesModule,
        NovoSelectModule,
        NovoPickerModule,
        NovoChipsModule,
        NovoDatePickerModule,
        NovoTimePickerModule,
        NovoNovoCKEditorModule,
        NovoFormExtrasModule,
        NovoQuickNoteModule,
        NovoDateTimePickerModule,
        NovoHeaderModule,
        NovoTooltipModule,
        NovoDragulaModule,
        IMaskDirectiveModule,
        TextMaskModule,
        NovoTipWellModule,
        NovoModalModule,
        NovoButtonModule,
        NovoAceEditorModule,
        NovoCommonModule], exports: [NovoAutoSize,
        NovoDynamicFormElement,
        NovoControlElement,
        NovoFormElement,
        NovoFieldsetHeaderElement,
        NovoControlGroup,
        NovoControlTemplates] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoFormModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    OverlayModule,
                    ReactiveFormsModule,
                    NovoRadioModule,
                    NovoTilesModule,
                    NovoSelectModule,
                    NovoPickerModule,
                    NovoChipsModule,
                    NovoDatePickerModule,
                    NovoTimePickerModule,
                    NovoNovoCKEditorModule,
                    NovoFormExtrasModule,
                    NovoQuickNoteModule,
                    NovoDateTimePickerModule,
                    NovoHeaderModule,
                    NovoTooltipModule,
                    NovoDragulaModule,
                    IMaskDirectiveModule,
                    TextMaskModule,
                    NovoTipWellModule,
                    NovoModalModule,
                    NovoButtonModule,
                    NovoAceEditorModule,
                    NovoCommonModule,
                ],
                declarations: [
                    NovoAutoSize,
                    NovoControlElement,
                    NovoDynamicFormElement,
                    NovoFormElement,
                    NovoFieldsetElement,
                    NovoFieldsetHeaderElement,
                    ControlConfirmModal,
                    ControlPromptModal,
                    NovoControlGroup,
                    NovoControlTemplates,
                ],
                exports: [
                    NovoAutoSize,
                    NovoDynamicFormElement,
                    NovoControlElement,
                    NovoFormElement,
                    NovoFieldsetHeaderElement,
                    NovoControlGroup,
                    NovoControlTemplates,
                ],
                providers: [NovoTemplateService],
            }]
    }], null, null); })();
i0.ɵɵsetComponentScope(ControlConfirmModal, [i1.NgClass, i1.NgComponentOutlet, i1.NgForOf, i1.NgIf, i1.NgTemplateOutlet, i1.NgStyle, i1.NgSwitch, i1.NgSwitchCase, i1.NgSwitchDefault, i1.NgPlural, i1.NgPluralCase, i2.CdkConnectedOverlay, i2.CdkOverlayOrigin, i3.Dir, i4.CdkScrollable, i4.CdkFixedSizeVirtualScroll, i4.CdkVirtualForOf, i4.CdkVirtualScrollViewport, i5.ɵangular_packages_forms_forms_y, i5.NgSelectOption, i5.ɵangular_packages_forms_forms_x, i5.DefaultValueAccessor, i5.NumberValueAccessor, i5.RangeValueAccessor, i5.CheckboxControlValueAccessor, i5.SelectControlValueAccessor, i5.SelectMultipleControlValueAccessor, i5.RadioControlValueAccessor, i5.NgControlStatus, i5.NgControlStatusGroup, i5.RequiredValidator, i5.MinLengthValidator, i5.MaxLengthValidator, i5.PatternValidator, i5.CheckboxRequiredValidator, i5.EmailValidator, i5.FormControlDirective, i5.FormGroupDirective, i5.FormControlName, i5.FormGroupName, i5.FormArrayName, i6.NovoRadioElement, i7.NovoRadioGroup, i8.NovoTilesElement, i9.NovoSelectElement, i10.NovoPickerElement, i11.PickerResults, i12.EntityPickerResult, i12.EntityPickerResults, i13.ChecklistPickerResults, i14.GroupedMultiPickerResults, i15.DistributionListPickerResults, i16.WorkersCompCodesPickerResults, i17.SkillsSpecialtyPickerResults, i18.NovoChipElement, i18.NovoChipAvatar, i18.NovoChipRemove, i19.NovoChipInput, i20.NovoChipList, i21.NovoChipsElement, i22.NovoRowChipElement, i22.NovoRowChipsElement, i23.NovoDatePickerElement, i24.NovoDatePickerInputElement, i25.NovoDateRangeInputElement, i26.NovoMultiDateInputElement, i27.NovoMonthViewElement, i28.NovoMonthSelectElement, i29.NovoYearSelectElement, i30.NovoCalendarElement, i31.NovoTimePickerElement, i32.NovoTimePickerInputElement, i33.NovoCKEditorElement, i34.NovoAddressElement, i35.NovoCheckboxElement, i36.NovoCheckListElement, i37.NovoFileInputElement, i38.QuickNoteElement, i39.QuickNoteResults, i40.NovoDateTimePickerElement, i41.NovoDateTimePickerInputElement, i42.NovoHeaderComponent, i42.NovoUtilActionComponent, i42.NovoUtilsComponent, i42.NovoHeaderSpacer, i43.TooltipDirective, i44.NovoDragulaElement, i45.IMaskDirective, i46.MaskedInputDirective, i47.NovoTipWellElement, i48.NovoModalElement, i48.NovoModalNotificationElement, i49.NovoButtonElement, i50.NovoAceEditor, i51.NovoTemplate, i52.NovoText, i53.NovoTitle, i54.NovoCaption, i55.NovoLabel, i56.NovoLink, i57.MarginDirective, i57.PaddingDirective, NovoAutoSize,
    NovoControlElement,
    NovoDynamicFormElement,
    NovoFormElement,
    NovoFieldsetElement,
    NovoFieldsetHeaderElement,
    ControlConfirmModal,
    ControlPromptModal,
    NovoControlGroup,
    NovoControlTemplates], [i1.AsyncPipe, i1.UpperCasePipe, i1.LowerCasePipe, i1.JsonPipe, i1.SlicePipe, i1.DecimalPipe, i1.PercentPipe, i1.TitleCasePipe, i1.CurrencyPipe, i1.DatePipe, i1.I18nPluralPipe, i1.I18nSelectPipe, i1.KeyValuePipe]);
i0.ɵɵsetComponentScope(ControlPromptModal, [i1.NgClass, i1.NgComponentOutlet, i1.NgForOf, i1.NgIf, i1.NgTemplateOutlet, i1.NgStyle, i1.NgSwitch, i1.NgSwitchCase, i1.NgSwitchDefault, i1.NgPlural, i1.NgPluralCase, i2.CdkConnectedOverlay, i2.CdkOverlayOrigin, i3.Dir, i4.CdkScrollable, i4.CdkFixedSizeVirtualScroll, i4.CdkVirtualForOf, i4.CdkVirtualScrollViewport, i5.ɵangular_packages_forms_forms_y, i5.NgSelectOption, i5.ɵangular_packages_forms_forms_x, i5.DefaultValueAccessor, i5.NumberValueAccessor, i5.RangeValueAccessor, i5.CheckboxControlValueAccessor, i5.SelectControlValueAccessor, i5.SelectMultipleControlValueAccessor, i5.RadioControlValueAccessor, i5.NgControlStatus, i5.NgControlStatusGroup, i5.RequiredValidator, i5.MinLengthValidator, i5.MaxLengthValidator, i5.PatternValidator, i5.CheckboxRequiredValidator, i5.EmailValidator, i5.FormControlDirective, i5.FormGroupDirective, i5.FormControlName, i5.FormGroupName, i5.FormArrayName, i6.NovoRadioElement, i7.NovoRadioGroup, i8.NovoTilesElement, i9.NovoSelectElement, i10.NovoPickerElement, i11.PickerResults, i12.EntityPickerResult, i12.EntityPickerResults, i13.ChecklistPickerResults, i14.GroupedMultiPickerResults, i15.DistributionListPickerResults, i16.WorkersCompCodesPickerResults, i17.SkillsSpecialtyPickerResults, i18.NovoChipElement, i18.NovoChipAvatar, i18.NovoChipRemove, i19.NovoChipInput, i20.NovoChipList, i21.NovoChipsElement, i22.NovoRowChipElement, i22.NovoRowChipsElement, i23.NovoDatePickerElement, i24.NovoDatePickerInputElement, i25.NovoDateRangeInputElement, i26.NovoMultiDateInputElement, i27.NovoMonthViewElement, i28.NovoMonthSelectElement, i29.NovoYearSelectElement, i30.NovoCalendarElement, i31.NovoTimePickerElement, i32.NovoTimePickerInputElement, i33.NovoCKEditorElement, i34.NovoAddressElement, i35.NovoCheckboxElement, i36.NovoCheckListElement, i37.NovoFileInputElement, i38.QuickNoteElement, i39.QuickNoteResults, i40.NovoDateTimePickerElement, i41.NovoDateTimePickerInputElement, i42.NovoHeaderComponent, i42.NovoUtilActionComponent, i42.NovoUtilsComponent, i42.NovoHeaderSpacer, i43.TooltipDirective, i44.NovoDragulaElement, i45.IMaskDirective, i46.MaskedInputDirective, i47.NovoTipWellElement, i48.NovoModalElement, i48.NovoModalNotificationElement, i49.NovoButtonElement, i50.NovoAceEditor, i51.NovoTemplate, i52.NovoText, i53.NovoTitle, i54.NovoCaption, i55.NovoLabel, i56.NovoLink, i57.MarginDirective, i57.PaddingDirective, NovoAutoSize,
    NovoControlElement,
    NovoDynamicFormElement,
    NovoFormElement,
    NovoFieldsetElement,
    NovoFieldsetHeaderElement,
    ControlConfirmModal,
    ControlPromptModal,
    NovoControlGroup,
    NovoControlTemplates], [i1.AsyncPipe, i1.UpperCasePipe, i1.LowerCasePipe, i1.JsonPipe, i1.SlicePipe, i1.DecimalPipe, i1.PercentPipe, i1.TitleCasePipe, i1.CurrencyPipe, i1.DatePipe, i1.I18nPluralPipe, i1.I18nSelectPipe, i1.KeyValuePipe]);
i0.ɵɵsetComponentScope(NovoControlGroup, [i1.NgClass, i1.NgComponentOutlet, i1.NgForOf, i1.NgIf, i1.NgTemplateOutlet, i1.NgStyle, i1.NgSwitch, i1.NgSwitchCase, i1.NgSwitchDefault, i1.NgPlural, i1.NgPluralCase, i2.CdkConnectedOverlay, i2.CdkOverlayOrigin, i3.Dir, i4.CdkScrollable, i4.CdkFixedSizeVirtualScroll, i4.CdkVirtualForOf, i4.CdkVirtualScrollViewport, i5.ɵangular_packages_forms_forms_y, i5.NgSelectOption, i5.ɵangular_packages_forms_forms_x, i5.DefaultValueAccessor, i5.NumberValueAccessor, i5.RangeValueAccessor, i5.CheckboxControlValueAccessor, i5.SelectControlValueAccessor, i5.SelectMultipleControlValueAccessor, i5.RadioControlValueAccessor, i5.NgControlStatus, i5.NgControlStatusGroup, i5.RequiredValidator, i5.MinLengthValidator, i5.MaxLengthValidator, i5.PatternValidator, i5.CheckboxRequiredValidator, i5.EmailValidator, i5.FormControlDirective, i5.FormGroupDirective, i5.FormControlName, i5.FormGroupName, i5.FormArrayName, i6.NovoRadioElement, i7.NovoRadioGroup, i8.NovoTilesElement, i9.NovoSelectElement, i10.NovoPickerElement, i11.PickerResults, i12.EntityPickerResult, i12.EntityPickerResults, i13.ChecklistPickerResults, i14.GroupedMultiPickerResults, i15.DistributionListPickerResults, i16.WorkersCompCodesPickerResults, i17.SkillsSpecialtyPickerResults, i18.NovoChipElement, i18.NovoChipAvatar, i18.NovoChipRemove, i19.NovoChipInput, i20.NovoChipList, i21.NovoChipsElement, i22.NovoRowChipElement, i22.NovoRowChipsElement, i23.NovoDatePickerElement, i24.NovoDatePickerInputElement, i25.NovoDateRangeInputElement, i26.NovoMultiDateInputElement, i27.NovoMonthViewElement, i28.NovoMonthSelectElement, i29.NovoYearSelectElement, i30.NovoCalendarElement, i31.NovoTimePickerElement, i32.NovoTimePickerInputElement, i33.NovoCKEditorElement, i34.NovoAddressElement, i35.NovoCheckboxElement, i36.NovoCheckListElement, i37.NovoFileInputElement, i38.QuickNoteElement, i39.QuickNoteResults, i40.NovoDateTimePickerElement, i41.NovoDateTimePickerInputElement, i42.NovoHeaderComponent, i42.NovoUtilActionComponent, i42.NovoUtilsComponent, i42.NovoHeaderSpacer, i43.TooltipDirective, i44.NovoDragulaElement, i45.IMaskDirective, i46.MaskedInputDirective, i47.NovoTipWellElement, i48.NovoModalElement, i48.NovoModalNotificationElement, i49.NovoButtonElement, i50.NovoAceEditor, i51.NovoTemplate, i52.NovoText, i53.NovoTitle, i54.NovoCaption, i55.NovoLabel, i56.NovoLink, i57.MarginDirective, i57.PaddingDirective, NovoAutoSize,
    NovoControlElement,
    NovoDynamicFormElement,
    NovoFormElement,
    NovoFieldsetElement,
    NovoFieldsetHeaderElement,
    ControlConfirmModal,
    ControlPromptModal,
    NovoControlGroup,
    NovoControlTemplates], [i1.AsyncPipe, i1.UpperCasePipe, i1.LowerCasePipe, i1.JsonPipe, i1.SlicePipe, i1.DecimalPipe, i1.PercentPipe, i1.TitleCasePipe, i1.CurrencyPipe, i1.DatePipe, i1.I18nPluralPipe, i1.I18nSelectPipe, i1.KeyValuePipe]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZm9ybS9Gb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxTQUFTO0FBQ1QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN2RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUs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QUFZO0lBQ1osa0JBQWtCO0lBQ2xCLHNCQUFzQjtJQUN0QixlQUFlO0lBQ2YsbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJTWFza0RpcmVjdGl2ZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItaW1hc2snO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBUZXh0TWFza01vZHVsZSB9IGZyb20gJ2FuZ3VsYXIyLXRleHQtbWFzayc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1RlbXBsYXRlU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvdGVtcGxhdGUvTm92b1RlbXBsYXRlU2VydmljZSc7XG5pbXBvcnQgeyBOb3ZvQWNlRWRpdG9yTW9kdWxlIH0gZnJvbSAnLi8uLi9hY2UtZWRpdG9yL0FjZUVkaXRvci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4vLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0NoaXBzTW9kdWxlIH0gZnJvbSAnLi8uLi9jaGlwcy9DaGlwcy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b05vdm9DS0VkaXRvck1vZHVsZSB9IGZyb20gJy4vLi4vY2tlZGl0b3IvQ0tFZGl0b3IubW9kdWxlJztcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VyTW9kdWxlIH0gZnJvbSAnLi8uLi9kYXRlLXBpY2tlci9EYXRlUGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRGF0ZVRpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICcuLy4uL2RhdGUtdGltZS1waWNrZXIvRGF0ZVRpbWVQaWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9EcmFndWxhTW9kdWxlIH0gZnJvbSAnLi8uLi9kcmFndWxhL0RyYWd1bGEubW9kdWxlJztcbmltcG9ydCB7IE5vdm9IZWFkZXJNb2R1bGUgfSBmcm9tICcuLy4uL2hlYWRlci9IZWFkZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Nb2RhbE1vZHVsZSB9IGZyb20gJy4vLi4vbW9kYWwvbW9kYWwubW9kdWxlJztcbmltcG9ydCB7IE5vdm9QaWNrZXJNb2R1bGUgfSBmcm9tICcuLy4uL3BpY2tlci9QaWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9RdWlja05vdGVNb2R1bGUgfSBmcm9tICcuLy4uL3F1aWNrLW5vdGUvUXVpY2tOb3RlLm1vZHVsZSc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9SYWRpb01vZHVsZSB9IGZyb20gJy4vLi4vcmFkaW8vUmFkaW8ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9TZWxlY3RNb2R1bGUgfSBmcm9tICcuLy4uL3NlbGVjdC9TZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IE5vdm9UaWxlc01vZHVsZSB9IGZyb20gJy4vLi4vdGlsZXMvVGlsZXMubW9kdWxlJztcbmltcG9ydCB7IE5vdm9UaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi8uLi90aW1lLXBpY2tlci9UaW1lUGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVGlwV2VsbE1vZHVsZSB9IGZyb20gJy4vLi4vdGlwLXdlbGwvVGlwV2VsbC5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1Rvb2x0aXBNb2R1bGUgfSBmcm9tICcuLy4uL3Rvb2x0aXAvVG9vbHRpcC5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0F1dG9TaXplLCBOb3ZvQ29udHJvbEVsZW1lbnQgfSBmcm9tICcuL0NvbnRyb2wnO1xuaW1wb3J0IHsgTm92b0NvbnRyb2xHcm91cCB9IGZyb20gJy4vQ29udHJvbEdyb3VwJztcbmltcG9ydCB7IE5vdm9Db250cm9sVGVtcGxhdGVzIH0gZnJvbSAnLi9Db250cm9sVGVtcGxhdGVzJztcbmltcG9ydCB7IE5vdm9EeW5hbWljRm9ybUVsZW1lbnQsIE5vdm9GaWVsZHNldEVsZW1lbnQsIE5vdm9GaWVsZHNldEhlYWRlckVsZW1lbnQgfSBmcm9tICcuL0R5bmFtaWNGb3JtJztcbmltcG9ydCB7IE5vdm9Gb3JtRXh0cmFzTW9kdWxlIH0gZnJvbSAnLi9leHRyYXMvRm9ybUV4dHJhcy5tb2R1bGUnO1xuaW1wb3J0IHsgQ29udHJvbENvbmZpcm1Nb2RhbCwgQ29udHJvbFByb21wdE1vZGFsIH0gZnJvbSAnLi9GaWVsZEludGVyYWN0aW9uTW9kYWxzJztcbmltcG9ydCB7IE5vdm9Gb3JtRWxlbWVudCB9IGZyb20gJy4vRm9ybSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE5vdm9SYWRpb01vZHVsZSxcbiAgICBOb3ZvVGlsZXNNb2R1bGUsXG4gICAgTm92b1NlbGVjdE1vZHVsZSxcbiAgICBOb3ZvUGlja2VyTW9kdWxlLFxuICAgIE5vdm9DaGlwc01vZHVsZSxcbiAgICBOb3ZvRGF0ZVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvVGltZVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvTm92b0NLRWRpdG9yTW9kdWxlLFxuICAgIE5vdm9Gb3JtRXh0cmFzTW9kdWxlLFxuICAgIE5vdm9RdWlja05vdGVNb2R1bGUsXG4gICAgTm92b0RhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgIE5vdm9IZWFkZXJNb2R1bGUsXG4gICAgTm92b1Rvb2x0aXBNb2R1bGUsXG4gICAgTm92b0RyYWd1bGFNb2R1bGUsXG4gICAgSU1hc2tEaXJlY3RpdmVNb2R1bGUsXG4gICAgVGV4dE1hc2tNb2R1bGUsXG4gICAgTm92b1RpcFdlbGxNb2R1bGUsXG4gICAgTm92b01vZGFsTW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b0FjZUVkaXRvck1vZHVsZSxcbiAgICBOb3ZvQ29tbW9uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvQXV0b1NpemUsXG4gICAgTm92b0NvbnRyb2xFbGVtZW50LFxuICAgIE5vdm9EeW5hbWljRm9ybUVsZW1lbnQsXG4gICAgTm92b0Zvcm1FbGVtZW50LFxuICAgIE5vdm9GaWVsZHNldEVsZW1lbnQsXG4gICAgTm92b0ZpZWxkc2V0SGVhZGVyRWxlbWVudCxcbiAgICBDb250cm9sQ29uZmlybU1vZGFsLFxuICAgIENvbnRyb2xQcm9tcHRNb2RhbCxcbiAgICBOb3ZvQ29udHJvbEdyb3VwLFxuICAgIE5vdm9Db250cm9sVGVtcGxhdGVzLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0F1dG9TaXplLFxuICAgIE5vdm9EeW5hbWljRm9ybUVsZW1lbnQsXG4gICAgTm92b0NvbnRyb2xFbGVtZW50LFxuICAgIE5vdm9Gb3JtRWxlbWVudCxcbiAgICBOb3ZvRmllbGRzZXRIZWFkZXJFbGVtZW50LFxuICAgIE5vdm9Db250cm9sR3JvdXAsXG4gICAgTm92b0NvbnRyb2xUZW1wbGF0ZXMsXG4gIF0sXG4gIHByb3ZpZGVyczogW05vdm9UZW1wbGF0ZVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRm9ybU1vZHVsZSB7fVxuIl19