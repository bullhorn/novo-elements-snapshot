import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, HostBinding, Input, Optional, Output, Self, TemplateRef, ViewChild, ViewContainerRef, } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { NovoDragulaService } from 'novo-elements/elements/dragula';
import { NovoLabelService } from 'novo-elements/services';
import { ErrorStateMatcher, mixinErrorState } from 'novo-elements/elements/common';
import { NovoFieldControl } from 'novo-elements/elements/field';
import { NovoFile } from './extras/file/File';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/dragula";
import * as i3 from "novo-elements/elements/common";
import * as i4 from "@angular/forms";
import * as i5 from "novo-elements/elements/button";
import * as i6 from "novo-elements/elements/loading";
import * as i7 from "@angular/common";
import * as i8 from "novo-elements/pipes";
// Value accessor for the component (supports ngModel)
// const FILE_VALUE_ACCESSOR = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => NovoFileInputElement),
//   multi: true,
// };
const LAYOUT_DEFAULTS = { order: 'default', download: true, removable: true, labelStyle: 'default', draggable: false };
// make file-input ids unique
let nextId = 0;
class NovoFileInputBase {
    constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
const NovoFileInputMixins = mixinErrorState(NovoFileInputBase);
export class NovoFileInputElement extends NovoFileInputMixins {
    constructor(element, labels, dragula, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, _ngControl) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, _ngControl);
        this.element = element;
        this.labels = labels;
        this.dragula = dragula;
        this._uniqueId = `novo-file-input-${++nextId}`;
        /** Tab index for the chip list. */
        this._tabIndex = 0;
        /** User defined tab index. */
        this._userTabIndex = null;
        this.controlType = 'file-input';
        /** @docs-private Implemented as part of NovoFieldControl. */
        this.lastKeyValue = null;
        this.id = this._uniqueId;
        this.tabindex = 0;
        this.multiple = false;
        this.value = [];
        this.edit = new EventEmitter();
        this.save = new EventEmitter();
        this.delete = new EventEmitter();
        this.upload = new EventEmitter();
        this.elements = [];
        this.files = [];
        this.active = false;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this._name = this._uniqueId;
        this._value = false;
        this._required = false;
        this._disabled = false;
        if (_ngControl) {
            _ngControl.valueAccessor = this;
        }
        this.commands = {
            dragenter: this.dragEnterHandler.bind(this),
            dragleave: this.dragLeaveHandler.bind(this),
            dragover: this.dragOverHandler.bind(this),
            drop: this.dropHandler.bind(this),
        };
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get disabled() {
        return this.ngControl ? !!this.ngControl.disabled : this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    /** Implemented as part of NovoFieldControl. */
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
    }
    ngOnInit() {
        ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((type) => {
            this.element.nativeElement.addEventListener(type, this.commands[type]);
        });
        this.updateLayout();
        this.initializeDragula();
        this.setInitialFileList();
        this.dataFeatureId = this.dataFeatureId ? this.dataFeatureId : this.name;
    }
    ngOnDestroy() {
        ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((type) => {
            this.element.nativeElement.removeEventListener(type, this.commands[type]);
        });
        const dragulaHasFileOutputBag = this.dragula.bags.length > 0 && this.dragula.bags.filter((x) => x.name === this.fileOutputBag).length > 0;
        if (dragulaHasFileOutputBag) {
            this.dragula.destroy(this.fileOutputBag);
        }
    }
    updateLayout() {
        this.layoutOptions = Object.assign({}, LAYOUT_DEFAULTS, this.layoutOptions);
        this.insertTemplatesBasedOnLayout();
    }
    insertTemplatesBasedOnLayout() {
        let order;
        switch (this.layoutOptions.order) {
            case 'displayFilesBelow':
                order = ['fileInput', 'fileOutput'];
                break;
            default:
                order = ['fileOutput', 'fileInput'];
        }
        order.forEach((template) => {
            this.container.createEmbeddedView(this[template], 0);
        });
        return order;
    }
    initializeDragula() {
        this.fileOutputBag = `file-output-${this.dragula.bags.length}`;
        this.dragula.setOptions(this.fileOutputBag, {
            moves: (el, container, handle) => {
                return this.layoutOptions.draggable;
            },
        });
    }
    setInitialFileList() {
        if (this.value) {
            this.files = this.value;
        }
    }
    dragEnterHandler(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        this.target = event.target;
        this.active = true;
    }
    dragLeaveHandler(event) {
        event.preventDefault();
        if (this.target === event.target) {
            this.active = false;
        }
    }
    dragOverHandler(event) {
        event.preventDefault();
        // no-op
    }
    dropHandler(event) {
        event.preventDefault();
        this.visible = false;
        if (event.dataTransfer.types[0] !== 'Files') {
            return;
        }
        const options = this.layoutOptions;
        const filelist = Array.from(event.dataTransfer.files);
        if (options.customActions) {
            this.upload.emit(this.multiple ? filelist : [filelist[0]]);
        }
        else {
            this.process(this.multiple ? filelist : [filelist[0]]);
        }
        this.active = false;
    }
    writeValue(model) {
        this.model = model;
        // If model is cleared programmatically (E.g. form.patchValue({file: undefined})), empty file list.
        this.files = !model ? [] : this.files;
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    check(event) {
        this.process(Array.from(event.target.files));
        // After processing file upload, clear input element value. Allows for delete and upload of same file.
        event.target.value = '';
    }
    validate(files) {
        let passedValidation = true;
        if (this.layoutOptions.customValidation) {
            this.layoutOptions.customValidation
                .filter((validation) => validation.action === 'upload')
                .forEach((uploadValidation) => {
                passedValidation = uploadValidation.fn(files) && passedValidation;
            });
        }
        return passedValidation;
    }
    process(filelist) {
        if (this.validate(filelist)) {
            Promise.all(filelist.map((file) => this.readFile(file))).then((files) => {
                if (this.multiple) {
                    this.files.push(...files);
                }
                else {
                    this.files = files;
                }
                this.model = this.files;
                this.onModelChange(this.model);
            });
        }
    }
    download(file) {
        window.open(file.dataURL, '_blank');
    }
    remove(file) {
        this.files.splice(this.files.findIndex((f) => f.name === file.name && f.size === file.size), 1);
        this.model = this.files;
        this.onModelChange(this.model);
    }
    readFile(file) {
        return new NovoFile(file).read();
    }
    customEdit(file) {
        this.edit.emit(file);
    }
    customSave(file) {
        this.save.emit(file);
    }
    customDelete(file) {
        this.delete.emit(file);
    }
    customCheck(event) {
        this.upload.emit(event);
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    /** Whether any radio buttons has focus. */
    get focused() {
        // todo: implement this.
        return false;
    }
    /** Implemented as part of NovoFieldControl. */
    get empty() {
        return this.value === null;
    }
    /** Implemented as part of NovoFieldControl. */
    get shouldLabelFloat() {
        return !this.empty || this.focused;
    }
    /** Implemented as part of NovoFieldControl. */
    setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
    }
    /** Implemented as part of NovoFieldControl. */
    onContainerClick(event) {
        this.focus();
    }
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    focus(options) {
        if (this.disabled) {
            return;
        }
        // TODO
    }
}
NovoFileInputElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFileInputElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i2.NovoDragulaService }, { token: i3.ErrorStateMatcher }, { token: i4.NgForm, optional: true }, { token: i4.FormGroupDirective, optional: true }, { token: i4.NgControl, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Component });
NovoFileInputElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoFileInputElement, selector: "novo-file-input", inputs: { id: "id", tabindex: "tabindex", errorStateMatcher: "errorStateMatcher", multiple: "multiple", layoutOptions: "layoutOptions", value: "value", dataFeatureId: "dataFeatureId", name: "name", disabled: "disabled", required: "required", placeholder: "placeholder" }, outputs: { edit: "edit", save: "save", delete: "delete", upload: "upload" }, host: { properties: { "class.disabled": "this.disabled" } }, providers: [{ provide: NovoFieldControl, useExisting: NovoFileInputElement }], viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true, static: true }, { propertyName: "fileOutput", first: true, predicate: ["fileOutput"], descendants: true, static: true }, { propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "inputElement", first: true, predicate: ["inputElement"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <div #container></div>
    <ng-template #fileInput>
      <div class="file-input-group" [class.disabled]="disabled" [class.active]="active">
        <input
          #inputElement
          *ngIf="!layoutOptions.customActions"
          type="file"
          [name]="name"
          [attr.id]="name"
          (change)="check($event)"
          [attr.multiple]="multiple"
          tabindex="-1"
          [attr.data-feature-id]="dataFeatureId"
        />
        <input
          #inputElement
          *ngIf="layoutOptions.customActions"
          type="file"
          [name]="name"
          [attr.id]="name"
          (change)="customCheck($event)"
          [attr.multiple]="multiple"
          tabindex="-1"
          [attr.data-feature-id]="dataFeatureId"
        />
        <section [ngSwitch]="layoutOptions.labelStyle">
          <label *ngSwitchCase="'no-box'" [attr.for]="name" class="no-box">
            <div>
              <i class="bhi-dropzone"></i>{{ placeholder || labels.chooseAFile }} {{ labels.or }}
              <strong class="link">{{ labels.clickToBrowse }}</strong>
            </div>
          </label>
          <label *ngSwitchDefault [attr.for]="name" class="boxed">
            <span>{{ placeholder || labels.chooseAFile }}</span>
            <small
              >{{ labels.or }} <strong class="link">{{ labels.clickToBrowse }}</strong></small
            >
          </label>
        </section>
      </div>
    </ng-template>
    <ng-template #fileOutput>
      <div class="file-output-group" [dragula]="fileOutputBag" [dragulaModel]="files">
        <div class="file-item" *ngFor="let file of files" [class.disabled]="disabled">
          <i *ngIf="layoutOptions.draggable" class="bhi-move"></i>
          <label *ngIf="file.link"
            ><span
              ><a href="{{ file.link }}" target="_blank">{{ file.name | decodeURI }}</a></span
            ><span *ngIf="file.description">||</span><span>{{ file.description }}</span></label
          >
          <label *ngIf="!file.link">{{ file.name | decodeURI }}</label>
          <div class="actions" [attr.data-automation-id]="'file-actions'" *ngIf="file.loaded">
            <div *ngIf="!layoutOptions.customActions">
              <button
                *ngIf="layoutOptions.download"
                type="button"
                theme="icon"
                icon="save"
                (click)="download(file)"
                [attr.data-automation-id]="'file-download'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="!disabled && (layoutOptions.removable || (!layoutOptions.removable && layoutOptions.removableWhenNew && !file.link))"
                type="button"
                theme="icon"
                icon="close"
                (click)="remove(file)"
                [attr.data-automation-id]="'file-remove'"
                tabindex="-1"
              ></button>
            </div>
            <div *ngIf="layoutOptions.customActions">
              <button
                *ngIf="layoutOptions.edit && !disabled"
                type="button"
                theme="icon"
                icon="edit"
                (click)="customEdit(file)"
                [attr.data-automation-id]="'file-edit'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="layoutOptions.download"
                type="button"
                theme="icon"
                icon="save"
                (click)="customSave(file)"
                [attr.data-automation-id]="'file-download'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="!disabled"
                type="button"
                theme="icon"
                icon="close"
                (click)="customDelete(file)"
                [attr.data-automation-id]="'file-remove'"
                tabindex="-1"
              ></button>
            </div>
          </div>
          <novo-loading *ngIf="!file.loaded"></novo-loading>
        </div>
      </div>
    </ng-template>
`, isInline: true, components: [{ type: i5.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i6.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i7.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i7.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i2.NovoDragulaElement, selector: "[dragula]", inputs: ["dragula", "dragulaModel"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "decodeURI": i8.DecodeURIPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFileInputElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-file-input',
                    providers: [{ provide: NovoFieldControl, useExisting: NovoFileInputElement }],
                    template: `
    <div #container></div>
    <ng-template #fileInput>
      <div class="file-input-group" [class.disabled]="disabled" [class.active]="active">
        <input
          #inputElement
          *ngIf="!layoutOptions.customActions"
          type="file"
          [name]="name"
          [attr.id]="name"
          (change)="check($event)"
          [attr.multiple]="multiple"
          tabindex="-1"
          [attr.data-feature-id]="dataFeatureId"
        />
        <input
          #inputElement
          *ngIf="layoutOptions.customActions"
          type="file"
          [name]="name"
          [attr.id]="name"
          (change)="customCheck($event)"
          [attr.multiple]="multiple"
          tabindex="-1"
          [attr.data-feature-id]="dataFeatureId"
        />
        <section [ngSwitch]="layoutOptions.labelStyle">
          <label *ngSwitchCase="'no-box'" [attr.for]="name" class="no-box">
            <div>
              <i class="bhi-dropzone"></i>{{ placeholder || labels.chooseAFile }} {{ labels.or }}
              <strong class="link">{{ labels.clickToBrowse }}</strong>
            </div>
          </label>
          <label *ngSwitchDefault [attr.for]="name" class="boxed">
            <span>{{ placeholder || labels.chooseAFile }}</span>
            <small
              >{{ labels.or }} <strong class="link">{{ labels.clickToBrowse }}</strong></small
            >
          </label>
        </section>
      </div>
    </ng-template>
    <ng-template #fileOutput>
      <div class="file-output-group" [dragula]="fileOutputBag" [dragulaModel]="files">
        <div class="file-item" *ngFor="let file of files" [class.disabled]="disabled">
          <i *ngIf="layoutOptions.draggable" class="bhi-move"></i>
          <label *ngIf="file.link"
            ><span
              ><a href="{{ file.link }}" target="_blank">{{ file.name | decodeURI }}</a></span
            ><span *ngIf="file.description">||</span><span>{{ file.description }}</span></label
          >
          <label *ngIf="!file.link">{{ file.name | decodeURI }}</label>
          <div class="actions" [attr.data-automation-id]="'file-actions'" *ngIf="file.loaded">
            <div *ngIf="!layoutOptions.customActions">
              <button
                *ngIf="layoutOptions.download"
                type="button"
                theme="icon"
                icon="save"
                (click)="download(file)"
                [attr.data-automation-id]="'file-download'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="!disabled && (layoutOptions.removable || (!layoutOptions.removable && layoutOptions.removableWhenNew && !file.link))"
                type="button"
                theme="icon"
                icon="close"
                (click)="remove(file)"
                [attr.data-automation-id]="'file-remove'"
                tabindex="-1"
              ></button>
            </div>
            <div *ngIf="layoutOptions.customActions">
              <button
                *ngIf="layoutOptions.edit && !disabled"
                type="button"
                theme="icon"
                icon="edit"
                (click)="customEdit(file)"
                [attr.data-automation-id]="'file-edit'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="layoutOptions.download"
                type="button"
                theme="icon"
                icon="save"
                (click)="customSave(file)"
                [attr.data-automation-id]="'file-download'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="!disabled"
                type="button"
                theme="icon"
                icon="close"
                (click)="customDelete(file)"
                [attr.data-automation-id]="'file-remove'"
                tabindex="-1"
              ></button>
            </div>
          </div>
          <novo-loading *ngIf="!file.loaded"></novo-loading>
        </div>
      </div>
    </ng-template>
`,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i2.NovoDragulaService }, { type: i3.ErrorStateMatcher }, { type: i4.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i4.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i4.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], errorStateMatcher: [{
                type: Input
            }], fileInput: [{
                type: ViewChild,
                args: ['fileInput', { static: true }]
            }], fileOutput: [{
                type: ViewChild,
                args: ['fileOutput', { static: true }]
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], inputElement: [{
                type: ViewChild,
                args: ['inputElement']
            }], multiple: [{
                type: Input
            }], layoutOptions: [{
                type: Input
            }], value: [{
                type: Input
            }], dataFeatureId: [{
                type: Input
            }], edit: [{
                type: Output
            }], save: [{
                type: Output
            }], delete: [{
                type: Output
            }], upload: [{
                type: Output
            }], name: [{
                type: Input
            }], disabled: [{
                type: HostBinding,
                args: ['class.disabled']
            }, {
                type: Input
            }], required: [{
                type: Input
            }], placeholder: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUlucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZm9ybS9leHRyYXMvZmlsZS9GaWxlSW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixJQUFJLEVBQ0osV0FBVyxFQUNYLFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixrQkFBa0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0YsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUEyQixpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7Ozs7QUFFOUMsc0RBQXNEO0FBQ3RELGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFDaEMseURBQXlEO0FBQ3pELGlCQUFpQjtBQUNqQixLQUFLO0FBRUwsTUFBTSxlQUFlLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUN2SCw2QkFBNkI7QUFDN0IsSUFB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QkgsSUFBSTtzQkFEUCxLQUFLO2dCQVdGLFFBQVE7c0JBRlgsV0FBVzt1QkFBQyxnQkFBZ0I7O3NCQUM1QixLQUFLO2dCQWFGLFFBQVE7c0JBRFgsS0FBSztnQkFXRixXQUFXO3NCQURkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgU2VsZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0NvbnRyb2wsIE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9EcmFndWxhU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZHJhZ3VsYSc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciwgRXJyb3JTdGF0ZU1hdGNoZXIsIG1peGluRXJyb3JTdGF0ZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9GaWVsZENvbnRyb2wgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2ZpZWxkJztcbmltcG9ydCB7IE5vdm9GaWxlIH0gZnJvbSAnLi9leHRyYXMvZmlsZS9GaWxlJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG4vLyBjb25zdCBGSUxFX1ZBTFVFX0FDQ0VTU09SID0ge1xuLy8gICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbi8vICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0ZpbGVJbnB1dEVsZW1lbnQpLFxuLy8gICBtdWx0aTogdHJ1ZSxcbi8vIH07XG5cbmNvbnN0IExBWU9VVF9ERUZBVUxUUyA9IHsgb3JkZXI6ICdkZWZhdWx0JywgZG93bmxvYWQ6IHRydWUsIHJlbW92YWJsZTogdHJ1ZSwgbGFiZWxTdHlsZTogJ2RlZmF1bHQnLCBkcmFnZ2FibGU6IGZhbHNlIH07XG4vLyBtYWtlIGZpbGUtaW5wdXQgaWRzIHVuaXF1ZVxubGV0IG5leHRJZCA9IDA7XG5cbmNsYXNzIE5vdm9GaWxlSW5wdXRCYXNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIF9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIHB1YmxpYyBfcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgIHB1YmxpYyBfcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sLFxuICApIHt9XG59XG5jb25zdCBOb3ZvRmlsZUlucHV0TWl4aW5zOiBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciAmIHR5cGVvZiBOb3ZvRmlsZUlucHV0QmFzZSA9IG1peGluRXJyb3JTdGF0ZShOb3ZvRmlsZUlucHV0QmFzZSk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZmlsZS1pbnB1dCcsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTm92b0ZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE5vdm9GaWxlSW5wdXRFbGVtZW50IH1dLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgI2NvbnRhaW5lcj48L2Rpdj5cbiAgICA8bmctdGVtcGxhdGUgI2ZpbGVJbnB1dD5cbiAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLWlucHV0LWdyb3VwXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCIgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVcIj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgI2lucHV0RWxlbWVudFxuICAgICAgICAgICpuZ0lmPVwiIWxheW91dE9wdGlvbnMuY3VzdG9tQWN0aW9uc1wiXG4gICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgICAgIFthdHRyLmlkXT1cIm5hbWVcIlxuICAgICAgICAgIChjaGFuZ2UpPVwiY2hlY2soJGV2ZW50KVwiXG4gICAgICAgICAgW2F0dHIubXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgIFthdHRyLmRhdGEtZmVhdHVyZS1pZF09XCJkYXRhRmVhdHVyZUlkXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgI2lucHV0RWxlbWVudFxuICAgICAgICAgICpuZ0lmPVwibGF5b3V0T3B0aW9ucy5jdXN0b21BY3Rpb25zXCJcbiAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgW25hbWVdPVwibmFtZVwiXG4gICAgICAgICAgW2F0dHIuaWRdPVwibmFtZVwiXG4gICAgICAgICAgKGNoYW5nZSk9XCJjdXN0b21DaGVjaygkZXZlbnQpXCJcbiAgICAgICAgICBbYXR0ci5tdWx0aXBsZV09XCJtdWx0aXBsZVwiXG4gICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1mZWF0dXJlLWlkXT1cImRhdGFGZWF0dXJlSWRcIlxuICAgICAgICAvPlxuICAgICAgICA8c2VjdGlvbiBbbmdTd2l0Y2hdPVwibGF5b3V0T3B0aW9ucy5sYWJlbFN0eWxlXCI+XG4gICAgICAgICAgPGxhYmVsICpuZ1N3aXRjaENhc2U9XCInbm8tYm94J1wiIFthdHRyLmZvcl09XCJuYW1lXCIgY2xhc3M9XCJuby1ib3hcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWRyb3B6b25lXCI+PC9pPnt7IHBsYWNlaG9sZGVyIHx8IGxhYmVscy5jaG9vc2VBRmlsZSB9fSB7eyBsYWJlbHMub3IgfX1cbiAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzcz1cImxpbmtcIj57eyBsYWJlbHMuY2xpY2tUb0Jyb3dzZSB9fTwvc3Ryb25nPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8bGFiZWwgKm5nU3dpdGNoRGVmYXVsdCBbYXR0ci5mb3JdPVwibmFtZVwiIGNsYXNzPVwiYm94ZWRcIj5cbiAgICAgICAgICAgIDxzcGFuPnt7IHBsYWNlaG9sZGVyIHx8IGxhYmVscy5jaG9vc2VBRmlsZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzbWFsbFxuICAgICAgICAgICAgICA+e3sgbGFiZWxzLm9yIH19IDxzdHJvbmcgY2xhc3M9XCJsaW5rXCI+e3sgbGFiZWxzLmNsaWNrVG9Ccm93c2UgfX08L3N0cm9uZz48L3NtYWxsXG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2ZpbGVPdXRwdXQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmlsZS1vdXRwdXQtZ3JvdXBcIiBbZHJhZ3VsYV09XCJmaWxlT3V0cHV0QmFnXCIgW2RyYWd1bGFNb2RlbF09XCJmaWxlc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsZS1pdGVtXCIgKm5nRm9yPVwibGV0IGZpbGUgb2YgZmlsZXNcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICA8aSAqbmdJZj1cImxheW91dE9wdGlvbnMuZHJhZ2dhYmxlXCIgY2xhc3M9XCJiaGktbW92ZVwiPjwvaT5cbiAgICAgICAgICA8bGFiZWwgKm5nSWY9XCJmaWxlLmxpbmtcIlxuICAgICAgICAgICAgPjxzcGFuXG4gICAgICAgICAgICAgID48YSBocmVmPVwie3sgZmlsZS5saW5rIH19XCIgdGFyZ2V0PVwiX2JsYW5rXCI+e3sgZmlsZS5uYW1lIHwgZGVjb2RlVVJJIH19PC9hPjwvc3BhblxuICAgICAgICAgICAgPjxzcGFuICpuZ0lmPVwiZmlsZS5kZXNjcmlwdGlvblwiPnx8PC9zcGFuPjxzcGFuPnt7IGZpbGUuZGVzY3JpcHRpb24gfX08L3NwYW4+PC9sYWJlbFxuICAgICAgICAgID5cbiAgICAgICAgICA8bGFiZWwgKm5nSWY9XCIhZmlsZS5saW5rXCI+e3sgZmlsZS5uYW1lIHwgZGVjb2RlVVJJIH19PC9sYWJlbD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZmlsZS1hY3Rpb25zJ1wiICpuZ0lmPVwiZmlsZS5sb2FkZWRcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhbGF5b3V0T3B0aW9ucy5jdXN0b21BY3Rpb25zXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAqbmdJZj1cImxheW91dE9wdGlvbnMuZG93bmxvYWRcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgICAgICAgaWNvbj1cInNhdmVcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJkb3dubG9hZChmaWxlKVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWxlLWRvd25sb2FkJ1wiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgICAgID48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwiIWRpc2FibGVkICYmIChsYXlvdXRPcHRpb25zLnJlbW92YWJsZSB8fCAoIWxheW91dE9wdGlvbnMucmVtb3ZhYmxlICYmIGxheW91dE9wdGlvbnMucmVtb3ZhYmxlV2hlbk5ldyAmJiAhZmlsZS5saW5rKSlcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgICAgICAgaWNvbj1cImNsb3NlXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwicmVtb3ZlKGZpbGUpXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ2ZpbGUtcmVtb3ZlJ1wiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgICAgID48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImxheW91dE9wdGlvbnMuY3VzdG9tQWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJsYXlvdXRPcHRpb25zLmVkaXQgJiYgIWRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgICAgICAgIGljb249XCJlZGl0XCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiY3VzdG9tRWRpdChmaWxlKVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWxlLWVkaXQnXCJcbiAgICAgICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJsYXlvdXRPcHRpb25zLmRvd25sb2FkXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgICAgICAgIGljb249XCJzYXZlXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiY3VzdG9tU2F2ZShmaWxlKVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWxlLWRvd25sb2FkJ1wiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgICAgID48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwiIWRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgICAgICAgIGljb249XCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImN1c3RvbURlbGV0ZShmaWxlKVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWxlLXJlbW92ZSdcIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgICA+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8bm92by1sb2FkaW5nICpuZ0lmPVwiIWZpbGUubG9hZGVkXCI+PC9ub3ZvLWxvYWRpbmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbmAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9GaWxlSW5wdXRFbGVtZW50IGV4dGVuZHMgTm92b0ZpbGVJbnB1dE1peGlucyBpbXBsZW1lbnRzIE5vdm9GaWVsZENvbnRyb2w8YW55PiwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfdW5pcXVlSWQ6IHN0cmluZyA9IGBub3ZvLWZpbGUtaW5wdXQtJHsrK25leHRJZH1gO1xuICAvKiogVGhlIGFyaWEtZGVzY3JpYmVkYnkgYXR0cmlidXRlIG9uIHRoZSBjaGlwIGxpc3QgZm9yIGltcHJvdmVkIGExMXkuICovXG4gIF9hcmlhRGVzY3JpYmVkYnk6IHN0cmluZztcbiAgLyoqIFRhYiBpbmRleCBmb3IgdGhlIGNoaXAgbGlzdC4gKi9cbiAgX3RhYkluZGV4ID0gMDtcbiAgLyoqIFVzZXIgZGVmaW5lZCB0YWIgaW5kZXguICovXG4gIF91c2VyVGFiSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAvKiogVGhlIEZvY3VzS2V5TWFuYWdlciB3aGljaCBoYW5kbGVzIGZvY3VzLiAqL1xuICBfa2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPE5vdm9GaWxlSW5wdXRFbGVtZW50PjtcblxuICByZWFkb25seSBjb250cm9sVHlwZTogc3RyaW5nID0gJ2ZpbGUtaW5wdXQnO1xuICAvKiogQGRvY3MtcHJpdmF0ZSBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIGxhc3RLZXlWYWx1ZTogc3RyaW5nID0gbnVsbDtcbiAgLyoqIEBkb2NzLXByaXZhdGUgSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiovXG4gIGxhc3RDYXJldFBvc2l0aW9uOiBudW1iZXIgfCBudWxsO1xuXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG4gIC8qKiBBbiBvYmplY3QgdXNlZCB0byBjb250cm9sIHdoZW4gZXJyb3IgbWVzc2FnZXMgYXJlIHNob3duLiAqL1xuICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgLy8gLS0tLS0tLS0tLVxuICBAVmlld0NoaWxkKCdmaWxlSW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBmaWxlSW5wdXQ6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBWaWV3Q2hpbGQoJ2ZpbGVPdXRwdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBmaWxlT3V0cHV0OiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2lucHV0RWxlbWVudCcpIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICBASW5wdXQoKVxuICBtdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGxheW91dE9wdGlvbnM6IHtcbiAgICBvcmRlcj86IHN0cmluZztcbiAgICBkb3dubG9hZD86IGJvb2xlYW47XG4gICAgZWRpdD86IGJvb2xlYW47XG4gICAgbGFiZWxTdHlsZT86IHN0cmluZztcbiAgICBkcmFnZ2FibGU/OiBib29sZWFuO1xuICAgIGN1c3RvbUFjdGlvbnM6IGJvb2xlYW47XG4gICAgcmVtb3ZhYmxlPzogYm9vbGVhbjtcbiAgICBjdXN0b21WYWxpZGF0aW9uPzogeyBhY3Rpb246IHN0cmluZzsgZm46IEZ1bmN0aW9uIH1bXTtcbiAgICByZW1vdmFibGVXaGVuTmV3PzogYm9vbGVhbjtcbiAgfTtcbiAgQElucHV0KClcbiAgdmFsdWU6IEFycmF5PGFueT4gPSBbXTtcbiAgQElucHV0KClcbiAgZGF0YUZlYXR1cmVJZDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKVxuICBlZGl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHNhdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgZGVsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHVwbG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZWxlbWVudHM6IEFycmF5PGFueT4gPSBbXTtcbiAgZmlsZXM6IEFycmF5PGFueT4gPSBbXTtcbiAgbW9kZWw6IGFueTtcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIGNvbW1hbmRzOiBhbnk7XG4gIHZpc2libGU6IGJvb2xlYW47XG4gIHRhcmdldDogYW55O1xuICBmaWxlT3V0cHV0QmFnOiBzdHJpbmc7XG5cbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgQElucHV0KClcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc2FibGVkJylcbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5nQ29udHJvbCA/ICEhdGhpcy5uZ0NvbnRyb2wuZGlzYWJsZWQgOiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICB9XG4gIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBASW5wdXQoKVxuICBnZXQgcGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcGxhY2Vob2xkZXI7XG4gIH1cbiAgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgcHJvdGVjdGVkIF92YWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgX3JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByb3RlY3RlZCBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJvdGVjdGVkIF9wbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgZHJhZ3VsYTogTm92b0RyYWd1bGFTZXJ2aWNlLFxuICAgIF9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIEBPcHRpb25hbCgpIF9wYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgQE9wdGlvbmFsKCkgX3BhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgX25nQ29udHJvbDogTmdDb250cm9sLFxuICApIHtcbiAgICBzdXBlcihfZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLCBfcGFyZW50Rm9ybSwgX3BhcmVudEZvcm1Hcm91cCwgX25nQ29udHJvbCk7XG4gICAgaWYgKF9uZ0NvbnRyb2wpIHtcbiAgICAgIF9uZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgfVxuICAgIHRoaXMuY29tbWFuZHMgPSB7XG4gICAgICBkcmFnZW50ZXI6IHRoaXMuZHJhZ0VudGVySGFuZGxlci5iaW5kKHRoaXMpLFxuICAgICAgZHJhZ2xlYXZlOiB0aGlzLmRyYWdMZWF2ZUhhbmRsZXIuYmluZCh0aGlzKSxcbiAgICAgIGRyYWdvdmVyOiB0aGlzLmRyYWdPdmVySGFuZGxlci5iaW5kKHRoaXMpLFxuICAgICAgZHJvcDogdGhpcy5kcm9wSGFuZGxlci5iaW5kKHRoaXMpLFxuICAgIH07XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBbJ2RyYWdlbnRlcicsICdkcmFnbGVhdmUnLCAnZHJhZ292ZXInLCAnZHJvcCddLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5jb21tYW5kc1t0eXBlXSk7XG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGVMYXlvdXQoKTtcbiAgICB0aGlzLmluaXRpYWxpemVEcmFndWxhKCk7XG4gICAgdGhpcy5zZXRJbml0aWFsRmlsZUxpc3QoKTtcbiAgICB0aGlzLmRhdGFGZWF0dXJlSWQgPSB0aGlzLmRhdGFGZWF0dXJlSWQgPyB0aGlzLmRhdGFGZWF0dXJlSWQgOiB0aGlzLm5hbWU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBbJ2RyYWdlbnRlcicsICdkcmFnbGVhdmUnLCAnZHJhZ292ZXInLCAnZHJvcCddLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5jb21tYW5kc1t0eXBlXSk7XG4gICAgfSk7XG4gICAgY29uc3QgZHJhZ3VsYUhhc0ZpbGVPdXRwdXRCYWcgPVxuICAgICAgdGhpcy5kcmFndWxhLmJhZ3MubGVuZ3RoID4gMCAmJiB0aGlzLmRyYWd1bGEuYmFncy5maWx0ZXIoKHgpID0+IHgubmFtZSA9PT0gdGhpcy5maWxlT3V0cHV0QmFnKS5sZW5ndGggPiAwO1xuICAgIGlmIChkcmFndWxhSGFzRmlsZU91dHB1dEJhZykge1xuICAgICAgdGhpcy5kcmFndWxhLmRlc3Ryb3kodGhpcy5maWxlT3V0cHV0QmFnKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVMYXlvdXQoKSB7XG4gICAgdGhpcy5sYXlvdXRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgTEFZT1VUX0RFRkFVTFRTLCB0aGlzLmxheW91dE9wdGlvbnMpO1xuICAgIHRoaXMuaW5zZXJ0VGVtcGxhdGVzQmFzZWRPbkxheW91dCgpO1xuICB9XG5cbiAgaW5zZXJ0VGVtcGxhdGVzQmFzZWRPbkxheW91dCgpIHtcbiAgICBsZXQgb3JkZXI7XG4gICAgc3dpdGNoICh0aGlzLmxheW91dE9wdGlvbnMub3JkZXIpIHtcbiAgICAgIGNhc2UgJ2Rpc3BsYXlGaWxlc0JlbG93JzpcbiAgICAgICAgb3JkZXIgPSBbJ2ZpbGVJbnB1dCcsICdmaWxlT3V0cHV0J107XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgb3JkZXIgPSBbJ2ZpbGVPdXRwdXQnLCAnZmlsZUlucHV0J107XG4gICAgfVxuICAgIG9yZGVyLmZvckVhY2goKHRlbXBsYXRlKSA9PiB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpc1t0ZW1wbGF0ZV0sIDApO1xuICAgIH0pO1xuICAgIHJldHVybiBvcmRlcjtcbiAgfVxuXG4gIGluaXRpYWxpemVEcmFndWxhKCkge1xuICAgIHRoaXMuZmlsZU91dHB1dEJhZyA9IGBmaWxlLW91dHB1dC0ke3RoaXMuZHJhZ3VsYS5iYWdzLmxlbmd0aH1gO1xuICAgIHRoaXMuZHJhZ3VsYS5zZXRPcHRpb25zKHRoaXMuZmlsZU91dHB1dEJhZywge1xuICAgICAgbW92ZXM6IChlbCwgY29udGFpbmVyLCBoYW5kbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5b3V0T3B0aW9ucy5kcmFnZ2FibGU7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgc2V0SW5pdGlhbEZpbGVMaXN0KCkge1xuICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLmZpbGVzID0gdGhpcy52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBkcmFnRW50ZXJIYW5kbGVyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgICB0aGlzLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gIH1cblxuICBkcmFnTGVhdmVIYW5kbGVyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy50YXJnZXQgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIG5vLW9wXG4gIH1cblxuICBkcm9wSGFuZGxlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgaWYgKGV2ZW50LmRhdGFUcmFuc2Zlci50eXBlc1swXSAhPT0gJ0ZpbGVzJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zOiBhbnkgPSB0aGlzLmxheW91dE9wdGlvbnM7XG4gICAgY29uc3QgZmlsZWxpc3QgPSBBcnJheS5mcm9tKGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcyk7XG4gICAgaWYgKG9wdGlvbnMuY3VzdG9tQWN0aW9ucykge1xuICAgICAgdGhpcy51cGxvYWQuZW1pdCh0aGlzLm11bHRpcGxlID8gZmlsZWxpc3QgOiBbZmlsZWxpc3RbMF1dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9jZXNzKHRoaXMubXVsdGlwbGUgPyBmaWxlbGlzdCA6IFtmaWxlbGlzdFswXV0pO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIC8vIElmIG1vZGVsIGlzIGNsZWFyZWQgcHJvZ3JhbW1hdGljYWxseSAoRS5nLiBmb3JtLnBhdGNoVmFsdWUoe2ZpbGU6IHVuZGVmaW5lZH0pKSwgZW1wdHkgZmlsZSBsaXN0LlxuICAgIHRoaXMuZmlsZXMgPSAhbW9kZWwgPyBbXSA6IHRoaXMuZmlsZXM7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgY2hlY2soZXZlbnQpIHtcbiAgICB0aGlzLnByb2Nlc3MoQXJyYXkuZnJvbShldmVudC50YXJnZXQuZmlsZXMpKTtcbiAgICAvLyBBZnRlciBwcm9jZXNzaW5nIGZpbGUgdXBsb2FkLCBjbGVhciBpbnB1dCBlbGVtZW50IHZhbHVlLiBBbGxvd3MgZm9yIGRlbGV0ZSBhbmQgdXBsb2FkIG9mIHNhbWUgZmlsZS5cbiAgICBldmVudC50YXJnZXQudmFsdWUgPSAnJztcbiAgfVxuXG4gIHZhbGlkYXRlKGZpbGVzKTogYm9vbGVhbiB7XG4gICAgbGV0IHBhc3NlZFZhbGlkYXRpb24gPSB0cnVlO1xuICAgIGlmICh0aGlzLmxheW91dE9wdGlvbnMuY3VzdG9tVmFsaWRhdGlvbikge1xuICAgICAgdGhpcy5sYXlvdXRPcHRpb25zLmN1c3RvbVZhbGlkYXRpb25cbiAgICAgICAgLmZpbHRlcigodmFsaWRhdGlvbikgPT4gdmFsaWRhdGlvbi5hY3Rpb24gPT09ICd1cGxvYWQnKVxuICAgICAgICAuZm9yRWFjaCgodXBsb2FkVmFsaWRhdGlvbikgPT4ge1xuICAgICAgICAgIHBhc3NlZFZhbGlkYXRpb24gPSB1cGxvYWRWYWxpZGF0aW9uLmZuKGZpbGVzKSAmJiBwYXNzZWRWYWxpZGF0aW9uO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHBhc3NlZFZhbGlkYXRpb247XG4gIH1cblxuICBwcm9jZXNzKGZpbGVsaXN0KSB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGUoZmlsZWxpc3QpKSB7XG4gICAgICBQcm9taXNlLmFsbChmaWxlbGlzdC5tYXAoKGZpbGUpID0+IHRoaXMucmVhZEZpbGUoZmlsZSkpKS50aGVuKChmaWxlcykgPT4ge1xuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgIHRoaXMuZmlsZXMucHVzaCguLi5maWxlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLmZpbGVzO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5tb2RlbCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkb3dubG9hZChmaWxlKSB7XG4gICAgd2luZG93Lm9wZW4oZmlsZS5kYXRhVVJMLCAnX2JsYW5rJyk7XG4gIH1cblxuICByZW1vdmUoZmlsZSkge1xuICAgIHRoaXMuZmlsZXMuc3BsaWNlKFxuICAgICAgdGhpcy5maWxlcy5maW5kSW5kZXgoKGYpID0+IGYubmFtZSA9PT0gZmlsZS5uYW1lICYmIGYuc2l6ZSA9PT0gZmlsZS5zaXplKSxcbiAgICAgIDEsXG4gICAgKTtcbiAgICB0aGlzLm1vZGVsID0gdGhpcy5maWxlcztcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5tb2RlbCk7XG4gIH1cblxuICByZWFkRmlsZShmaWxlKSB7XG4gICAgcmV0dXJuIG5ldyBOb3ZvRmlsZShmaWxlKS5yZWFkKCk7XG4gIH1cblxuICBjdXN0b21FZGl0KGZpbGUpIHtcbiAgICB0aGlzLmVkaXQuZW1pdChmaWxlKTtcbiAgfVxuXG4gIGN1c3RvbVNhdmUoZmlsZSkge1xuICAgIHRoaXMuc2F2ZS5lbWl0KGZpbGUpO1xuICB9XG5cbiAgY3VzdG9tRGVsZXRlKGZpbGUpIHtcbiAgICB0aGlzLmRlbGV0ZS5lbWl0KGZpbGUpO1xuICB9XG5cbiAgY3VzdG9tQ2hlY2soZXZlbnQpIHtcbiAgICB0aGlzLnVwbG9hZC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICAvKiogV2hldGhlciBhbnkgcmFkaW8gYnV0dG9ucyBoYXMgZm9jdXMuICovXG4gIGdldCBmb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgIC8vIHRvZG86IGltcGxlbWVudCB0aGlzLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gbnVsbDtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIGdldCBzaG91bGRMYWJlbEZsb2F0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5lbXB0eSB8fCB0aGlzLmZvY3VzZWQ7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBzZXREZXNjcmliZWRCeUlkcyhpZHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fYXJpYURlc2NyaWJlZGJ5ID0gaWRzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIG9uQ29udGFpbmVyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgZmlyc3Qgbm9uLWRpc2FibGVkIGNoaXAgaW4gdGhpcyBjaGlwIGxpc3QsIG9yIHRoZSBhc3NvY2lhdGVkIGlucHV0IHdoZW4gdGhlcmVcbiAgICogYXJlIG5vIGVsaWdpYmxlIGNoaXBzLlxuICAgKi9cbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFRPRE9cbiAgfVxufVxuIl19