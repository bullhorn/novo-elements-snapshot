import { __decorate, __metadata } from "tslib";
// NG2
import { Component, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../utils';
// APP
import { Helpers } from '../../utils/Helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../common/typography/label/label.component";
import * as i3 from "./EntityList";
import * as i4 from "./Render";
function NovoValueElement_div_1_i_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i");
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMapInterpolate1("bhi-circle ", ctx_r3.meta.entityIconClass, "");
} }
function NovoValueElement_div_1_a_5_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 10);
    i0.ɵɵlistener("click", function NovoValueElement_div_1_a_5_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.openLink(); });
    i0.ɵɵpipe(1, "render");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind2(1, 1, ctx_r4.data, ctx_r4.meta), i0.ɵɵsanitizeHtml);
} }
function NovoValueElement_div_1_a_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "a", 11);
    i0.ɵɵpipe(1, "render");
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("href", ctx_r5.url, i0.ɵɵsanitizeUrl)("innerHTML", i0.ɵɵpipeBind2(1, 2, ctx_r5.data, ctx_r5.meta), i0.ɵɵsanitizeHtml);
} }
function NovoValueElement_div_1_novo_entity_list_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-entity-list", 12);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("data", ctx_r6.data)("meta", ctx_r6.meta);
} }
function NovoValueElement_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelementStart(1, "novo-label");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 5);
    i0.ɵɵtemplate(4, NovoValueElement_div_1_i_4_Template, 1, 3, "i", 6);
    i0.ɵɵtemplate(5, NovoValueElement_div_1_a_5_Template, 2, 4, "a", 7);
    i0.ɵɵtemplate(6, NovoValueElement_div_1_a_6_Template, 2, 5, "a", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, NovoValueElement_div_1_novo_entity_list_7_Template, 1, 2, "novo-entity-list", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.meta.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.meta.showEntityIcon);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r0.NOVO_VALUE_TYPE.INTERNAL_LINK);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r0.NOVO_VALUE_TYPE.LINK);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r0.NOVO_VALUE_TYPE.ENTITY_LIST);
} }
function NovoValueElement_div_2_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 15);
    i0.ɵɵpipe(1, "render");
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind2(1, 1, ctx_r9.data, ctx_r9.meta), i0.ɵɵsanitizeHtml);
} }
function NovoValueElement_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelementStart(1, "novo-label");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, NovoValueElement_div_2_div_3_Template, 2, 4, "div", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r1.customClass);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.meta.label);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.isDefault);
} }
function NovoValueElement_div_3_i_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "i", 18);
    i0.ɵɵlistener("click", function NovoValueElement_div_3_i_1_Template_i_click_0_listener() { i0.ɵɵrestoreView(_r13); const icon_r11 = ctx.$implicit; const ctx_r12 = i0.ɵɵnextContext(2); return ctx_r12.onValueClick(icon_r11); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const icon_r11 = ctx.$implicit;
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r10.iconClass(icon_r11));
} }
function NovoValueElement_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵtemplate(1, NovoValueElement_div_3_i_1_Template, 1, 2, "i", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.meta.icons);
} }
export var NOVO_VALUE_TYPE;
(function (NOVO_VALUE_TYPE) {
    NOVO_VALUE_TYPE[NOVO_VALUE_TYPE["DEFAULT"] = 0] = "DEFAULT";
    NOVO_VALUE_TYPE[NOVO_VALUE_TYPE["ENTITY_LIST"] = 1] = "ENTITY_LIST";
    NOVO_VALUE_TYPE[NOVO_VALUE_TYPE["LINK"] = 2] = "LINK";
    NOVO_VALUE_TYPE[NOVO_VALUE_TYPE["INTERNAL_LINK"] = 3] = "INTERNAL_LINK";
})(NOVO_VALUE_TYPE || (NOVO_VALUE_TYPE = {}));
export var NOVO_VALUE_THEME;
(function (NOVO_VALUE_THEME) {
    NOVO_VALUE_THEME[NOVO_VALUE_THEME["DEFAULT"] = 0] = "DEFAULT";
    NOVO_VALUE_THEME[NOVO_VALUE_THEME["MOBILE"] = 1] = "MOBILE";
})(NOVO_VALUE_THEME || (NOVO_VALUE_THEME = {}));
export class NovoValueElement {
    constructor() {
        this.meta = { type: 'SCALAR', label: '' }; // TODO use interface
        this.theme = NOVO_VALUE_THEME.DEFAULT;
        this.row = false;
        this.NOVO_VALUE_TYPE = NOVO_VALUE_TYPE;
        this.NOVO_VALUE_THEME = NOVO_VALUE_THEME;
        this.customClass = '';
    }
    set label(lbl) {
        this.meta.label = lbl;
    }
    get label() {
        return this.meta.label;
    }
    set type(typ) {
        this.meta.type = typ;
    }
    get type() {
        return this.meta.type;
    }
    ngOnInit() {
        if (Helpers.isEmpty(this.meta)) {
            this.meta = {
                label: '',
            };
        }
    }
    get isMobile() {
        return this.theme === NOVO_VALUE_THEME.MOBILE;
    }
    iconClass(icon) {
        let iconClass = '';
        if (icon && icon.iconCls) {
            iconClass = `bhi-${icon.iconCls} actions`;
            if (icon.onIconClick) {
                iconClass = `${iconClass} clickable`;
            }
            return iconClass;
        }
        return iconClass;
    }
    get isDefault() {
        return true;
    }
    get showLabel() {
        return (this._type === NOVO_VALUE_TYPE.INTERNAL_LINK || this._type === NOVO_VALUE_TYPE.LINK || this._type === NOVO_VALUE_TYPE.ENTITY_LIST);
    }
    get showIcon() {
        return this.meta && this.meta.icons && this.meta.icons.length && !Helpers.isEmpty(this.data);
    }
    onValueClick(icon) {
        if (icon.onIconClick && typeof icon.onIconClick === 'function') {
            icon.onIconClick(this.data, this.meta);
        }
    }
    openLink() {
        if (this.meta && this.meta.openLink && typeof this.meta.openLink === 'function') {
            this.meta.openLink(this.data, this.meta);
        }
    }
    ngOnChanges(changes) {
        if (this.meta && this.isLinkField(this.meta, this.data)) {
            this._type = NOVO_VALUE_TYPE.LINK;
            // Make sure the value has a protocol, otherwise the URL will be relative
            const hasProtocol = new RegExp('^(http|https)://', 'i');
            if (!hasProtocol.test(this.data)) {
                this.url = `http://${this.data}`;
            }
            else {
                this.url = this.data;
            }
        }
        else if (this.isEntityList(this.meta.type)) {
            this._type = NOVO_VALUE_TYPE.ENTITY_LIST;
        }
        else if (this.isHTMLField(this.meta)) {
            this.customClass = this.meta.customClass ? this.meta.customClass : '';
            if (this.meta.stripHTML && this.data && this.data.replace) {
                this.data = this.data.replace(/<(?!style|\/style).+?>/gi, '').trim();
            }
        }
        else if (this.meta && this.meta.associatedEntity) {
            switch (this.meta.associatedEntity.entity) {
                case 'ClientCorporation':
                case 'ClientContact':
                case 'Candidate':
                case 'Opportunity':
                case 'JobOrder':
                case 'Placement':
                case 'Lead':
                    this._type = NOVO_VALUE_TYPE.INTERNAL_LINK;
                    break;
                default:
                    break;
            }
        }
    }
    isLinkField(field, data) {
        const linkFields = ['companyURL', 'clientCorporationCompanyURL'];
        const regex = new RegExp('^(https?://(?:www.|(?!www))[^s.]+.[^s]{2,}|www.[^s]+.[^s]{2,})$', 'gi');
        const isURL = Helpers.isString(data) && regex.exec(data.trim());
        return linkFields.indexOf(field.name) > -1 || !!isURL || field.type === NOVO_VALUE_TYPE.LINK;
    }
    isEntityList(type) {
        return type === 'TO_MANY';
    }
    isHTMLField(meta) {
        return meta.dataSpecialization === 'HTML' || meta.inputType === 'TEXTAREA';
    }
}
NovoValueElement.ɵfac = function NovoValueElement_Factory(t) { return new (t || NovoValueElement)(); };
NovoValueElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoValueElement, selectors: [["novo-value"]], hostVars: 4, hostBindings: function NovoValueElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("horizontal", ctx.row)("mobile", ctx.isMobile);
    } }, inputs: { data: "data", meta: "meta", theme: "theme", row: "row", label: "label", type: "type" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 3, consts: [[3, "ngSwitch"], ["class", "value-outer", 4, "ngIf"], ["class", "value-outer", 3, "ngClass", 4, "ngSwitchDefault"], ["class", "actions", 4, "ngIf"], [1, "value-outer"], [1, "value"], [3, "class", 4, "ngIf"], [3, "innerHTML", "click", 4, "ngSwitchCase"], ["class", "value", "target", "_blank", 3, "href", "innerHTML", 4, "ngSwitchCase"], [3, "data", "meta", 4, "ngSwitchCase"], [3, "innerHTML", "click"], ["target", "_blank", 1, "value", 3, "href", "innerHTML"], [3, "data", "meta"], [1, "value-outer", 3, "ngClass"], ["class", "value", 3, "innerHTML", 4, "ngIf"], [1, "value", 3, "innerHTML"], [1, "actions"], [3, "class", "click", 4, "ngFor", "ngForOf"], [3, "click"]], template: function NovoValueElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementContainerStart(0, 0);
        i0.ɵɵtemplate(1, NovoValueElement_div_1_Template, 8, 5, "div", 1);
        i0.ɵɵtemplate(2, NovoValueElement_div_2_Template, 4, 3, "div", 2);
        i0.ɵɵtemplate(3, NovoValueElement_div_3_Template, 2, 1, "div", 3);
        i0.ɵɵelementContainerEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngSwitch", ctx._type);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showLabel);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.showIcon);
    } }, directives: [i1.NgSwitch, i1.NgIf, i1.NgSwitchDefault, i2.NovoLabel, i1.NgSwitchCase, i3.EntityList, i1.NgClass, i1.NgForOf], pipes: [i4.RenderPipe], encapsulation: 2 });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoValueElement.prototype, "row", void 0);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoValueElement, [{
        type: Component,
        args: [{
                selector: 'novo-value',
                template: `
    <ng-container [ngSwitch]="_type">
      <div class="value-outer" *ngIf="showLabel">
        <novo-label>{{ meta.label }}</novo-label>
        <span class="value">
          <i *ngIf="meta.showEntityIcon" class="bhi-circle {{ meta.entityIconClass }}"></i>
          <a *ngSwitchCase="NOVO_VALUE_TYPE.INTERNAL_LINK" (click)="openLink()" [innerHTML]="data | render: meta"></a>
          <a *ngSwitchCase="NOVO_VALUE_TYPE.LINK" class="value" [href]="url" target="_blank" [innerHTML]="data | render: meta"></a>
        </span>
        <novo-entity-list *ngSwitchCase="NOVO_VALUE_TYPE.ENTITY_LIST" [data]="data" [meta]="meta"></novo-entity-list>
      </div>
      <div *ngSwitchDefault class="value-outer" [ngClass]="customClass">
        <novo-label>{{ meta.label }}</novo-label>
        <div *ngIf="isDefault" class="value" [innerHTML]="data | render: meta"></div>
      </div>
      <div class="actions" *ngIf="showIcon">
        <i *ngFor="let icon of meta.icons" [class]="iconClass(icon)" (click)="onValueClick(icon)"></i>
      </div>
    </ng-container>
  `,
            }]
    }], null, { data: [{
            type: Input
        }], meta: [{
            type: Input
        }], theme: [{
            type: Input
        }], row: [{
            type: HostBinding,
            args: ['class.horizontal']
        }, {
            type: Input
        }], label: [{
            type: Input
        }], type: [{
            type: Input
        }], isMobile: [{
            type: HostBinding,
            args: ['class.mobile']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsdWUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdmFsdWUvVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsTUFBTTtBQUNOLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7OztJQW1CcEMsb0JBQWlGOzs7SUFBbEQseUVBQTZDOzs7O0lBQzVFLDZCQUE0RztJQUEzRCxrTEFBb0I7O0lBQW1DLGlCQUFJOzs7SUFBdEMsNkZBQWlDOzs7SUFDdkcsd0JBQXlIOzs7O0lBQW5FLG1EQUFZLGdGQUFBOzs7SUFFcEUsdUNBQTZHOzs7SUFBL0Msa0NBQWEscUJBQUE7OztJQVA3RSw4QkFDRTtJQUFBLGtDQUFZO0lBQUEsWUFBZ0I7SUFBQSxpQkFBYTtJQUN6QywrQkFDRTtJQUFBLG1FQUE2RTtJQUM3RSxtRUFBd0c7SUFDeEcsbUVBQXFIO0lBQ3ZILGlCQUFPO0lBQ1AsaUdBQTBGO0lBQzVGLGlCQUFNOzs7SUFQUSxlQUFnQjtJQUFoQix1Q0FBZ0I7SUFFdkIsZUFBMkI7SUFBM0IsaURBQTJCO0lBQzNCLGVBQTZDO0lBQTdDLG1FQUE2QztJQUM3QyxlQUFvQztJQUFwQywwREFBb0M7SUFFdkIsZUFBMkM7SUFBM0MsaUVBQTJDOzs7SUFJN0QsMEJBQTZFOzs7O0lBQXhDLDZGQUFpQzs7O0lBRnhFLCtCQUNFO0lBQUEsa0NBQVk7SUFBQSxZQUFnQjtJQUFBLGlCQUFhO0lBQ3pDLHdFQUF1RTtJQUN6RSxpQkFBTTs7O0lBSG9DLDRDQUF1QjtJQUNuRCxlQUFnQjtJ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QUFJO2tCQURQLEtBQUs7WUFpQkssUUFBUTtrQkFEbEIsV0FBVzttQkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbi8vIEFQUFxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuZXhwb3J0IGVudW0gTk9WT19WQUxVRV9UWVBFIHtcbiAgREVGQVVMVCxcbiAgRU5USVRZX0xJU1QsXG4gIExJTkssXG4gIElOVEVSTkFMX0xJTkssXG59XG5leHBvcnQgZW51bSBOT1ZPX1ZBTFVFX1RIRU1FIHtcbiAgREVGQVVMVCxcbiAgTU9CSUxFLFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXZhbHVlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJfdHlwZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInZhbHVlLW91dGVyXCIgKm5nSWY9XCJzaG93TGFiZWxcIj5cbiAgICAgICAgPG5vdm8tbGFiZWw+e3sgbWV0YS5sYWJlbCB9fTwvbm92by1sYWJlbD5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPlxuICAgICAgICAgIDxpICpuZ0lmPVwibWV0YS5zaG93RW50aXR5SWNvblwiIGNsYXNzPVwiYmhpLWNpcmNsZSB7eyBtZXRhLmVudGl0eUljb25DbGFzcyB9fVwiPjwvaT5cbiAgICAgICAgICA8YSAqbmdTd2l0Y2hDYXNlPVwiTk9WT19WQUxVRV9UWVBFLklOVEVSTkFMX0xJTktcIiAoY2xpY2spPVwib3BlbkxpbmsoKVwiIFtpbm5lckhUTUxdPVwiZGF0YSB8IHJlbmRlcjogbWV0YVwiPjwvYT5cbiAgICAgICAgICA8YSAqbmdTd2l0Y2hDYXNlPVwiTk9WT19WQUxVRV9UWVBFLkxJTktcIiBjbGFzcz1cInZhbHVlXCIgW2hyZWZdPVwidXJsXCIgdGFyZ2V0PVwiX2JsYW5rXCIgW2lubmVySFRNTF09XCJkYXRhIHwgcmVuZGVyOiBtZXRhXCI+PC9hPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxub3ZvLWVudGl0eS1saXN0ICpuZ1N3aXRjaENhc2U9XCJOT1ZPX1ZBTFVFX1RZUEUuRU5USVRZX0xJU1RcIiBbZGF0YV09XCJkYXRhXCIgW21ldGFdPVwibWV0YVwiPjwvbm92by1lbnRpdHktbGlzdD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdTd2l0Y2hEZWZhdWx0IGNsYXNzPVwidmFsdWUtb3V0ZXJcIiBbbmdDbGFzc109XCJjdXN0b21DbGFzc1wiPlxuICAgICAgICA8bm92by1sYWJlbD57eyBtZXRhLmxhYmVsIH19PC9ub3ZvLWxhYmVsPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNEZWZhdWx0XCIgY2xhc3M9XCJ2YWx1ZVwiIFtpbm5lckhUTUxdPVwiZGF0YSB8IHJlbmRlcjogbWV0YVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiICpuZ0lmPVwic2hvd0ljb25cIj5cbiAgICAgICAgPGkgKm5nRm9yPVwibGV0IGljb24gb2YgbWV0YS5pY29uc1wiIFtjbGFzc109XCJpY29uQ2xhc3MoaWNvbilcIiAoY2xpY2spPVwib25WYWx1ZUNsaWNrKGljb24pXCI+PC9pPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9WYWx1ZUVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIGRhdGE6IGFueTsgLy8gVE9ETyB1c2UgaW50ZXJmYWNlXG4gIEBJbnB1dCgpXG4gIG1ldGE6IGFueSA9IHsgdHlwZTogJ1NDQUxBUicsIGxhYmVsOiAnJyB9OyAvLyBUT0RPIHVzZSBpbnRlcmZhY2VcbiAgQElucHV0KClcbiAgdGhlbWU6IE5PVk9fVkFMVUVfVEhFTUUgPSBOT1ZPX1ZBTFVFX1RIRU1FLkRFRkFVTFQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5ob3Jpem9udGFsJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHJvdzogQm9vbGVhbiA9IGZhbHNlO1xuXG4gIF90eXBlOiBOT1ZPX1ZBTFVFX1RZUEU7XG4gIE5PVk9fVkFMVUVfVFlQRSA9IE5PVk9fVkFMVUVfVFlQRTtcbiAgTk9WT19WQUxVRV9USEVNRSA9IE5PVk9fVkFMVUVfVEhFTUU7XG4gIHVybDogc3RyaW5nO1xuICBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgc2V0IGxhYmVsKGxibDogc3RyaW5nKSB7XG4gICAgdGhpcy5tZXRhLmxhYmVsID0gbGJsO1xuICB9XG4gIGdldCBsYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1ldGEubGFiZWw7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdHlwZSh0eXA6IHN0cmluZykge1xuICAgIHRoaXMubWV0YS50eXBlID0gdHlwO1xuICB9XG4gIGdldCB0eXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubWV0YS50eXBlO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKEhlbHBlcnMuaXNFbXB0eSh0aGlzLm1ldGEpKSB7XG4gICAgICB0aGlzLm1ldGEgPSB7XG4gICAgICAgIGxhYmVsOiAnJyxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tb2JpbGUnKVxuICBwdWJsaWMgZ2V0IGlzTW9iaWxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRoZW1lID09PSBOT1ZPX1ZBTFVFX1RIRU1FLk1PQklMRTtcbiAgfVxuXG4gIGljb25DbGFzcyhpY29uKTogc3RyaW5nIHtcbiAgICBsZXQgaWNvbkNsYXNzID0gJyc7XG4gICAgaWYgKGljb24gJiYgaWNvbi5pY29uQ2xzKSB7XG4gICAgICBpY29uQ2xhc3MgPSBgYmhpLSR7aWNvbi5pY29uQ2xzfSBhY3Rpb25zYDtcbiAgICAgIGlmIChpY29uLm9uSWNvbkNsaWNrKSB7XG4gICAgICAgIGljb25DbGFzcyA9IGAke2ljb25DbGFzc30gY2xpY2thYmxlYDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpY29uQ2xhc3M7XG4gICAgfVxuICAgIHJldHVybiBpY29uQ2xhc3M7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzRGVmYXVsdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvd0xhYmVsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLl90eXBlID09PSBOT1ZPX1ZBTFVFX1RZUEUuSU5URVJOQUxfTElOSyB8fCB0aGlzLl90eXBlID09PSBOT1ZPX1ZBTFVFX1RZUEUuTElOSyB8fCB0aGlzLl90eXBlID09PSBOT1ZPX1ZBTFVFX1RZUEUuRU5USVRZX0xJU1RcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG93SWNvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tZXRhICYmIHRoaXMubWV0YS5pY29ucyAmJiB0aGlzLm1ldGEuaWNvbnMubGVuZ3RoICYmICFIZWxwZXJzLmlzRW1wdHkodGhpcy5kYXRhKTtcbiAgfVxuXG4gIG9uVmFsdWVDbGljayhpY29uKTogdm9pZCB7XG4gICAgaWYgKGljb24ub25JY29uQ2xpY2sgJiYgdHlwZW9mIGljb24ub25JY29uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGljb24ub25JY29uQ2xpY2sodGhpcy5kYXRhLCB0aGlzLm1ldGEpO1xuICAgIH1cbiAgfVxuICBvcGVuTGluaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tZXRhICYmIHRoaXMubWV0YS5vcGVuTGluayAmJiB0eXBlb2YgdGhpcy5tZXRhLm9wZW5MaW5rID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLm1ldGEub3BlbkxpbmsodGhpcy5kYXRhLCB0aGlzLm1ldGEpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKTogYW55IHtcbiAgICBpZiAodGhpcy5tZXRhICYmIHRoaXMuaXNMaW5rRmllbGQodGhpcy5tZXRhLCB0aGlzLmRhdGEpKSB7XG4gICAgICB0aGlzLl90eXBlID0gTk9WT19WQUxVRV9UWVBFLkxJTks7XG4gICAgICAvLyBNYWtlIHN1cmUgdGhlIHZhbHVlIGhhcyBhIHByb3RvY29sLCBvdGhlcndpc2UgdGhlIFVSTCB3aWxsIGJlIHJlbGF0aXZlXG4gICAgICBjb25zdCBoYXNQcm90b2NvbDogYW55ID0gbmV3IFJlZ0V4cCgnXihodHRwfGh0dHBzKTovLycsICdpJyk7XG4gICAgICBpZiAoIWhhc1Byb3RvY29sLnRlc3QodGhpcy5kYXRhKSkge1xuICAgICAgICB0aGlzLnVybCA9IGBodHRwOi8vJHt0aGlzLmRhdGF9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXJsID0gdGhpcy5kYXRhO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5pc0VudGl0eUxpc3QodGhpcy5tZXRhLnR5cGUpKSB7XG4gICAgICB0aGlzLl90eXBlID0gTk9WT19WQUxVRV9UWVBFLkVOVElUWV9MSVNUO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0hUTUxGaWVsZCh0aGlzLm1ldGEpKSB7XG4gICAgICB0aGlzLmN1c3RvbUNsYXNzID0gdGhpcy5tZXRhLmN1c3RvbUNsYXNzID8gdGhpcy5tZXRhLmN1c3RvbUNsYXNzIDogJyc7XG4gICAgICBpZiAodGhpcy5tZXRhLnN0cmlwSFRNTCAmJiB0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLnJlcGxhY2UpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLnJlcGxhY2UoLzwoPyFzdHlsZXxcXC9zdHlsZSkuKz8+L2dpLCAnJykudHJpbSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5tZXRhICYmIHRoaXMubWV0YS5hc3NvY2lhdGVkRW50aXR5KSB7XG4gICAgICBzd2l0Y2ggKHRoaXMubWV0YS5hc3NvY2lhdGVkRW50aXR5LmVudGl0eSkge1xuICAgICAgICBjYXNlICdDbGllbnRDb3Jwb3JhdGlvbic6XG4gICAgICAgIGNhc2UgJ0NsaWVudENvbnRhY3QnOlxuICAgICAgICBjYXNlICdDYW5kaWRhdGUnOlxuICAgICAgICBjYXNlICdPcHBvcnR1bml0eSc6XG4gICAgICAgIGNhc2UgJ0pvYk9yZGVyJzpcbiAgICAgICAgY2FzZSAnUGxhY2VtZW50JzpcbiAgICAgICAgY2FzZSAnTGVhZCc6XG4gICAgICAgICAgdGhpcy5fdHlwZSA9IE5PVk9fVkFMVUVfVFlQRS5JTlRFUk5BTF9MSU5LO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzTGlua0ZpZWxkKGZpZWxkOiB7IG5hbWU/OiBzdHJpbmc7IHR5cGU/OiBOT1ZPX1ZBTFVFX1RZUEUgfSwgZGF0YTogYW55KTogYm9vbGVhbiB7XG4gICAgY29uc3QgbGlua0ZpZWxkczogYW55ID0gWydjb21wYW55VVJMJywgJ2NsaWVudENvcnBvcmF0aW9uQ29tcGFueVVSTCddO1xuICAgIGNvbnN0IHJlZ2V4OiBhbnkgPSBuZXcgUmVnRXhwKCdeKGh0dHBzPzovLyg/Ond3dy58KD8hd3d3KSlbXnMuXSsuW15zXXsyLH18d3d3Lltec10rLltec117Mix9KSQnLCAnZ2knKTtcbiAgICBjb25zdCBpc1VSTDogYW55ID0gSGVscGVycy5pc1N0cmluZyhkYXRhKSAmJiByZWdleC5leGVjKGRhdGEudHJpbSgpKTtcbiAgICByZXR1cm4gbGlua0ZpZWxkcy5pbmRleE9mKGZpZWxkLm5hbWUpID4gLTEgfHwgISFpc1VSTCB8fCBmaWVsZC50eXBlID09PSBOT1ZPX1ZBTFVFX1RZUEUuTElOSztcbiAgfVxuXG4gIGlzRW50aXR5TGlzdCh0eXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHlwZSA9PT0gJ1RPX01BTlknO1xuICB9XG5cbiAgaXNIVE1MRmllbGQobWV0YTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1ldGEuZGF0YVNwZWNpYWxpemF0aW9uID09PSAnSFRNTCcgfHwgbWV0YS5pbnB1dFR5cGUgPT09ICdURVhUQVJFQSc7XG4gIH1cbn1cbiJdfQ==