import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, HostBinding, Input, Optional, Output, Self, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { NovoDragulaService } from 'novo-elements/addons/dragula';
import { NovoLabelService } from 'novo-elements/services';
import { ErrorStateMatcher, mixinErrorState } from 'novo-elements/elements/common';
import { NovoFieldControl } from 'novo-elements/elements/field';
import { NovoFile } from './extras/file/File';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/addons/dragula";
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
  `, isInline: true, styles: ["novo-file-input{display:flex;flex-flow:row wrap}novo-file-input .files-below{padding-top:10px}novo-file-input .file-output-group{width:100%;margin-top:15px}novo-file-input .file-output-group .file-item{background-color:#fff;box-shadow:0 1px 4px #00000026,0 2px 10px #00000017;margin-bottom:15px;position:relative;display:flex;flex-flow:row nowrap;align-items:center;padding:4px 12px;width:100%}novo-file-input .file-output-group .file-item i.bhi-move{color:#9e9e9e;padding-right:.75em;padding-bottom:4px;font-size:2em;cursor:-webkit-grab;cursor:grab}novo-file-input .file-output-group .file-item label{flex:1;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}novo-file-input .file-output-group .file-item label span{margin:0 8px}novo-file-input .file-output-group .file-item button{font-size:1.4rem;width:42px;height:42px;padding:4px;color:#9e9e9e}novo-file-input .file-output-group .file-item button:hover,novo-file-input .file-output-group .file-item button:focus,novo-file-input .file-output-group .file-item button.active{background:none;color:#4a89dc}novo-file-input .file-output-group .file-item.disabled{box-shadow:none;border:2px dashed #9e9e9e}novo-file-input .file-input-group{cursor:pointer;width:100%;position:relative}novo-file-input .file-input-group input[type=file]{opacity:0;position:absolute;width:100%!important;height:100%!important;cursor:pointer}novo-file-input .file-input-group:hover label.boxed,novo-file-input .file-input-group.active label.boxed{border:2px dashed #4a89dc}novo-file-input .file-input-group.disabled{opacity:.3;pointer-events:none}novo-file-input .file-input-group label{color:#9e9e9e;margin-left:0;transition:all .2s ease-in-out;display:flex;flex-flow:column;align-items:center;position:relative;padding:15px;cursor:pointer;pointer-events:none}novo-file-input .file-input-group label strong{color:#4a89dc}novo-file-input .file-input-group label small{margin-top:7px}novo-file-input .file-input-group label i.bhi-dropzone{float:left;margin:-17px .25em 0 0}novo-file-input .file-input-group label.boxed{border:2px dashed #9e9e9e}novo-file-input .file-input-group label i{font-size:3em}novo-file-input novo-loading{padding:10px;transform:scale(.8)}.gu-mirror .actions button{display:none}\n"], components: [{ type: i5.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i6.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i7.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i7.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i2.NovoDragulaElement, selector: "[dragula]", inputs: ["dragula", "dragulaModel"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "decodeURI": i8.DecodeURIPipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFileInputElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-file-input', providers: [{ provide: NovoFieldControl, useExisting: NovoFileInputElement }], template: `
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
  `, encapsulation: ViewEncapsulation.None, styles: ["novo-file-input{display:flex;flex-flow:row wrap}novo-file-input .files-below{padding-top:10px}novo-file-input .file-output-group{width:100%;margin-top:15px}novo-file-input .file-output-group .file-item{background-color:#fff;box-shadow:0 1px 4px #00000026,0 2px 10px #00000017;margin-bottom:15px;position:relative;display:flex;flex-flow:row nowrap;align-items:center;padding:4px 12px;width:100%}novo-file-input .file-output-group .file-item i.bhi-move{color:#9e9e9e;padding-right:.75em;padding-bottom:4px;font-size:2em;cursor:-webkit-grab;cursor:grab}novo-file-input .file-output-group .file-item label{flex:1;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}novo-file-input .file-output-group .file-item label span{margin:0 8px}novo-file-input .file-output-group .file-item button{font-size:1.4rem;width:42px;height:42px;padding:4px;color:#9e9e9e}novo-file-input .file-output-group .file-item button:hover,novo-file-input .file-output-group .file-item button:focus,novo-file-input .file-output-group .file-item button.active{background:none;color:#4a89dc}novo-file-input .file-output-group .file-item.disabled{box-shadow:none;border:2px dashed #9e9e9e}novo-file-input .file-input-group{cursor:pointer;width:100%;position:relative}novo-file-input .file-input-group input[type=file]{opacity:0;position:absolute;width:100%!important;height:100%!important;cursor:pointer}novo-file-input .file-input-group:hover label.boxed,novo-file-input .file-input-group.active label.boxed{border:2px dashed #4a89dc}novo-file-input .file-input-group.disabled{opacity:.3;pointer-events:none}novo-file-input .file-input-group label{color:#9e9e9e;margin-left:0;transition:all .2s ease-in-out;display:flex;flex-flow:column;align-items:center;position:relative;padding:15px;cursor:pointer;pointer-events:none}novo-file-input .file-input-group label strong{color:#4a89dc}novo-file-input .file-input-group label small{margin-top:7px}novo-file-input .file-input-group label i.bhi-dropzone{float:left;margin:-17px .25em 0 0}novo-file-input .file-input-group label.boxed{border:2px dashed #9e9e9e}novo-file-input .file-input-group label i{font-size:3em}novo-file-input novo-loading{padding:10px;transform:scale(.8)}.gu-mirror .actions button{display:none}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUlucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZm9ybS9leHRyYXMvZmlsZS9GaWxlSW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixJQUFJLEVBQ0osV0FBVyxFQUNYLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0Isa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBMkIsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDNUcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7O0FBRTlDLHNEQUFzRDtBQUN0RCxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLHlEQUF5RDtBQUN6RCxpQkFBaUI7QUFDakIsS0FBSztBQUVMLE1BQU0sZUFBZSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDdkgsNkJB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O3NCQURQLEtBQUs7Z0JBV0YsUUFBUTtzQkFGWCxXQUFXO3VCQUFDLGdCQUFnQjs7c0JBQzVCLEtBQUs7Z0JBYUYsUUFBUTtzQkFEWCxLQUFLO2dCQVdGLFdBQVc7c0JBRGQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTZWxmLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0NvbnRyb2wsIE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9EcmFndWxhU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvYWRkb25zL2RyYWd1bGEnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IsIEVycm9yU3RhdGVNYXRjaGVyLCBtaXhpbkVycm9yU3RhdGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvRmllbGRDb250cm9sIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvRmlsZSB9IGZyb20gJy4vZXh0cmFzL2ZpbGUvRmlsZSc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuLy8gY29uc3QgRklMRV9WQUxVRV9BQ0NFU1NPUiA9IHtcbi8vICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4vLyAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9GaWxlSW5wdXRFbGVtZW50KSxcbi8vICAgbXVsdGk6IHRydWUsXG4vLyB9O1xuXG5jb25zdCBMQVlPVVRfREVGQVVMVFMgPSB7IG9yZGVyOiAnZGVmYXVsdCcsIGRvd25sb2FkOiB0cnVlLCByZW1vdmFibGU6IHRydWUsIGxhYmVsU3R5bGU6ICdkZWZhdWx0JywgZHJhZ2dhYmxlOiBmYWxzZSB9O1xuLy8gbWFrZSBmaWxlLWlucHV0IGlkcyB1bmlxdWVcbmxldCBuZXh0SWQgPSAwO1xuXG5jbGFzcyBOb3ZvRmlsZUlucHV0QmFzZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBfZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBwdWJsaWMgX3BhcmVudEZvcm06IE5nRm9ybSxcbiAgICBwdWJsaWMgX3BhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgKSB7fVxufVxuY29uc3QgTm92b0ZpbGVJbnB1dE1peGluczogQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJiB0eXBlb2YgTm92b0ZpbGVJbnB1dEJhc2UgPSBtaXhpbkVycm9yU3RhdGUoTm92b0ZpbGVJbnB1dEJhc2UpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWZpbGUtaW5wdXQnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5vdm9GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBOb3ZvRmlsZUlucHV0RWxlbWVudCB9XSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICNjb250YWluZXI+PC9kaXY+XG4gICAgPG5nLXRlbXBsYXRlICNmaWxlSW5wdXQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmlsZS1pbnB1dC1ncm91cFwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiIFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlXCI+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICNpbnB1dEVsZW1lbnRcbiAgICAgICAgICAqbmdJZj1cIiFsYXlvdXRPcHRpb25zLmN1c3RvbUFjdGlvbnNcIlxuICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICBbbmFtZV09XCJuYW1lXCJcbiAgICAgICAgICBbYXR0ci5pZF09XCJuYW1lXCJcbiAgICAgICAgICAoY2hhbmdlKT1cImNoZWNrKCRldmVudClcIlxuICAgICAgICAgIFthdHRyLm11bHRpcGxlXT1cIm11bHRpcGxlXCJcbiAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWZlYXR1cmUtaWRdPVwiZGF0YUZlYXR1cmVJZFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICNpbnB1dEVsZW1lbnRcbiAgICAgICAgICAqbmdJZj1cImxheW91dE9wdGlvbnMuY3VzdG9tQWN0aW9uc1wiXG4gICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgICAgIFthdHRyLmlkXT1cIm5hbWVcIlxuICAgICAgICAgIChjaGFuZ2UpPVwiY3VzdG9tQ2hlY2soJGV2ZW50KVwiXG4gICAgICAgICAgW2F0dHIubXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgIFthdHRyLmRhdGEtZmVhdHVyZS1pZF09XCJkYXRhRmVhdHVyZUlkXCJcbiAgICAgICAgLz5cbiAgICAgICAgPHNlY3Rpb24gW25nU3dpdGNoXT1cImxheW91dE9wdGlvbnMubGFiZWxTdHlsZVwiPlxuICAgICAgICAgIDxsYWJlbCAqbmdTd2l0Y2hDYXNlPVwiJ25vLWJveCdcIiBbYXR0ci5mb3JdPVwibmFtZVwiIGNsYXNzPVwibm8tYm94XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1kcm9wem9uZVwiPjwvaT57eyBwbGFjZWhvbGRlciB8fCBsYWJlbHMuY2hvb3NlQUZpbGUgfX0ge3sgbGFiZWxzLm9yIH19XG4gICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCJsaW5rXCI+e3sgbGFiZWxzLmNsaWNrVG9Ccm93c2UgfX08L3N0cm9uZz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGxhYmVsICpuZ1N3aXRjaERlZmF1bHQgW2F0dHIuZm9yXT1cIm5hbWVcIiBjbGFzcz1cImJveGVkXCI+XG4gICAgICAgICAgICA8c3Bhbj57eyBwbGFjZWhvbGRlciB8fCBsYWJlbHMuY2hvb3NlQUZpbGUgfX08L3NwYW4+XG4gICAgICAgICAgICA8c21hbGxcbiAgICAgICAgICAgICAgPnt7IGxhYmVscy5vciB9fSA8c3Ryb25nIGNsYXNzPVwibGlua1wiPnt7IGxhYmVscy5jbGlja1RvQnJvd3NlIH19PC9zdHJvbmc+PC9zbWFsbFxuICAgICAgICAgICAgPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNmaWxlT3V0cHV0PlxuICAgICAgPGRpdiBjbGFzcz1cImZpbGUtb3V0cHV0LWdyb3VwXCIgW2RyYWd1bGFdPVwiZmlsZU91dHB1dEJhZ1wiIFtkcmFndWxhTW9kZWxdPVwiZmlsZXNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbGUtaXRlbVwiICpuZ0Zvcj1cImxldCBmaWxlIG9mIGZpbGVzXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgPGkgKm5nSWY9XCJsYXlvdXRPcHRpb25zLmRyYWdnYWJsZVwiIGNsYXNzPVwiYmhpLW1vdmVcIj48L2k+XG4gICAgICAgICAgPGxhYmVsICpuZ0lmPVwiZmlsZS5saW5rXCJcbiAgICAgICAgICAgID48c3BhblxuICAgICAgICAgICAgICA+PGEgaHJlZj1cInt7IGZpbGUubGluayB9fVwiIHRhcmdldD1cIl9ibGFua1wiPnt7IGZpbGUubmFtZSB8IGRlY29kZVVSSSB9fTwvYT48L3NwYW5cbiAgICAgICAgICAgID48c3BhbiAqbmdJZj1cImZpbGUuZGVzY3JpcHRpb25cIj58fDwvc3Bhbj48c3Bhbj57eyBmaWxlLmRlc2NyaXB0aW9uIH19PC9zcGFuPjwvbGFiZWxcbiAgICAgICAgICA+XG4gICAgICAgICAgPGxhYmVsICpuZ0lmPVwiIWZpbGUubGlua1wiPnt7IGZpbGUubmFtZSB8IGRlY29kZVVSSSB9fTwvbGFiZWw+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ2ZpbGUtYWN0aW9ucydcIiAqbmdJZj1cImZpbGUubG9hZGVkXCI+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIWxheW91dE9wdGlvbnMuY3VzdG9tQWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJsYXlvdXRPcHRpb25zLmRvd25sb2FkXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgICAgICAgIGljb249XCJzYXZlXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiZG93bmxvYWQoZmlsZSlcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZmlsZS1kb3dubG9hZCdcIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgICA+PC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFkaXNhYmxlZCAmJiAobGF5b3V0T3B0aW9ucy5yZW1vdmFibGUgfHwgKCFsYXlvdXRPcHRpb25zLnJlbW92YWJsZSAmJiBsYXlvdXRPcHRpb25zLnJlbW92YWJsZVdoZW5OZXcgJiYgIWZpbGUubGluaykpXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgICAgICAgIGljb249XCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInJlbW92ZShmaWxlKVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWxlLXJlbW92ZSdcIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgICA+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJsYXlvdXRPcHRpb25zLmN1c3RvbUFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwibGF5b3V0T3B0aW9ucy5lZGl0ICYmICFkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICAgICAgICBpY29uPVwiZWRpdFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImN1c3RvbUVkaXQoZmlsZSlcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZmlsZS1lZGl0J1wiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgICAgID48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwibGF5b3V0T3B0aW9ucy5kb3dubG9hZFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICAgICAgICBpY29uPVwic2F2ZVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImN1c3RvbVNhdmUoZmlsZSlcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZmlsZS1kb3dubG9hZCdcIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgICA+PC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICAgICAgICBpY29uPVwiY2xvc2VcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjdXN0b21EZWxldGUoZmlsZSlcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZmlsZS1yZW1vdmUnXCJcbiAgICAgICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPG5vdm8tbG9hZGluZyAqbmdJZj1cIiFmaWxlLmxvYWRlZFwiPjwvbm92by1sb2FkaW5nPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL0ZpbGVJbnB1dC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9GaWxlSW5wdXRFbGVtZW50IGV4dGVuZHMgTm92b0ZpbGVJbnB1dE1peGlucyBpbXBsZW1lbnRzIE5vdm9GaWVsZENvbnRyb2w8YW55PiwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfdW5pcXVlSWQ6IHN0cmluZyA9IGBub3ZvLWZpbGUtaW5wdXQtJHsrK25leHRJZH1gO1xuICAvKiogVGhlIGFyaWEtZGVzY3JpYmVkYnkgYXR0cmlidXRlIG9uIHRoZSBjaGlwIGxpc3QgZm9yIGltcHJvdmVkIGExMXkuICovXG4gIF9hcmlhRGVzY3JpYmVkYnk6IHN0cmluZztcbiAgLyoqIFRhYiBpbmRleCBmb3IgdGhlIGNoaXAgbGlzdC4gKi9cbiAgX3RhYkluZGV4ID0gMDtcbiAgLyoqIFVzZXIgZGVmaW5lZCB0YWIgaW5kZXguICovXG4gIF91c2VyVGFiSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAvKiogVGhlIEZvY3VzS2V5TWFuYWdlciB3aGljaCBoYW5kbGVzIGZvY3VzLiAqL1xuICBfa2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPE5vdm9GaWxlSW5wdXRFbGVtZW50PjtcblxuICByZWFkb25seSBjb250cm9sVHlwZTogc3RyaW5nID0gJ2ZpbGUtaW5wdXQnO1xuICAvKiogQGRvY3MtcHJpdmF0ZSBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIGxhc3RLZXlWYWx1ZTogc3RyaW5nID0gbnVsbDtcbiAgLyoqIEBkb2NzLXByaXZhdGUgSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiovXG4gIGxhc3RDYXJldFBvc2l0aW9uOiBudW1iZXIgfCBudWxsO1xuXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG4gIC8qKiBBbiBvYmplY3QgdXNlZCB0byBjb250cm9sIHdoZW4gZXJyb3IgbWVzc2FnZXMgYXJlIHNob3duLiAqL1xuICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgLy8gLS0tLS0tLS0tLVxuICBAVmlld0NoaWxkKCdmaWxlSW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBmaWxlSW5wdXQ6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBWaWV3Q2hpbGQoJ2ZpbGVPdXRwdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBmaWxlT3V0cHV0OiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2lucHV0RWxlbWVudCcpIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICBASW5wdXQoKVxuICBtdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGxheW91dE9wdGlvbnM6IHtcbiAgICBvcmRlcj86IHN0cmluZztcbiAgICBkb3dubG9hZD86IGJvb2xlYW47XG4gICAgZWRpdD86IGJvb2xlYW47XG4gICAgbGFiZWxTdHlsZT86IHN0cmluZztcbiAgICBkcmFnZ2FibGU/OiBib29sZWFuO1xuICAgIGN1c3RvbUFjdGlvbnM6IGJvb2xlYW47XG4gICAgcmVtb3ZhYmxlPzogYm9vbGVhbjtcbiAgICBjdXN0b21WYWxpZGF0aW9uPzogeyBhY3Rpb246IHN0cmluZzsgZm46IEZ1bmN0aW9uIH1bXTtcbiAgICByZW1vdmFibGVXaGVuTmV3PzogYm9vbGVhbjtcbiAgfTtcbiAgQElucHV0KClcbiAgdmFsdWU6IEFycmF5PGFueT4gPSBbXTtcbiAgQElucHV0KClcbiAgZGF0YUZlYXR1cmVJZDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKVxuICBlZGl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHNhdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgZGVsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHVwbG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZWxlbWVudHM6IEFycmF5PGFueT4gPSBbXTtcbiAgZmlsZXM6IEFycmF5PGFueT4gPSBbXTtcbiAgbW9kZWw6IGFueTtcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIGNvbW1hbmRzOiBhbnk7XG4gIHZpc2libGU6IGJvb2xlYW47XG4gIHRhcmdldDogYW55O1xuICBmaWxlT3V0cHV0QmFnOiBzdHJpbmc7XG5cbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgQElucHV0KClcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc2FibGVkJylcbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5nQ29udHJvbCA/ICEhdGhpcy5uZ0NvbnRyb2wuZGlzYWJsZWQgOiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICB9XG4gIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBASW5wdXQoKVxuICBnZXQgcGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcGxhY2Vob2xkZXI7XG4gIH1cbiAgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgcHJvdGVjdGVkIF92YWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgX3JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByb3RlY3RlZCBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJvdGVjdGVkIF9wbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgZHJhZ3VsYTogTm92b0RyYWd1bGFTZXJ2aWNlLFxuICAgIF9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIEBPcHRpb25hbCgpIF9wYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgQE9wdGlvbmFsKCkgX3BhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgX25nQ29udHJvbDogTmdDb250cm9sLFxuICApIHtcbiAgICBzdXBlcihfZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLCBfcGFyZW50Rm9ybSwgX3BhcmVudEZvcm1Hcm91cCwgX25nQ29udHJvbCk7XG4gICAgaWYgKF9uZ0NvbnRyb2wpIHtcbiAgICAgIF9uZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgfVxuICAgIHRoaXMuY29tbWFuZHMgPSB7XG4gICAgICBkcmFnZW50ZXI6IHRoaXMuZHJhZ0VudGVySGFuZGxlci5iaW5kKHRoaXMpLFxuICAgICAgZHJhZ2xlYXZlOiB0aGlzLmRyYWdMZWF2ZUhhbmRsZXIuYmluZCh0aGlzKSxcbiAgICAgIGRyYWdvdmVyOiB0aGlzLmRyYWdPdmVySGFuZGxlci5iaW5kKHRoaXMpLFxuICAgICAgZHJvcDogdGhpcy5kcm9wSGFuZGxlci5iaW5kKHRoaXMpLFxuICAgIH07XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBbJ2RyYWdlbnRlcicsICdkcmFnbGVhdmUnLCAnZHJhZ292ZXInLCAnZHJvcCddLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5jb21tYW5kc1t0eXBlXSk7XG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGVMYXlvdXQoKTtcbiAgICB0aGlzLmluaXRpYWxpemVEcmFndWxhKCk7XG4gICAgdGhpcy5zZXRJbml0aWFsRmlsZUxpc3QoKTtcbiAgICB0aGlzLmRhdGFGZWF0dXJlSWQgPSB0aGlzLmRhdGFGZWF0dXJlSWQgPyB0aGlzLmRhdGFGZWF0dXJlSWQgOiB0aGlzLm5hbWU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBbJ2RyYWdlbnRlcicsICdkcmFnbGVhdmUnLCAnZHJhZ292ZXInLCAnZHJvcCddLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5jb21tYW5kc1t0eXBlXSk7XG4gICAgfSk7XG4gICAgY29uc3QgZHJhZ3VsYUhhc0ZpbGVPdXRwdXRCYWcgPVxuICAgICAgdGhpcy5kcmFndWxhLmJhZ3MubGVuZ3RoID4gMCAmJiB0aGlzLmRyYWd1bGEuYmFncy5maWx0ZXIoKHgpID0+IHgubmFtZSA9PT0gdGhpcy5maWxlT3V0cHV0QmFnKS5sZW5ndGggPiAwO1xuICAgIGlmIChkcmFndWxhSGFzRmlsZU91dHB1dEJhZykge1xuICAgICAgdGhpcy5kcmFndWxhLmRlc3Ryb3kodGhpcy5maWxlT3V0cHV0QmFnKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVMYXlvdXQoKSB7XG4gICAgdGhpcy5sYXlvdXRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgTEFZT1VUX0RFRkFVTFRTLCB0aGlzLmxheW91dE9wdGlvbnMpO1xuICAgIHRoaXMuaW5zZXJ0VGVtcGxhdGVzQmFzZWRPbkxheW91dCgpO1xuICB9XG5cbiAgaW5zZXJ0VGVtcGxhdGVzQmFzZWRPbkxheW91dCgpIHtcbiAgICBsZXQgb3JkZXI7XG4gICAgc3dpdGNoICh0aGlzLmxheW91dE9wdGlvbnMub3JkZXIpIHtcbiAgICAgIGNhc2UgJ2Rpc3BsYXlGaWxlc0JlbG93JzpcbiAgICAgICAgb3JkZXIgPSBbJ2ZpbGVJbnB1dCcsICdmaWxlT3V0cHV0J107XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgb3JkZXIgPSBbJ2ZpbGVPdXRwdXQnLCAnZmlsZUlucHV0J107XG4gICAgfVxuICAgIG9yZGVyLmZvckVhY2goKHRlbXBsYXRlKSA9PiB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpc1t0ZW1wbGF0ZV0sIDApO1xuICAgIH0pO1xuICAgIHJldHVybiBvcmRlcjtcbiAgfVxuXG4gIGluaXRpYWxpemVEcmFndWxhKCkge1xuICAgIHRoaXMuZmlsZU91dHB1dEJhZyA9IGBmaWxlLW91dHB1dC0ke3RoaXMuZHJhZ3VsYS5iYWdzLmxlbmd0aH1gO1xuICAgIHRoaXMuZHJhZ3VsYS5zZXRPcHRpb25zKHRoaXMuZmlsZU91dHB1dEJhZywge1xuICAgICAgbW92ZXM6IChlbCwgY29udGFpbmVyLCBoYW5kbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5b3V0T3B0aW9ucy5kcmFnZ2FibGU7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgc2V0SW5pdGlhbEZpbGVMaXN0KCkge1xuICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLmZpbGVzID0gdGhpcy52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBkcmFnRW50ZXJIYW5kbGVyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgICB0aGlzLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gIH1cblxuICBkcmFnTGVhdmVIYW5kbGVyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy50YXJnZXQgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIG5vLW9wXG4gIH1cblxuICBkcm9wSGFuZGxlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgaWYgKGV2ZW50LmRhdGFUcmFuc2Zlci50eXBlc1swXSAhPT0gJ0ZpbGVzJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zOiBhbnkgPSB0aGlzLmxheW91dE9wdGlvbnM7XG4gICAgY29uc3QgZmlsZWxpc3QgPSBBcnJheS5mcm9tKGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcyk7XG4gICAgaWYgKG9wdGlvbnMuY3VzdG9tQWN0aW9ucykge1xuICAgICAgdGhpcy51cGxvYWQuZW1pdCh0aGlzLm11bHRpcGxlID8gZmlsZWxpc3QgOiBbZmlsZWxpc3RbMF1dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9jZXNzKHRoaXMubXVsdGlwbGUgPyBmaWxlbGlzdCA6IFtmaWxlbGlzdFswXV0pO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIC8vIElmIG1vZGVsIGlzIGNsZWFyZWQgcHJvZ3JhbW1hdGljYWxseSAoRS5nLiBmb3JtLnBhdGNoVmFsdWUoe2ZpbGU6IHVuZGVmaW5lZH0pKSwgZW1wdHkgZmlsZSBsaXN0LlxuICAgIHRoaXMuZmlsZXMgPSAhbW9kZWwgPyBbXSA6IHRoaXMuZmlsZXM7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgY2hlY2soZXZlbnQpIHtcbiAgICB0aGlzLnByb2Nlc3MoQXJyYXkuZnJvbShldmVudC50YXJnZXQuZmlsZXMpKTtcbiAgICAvLyBBZnRlciBwcm9jZXNzaW5nIGZpbGUgdXBsb2FkLCBjbGVhciBpbnB1dCBlbGVtZW50IHZhbHVlLiBBbGxvd3MgZm9yIGRlbGV0ZSBhbmQgdXBsb2FkIG9mIHNhbWUgZmlsZS5cbiAgICBldmVudC50YXJnZXQudmFsdWUgPSAnJztcbiAgfVxuXG4gIHZhbGlkYXRlKGZpbGVzKTogYm9vbGVhbiB7XG4gICAgbGV0IHBhc3NlZFZhbGlkYXRpb24gPSB0cnVlO1xuICAgIGlmICh0aGlzLmxheW91dE9wdGlvbnMuY3VzdG9tVmFsaWRhdGlvbikge1xuICAgICAgdGhpcy5sYXlvdXRPcHRpb25zLmN1c3RvbVZhbGlkYXRpb25cbiAgICAgICAgLmZpbHRlcigodmFsaWRhdGlvbikgPT4gdmFsaWRhdGlvbi5hY3Rpb24gPT09ICd1cGxvYWQnKVxuICAgICAgICAuZm9yRWFjaCgodXBsb2FkVmFsaWRhdGlvbikgPT4ge1xuICAgICAgICAgIHBhc3NlZFZhbGlkYXRpb24gPSB1cGxvYWRWYWxpZGF0aW9uLmZuKGZpbGVzKSAmJiBwYXNzZWRWYWxpZGF0aW9uO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHBhc3NlZFZhbGlkYXRpb247XG4gIH1cblxuICBwcm9jZXNzKGZpbGVsaXN0KSB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGUoZmlsZWxpc3QpKSB7XG4gICAgICBQcm9taXNlLmFsbChmaWxlbGlzdC5tYXAoKGZpbGUpID0+IHRoaXMucmVhZEZpbGUoZmlsZSkpKS50aGVuKChmaWxlcykgPT4ge1xuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgIHRoaXMuZmlsZXMucHVzaCguLi5maWxlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLmZpbGVzO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5tb2RlbCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkb3dubG9hZChmaWxlKSB7XG4gICAgd2luZG93Lm9wZW4oZmlsZS5kYXRhVVJMLCAnX2JsYW5rJyk7XG4gIH1cblxuICByZW1vdmUoZmlsZSkge1xuICAgIHRoaXMuZmlsZXMuc3BsaWNlKFxuICAgICAgdGhpcy5maWxlcy5maW5kSW5kZXgoKGYpID0+IGYubmFtZSA9PT0gZmlsZS5uYW1lICYmIGYuc2l6ZSA9PT0gZmlsZS5zaXplKSxcbiAgICAgIDEsXG4gICAgKTtcbiAgICB0aGlzLm1vZGVsID0gdGhpcy5maWxlcztcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5tb2RlbCk7XG4gIH1cblxuICByZWFkRmlsZShmaWxlKSB7XG4gICAgcmV0dXJuIG5ldyBOb3ZvRmlsZShmaWxlKS5yZWFkKCk7XG4gIH1cblxuICBjdXN0b21FZGl0KGZpbGUpIHtcbiAgICB0aGlzLmVkaXQuZW1pdChmaWxlKTtcbiAgfVxuXG4gIGN1c3RvbVNhdmUoZmlsZSkge1xuICAgIHRoaXMuc2F2ZS5lbWl0KGZpbGUpO1xuICB9XG5cbiAgY3VzdG9tRGVsZXRlKGZpbGUpIHtcbiAgICB0aGlzLmRlbGV0ZS5lbWl0KGZpbGUpO1xuICB9XG5cbiAgY3VzdG9tQ2hlY2soZXZlbnQpIHtcbiAgICB0aGlzLnVwbG9hZC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICAvKiogV2hldGhlciBhbnkgcmFkaW8gYnV0dG9ucyBoYXMgZm9jdXMuICovXG4gIGdldCBmb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgIC8vIHRvZG86IGltcGxlbWVudCB0aGlzLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gbnVsbDtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIGdldCBzaG91bGRMYWJlbEZsb2F0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5lbXB0eSB8fCB0aGlzLmZvY3VzZWQ7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBzZXREZXNjcmliZWRCeUlkcyhpZHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fYXJpYURlc2NyaWJlZGJ5ID0gaWRzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIG9uQ29udGFpbmVyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgZmlyc3Qgbm9uLWRpc2FibGVkIGNoaXAgaW4gdGhpcyBjaGlwIGxpc3QsIG9yIHRoZSBhc3NvY2lhdGVkIGlucHV0IHdoZW4gdGhlcmVcbiAgICogYXJlIG5vIGVsaWdpYmxlIGNoaXBzLlxuICAgKi9cbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFRPRE9cbiAgfVxufVxuIl19