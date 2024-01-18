import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Optional, Output, Self, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, mixinErrorState } from 'novo-elements/elements/common';
import { NovoFieldControl } from 'novo-elements/elements/field';
import { GlobalRef, NovoLabelService } from 'novo-elements/services';
import { NovoFile } from './extras/file/File';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/common";
import * as i3 from "@angular/forms";
import * as i4 from "novo-elements/elements/button";
import * as i5 from "novo-elements/elements/loading";
import * as i6 from "@angular/common";
import * as i7 from "@angular/cdk/drag-drop";
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
    constructor(labels, globalRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, _ngControl) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, _ngControl);
        this.labels = labels;
        this.globalRef = globalRef;
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
        this.updateLayout();
        this.setInitialFileList();
        this.dataFeatureId = this.dataFeatureId ? this.dataFeatureId : this.name;
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
    get outputFileDraggingDisabled() {
        const draggable = this.layoutOptions?.draggable;
        return draggable != null && !draggable;
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
    dropOutputItem(event) {
        moveItemInArray(this.files, event.previousIndex, event.currentIndex);
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
        // Using an injected instance of window to make sure that unit tests do not open a new window, even accidentally
        this.globalRef.nativeWindow.open(file.dataURL, '_blank');
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
NovoFileInputElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFileInputElement, deps: [{ token: i1.NovoLabelService }, { token: i1.GlobalRef }, { token: i2.ErrorStateMatcher }, { token: i3.NgForm, optional: true }, { token: i3.FormGroupDirective, optional: true }, { token: i3.NgControl, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Component });
NovoFileInputElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoFileInputElement, selector: "novo-file-input", inputs: { id: "id", tabindex: "tabindex", errorStateMatcher: "errorStateMatcher", multiple: "multiple", layoutOptions: "layoutOptions", value: "value", dataFeatureId: "dataFeatureId", name: "name", disabled: "disabled", required: "required", placeholder: "placeholder" }, outputs: { edit: "edit", save: "save", delete: "delete", upload: "upload" }, host: { listeners: { "dragenter": "dragEnterHandler($event)", "dragleave": "dragLeaveHandler($event)", "dragover": "dragOverHandler($event)", "drop": "dropHandler($event)" }, properties: { "class.disabled": "this.disabled" } }, providers: [{ provide: NovoFieldControl, useExisting: NovoFileInputElement }], viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true, static: true }, { propertyName: "fileOutput", first: true, predicate: ["fileOutput"], descendants: true, static: true }, { propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "inputElement", first: true, predicate: ["inputElement"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<div #container></div>\n<ng-template #fileInput>\n  <div class=\"file-input-group\" [class.disabled]=\"disabled\" [class.active]=\"active\">\n    <input\n      #inputElement\n      *ngIf=\"!layoutOptions.customActions\"\n      type=\"file\"\n      [name]=\"name\"\n      [attr.id]=\"name\"\n      (change)=\"check($event)\"\n      [attr.multiple]=\"multiple\"\n      tabindex=\"-1\"\n      [attr.data-feature-id]=\"dataFeatureId\"\n    />\n    <input\n      #inputElement\n      *ngIf=\"layoutOptions.customActions\"\n      type=\"file\"\n      [name]=\"name\"\n      [attr.id]=\"name\"\n      (change)=\"customCheck($event)\"\n      [attr.multiple]=\"multiple\"\n      tabindex=\"-1\"\n      [attr.data-feature-id]=\"dataFeatureId\"\n    />\n    <section [ngSwitch]=\"layoutOptions.labelStyle\">\n      <label *ngSwitchCase=\"'no-box'\" [attr.for]=\"name\" class=\"no-box\">\n        <div>\n          <i class=\"bhi-dropzone\"></i>{{ placeholder || labels.chooseAFile }} {{ labels.or }}\n          <strong class=\"link\">{{ labels.clickToBrowse }}</strong>\n        </div>\n      </label>\n      <label *ngSwitchDefault [attr.for]=\"name\" class=\"boxed\">\n        <span>{{ placeholder || labels.chooseAFile }}</span>\n        <small\n          >{{ labels.or }} <strong class=\"link\">{{ labels.clickToBrowse }}</strong></small\n        >\n      </label>\n    </section>\n  </div>\n</ng-template>\n<ng-template #fileOutput>\n  <div class=\"file-output-group\" cdkDropList [cdkDropListDisabled]=\"outputFileDraggingDisabled\" (cdkDropListDropped)=\"dropOutputItem($event)\">\n    <div class=\"file-item\" cdkDrag *ngFor=\"let file of files\" [class.disabled]=\"disabled\">\n      <i *ngIf=\"layoutOptions.draggable\" class=\"bhi-move\"></i>\n      <label *ngIf=\"file.link\"\n        ><span\n          ><a href=\"{{ file.link }}\" target=\"_blank\">{{ file.name | decodeURI }}</a></span\n        ><span *ngIf=\"file.description\">||</span><span>{{ file.description }}</span></label\n      >\n      <label *ngIf=\"!file.link\">{{ file.name | decodeURI }}</label>\n      <div class=\"actions\" [attr.data-automation-id]=\"'file-actions'\" *ngIf=\"file.loaded\">\n        <div *ngIf=\"!layoutOptions.customActions\">\n          <button\n            *ngIf=\"layoutOptions.download\"\n            type=\"button\"\n            theme=\"icon\"\n            icon=\"save\"\n            (click)=\"download(file)\"\n            [attr.data-automation-id]=\"'file-download'\"\n            tabindex=\"-1\"\n          ></button>\n          <button\n            *ngIf=\"!disabled && (layoutOptions.removable || (!layoutOptions.removable && layoutOptions.removableWhenNew && !file.link))\"\n            type=\"button\"\n            theme=\"icon\"\n            icon=\"close\"\n            (click)=\"remove(file)\"\n            [attr.data-automation-id]=\"'file-remove'\"\n            tabindex=\"-1\"\n          ></button>\n        </div>\n        <div *ngIf=\"layoutOptions.customActions\">\n          <button\n            *ngIf=\"layoutOptions.edit && !disabled\"\n            type=\"button\"\n            theme=\"icon\"\n            icon=\"edit\"\n            (click)=\"customEdit(file)\"\n            [attr.data-automation-id]=\"'file-edit'\"\n            tabindex=\"-1\"\n          ></button>\n          <button\n            *ngIf=\"layoutOptions.download\"\n            type=\"button\"\n            theme=\"icon\"\n            icon=\"save\"\n            (click)=\"customSave(file)\"\n            [attr.data-automation-id]=\"'file-download'\"\n            tabindex=\"-1\"\n          ></button>\n          <button\n            *ngIf=\"!disabled\"\n            type=\"button\"\n            theme=\"icon\"\n            icon=\"close\"\n            (click)=\"customDelete(file)\"\n            [attr.data-automation-id]=\"'file-remove'\"\n            tabindex=\"-1\"\n          ></button>\n        </div>\n      </div>\n      <novo-loading *ngIf=\"!file.loaded\"></novo-loading>\n    </div>\n  </div>\n</ng-template>", styles: ["novo-file-input{display:flex;flex-flow:row wrap}novo-file-input .files-below{padding-top:10px}novo-file-input .file-output-group{width:100%;margin-top:15px}novo-file-input .file-output-group .file-item{background-color:#fff;box-shadow:0 1px 4px #00000026,0 2px 10px #00000017;padding:4px 12px;display:flex;flex-flow:row nowrap;align-items:center;margin-bottom:15px;position:relative;width:100%}novo-file-input .file-output-group .file-item i.bhi-move{color:#9e9e9e;padding-right:.75em;padding-bottom:4px;font-size:2em;cursor:-webkit-grab;cursor:grab}novo-file-input .file-output-group .file-item label{flex:1;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}novo-file-input .file-output-group .file-item label span{margin:0 8px}novo-file-input .file-output-group .file-item button{font-size:1.4rem;width:42px;height:42px;padding:4px;color:#9e9e9e}novo-file-input .file-output-group .file-item button:hover,novo-file-input .file-output-group .file-item button:focus,novo-file-input .file-output-group .file-item button.active{background:none;color:#4a89dc}novo-file-input .file-output-group .file-item.disabled{box-shadow:none;border:2px dashed #9e9e9e}novo-file-input .file-output-group.cdk-drop-list-dragging{cursor:-webkit-grabbing;cursor:grabbing}novo-file-input .file-output-group.cdk-drop-list-dragging .file-item{transition:transform .25s cubic-bezier(0,0,.2,1)}novo-file-input .file-input-group{cursor:pointer;width:100%;position:relative}novo-file-input .file-input-group input[type=file]{opacity:0;position:absolute;width:100%!important;height:100%!important;cursor:pointer}novo-file-input .file-input-group:hover label.boxed,novo-file-input .file-input-group.active label.boxed{border:2px dashed #4a89dc}novo-file-input .file-input-group.disabled{opacity:.3;pointer-events:none}novo-file-input .file-input-group label{color:#9e9e9e;margin-left:0;transition:all .2s ease-in-out;display:flex;flex-flow:column;align-items:center;position:relative;padding:15px;cursor:pointer;pointer-events:none}novo-file-input .file-input-group label strong{color:#4a89dc}novo-file-input .file-input-group label small{margin-top:7px}novo-file-input .file-input-group label i.bhi-dropzone{float:left;margin:-17px .25em 0 0}novo-file-input .file-input-group label.boxed{border:2px dashed #9e9e9e}novo-file-input .file-input-group label i{font-size:3em}novo-file-input novo-loading{padding:10px;transform:scale(.8)}.gu-mirror .actions button{display:none}.cdk-drag-preview.file-item{cursor:-webkit-grab;cursor:grab;background-color:#fff;box-shadow:0 1px 4px #00000026,0 2px 10px #00000017;padding:4px 12px;display:flex;flex-flow:row nowrap;align-items:center}.cdk-drag-preview.file-item i.bhi-move{color:#9e9e9e;padding-right:.75em;padding-bottom:4px;font-size:2em;cursor:-webkit-grab;cursor:grab}.cdk-drag-preview.file-item label{flex:1;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.cdk-drag-preview.file-item label span{margin:0 8px}.cdk-drag-preview.file-item button{font-size:1.4rem;width:42px;height:42px;padding:4px;color:#9e9e9e}.cdk-drag-placeholder.file-item{opacity:0}.cdk-drag-animating.file-item{transition:transform .25s cubic-bezier(0,0,.2,1)}\n"], components: [{ type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i6.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i6.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i7.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "cdkDropListData", "cdkDropListOrientation", "id", "cdkDropListLockAxis", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListAutoScrollDisabled", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }], pipes: { "decodeURI": i8.DecodeURIPipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFileInputElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-file-input', providers: [{ provide: NovoFieldControl, useExisting: NovoFileInputElement }], encapsulation: ViewEncapsulation.None, template: "<div #container></div>\n<ng-template #fileInput>\n  <div class=\"file-input-group\" [class.disabled]=\"disabled\" [class.active]=\"active\">\n    <input\n      #inputElement\n      *ngIf=\"!layoutOptions.customActions\"\n      type=\"file\"\n      [name]=\"name\"\n      [attr.id]=\"name\"\n      (change)=\"check($event)\"\n      [attr.multiple]=\"multiple\"\n      tabindex=\"-1\"\n      [attr.data-feature-id]=\"dataFeatureId\"\n    />\n    <input\n      #inputElement\n      *ngIf=\"layoutOptions.customActions\"\n      type=\"file\"\n      [name]=\"name\"\n      [attr.id]=\"name\"\n      (change)=\"customCheck($event)\"\n      [attr.multiple]=\"multiple\"\n      tabindex=\"-1\"\n      [attr.data-feature-id]=\"dataFeatureId\"\n    />\n    <section [ngSwitch]=\"layoutOptions.labelStyle\">\n      <label *ngSwitchCase=\"'no-box'\" [attr.for]=\"name\" class=\"no-box\">\n        <div>\n          <i class=\"bhi-dropzone\"></i>{{ placeholder || labels.chooseAFile }} {{ labels.or }}\n          <strong class=\"link\">{{ labels.clickToBrowse }}</strong>\n        </div>\n      </label>\n      <label *ngSwitchDefault [attr.for]=\"name\" class=\"boxed\">\n        <span>{{ placeholder || labels.chooseAFile }}</span>\n        <small\n          >{{ labels.or }} <strong class=\"link\">{{ labels.clickToBrowse }}</strong></small\n        >\n      </label>\n    </section>\n  </div>\n</ng-template>\n<ng-template #fileOutput>\n  <div class=\"file-output-group\" cdkDropList [cdkDropListDisabled]=\"outputFileDraggingDisabled\" (cdkDropListDropped)=\"dropOutputItem($event)\">\n    <div class=\"file-item\" cdkDrag *ngFor=\"let file of files\" [class.disabled]=\"disabled\">\n      <i *ngIf=\"layoutOptions.draggable\" class=\"bhi-move\"></i>\n      <label *ngIf=\"file.link\"\n        ><span\n          ><a href=\"{{ file.link }}\" target=\"_blank\">{{ file.name | decodeURI }}</a></span\n        ><span *ngIf=\"file.description\">||</span><span>{{ file.description }}</span></label\n      >\n      <label *ngIf=\"!file.link\">{{ file.name | decodeURI }}</label>\n      <div class=\"actions\" [attr.data-automation-id]=\"'file-actions'\" *ngIf=\"file.loaded\">\n        <div *ngIf=\"!layoutOptions.customActions\">\n          <button\n            *ngIf=\"layoutOptions.download\"\n            type=\"button\"\n            theme=\"icon\"\n            icon=\"save\"\n            (click)=\"download(file)\"\n            [attr.data-automation-id]=\"'file-download'\"\n            tabindex=\"-1\"\n          ></button>\n          <button\n            *ngIf=\"!disabled && (layoutOptions.removable || (!layoutOptions.removable && layoutOptions.removableWhenNew && !file.link))\"\n            type=\"button\"\n            theme=\"icon\"\n            icon=\"close\"\n            (click)=\"remove(file)\"\n            [attr.data-automation-id]=\"'file-remove'\"\n            tabindex=\"-1\"\n          ></button>\n        </div>\n        <div *ngIf=\"layoutOptions.customActions\">\n          <button\n            *ngIf=\"layoutOptions.edit && !disabled\"\n            type=\"button\"\n            theme=\"icon\"\n            icon=\"edit\"\n            (click)=\"customEdit(file)\"\n            [attr.data-automation-id]=\"'file-edit'\"\n            tabindex=\"-1\"\n          ></button>\n          <button\n            *ngIf=\"layoutOptions.download\"\n            type=\"button\"\n            theme=\"icon\"\n            icon=\"save\"\n            (click)=\"customSave(file)\"\n            [attr.data-automation-id]=\"'file-download'\"\n            tabindex=\"-1\"\n          ></button>\n          <button\n            *ngIf=\"!disabled\"\n            type=\"button\"\n            theme=\"icon\"\n            icon=\"close\"\n            (click)=\"customDelete(file)\"\n            [attr.data-automation-id]=\"'file-remove'\"\n            tabindex=\"-1\"\n          ></button>\n        </div>\n      </div>\n      <novo-loading *ngIf=\"!file.loaded\"></novo-loading>\n    </div>\n  </div>\n</ng-template>", styles: ["novo-file-input{display:flex;flex-flow:row wrap}novo-file-input .files-below{padding-top:10px}novo-file-input .file-output-group{width:100%;margin-top:15px}novo-file-input .file-output-group .file-item{background-color:#fff;box-shadow:0 1px 4px #00000026,0 2px 10px #00000017;padding:4px 12px;display:flex;flex-flow:row nowrap;align-items:center;margin-bottom:15px;position:relative;width:100%}novo-file-input .file-output-group .file-item i.bhi-move{color:#9e9e9e;padding-right:.75em;padding-bottom:4px;font-size:2em;cursor:-webkit-grab;cursor:grab}novo-file-input .file-output-group .file-item label{flex:1;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}novo-file-input .file-output-group .file-item label span{margin:0 8px}novo-file-input .file-output-group .file-item button{font-size:1.4rem;width:42px;height:42px;padding:4px;color:#9e9e9e}novo-file-input .file-output-group .file-item button:hover,novo-file-input .file-output-group .file-item button:focus,novo-file-input .file-output-group .file-item button.active{background:none;color:#4a89dc}novo-file-input .file-output-group .file-item.disabled{box-shadow:none;border:2px dashed #9e9e9e}novo-file-input .file-output-group.cdk-drop-list-dragging{cursor:-webkit-grabbing;cursor:grabbing}novo-file-input .file-output-group.cdk-drop-list-dragging .file-item{transition:transform .25s cubic-bezier(0,0,.2,1)}novo-file-input .file-input-group{cursor:pointer;width:100%;position:relative}novo-file-input .file-input-group input[type=file]{opacity:0;position:absolute;width:100%!important;height:100%!important;cursor:pointer}novo-file-input .file-input-group:hover label.boxed,novo-file-input .file-input-group.active label.boxed{border:2px dashed #4a89dc}novo-file-input .file-input-group.disabled{opacity:.3;pointer-events:none}novo-file-input .file-input-group label{color:#9e9e9e;margin-left:0;transition:all .2s ease-in-out;display:flex;flex-flow:column;align-items:center;position:relative;padding:15px;cursor:pointer;pointer-events:none}novo-file-input .file-input-group label strong{color:#4a89dc}novo-file-input .file-input-group label small{margin-top:7px}novo-file-input .file-input-group label i.bhi-dropzone{float:left;margin:-17px .25em 0 0}novo-file-input .file-input-group label.boxed{border:2px dashed #9e9e9e}novo-file-input .file-input-group label i{font-size:3em}novo-file-input novo-loading{padding:10px;transform:scale(.8)}.gu-mirror .actions button{display:none}.cdk-drag-preview.file-item{cursor:-webkit-grab;cursor:grab;background-color:#fff;box-shadow:0 1px 4px #00000026,0 2px 10px #00000017;padding:4px 12px;display:flex;flex-flow:row nowrap;align-items:center}.cdk-drag-preview.file-item i.bhi-move{color:#9e9e9e;padding-right:.75em;padding-bottom:4px;font-size:2em;cursor:-webkit-grab;cursor:grab}.cdk-drag-preview.file-item label{flex:1;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.cdk-drag-preview.file-item label span{margin:0 8px}.cdk-drag-preview.file-item button{font-size:1.4rem;width:42px;height:42px;padding:4px;color:#9e9e9e}.cdk-drag-placeholder.file-item{opacity:0}.cdk-drag-animating.file-item{transition:transform .25s cubic-bezier(0,0,.2,1)}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }, { type: i1.GlobalRef }, { type: i2.ErrorStateMatcher }, { type: i3.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i3.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i3.NgControl, decorators: [{
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
            }], dragEnterHandler: [{
                type: HostListener,
                args: ['dragenter', ['$event']]
            }], dragLeaveHandler: [{
                type: HostListener,
                args: ['dragleave', ['$event']]
            }], dragOverHandler: [{
                type: HostListener,
                args: ['dragover', ['$event']]
            }], dropHandler: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUlucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZm9ybS9leHRyYXMvZmlsZS9GaWxlSW5wdXQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9mb3JtL2V4dHJhcy9maWxlL0ZpbGVJbnB1dC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBZSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixJQUFJLEVBQ0osV0FBVyxFQUNYLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0Isa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdGLE9BQU8sRUFBMkIsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDNUcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7OztBQUU5QyxzREFBc0Q7QUFDdEQsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQyx5REFBeUQ7QUFDekQsaUJBQWlCO0FBQ2pCLEtBQUs7QUFFTCxNQUFNLGVBQWUsR0FBRyxFQUFFLEtBQUss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QUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDZGtEcmFnRHJvcCwgbW92ZUl0ZW1JbkFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgU2VsZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0NvbnRyb2wsIE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENhblVwZGF0ZUVycm9yU3RhdGVDdG9yLCBFcnJvclN0YXRlTWF0Y2hlciwgbWl4aW5FcnJvclN0YXRlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0ZpZWxkQ29udHJvbCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZmllbGQnO1xuaW1wb3J0IHsgR2xvYmFsUmVmLCBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBOb3ZvRmlsZSB9IGZyb20gJy4vZXh0cmFzL2ZpbGUvRmlsZSc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuLy8gY29uc3QgRklMRV9WQUxVRV9BQ0NFU1NPUiA9IHtcbi8vICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4vLyAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9GaWxlSW5wdXRFbGVtZW50KSxcbi8vICAgbXVsdGk6IHRydWUsXG4vLyB9O1xuXG5jb25zdCBMQVlPVVRfREVGQVVMVFMgPSB7IG9yZGVyOiAnZGVmYXVsdCcsIGRvd25sb2FkOiB0cnVlLCByZW1vdmFibGU6IHRydWUsIGxhYmVsU3R5bGU6ICdkZWZhdWx0JywgZHJhZ2dhYmxlOiBmYWxzZSB9O1xuLy8gbWFrZSBmaWxlLWlucHV0IGlkcyB1bmlxdWVcbmxldCBuZXh0SWQgPSAwO1xuXG5jbGFzcyBOb3ZvRmlsZUlucHV0QmFzZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBfZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBwdWJsaWMgX3BhcmVudEZvcm06IE5nRm9ybSxcbiAgICBwdWJsaWMgX3BhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgKSB7fVxufVxuY29uc3QgTm92b0ZpbGVJbnB1dE1peGluczogQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJiB0eXBlb2YgTm92b0ZpbGVJbnB1dEJhc2UgPSBtaXhpbkVycm9yU3RhdGUoTm92b0ZpbGVJbnB1dEJhc2UpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWZpbGUtaW5wdXQnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5vdm9GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBOb3ZvRmlsZUlucHV0RWxlbWVudCB9XSxcbiAgdGVtcGxhdGVVcmw6ICcuL0ZpbGVJbnB1dC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vRmlsZUlucHV0LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0ZpbGVJbnB1dEVsZW1lbnQgZXh0ZW5kcyBOb3ZvRmlsZUlucHV0TWl4aW5zIGltcGxlbWVudHMgTm92b0ZpZWxkQ29udHJvbDxhbnk+LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgcHJpdmF0ZSBfdW5pcXVlSWQ6IHN0cmluZyA9IGBub3ZvLWZpbGUtaW5wdXQtJHsrK25leHRJZH1gO1xuICAvKiogVGhlIGFyaWEtZGVzY3JpYmVkYnkgYXR0cmlidXRlIG9uIHRoZSBjaGlwIGxpc3QgZm9yIGltcHJvdmVkIGExMXkuICovXG4gIF9hcmlhRGVzY3JpYmVkYnk6IHN0cmluZztcbiAgLyoqIFRhYiBpbmRleCBmb3IgdGhlIGNoaXAgbGlzdC4gKi9cbiAgX3RhYkluZGV4ID0gMDtcbiAgLyoqIFVzZXIgZGVmaW5lZCB0YWIgaW5kZXguICovXG4gIF91c2VyVGFiSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAvKiogVGhlIEZvY3VzS2V5TWFuYWdlciB3aGljaCBoYW5kbGVzIGZvY3VzLiAqL1xuICBfa2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPE5vdm9GaWxlSW5wdXRFbGVtZW50PjtcblxuICByZWFkb25seSBjb250cm9sVHlwZTogc3RyaW5nID0gJ2ZpbGUtaW5wdXQnO1xuICAvKiogQGRvY3MtcHJpdmF0ZSBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIGxhc3RLZXlWYWx1ZTogc3RyaW5nID0gbnVsbDtcbiAgLyoqIEBkb2NzLXByaXZhdGUgSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiovXG4gIGxhc3RDYXJldFBvc2l0aW9uOiBudW1iZXIgfCBudWxsO1xuXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG4gIC8qKiBBbiBvYmplY3QgdXNlZCB0byBjb250cm9sIHdoZW4gZXJyb3IgbWVzc2FnZXMgYXJlIHNob3duLiAqL1xuICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgLy8gLS0tLS0tLS0tLVxuICBAVmlld0NoaWxkKCdmaWxlSW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBmaWxlSW5wdXQ6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBWaWV3Q2hpbGQoJ2ZpbGVPdXRwdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBmaWxlT3V0cHV0OiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2lucHV0RWxlbWVudCcpIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICBASW5wdXQoKVxuICBtdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGxheW91dE9wdGlvbnM6IHtcbiAgICBvcmRlcj86IHN0cmluZztcbiAgICBkb3dubG9hZD86IGJvb2xlYW47XG4gICAgZWRpdD86IGJvb2xlYW47XG4gICAgbGFiZWxTdHlsZT86IHN0cmluZztcbiAgICBkcmFnZ2FibGU/OiBib29sZWFuO1xuICAgIGN1c3RvbUFjdGlvbnM/OiBib29sZWFuO1xuICAgIHJlbW92YWJsZT86IGJvb2xlYW47XG4gICAgY3VzdG9tVmFsaWRhdGlvbj86IHsgYWN0aW9uOiBzdHJpbmc7IGZuOiBGdW5jdGlvbiB9W107XG4gICAgcmVtb3ZhYmxlV2hlbk5ldz86IGJvb2xlYW47XG4gIH07XG4gIEBJbnB1dCgpXG4gIHZhbHVlOiBBcnJheTxhbnk+ID0gW107XG4gIEBJbnB1dCgpXG4gIGRhdGFGZWF0dXJlSWQ6IHN0cmluZztcblxuICBAT3V0cHV0KClcbiAgZWRpdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBzYXZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGRlbGV0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICB1cGxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGZpbGVzOiBOb3ZvRmlsZVtdID0gW107XG4gIG1vZGVsOiBhbnk7XG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBjb21tYW5kczogYW55O1xuICB2aXNpYmxlOiBib29sZWFuO1xuICB0YXJnZXQ6IGFueTtcbiAgZmlsZU91dHB1dEJhZzogc3RyaW5nO1xuXG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIEBJbnB1dCgpXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uZ0NvbnRyb2wgPyAhIXRoaXMubmdDb250cm9sLmRpc2FibGVkIDogdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgfVxuICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyO1xuICB9XG4gIHNldCBwbGFjZWhvbGRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcGxhY2Vob2xkZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmFtZTogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG4gIHByb3RlY3RlZCBfdmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJvdGVjdGVkIF9yZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByb3RlY3RlZCBfcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgZ2xvYmFsUmVmOiBHbG9iYWxSZWYsXG4gICAgX2RlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgQE9wdGlvbmFsKCkgX3BhcmVudEZvcm06IE5nRm9ybSxcbiAgICBAT3B0aW9uYWwoKSBfcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBfbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICkge1xuICAgIHN1cGVyKF9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsIF9wYXJlbnRGb3JtLCBfcGFyZW50Rm9ybUdyb3VwLCBfbmdDb250cm9sKTtcbiAgICBpZiAoX25nQ29udHJvbCkge1xuICAgICAgX25nQ29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZUxheW91dCgpO1xuICAgIHRoaXMuc2V0SW5pdGlhbEZpbGVMaXN0KCk7XG4gICAgdGhpcy5kYXRhRmVhdHVyZUlkID0gdGhpcy5kYXRhRmVhdHVyZUlkID8gdGhpcy5kYXRhRmVhdHVyZUlkIDogdGhpcy5uYW1lO1xuICB9XG5cbiAgdXBkYXRlTGF5b3V0KCkge1xuICAgIHRoaXMubGF5b3V0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIExBWU9VVF9ERUZBVUxUUywgdGhpcy5sYXlvdXRPcHRpb25zKTtcbiAgICB0aGlzLmluc2VydFRlbXBsYXRlc0Jhc2VkT25MYXlvdXQoKTtcbiAgfVxuXG4gIGluc2VydFRlbXBsYXRlc0Jhc2VkT25MYXlvdXQoKSB7XG4gICAgbGV0IG9yZGVyO1xuICAgIHN3aXRjaCAodGhpcy5sYXlvdXRPcHRpb25zLm9yZGVyKSB7XG4gICAgICBjYXNlICdkaXNwbGF5RmlsZXNCZWxvdyc6XG4gICAgICAgIG9yZGVyID0gWydmaWxlSW5wdXQnLCAnZmlsZU91dHB1dCddO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG9yZGVyID0gWydmaWxlT3V0cHV0JywgJ2ZpbGVJbnB1dCddO1xuICAgIH1cbiAgICBvcmRlci5mb3JFYWNoKCh0ZW1wbGF0ZSkgPT4ge1xuICAgICAgdGhpcy5jb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXNbdGVtcGxhdGVdLCAwKTtcbiAgICB9KTtcbiAgICByZXR1cm4gb3JkZXI7XG4gIH1cblxuICBnZXQgb3V0cHV0RmlsZURyYWdnaW5nRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZHJhZ2dhYmxlID0gdGhpcy5sYXlvdXRPcHRpb25zPy5kcmFnZ2FibGU7XG4gICAgcmV0dXJuIGRyYWdnYWJsZSAhPSBudWxsICYmICFkcmFnZ2FibGU7XG4gIH1cblxuICBwcml2YXRlIHNldEluaXRpYWxGaWxlTGlzdCgpIHtcbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5maWxlcyA9IHRoaXMudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VudGVyJywgWyckZXZlbnQnXSlcbiAgZHJhZ0VudGVySGFuZGxlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG4gICAgdGhpcy50YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSlcbiAgZHJhZ0xlYXZlSGFuZGxlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMudGFyZ2V0ID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxuICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIG5vLW9wXG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgZHJvcEhhbmRsZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIudHlwZXNbMF0gIT09ICdGaWxlcycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uczogYW55ID0gdGhpcy5sYXlvdXRPcHRpb25zO1xuICAgIGNvbnN0IGZpbGVsaXN0ID0gQXJyYXkuZnJvbShldmVudC5kYXRhVHJhbnNmZXIuZmlsZXMpO1xuICAgIGlmIChvcHRpb25zLmN1c3RvbUFjdGlvbnMpIHtcbiAgICAgIHRoaXMudXBsb2FkLmVtaXQodGhpcy5tdWx0aXBsZSA/IGZpbGVsaXN0IDogW2ZpbGVsaXN0WzBdXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvY2Vzcyh0aGlzLm11bHRpcGxlID8gZmlsZWxpc3QgOiBbZmlsZWxpc3RbMF1dKTtcbiAgICB9XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIGRyb3BPdXRwdXRJdGVtKGV2ZW50OiBDZGtEcmFnRHJvcDxOb3ZvRmlsZVtdPikge1xuICAgIG1vdmVJdGVtSW5BcnJheSh0aGlzLmZpbGVzLCBldmVudC5wcmV2aW91c0luZGV4LCBldmVudC5jdXJyZW50SW5kZXgpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIC8vIElmIG1vZGVsIGlzIGNsZWFyZWQgcHJvZ3JhbW1hdGljYWxseSAoRS5nLiBmb3JtLnBhdGNoVmFsdWUoe2ZpbGU6IHVuZGVmaW5lZH0pKSwgZW1wdHkgZmlsZSBsaXN0LlxuICAgIHRoaXMuZmlsZXMgPSAhbW9kZWwgPyBbXSA6IHRoaXMuZmlsZXM7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgY2hlY2soZXZlbnQpIHtcbiAgICB0aGlzLnByb2Nlc3MoQXJyYXkuZnJvbShldmVudC50YXJnZXQuZmlsZXMpKTtcbiAgICAvLyBBZnRlciBwcm9jZXNzaW5nIGZpbGUgdXBsb2FkLCBjbGVhciBpbnB1dCBlbGVtZW50IHZhbHVlLiBBbGxvd3MgZm9yIGRlbGV0ZSBhbmQgdXBsb2FkIG9mIHNhbWUgZmlsZS5cbiAgICBldmVudC50YXJnZXQudmFsdWUgPSAnJztcbiAgfVxuXG4gIHZhbGlkYXRlKGZpbGVzKTogYm9vbGVhbiB7XG4gICAgbGV0IHBhc3NlZFZhbGlkYXRpb24gPSB0cnVlO1xuICAgIGlmICh0aGlzLmxheW91dE9wdGlvbnMuY3VzdG9tVmFsaWRhdGlvbikge1xuICAgICAgdGhpcy5sYXlvdXRPcHRpb25zLmN1c3RvbVZhbGlkYXRpb25cbiAgICAgICAgLmZpbHRlcigodmFsaWRhdGlvbikgPT4gdmFsaWRhdGlvbi5hY3Rpb24gPT09ICd1cGxvYWQnKVxuICAgICAgICAuZm9yRWFjaCgodXBsb2FkVmFsaWRhdGlvbikgPT4ge1xuICAgICAgICAgIHBhc3NlZFZhbGlkYXRpb24gPSB1cGxvYWRWYWxpZGF0aW9uLmZuKGZpbGVzKSAmJiBwYXNzZWRWYWxpZGF0aW9uO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHBhc3NlZFZhbGlkYXRpb247XG4gIH1cblxuICBwcml2YXRlIHByb2Nlc3MoZmlsZWxpc3QpIHtcbiAgICBpZiAodGhpcy52YWxpZGF0ZShmaWxlbGlzdCkpIHtcbiAgICAgIFByb21pc2UuYWxsKGZpbGVsaXN0Lm1hcCgoZmlsZSkgPT4gdGhpcy5yZWFkRmlsZShmaWxlKSkpLnRoZW4oKGZpbGVzKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgdGhpcy5maWxlcy5wdXNoKC4uLmZpbGVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmZpbGVzID0gZmlsZXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMuZmlsZXM7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLm1vZGVsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGRvd25sb2FkKGZpbGUpIHtcbiAgICAvLyBVc2luZyBhbiBpbmplY3RlZCBpbnN0YW5jZSBvZiB3aW5kb3cgdG8gbWFrZSBzdXJlIHRoYXQgdW5pdCB0ZXN0cyBkbyBub3Qgb3BlbiBhIG5ldyB3aW5kb3csIGV2ZW4gYWNjaWRlbnRhbGx5XG4gICAgdGhpcy5nbG9iYWxSZWYubmF0aXZlV2luZG93Lm9wZW4oZmlsZS5kYXRhVVJMLCAnX2JsYW5rJyk7XG4gIH1cblxuICByZW1vdmUoZmlsZSkge1xuICAgIHRoaXMuZmlsZXMuc3BsaWNlKFxuICAgICAgdGhpcy5maWxlcy5maW5kSW5kZXgoKGYpID0+IGYubmFtZSA9PT0gZmlsZS5uYW1lICYmIGYuc2l6ZSA9PT0gZmlsZS5zaXplKSxcbiAgICAgIDEsXG4gICAgKTtcbiAgICB0aGlzLm1vZGVsID0gdGhpcy5maWxlcztcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5tb2RlbCk7XG4gIH1cblxuICBwcml2YXRlIHJlYWRGaWxlKGZpbGUpIHtcbiAgICByZXR1cm4gbmV3IE5vdm9GaWxlKGZpbGUpLnJlYWQoKTtcbiAgfVxuXG4gIGN1c3RvbUVkaXQoZmlsZSkge1xuICAgIHRoaXMuZWRpdC5lbWl0KGZpbGUpO1xuICB9XG5cbiAgY3VzdG9tU2F2ZShmaWxlKSB7XG4gICAgdGhpcy5zYXZlLmVtaXQoZmlsZSk7XG4gIH1cblxuICBjdXN0b21EZWxldGUoZmlsZSkge1xuICAgIHRoaXMuZGVsZXRlLmVtaXQoZmlsZSk7XG4gIH1cblxuICBjdXN0b21DaGVjayhldmVudCkge1xuICAgIHRoaXMudXBsb2FkLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIGFueSByYWRpbyBidXR0b25zIGhhcyBmb2N1cy4gKi9cbiAgZ2V0IGZvY3VzZWQoKTogYm9vbGVhbiB7XG4gICAgLy8gdG9kbzogaW1wbGVtZW50IHRoaXMuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4gKi9cbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBudWxsO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4gKi9cbiAgZ2V0IHNob3VsZExhYmVsRmxvYXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmVtcHR5IHx8IHRoaXMuZm9jdXNlZDtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIHNldERlc2NyaWJlZEJ5SWRzKGlkczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9hcmlhRGVzY3JpYmVkYnkgPSBpZHMuam9pbignICcpO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4gKi9cbiAgb25Db250YWluZXJDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIHRoZSBmaXJzdCBub24tZGlzYWJsZWQgY2hpcCBpbiB0aGlzIGNoaXAgbGlzdCwgb3IgdGhlIGFzc29jaWF0ZWQgaW5wdXQgd2hlbiB0aGVyZVxuICAgKiBhcmUgbm8gZWxpZ2libGUgY2hpcHMuXG4gICAqL1xuICBmb2N1cyhvcHRpb25zPzogRm9jdXNPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gVE9ET1xuICB9XG59XG4iLCI8ZGl2ICNjb250YWluZXI+PC9kaXY+XG48bmctdGVtcGxhdGUgI2ZpbGVJbnB1dD5cbiAgPGRpdiBjbGFzcz1cImZpbGUtaW5wdXQtZ3JvdXBcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbY2xhc3MuYWN0aXZlXT1cImFjdGl2ZVwiPlxuICAgIDxpbnB1dFxuICAgICAgI2lucHV0RWxlbWVudFxuICAgICAgKm5nSWY9XCIhbGF5b3V0T3B0aW9ucy5jdXN0b21BY3Rpb25zXCJcbiAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgW2F0dHIuaWRdPVwibmFtZVwiXG4gICAgICAoY2hhbmdlKT1cImNoZWNrKCRldmVudClcIlxuICAgICAgW2F0dHIubXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICBbYXR0ci5kYXRhLWZlYXR1cmUtaWRdPVwiZGF0YUZlYXR1cmVJZFwiXG4gICAgLz5cbiAgICA8aW5wdXRcbiAgICAgICNpbnB1dEVsZW1lbnRcbiAgICAgICpuZ0lmPVwibGF5b3V0T3B0aW9ucy5jdXN0b21BY3Rpb25zXCJcbiAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgW2F0dHIuaWRdPVwibmFtZVwiXG4gICAgICAoY2hhbmdlKT1cImN1c3RvbUNoZWNrKCRldmVudClcIlxuICAgICAgW2F0dHIubXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICBbYXR0ci5kYXRhLWZlYXR1cmUtaWRdPVwiZGF0YUZlYXR1cmVJZFwiXG4gICAgLz5cbiAgICA8c2VjdGlvbiBbbmdTd2l0Y2hdPVwibGF5b3V0T3B0aW9ucy5sYWJlbFN0eWxlXCI+XG4gICAgICA8bGFiZWwgKm5nU3dpdGNoQ2FzZT1cIiduby1ib3gnXCIgW2F0dHIuZm9yXT1cIm5hbWVcIiBjbGFzcz1cIm5vLWJveFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWRyb3B6b25lXCI+PC9pPnt7IHBsYWNlaG9sZGVyIHx8IGxhYmVscy5jaG9vc2VBRmlsZSB9fSB7eyBsYWJlbHMub3IgfX1cbiAgICAgICAgICA8c3Ryb25nIGNsYXNzPVwibGlua1wiPnt7IGxhYmVscy5jbGlja1RvQnJvd3NlIH19PC9zdHJvbmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxsYWJlbCAqbmdTd2l0Y2hEZWZhdWx0IFthdHRyLmZvcl09XCJuYW1lXCIgY2xhc3M9XCJib3hlZFwiPlxuICAgICAgICA8c3Bhbj57eyBwbGFjZWhvbGRlciB8fCBsYWJlbHMuY2hvb3NlQUZpbGUgfX08L3NwYW4+XG4gICAgICAgIDxzbWFsbFxuICAgICAgICAgID57eyBsYWJlbHMub3IgfX0gPHN0cm9uZyBjbGFzcz1cImxpbmtcIj57eyBsYWJlbHMuY2xpY2tUb0Jyb3dzZSB9fTwvc3Ryb25nPjwvc21hbGxcbiAgICAgICAgPlxuICAgICAgPC9sYWJlbD5cbiAgICA8L3NlY3Rpb24+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbjxuZy10ZW1wbGF0ZSAjZmlsZU91dHB1dD5cbiAgPGRpdiBjbGFzcz1cImZpbGUtb3V0cHV0LWdyb3VwXCIgY2RrRHJvcExpc3QgW2Nka0Ryb3BMaXN0RGlzYWJsZWRdPVwib3V0cHV0RmlsZURyYWdnaW5nRGlzYWJsZWRcIiAoY2RrRHJvcExpc3REcm9wcGVkKT1cImRyb3BPdXRwdXRJdGVtKCRldmVudClcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZmlsZS1pdGVtXCIgY2RrRHJhZyAqbmdGb3I9XCJsZXQgZmlsZSBvZiBmaWxlc1wiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgPGkgKm5nSWY9XCJsYXlvdXRPcHRpb25zLmRyYWdnYWJsZVwiIGNsYXNzPVwiYmhpLW1vdmVcIj48L2k+XG4gICAgICA8bGFiZWwgKm5nSWY9XCJmaWxlLmxpbmtcIlxuICAgICAgICA+PHNwYW5cbiAgICAgICAgICA+PGEgaHJlZj1cInt7IGZpbGUubGluayB9fVwiIHRhcmdldD1cIl9ibGFua1wiPnt7IGZpbGUubmFtZSB8IGRlY29kZVVSSSB9fTwvYT48L3NwYW5cbiAgICAgICAgPjxzcGFuICpuZ0lmPVwiZmlsZS5kZXNjcmlwdGlvblwiPnx8PC9zcGFuPjxzcGFuPnt7IGZpbGUuZGVzY3JpcHRpb24gfX08L3NwYW4+PC9sYWJlbFxuICAgICAgPlxuICAgICAgPGxhYmVsICpuZ0lmPVwiIWZpbGUubGlua1wiPnt7IGZpbGUubmFtZSB8IGRlY29kZVVSSSB9fTwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZmlsZS1hY3Rpb25zJ1wiICpuZ0lmPVwiZmlsZS5sb2FkZWRcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIiFsYXlvdXRPcHRpb25zLmN1c3RvbUFjdGlvbnNcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAqbmdJZj1cImxheW91dE9wdGlvbnMuZG93bmxvYWRcIlxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgICAgaWNvbj1cInNhdmVcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImRvd25sb2FkKGZpbGUpXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZmlsZS1kb3dubG9hZCdcIlxuICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICpuZ0lmPVwiIWRpc2FibGVkICYmIChsYXlvdXRPcHRpb25zLnJlbW92YWJsZSB8fCAoIWxheW91dE9wdGlvbnMucmVtb3ZhYmxlICYmIGxheW91dE9wdGlvbnMucmVtb3ZhYmxlV2hlbk5ldyAmJiAhZmlsZS5saW5rKSlcIlxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgICAgaWNvbj1cImNsb3NlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJyZW1vdmUoZmlsZSlcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWxlLXJlbW92ZSdcIlxuICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImxheW91dE9wdGlvbnMuY3VzdG9tQWN0aW9uc1wiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICpuZ0lmPVwibGF5b3V0T3B0aW9ucy5lZGl0ICYmICFkaXNhYmxlZFwiXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgICBpY29uPVwiZWRpdFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiY3VzdG9tRWRpdChmaWxlKVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ2ZpbGUtZWRpdCdcIlxuICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICpuZ0lmPVwibGF5b3V0T3B0aW9ucy5kb3dubG9hZFwiXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgICBpY29uPVwic2F2ZVwiXG4gICAgICAgICAgICAoY2xpY2spPVwiY3VzdG9tU2F2ZShmaWxlKVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ2ZpbGUtZG93bmxvYWQnXCJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgID48L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAqbmdJZj1cIiFkaXNhYmxlZFwiXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgICBpY29uPVwiY2xvc2VcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImN1c3RvbURlbGV0ZShmaWxlKVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ2ZpbGUtcmVtb3ZlJ1wiXG4gICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICA+PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8bm92by1sb2FkaW5nICpuZ0lmPVwiIWZpbGUubG9hZGVkXCI+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT4iXX0=