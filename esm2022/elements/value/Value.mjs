var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// NG2
import { Component, HostBinding, Input } from '@angular/core';
import { BooleanInput, Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "novo-elements/elements/common";
import * as i3 from "novo-elements/elements/icon";
import * as i4 from "./EntityList";
import * as i5 from "./Render";
// APP
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
    set icon(value) {
        this.meta.icon = value;
    }
    get icon() {
        return this.meta.icon;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoValueElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NovoValueElement, selector: "novo-value", inputs: { data: "data", meta: "meta", theme: "theme", row: "row", label: "label", type: "type", icon: "icon" }, host: { properties: { "class.horizontal": "this.row", "class.mobile": "this.isMobile" } }, usesOnChanges: true, ngImport: i0, template: `
    <div class="value-outer" [ngClass]="customClass">
      <novo-label>{{ meta.label }}</novo-label>
      <span class="value">
        <i *ngIf="meta.showEntityIcon" class="bhi-circle {{ meta.entityIconClass }}"></i>
        <novo-icon *ngIf="meta?.icon">{{ meta.icon }}</novo-icon>
        <ng-container [ngSwitch]="_type">
          <a *ngSwitchCase="NOVO_VALUE_TYPE.INTERNAL_LINK" (click)="openLink()" [innerHTML]="data | render: meta"></a>
          <a *ngSwitchCase="NOVO_VALUE_TYPE.LINK" class="value" [href]="url" target="_blank" [innerHTML]="data | render: meta"></a>
          <novo-entity-list *ngSwitchCase="NOVO_VALUE_TYPE.ENTITY_LIST" [data]="data" [meta]="meta"></novo-entity-list>
          <novo-text *ngSwitchDefault [innerHTML]="data | render: meta"></novo-text>
        </ng-container>
      </span>
    </div>
    <div class="actions" *ngIf="showIcon">
      <i *ngFor="let icon of meta.icons" [class]="iconClass(icon)" (click)="onValueClick(icon)"></i>
    </div>
  `, isInline: true, styles: [":host{display:flex;flex-direction:row;max-width:500px;justify-content:space-between;align-items:flex-start;width:max-content;padding:8px}:host i.star{color:#0b344f}:host i.person{color:#fa4}:host i.company{color:#39d}:host i.candidate{color:#4b7}:host i.navigation{color:#202945}:host i.lead{color:#a69}:host i.contact{color:#fa4}:host i.clientcontact{color:#fa4}:host i.opportunity{color:#625}:host i.job{color:#b56}:host i.joborder{color:#b56}:host i.submission{color:#a9adbb}:host i.sendout{color:#747884}:host i.placement{color:#0b344f}:host i.note{color:#747884}:host i.task{color:#4f5361}:host i.distributionList{color:#4f5361}:host i.credential{color:#4f5361}:host i.user{color:#4f5361}:host i.corporateuser{color:#4f5361}:host i.contract{color:#454ea0}:host i.jobCode{color:#696d79}:host i.earnCode{color:#696d79}:host i.billableCharge{color:#696d79}:host i.payableCharge{color:#696d79}:host i.invoiceStatement{color:#696d79}:host.horizontal{width:100%;max-width:100%}:host.horizontal .value-outer{display:grid;width:100%;grid-template-columns:minmax(120px,30%) 1fr}:host .value-outer{display:flex;flex-direction:column;gap:.4rem}:host .actions i{cursor:default;color:#9e9e9e;margin-left:15px;margin-top:7px}:host .actions i.clickable{cursor:pointer;color:#4a89dc}:host .actions.clickable{cursor:pointer;color:#4a89dc}:host ::ng-deep novo-entity-list{display:block}:host ::ng-deep novo-entity-list i.star{color:#0b344f}:host ::ng-deep novo-entity-list i.person{color:#fa4}:host ::ng-deep novo-entity-list i.company{color:#39d}:host ::ng-deep novo-entity-list i.candidate{color:#4b7}:host ::ng-deep novo-entity-list i.navigation{color:#202945}:host ::ng-deep novo-entity-list i.lead{color:#a69}:host ::ng-deep novo-entity-list i.contact{color:#fa4}:host ::ng-deep novo-entity-list i.clientcontact{color:#fa4}:host ::ng-deep novo-entity-list i.opportunity{color:#625}:host ::ng-deep novo-entity-list i.job{color:#b56}:host ::ng-deep novo-entity-list i.joborder{color:#b56}:host ::ng-deep novo-entity-list i.submission{color:#a9adbb}:host ::ng-deep novo-entity-list i.sendout{color:#747884}:host ::ng-deep novo-entity-list i.placement{color:#0b344f}:host ::ng-deep novo-entity-list i.note{color:#747884}:host ::ng-deep novo-entity-list i.task{color:#4f5361}:host ::ng-deep novo-entity-list i.distributionList{color:#4f5361}:host ::ng-deep novo-entity-list i.credential{color:#4f5361}:host ::ng-deep novo-entity-list i.user{color:#4f5361}:host ::ng-deep novo-entity-list i.corporateuser{color:#4f5361}:host ::ng-deep novo-entity-list i.contract{color:#454ea0}:host ::ng-deep novo-entity-list i.jobCode{color:#696d79}:host ::ng-deep novo-entity-list i.earnCode{color:#696d79}:host ::ng-deep novo-entity-list i.billableCharge{color:#696d79}:host ::ng-deep novo-entity-list i.payableCharge{color:#696d79}:host ::ng-deep novo-entity-list i.invoiceStatement{color:#696d79}:host ::ng-deep novo-entity-list .entity{padding-top:6px;padding-bottom:6px}:host ::ng-deep novo-entity-list i{margin-right:6px}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i2.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }, { kind: "component", type: i2.NovoLabel, selector: "novo-label,[novo-label]" }, { kind: "component", type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i4.EntityList, selector: "novo-entity-list", inputs: ["data", "meta"] }, { kind: "pipe", type: i5.RenderPipe, name: "render" }] }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoValueElement.prototype, "row", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoValueElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-value', template: `
    <div class="value-outer" [ngClass]="customClass">
      <novo-label>{{ meta.label }}</novo-label>
      <span class="value">
        <i *ngIf="meta.showEntityIcon" class="bhi-circle {{ meta.entityIconClass }}"></i>
        <novo-icon *ngIf="meta?.icon">{{ meta.icon }}</novo-icon>
        <ng-container [ngSwitch]="_type">
          <a *ngSwitchCase="NOVO_VALUE_TYPE.INTERNAL_LINK" (click)="openLink()" [innerHTML]="data | render: meta"></a>
          <a *ngSwitchCase="NOVO_VALUE_TYPE.LINK" class="value" [href]="url" target="_blank" [innerHTML]="data | render: meta"></a>
          <novo-entity-list *ngSwitchCase="NOVO_VALUE_TYPE.ENTITY_LIST" [data]="data" [meta]="meta"></novo-entity-list>
          <novo-text *ngSwitchDefault [innerHTML]="data | render: meta"></novo-text>
        </ng-container>
      </span>
    </div>
    <div class="actions" *ngIf="showIcon">
      <i *ngFor="let icon of meta.icons" [class]="iconClass(icon)" (click)="onValueClick(icon)"></i>
    </div>
  `, styles: [":host{display:flex;flex-direction:row;max-width:500px;justify-content:space-between;align-items:flex-start;width:max-content;padding:8px}:host i.star{color:#0b344f}:host i.person{color:#fa4}:host i.company{color:#39d}:host i.candidate{color:#4b7}:host i.navigation{color:#202945}:host i.lead{color:#a69}:host i.contact{color:#fa4}:host i.clientcontact{color:#fa4}:host i.opportunity{color:#625}:host i.job{color:#b56}:host i.joborder{color:#b56}:host i.submission{color:#a9adbb}:host i.sendout{color:#747884}:host i.placement{color:#0b344f}:host i.note{color:#747884}:host i.task{color:#4f5361}:host i.distributionList{color:#4f5361}:host i.credential{color:#4f5361}:host i.user{color:#4f5361}:host i.corporateuser{color:#4f5361}:host i.contract{color:#454ea0}:host i.jobCode{color:#696d79}:host i.earnCode{color:#696d79}:host i.billableCharge{color:#696d79}:host i.payableCharge{color:#696d79}:host i.invoiceStatement{color:#696d79}:host.horizontal{width:100%;max-width:100%}:host.horizontal .value-outer{display:grid;width:100%;grid-template-columns:minmax(120px,30%) 1fr}:host .value-outer{display:flex;flex-direction:column;gap:.4rem}:host .actions i{cursor:default;color:#9e9e9e;margin-left:15px;margin-top:7px}:host .actions i.clickable{cursor:pointer;color:#4a89dc}:host .actions.clickable{cursor:pointer;color:#4a89dc}:host ::ng-deep novo-entity-list{display:block}:host ::ng-deep novo-entity-list i.star{color:#0b344f}:host ::ng-deep novo-entity-list i.person{color:#fa4}:host ::ng-deep novo-entity-list i.company{color:#39d}:host ::ng-deep novo-entity-list i.candidate{color:#4b7}:host ::ng-deep novo-entity-list i.navigation{color:#202945}:host ::ng-deep novo-entity-list i.lead{color:#a69}:host ::ng-deep novo-entity-list i.contact{color:#fa4}:host ::ng-deep novo-entity-list i.clientcontact{color:#fa4}:host ::ng-deep novo-entity-list i.opportunity{color:#625}:host ::ng-deep novo-entity-list i.job{color:#b56}:host ::ng-deep novo-entity-list i.joborder{color:#b56}:host ::ng-deep novo-entity-list i.submission{color:#a9adbb}:host ::ng-deep novo-entity-list i.sendout{color:#747884}:host ::ng-deep novo-entity-list i.placement{color:#0b344f}:host ::ng-deep novo-entity-list i.note{color:#747884}:host ::ng-deep novo-entity-list i.task{color:#4f5361}:host ::ng-deep novo-entity-list i.distributionList{color:#4f5361}:host ::ng-deep novo-entity-list i.credential{color:#4f5361}:host ::ng-deep novo-entity-list i.user{color:#4f5361}:host ::ng-deep novo-entity-list i.corporateuser{color:#4f5361}:host ::ng-deep novo-entity-list i.contract{color:#454ea0}:host ::ng-deep novo-entity-list i.jobCode{color:#696d79}:host ::ng-deep novo-entity-list i.earnCode{color:#696d79}:host ::ng-deep novo-entity-list i.billableCharge{color:#696d79}:host ::ng-deep novo-entity-list i.payableCharge{color:#696d79}:host ::ng-deep novo-entity-list i.invoiceStatement{color:#696d79}:host ::ng-deep novo-entity-list .entity{padding-top:6px;padding-bottom:6px}:host ::ng-deep novo-entity-list i{margin-right:6px}\n"] }]
        }], propDecorators: { data: [{
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
            }], icon: [{
                type: Input
            }], isMobile: [{
                type: HostBinding,
                args: ['class.mobile']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy92YWx1ZS9WYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7O0FBQzVELE1BQU07QUFDTixNQUFNLENBQU4sSUFBWSxlQUtYO0FBTEQsV0FBWSxlQUFlO0lBQ3pCLDJEQUFPLENBQUE7SUFDUCxtRUFBVyxDQUFBO0lBQ1gscURBQUksQ0FBQTtJQUNKLHVFQUFhLENBQUE7QUFDZixDQUFDLEVBTFcsZUFBZSxLQUFmLGVBQWUsUUFLMUI7QUFDRCxNQUFNLENBQU4sSUFBWSxnQkFHWDtBQUhELFdBQVksZ0JBQWdCO0lBQzFCLDZEQUFPLENBQUE7SUFDUCwyREFBTSxDQUFBO0FBQ1IsQ0FBQyxFQUhXLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFHM0I7QUF3QkQsTUFBTSxPQUFPLGdCQUFnQjtJQXRCN0I7UUEwQkUsU0FBSSxHQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxxQkFBcUI7UUFFaEUsVUFBSyxHQUFxQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7UUFLbkQsUUFBRyxHQUFZLEtBQUssQ0FBQztRQUdyQixvQkFBZSxHQUFHLGVBQWUsQ0FBQztRQUNsQyxxQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUVwQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztLQTRIMUI7SUExSEMsSUFDSSxLQUFLLENBQUMsR0FBVztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDeEIs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Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJUOzhCQUtELElBQUk7c0JBREgsS0FBSztnQkFHTixJQUFJO3NCQURILEtBQUs7Z0JBR04sS0FBSztzQkFESixLQUFLO2dCQU1OLEdBQUc7c0JBSEYsV0FBVzt1QkFBQyxrQkFBa0I7O3NCQUM5QixLQUFLO2dCQVdGLEtBQUs7c0JBRFIsS0FBSztnQkFTRixJQUFJO3NCQURQLEtBQUs7Z0JBU0YsSUFBSTtzQkFEUCxLQUFLO2dCQWlCSyxRQUFRO3NCQURsQixXQUFXO3VCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBIZWxwZXJzIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG4vLyBBUFBcbmV4cG9ydCBlbnVtIE5PVk9fVkFMVUVfVFlQRSB7XG4gIERFRkFVTFQsXG4gIEVOVElUWV9MSVNULFxuICBMSU5LLFxuICBJTlRFUk5BTF9MSU5LLFxufVxuZXhwb3J0IGVudW0gTk9WT19WQUxVRV9USEVNRSB7XG4gIERFRkFVTFQsXG4gIE1PQklMRSxcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by12YWx1ZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInZhbHVlLW91dGVyXCIgW25nQ2xhc3NdPVwiY3VzdG9tQ2xhc3NcIj5cbiAgICAgIDxub3ZvLWxhYmVsPnt7IG1ldGEubGFiZWwgfX08L25vdm8tbGFiZWw+XG4gICAgICA8c3BhbiBjbGFzcz1cInZhbHVlXCI+XG4gICAgICAgIDxpICpuZ0lmPVwibWV0YS5zaG93RW50aXR5SWNvblwiIGNsYXNzPVwiYmhpLWNpcmNsZSB7eyBtZXRhLmVudGl0eUljb25DbGFzcyB9fVwiPjwvaT5cbiAgICAgICAgPG5vdm8taWNvbiAqbmdJZj1cIm1ldGE/Lmljb25cIj57eyBtZXRhLmljb24gfX08L25vdm8taWNvbj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiX3R5cGVcIj5cbiAgICAgICAgICA8YSAqbmdTd2l0Y2hDYXNlPVwiTk9WT19WQUxVRV9UWVBFLklOVEVSTkFMX0xJTktcIiAoY2xpY2spPVwib3BlbkxpbmsoKVwiIFtpbm5lckhUTUxdPVwiZGF0YSB8IHJlbmRlcjogbWV0YVwiPjwvYT5cbiAgICAgICAgICA8YSAqbmdTd2l0Y2hDYXNlPVwiTk9WT19WQUxVRV9UWVBFLkxJTktcIiBjbGFzcz1cInZhbHVlXCIgW2hyZWZdPVwidXJsXCIgdGFyZ2V0PVwiX2JsYW5rXCIgW2lubmVySFRNTF09XCJkYXRhIHwgcmVuZGVyOiBtZXRhXCI+PC9hPlxuICAgICAgICAgIDxub3ZvLWVudGl0eS1saXN0ICpuZ1N3aXRjaENhc2U9XCJOT1ZPX1ZBTFVFX1RZUEUuRU5USVRZX0xJU1RcIiBbZGF0YV09XCJkYXRhXCIgW21ldGFdPVwibWV0YVwiPjwvbm92by1lbnRpdHktbGlzdD5cbiAgICAgICAgICA8bm92by10ZXh0ICpuZ1N3aXRjaERlZmF1bHQgW2lubmVySFRNTF09XCJkYXRhIHwgcmVuZGVyOiBtZXRhXCI+PC9ub3ZvLXRleHQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zXCIgKm5nSWY9XCJzaG93SWNvblwiPlxuICAgICAgPGkgKm5nRm9yPVwibGV0IGljb24gb2YgbWV0YS5pY29uc1wiIFtjbGFzc109XCJpY29uQ2xhc3MoaWNvbilcIiAoY2xpY2spPVwib25WYWx1ZUNsaWNrKGljb24pXCI+PC9pPlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9WYWx1ZS5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9WYWx1ZUVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIGRhdGE6IGFueTsgLy8gVE9ETyB1c2UgaW50ZXJmYWNlXG4gIEBJbnB1dCgpXG4gIG1ldGE6IGFueSA9IHsgdHlwZTogJ1NDQUxBUicsIGxhYmVsOiAnJyB9OyAvLyBUT0RPIHVzZSBpbnRlcmZhY2VcbiAgQElucHV0KClcbiAgdGhlbWU6IE5PVk9fVkFMVUVfVEhFTUUgPSBOT1ZPX1ZBTFVFX1RIRU1FLkRFRkFVTFQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5ob3Jpem9udGFsJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHJvdzogQm9vbGVhbiA9IGZhbHNlO1xuXG4gIF90eXBlOiBOT1ZPX1ZBTFVFX1RZUEU7XG4gIE5PVk9fVkFMVUVfVFlQRSA9IE5PVk9fVkFMVUVfVFlQRTtcbiAgTk9WT19WQUxVRV9USEVNRSA9IE5PVk9fVkFMVUVfVEhFTUU7XG4gIHVybDogc3RyaW5nO1xuICBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgc2V0IGxhYmVsKGxibDogc3RyaW5nKSB7XG4gICAgdGhpcy5tZXRhLmxhYmVsID0gbGJsO1xuICB9XG4gIGdldCBsYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1ldGEubGFiZWw7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdHlwZSh0eXA6IHN0cmluZykge1xuICAgIHRoaXMubWV0YS50eXBlID0gdHlwO1xuICB9XG4gIGdldCB0eXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubWV0YS50eXBlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGljb24odmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMubWV0YS5pY29uID0gdmFsdWU7XG4gIH1cbiAgZ2V0IGljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tZXRhLmljb247XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoSGVscGVycy5pc0VtcHR5KHRoaXMubWV0YSkpIHtcbiAgICAgIHRoaXMubWV0YSA9IHtcbiAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1vYmlsZScpXG4gIHB1YmxpYyBnZXQgaXNNb2JpbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudGhlbWUgPT09IE5PVk9fVkFMVUVfVEhFTUUuTU9CSUxFO1xuICB9XG5cbiAgaWNvbkNsYXNzKGljb24pOiBzdHJpbmcge1xuICAgIGxldCBpY29uQ2xhc3MgPSAnJztcbiAgICBpZiAoaWNvbiAmJiBpY29uLmljb25DbHMpIHtcbiAgICAgIGljb25DbGFzcyA9IGBiaGktJHtpY29uLmljb25DbHN9IGFjdGlvbnNgO1xuICAgICAgaWYgKGljb24ub25JY29uQ2xpY2spIHtcbiAgICAgICAgaWNvbkNsYXNzID0gYCR7aWNvbkNsYXNzfSBjbGlja2FibGVgO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGljb25DbGFzcztcbiAgICB9XG4gICAgcmV0dXJuIGljb25DbGFzcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNEZWZhdWx0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG93TGFiZWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuX3R5cGUgPT09IE5PVk9fVkFMVUVfVFlQRS5JTlRFUk5BTF9MSU5LIHx8IHRoaXMuX3R5cGUgPT09IE5PVk9fVkFMVUVfVFlQRS5MSU5LIHx8IHRoaXMuX3R5cGUgPT09IE5PVk9fVkFMVUVfVFlQRS5FTlRJVFlfTElTVFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3dJY29uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1ldGEgJiYgdGhpcy5tZXRhLmljb25zICYmIHRoaXMubWV0YS5pY29ucy5sZW5ndGggJiYgIUhlbHBlcnMuaXNFbXB0eSh0aGlzLmRhdGEpO1xuICB9XG5cbiAgb25WYWx1ZUNsaWNrKGljb24pOiB2b2lkIHtcbiAgICBpZiAoaWNvbi5vbkljb25DbGljayAmJiB0eXBlb2YgaWNvbi5vbkljb25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWNvbi5vbkljb25DbGljayh0aGlzLmRhdGEsIHRoaXMubWV0YSk7XG4gICAgfVxuICB9XG4gIG9wZW5MaW5rKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1ldGEgJiYgdGhpcy5tZXRhLm9wZW5MaW5rICYmIHR5cGVvZiB0aGlzLm1ldGEub3BlbkxpbmsgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMubWV0YS5vcGVuTGluayh0aGlzLmRhdGEsIHRoaXMubWV0YSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcz86IFNpbXBsZUNoYW5nZXMpOiBhbnkge1xuICAgIGlmICh0aGlzLm1ldGEgJiYgdGhpcy5pc0xpbmtGaWVsZCh0aGlzLm1ldGEsIHRoaXMuZGF0YSkpIHtcbiAgICAgIHRoaXMuX3R5cGUgPSBOT1ZPX1ZBTFVFX1RZUEUuTElOSztcbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgdmFsdWUgaGFzIGEgcHJvdG9jb2wsIG90aGVyd2lzZSB0aGUgVVJMIHdpbGwgYmUgcmVsYXRpdmVcbiAgICAgIGNvbnN0IGhhc1Byb3RvY29sOiBhbnkgPSBuZXcgUmVnRXhwKCdeKGh0dHB8aHR0cHMpOi8vJywgJ2knKTtcbiAgICAgIGlmICghaGFzUHJvdG9jb2wudGVzdCh0aGlzLmRhdGEpKSB7XG4gICAgICAgIHRoaXMudXJsID0gYGh0dHA6Ly8ke3RoaXMuZGF0YX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy51cmwgPSB0aGlzLmRhdGE7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzRW50aXR5TGlzdCh0aGlzLm1ldGEudHlwZSkpIHtcbiAgICAgIHRoaXMuX3R5cGUgPSBOT1ZPX1ZBTFVFX1RZUEUuRU5USVRZX0xJU1Q7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzSFRNTEZpZWxkKHRoaXMubWV0YSkpIHtcbiAgICAgIHRoaXMuY3VzdG9tQ2xhc3MgPSB0aGlzLm1ldGEuY3VzdG9tQ2xhc3MgPyB0aGlzLm1ldGEuY3VzdG9tQ2xhc3MgOiAnJztcbiAgICAgIGlmICh0aGlzLm1ldGEuc3RyaXBIVE1MICYmIHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEucmVwbGFjZSkge1xuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEucmVwbGFjZSgvPCg/IXN0eWxlfFxcL3N0eWxlKS4rPz4vZ2ksICcnKS50cmltKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm1ldGEgJiYgdGhpcy5tZXRhLmFzc29jaWF0ZWRFbnRpdHkpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5tZXRhLmFzc29jaWF0ZWRFbnRpdHkuZW50aXR5KSB7XG4gICAgICAgIGNhc2UgJ0NsaWVudENvcnBvcmF0aW9uJzpcbiAgICAgICAgY2FzZSAnQ2xpZW50Q29udGFjdCc6XG4gICAgICAgIGNhc2UgJ0NhbmRpZGF0ZSc6XG4gICAgICAgIGNhc2UgJ09wcG9ydHVuaXR5JzpcbiAgICAgICAgY2FzZSAnSm9iT3JkZXInOlxuICAgICAgICBjYXNlICdQbGFjZW1lbnQnOlxuICAgICAgICBjYXNlICdMZWFkJzpcbiAgICAgICAgICB0aGlzLl90eXBlID0gTk9WT19WQUxVRV9UWVBFLklOVEVSTkFMX0xJTks7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNMaW5rRmllbGQoZmllbGQ6IHsgbmFtZT86IHN0cmluZzsgdHlwZT86IE5PVk9fVkFMVUVfVFlQRSB9LCBkYXRhOiBhbnkpOiBib29sZWFuIHtcbiAgICBjb25zdCBsaW5rRmllbGRzOiBhbnkgPSBbJ2NvbXBhbnlVUkwnLCAnY2xpZW50Q29ycG9yYXRpb25Db21wYW55VVJMJ107XG4gICAgY29uc3QgcmVnZXg6IGFueSA9IG5ldyBSZWdFeHAoJ14oaHR0cHM/Oi8vKD86d3d3LnwoPyF3d3cpKVtecy5dKy5bXnNdezIsfXx3d3cuW15zXSsuW15zXXsyLH0pJCcsICdnaScpO1xuICAgIGNvbnN0IGlzVVJMOiBhbnkgPSBIZWxwZXJzLmlzU3RyaW5nKGRhdGEpICYmIHJlZ2V4LmV4ZWMoZGF0YS50cmltKCkpO1xuICAgIHJldHVybiBsaW5rRmllbGRzLmluZGV4T2YoZmllbGQubmFtZSkgPiAtMSB8fCAhIWlzVVJMIHx8IGZpZWxkLnR5cGUgPT09IE5PVk9fVkFMVUVfVFlQRS5MSU5LO1xuICB9XG5cbiAgaXNFbnRpdHlMaXN0KHR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlID09PSAnVE9fTUFOWSc7XG4gIH1cblxuICBpc0hUTUxGaWVsZChtZXRhOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWV0YS5kYXRhU3BlY2lhbGl6YXRpb24gPT09ICdIVE1MJyB8fCBtZXRhLmlucHV0VHlwZSA9PT0gJ1RFWFRBUkVBJztcbiAgfVxufVxuIl19