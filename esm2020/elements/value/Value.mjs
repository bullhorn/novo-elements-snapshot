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
import * as i1 from "novo-elements/elements/common";
import * as i2 from "novo-elements/elements/icon";
import * as i3 from "./EntityList";
import * as i4 from "@angular/common";
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
}
NovoValueElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoValueElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoValueElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoValueElement, selector: "novo-value", inputs: { data: "data", meta: "meta", theme: "theme", row: "row", label: "label", type: "type", icon: "icon" }, host: { properties: { "class.horizontal": "this.row", "class.mobile": "this.isMobile" } }, usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true, components: [{ type: i1.NovoLabel, selector: "novo-label,[novo-label]" }, { type: i2.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i3.EntityList, selector: "novo-entity-list", inputs: ["data", "meta"] }, { type: i1.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }], directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i4.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "render": i5.RenderPipe } });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoValueElement.prototype, "row", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoValueElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-value',
                    template: `
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
  `,
                }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy92YWx1ZS9WYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7O0FBQzVELE1BQU07QUFDTixNQUFNLENBQU4sSUFBWSxlQUtYO0FBTEQsV0FBWSxlQUFlO0lBQ3pCLDJEQUFPLENBQUE7SUFDUCxtRUFBVyxDQUFBO0lBQ1gscURBQUksQ0FBQTtJQUNKLHVFQUFhLENBQUE7QUFDZixDQUFDLEVBTFcsZUFBZSxLQUFmLGVBQWUsUUFLMUI7QUFDRCxNQUFNLENBQU4sSUFBWSxnQkFHWDtBQUhELFdBQVksZ0JBQWdCO0lBQzFCLDZEQUFPLENBQUE7SUFDUCwyREFBTSxDQUFBO0FBQ1IsQ0FBQyxFQUhXLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFHM0I7QUF1QkQsTUFBTSxPQUFPLGdCQUFnQjtJQXJCN0I7UUF5QkUsU0FBSSxHQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxxQkFBcUI7UUFFaEUsVUFBSyxHQUFxQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7UUFLbkQsUUFBRyxHQUFZLEtBQUssQ0FBQztRQUdyQixvQkFBZSxHQUFHLGVBQWUsQ0FBQztRQUNsQyxxQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUVwQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztLQTRIMUI7SUExSEMsSUFDSSxLQUFLLENBQUMsR0FBVztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDeEIs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LEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDtpQkFDRjs4QkFHQyxJQUFJO3NCQURILEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLO2dCQUdOLEtBQUs7c0JBREosS0FBSztnQkFNTixHQUFHO3NCQUhGLFdBQVc7dUJBQUMsa0JBQWtCOztzQkFDOUIsS0FBSztnQkFXRixLQUFLO3NCQURSLEtBQUs7Z0JBU0YsSUFBSTtzQkFEUCxLQUFLO2dCQVNGLElBQUk7c0JBRFAsS0FBSztnQkFpQkssUUFBUTtzQkFEbEIsV0FBVzt1QkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuLy8gQVBQXG5leHBvcnQgZW51bSBOT1ZPX1ZBTFVFX1RZUEUge1xuICBERUZBVUxULFxuICBFTlRJVFlfTElTVCxcbiAgTElOSyxcbiAgSU5URVJOQUxfTElOSyxcbn1cbmV4cG9ydCBlbnVtIE5PVk9fVkFMVUVfVEhFTUUge1xuICBERUZBVUxULFxuICBNT0JJTEUsXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdmFsdWUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZS1vdXRlclwiIFtuZ0NsYXNzXT1cImN1c3RvbUNsYXNzXCI+XG4gICAgICA8bm92by1sYWJlbD57eyBtZXRhLmxhYmVsIH19PC9ub3ZvLWxhYmVsPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPlxuICAgICAgICA8aSAqbmdJZj1cIm1ldGEuc2hvd0VudGl0eUljb25cIiBjbGFzcz1cImJoaS1jaXJjbGUge3sgbWV0YS5lbnRpdHlJY29uQ2xhc3MgfX1cIj48L2k+XG4gICAgICAgIDxub3ZvLWljb24gKm5nSWY9XCJtZXRhPy5pY29uXCI+e3sgbWV0YS5pY29uIH19PC9ub3ZvLWljb24+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIl90eXBlXCI+XG4gICAgICAgICAgPGEgKm5nU3dpdGNoQ2FzZT1cIk5PVk9fVkFMVUVfVFlQRS5JTlRFUk5BTF9MSU5LXCIgKGNsaWNrKT1cIm9wZW5MaW5rKClcIiBbaW5uZXJIVE1MXT1cImRhdGEgfCByZW5kZXI6IG1ldGFcIj48L2E+XG4gICAgICAgICAgPGEgKm5nU3dpdGNoQ2FzZT1cIk5PVk9fVkFMVUVfVFlQRS5MSU5LXCIgY2xhc3M9XCJ2YWx1ZVwiIFtocmVmXT1cInVybFwiIHRhcmdldD1cIl9ibGFua1wiIFtpbm5lckhUTUxdPVwiZGF0YSB8IHJlbmRlcjogbWV0YVwiPjwvYT5cbiAgICAgICAgICA8bm92by1lbnRpdHktbGlzdCAqbmdTd2l0Y2hDYXNlPVwiTk9WT19WQUxVRV9UWVBFLkVOVElUWV9MSVNUXCIgW2RhdGFdPVwiZGF0YVwiIFttZXRhXT1cIm1ldGFcIj48L25vdm8tZW50aXR5LWxpc3Q+XG4gICAgICAgICAgPG5vdm8tdGV4dCAqbmdTd2l0Y2hEZWZhdWx0IFtpbm5lckhUTUxdPVwiZGF0YSB8IHJlbmRlcjogbWV0YVwiPjwvbm92by10ZXh0PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiICpuZ0lmPVwic2hvd0ljb25cIj5cbiAgICAgIDxpICpuZ0Zvcj1cImxldCBpY29uIG9mIG1ldGEuaWNvbnNcIiBbY2xhc3NdPVwiaWNvbkNsYXNzKGljb24pXCIgKGNsaWNrKT1cIm9uVmFsdWVDbGljayhpY29uKVwiPjwvaT5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1ZhbHVlRWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgZGF0YTogYW55OyAvLyBUT0RPIHVzZSBpbnRlcmZhY2VcbiAgQElucHV0KClcbiAgbWV0YTogYW55ID0geyB0eXBlOiAnU0NBTEFSJywgbGFiZWw6ICcnIH07IC8vIFRPRE8gdXNlIGludGVyZmFjZVxuICBASW5wdXQoKVxuICB0aGVtZTogTk9WT19WQUxVRV9USEVNRSA9IE5PVk9fVkFMVUVfVEhFTUUuREVGQVVMVDtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhvcml6b250YWwnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgcm93OiBCb29sZWFuID0gZmFsc2U7XG5cbiAgX3R5cGU6IE5PVk9fVkFMVUVfVFlQRTtcbiAgTk9WT19WQUxVRV9UWVBFID0gTk9WT19WQUxVRV9UWVBFO1xuICBOT1ZPX1ZBTFVFX1RIRU1FID0gTk9WT19WQUxVRV9USEVNRTtcbiAgdXJsOiBzdHJpbmc7XG4gIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICBzZXQgbGFiZWwobGJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1ldGEubGFiZWwgPSBsYmw7XG4gIH1cbiAgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubWV0YS5sYWJlbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB0eXBlKHR5cDogc3RyaW5nKSB7XG4gICAgdGhpcy5tZXRhLnR5cGUgPSB0eXA7XG4gIH1cbiAgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tZXRhLnR5cGU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgaWNvbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5tZXRhLmljb24gPSB2YWx1ZTtcbiAgfVxuICBnZXQgaWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1ldGEuaWNvbjtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChIZWxwZXJzLmlzRW1wdHkodGhpcy5tZXRhKSkge1xuICAgICAgdGhpcy5tZXRhID0ge1xuICAgICAgICBsYWJlbDogJycsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubW9iaWxlJylcbiAgcHVibGljIGdldCBpc01vYmlsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy50aGVtZSA9PT0gTk9WT19WQUxVRV9USEVNRS5NT0JJTEU7XG4gIH1cblxuICBpY29uQ2xhc3MoaWNvbik6IHN0cmluZyB7XG4gICAgbGV0IGljb25DbGFzcyA9ICcnO1xuICAgIGlmIChpY29uICYmIGljb24uaWNvbkNscykge1xuICAgICAgaWNvbkNsYXNzID0gYGJoaS0ke2ljb24uaWNvbkNsc30gYWN0aW9uc2A7XG4gICAgICBpZiAoaWNvbi5vbkljb25DbGljaykge1xuICAgICAgICBpY29uQ2xhc3MgPSBgJHtpY29uQ2xhc3N9IGNsaWNrYWJsZWA7XG4gICAgICB9XG4gICAgICByZXR1cm4gaWNvbkNsYXNzO1xuICAgIH1cbiAgICByZXR1cm4gaWNvbkNsYXNzO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0RlZmF1bHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3dMYWJlbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5fdHlwZSA9PT0gTk9WT19WQUxVRV9UWVBFLklOVEVSTkFMX0xJTksgfHwgdGhpcy5fdHlwZSA9PT0gTk9WT19WQUxVRV9UWVBFLkxJTksgfHwgdGhpcy5fdHlwZSA9PT0gTk9WT19WQUxVRV9UWVBFLkVOVElUWV9MSVNUXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvd0ljb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWV0YSAmJiB0aGlzLm1ldGEuaWNvbnMgJiYgdGhpcy5tZXRhLmljb25zLmxlbmd0aCAmJiAhSGVscGVycy5pc0VtcHR5KHRoaXMuZGF0YSk7XG4gIH1cblxuICBvblZhbHVlQ2xpY2soaWNvbik6IHZvaWQge1xuICAgIGlmIChpY29uLm9uSWNvbkNsaWNrICYmIHR5cGVvZiBpY29uLm9uSWNvbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpY29uLm9uSWNvbkNsaWNrKHRoaXMuZGF0YSwgdGhpcy5tZXRhKTtcbiAgICB9XG4gIH1cbiAgb3BlbkxpbmsoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWV0YSAmJiB0aGlzLm1ldGEub3BlbkxpbmsgJiYgdHlwZW9mIHRoaXMubWV0YS5vcGVuTGluayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5tZXRhLm9wZW5MaW5rKHRoaXMuZGF0YSwgdGhpcy5tZXRhKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcyk6IGFueSB7XG4gICAgaWYgKHRoaXMubWV0YSAmJiB0aGlzLmlzTGlua0ZpZWxkKHRoaXMubWV0YSwgdGhpcy5kYXRhKSkge1xuICAgICAgdGhpcy5fdHlwZSA9IE5PVk9fVkFMVUVfVFlQRS5MSU5LO1xuICAgICAgLy8gTWFrZSBzdXJlIHRoZSB2YWx1ZSBoYXMgYSBwcm90b2NvbCwgb3RoZXJ3aXNlIHRoZSBVUkwgd2lsbCBiZSByZWxhdGl2ZVxuICAgICAgY29uc3QgaGFzUHJvdG9jb2w6IGFueSA9IG5ldyBSZWdFeHAoJ14oaHR0cHxodHRwcyk6Ly8nLCAnaScpO1xuICAgICAgaWYgKCFoYXNQcm90b2NvbC50ZXN0KHRoaXMuZGF0YSkpIHtcbiAgICAgICAgdGhpcy51cmwgPSBgaHR0cDovLyR7dGhpcy5kYXRhfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVybCA9IHRoaXMuZGF0YTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNFbnRpdHlMaXN0KHRoaXMubWV0YS50eXBlKSkge1xuICAgICAgdGhpcy5fdHlwZSA9IE5PVk9fVkFMVUVfVFlQRS5FTlRJVFlfTElTVDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNIVE1MRmllbGQodGhpcy5tZXRhKSkge1xuICAgICAgdGhpcy5jdXN0b21DbGFzcyA9IHRoaXMubWV0YS5jdXN0b21DbGFzcyA/IHRoaXMubWV0YS5jdXN0b21DbGFzcyA6ICcnO1xuICAgICAgaWYgKHRoaXMubWV0YS5zdHJpcEhUTUwgJiYgdGhpcy5kYXRhICYmIHRoaXMuZGF0YS5yZXBsYWNlKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5yZXBsYWNlKC88KD8hc3R5bGV8XFwvc3R5bGUpLis/Pi9naSwgJycpLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMubWV0YSAmJiB0aGlzLm1ldGEuYXNzb2NpYXRlZEVudGl0eSkge1xuICAgICAgc3dpdGNoICh0aGlzLm1ldGEuYXNzb2NpYXRlZEVudGl0eS5lbnRpdHkpIHtcbiAgICAgICAgY2FzZSAnQ2xpZW50Q29ycG9yYXRpb24nOlxuICAgICAgICBjYXNlICdDbGllbnRDb250YWN0JzpcbiAgICAgICAgY2FzZSAnQ2FuZGlkYXRlJzpcbiAgICAgICAgY2FzZSAnT3Bwb3J0dW5pdHknOlxuICAgICAgICBjYXNlICdKb2JPcmRlcic6XG4gICAgICAgIGNhc2UgJ1BsYWNlbWVudCc6XG4gICAgICAgIGNhc2UgJ0xlYWQnOlxuICAgICAgICAgIHRoaXMuX3R5cGUgPSBOT1ZPX1ZBTFVFX1RZUEUuSU5URVJOQUxfTElOSztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc0xpbmtGaWVsZChmaWVsZDogeyBuYW1lPzogc3RyaW5nOyB0eXBlPzogTk9WT19WQUxVRV9UWVBFIH0sIGRhdGE6IGFueSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGxpbmtGaWVsZHM6IGFueSA9IFsnY29tcGFueVVSTCcsICdjbGllbnRDb3Jwb3JhdGlvbkNvbXBhbnlVUkwnXTtcbiAgICBjb25zdCByZWdleDogYW55ID0gbmV3IFJlZ0V4cCgnXihodHRwcz86Ly8oPzp3d3cufCg/IXd3dykpW15zLl0rLltec117Mix9fHd3dy5bXnNdKy5bXnNdezIsfSkkJywgJ2dpJyk7XG4gICAgY29uc3QgaXNVUkw6IGFueSA9IEhlbHBlcnMuaXNTdHJpbmcoZGF0YSkgJiYgcmVnZXguZXhlYyhkYXRhLnRyaW0oKSk7XG4gICAgcmV0dXJuIGxpbmtGaWVsZHMuaW5kZXhPZihmaWVsZC5uYW1lKSA+IC0xIHx8ICEhaXNVUkwgfHwgZmllbGQudHlwZSA9PT0gTk9WT19WQUxVRV9UWVBFLkxJTks7XG4gIH1cblxuICBpc0VudGl0eUxpc3QodHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHR5cGUgPT09ICdUT19NQU5ZJztcbiAgfVxuXG4gIGlzSFRNTEZpZWxkKG1ldGE6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtZXRhLmRhdGFTcGVjaWFsaXphdGlvbiA9PT0gJ0hUTUwnIHx8IG1ldGEuaW5wdXRUeXBlID09PSAnVEVYVEFSRUEnO1xuICB9XG59XG4iXX0=