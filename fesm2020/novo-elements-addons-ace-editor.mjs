import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, Input, Output, ViewChild, NgModuleRef, NgModule } from '@angular/core';
import * as i3 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'brace/index';
import 'brace/mode/javascript';
import 'brace/theme/chrome';
import 'brace/ext/language_tools.js';
import { Helpers, DYNAMIC_FORM_TEMPLATE } from 'novo-elements/utils';
import { CommonModule } from '@angular/common';
import * as i2 from 'novo-elements/elements/common';
import { NovoTemplate, NovoCommonModule } from 'novo-elements/elements/common';

// NG2
const ACE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoAceEditor),
    multi: true,
};
class NovoAceEditor {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._options = {
            showPrintMargin: false,
            displayIndentGuides: true,
        };
        this._theme = 'chrome';
        this._mode = 'javascript';
        this.text = '';
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    set theme(theme) {
        this.setTheme(theme);
    }
    set options(options) {
        this.setOptions(options);
    }
    set mode(mode) {
        this.setMode(mode);
    }
    ngOnDestroy() {
        if (this.editor) {
            this.editor.destroy();
        }
    }
    ngOnInit() {
        this.initializeEditor();
        this.initializeOptions();
        this.initializeEvents();
    }
    initializeEditor() {
        const el = this.elementRef.nativeElement;
        this.editor = ace.edit(el);
        this.editor.$blockScrolling = Infinity;
    }
    initializeOptions() {
        this.setOptions(this._options || {});
        this.setTheme(this._theme);
        this.setMode(this._mode);
    }
    initializeEvents() {
        this.editor.on('focus', (event) => this.focus.emit(event));
        this.editor.on('blur', (event) => this.focus.emit(event));
        this.editor.on('change', () => this.updateText());
        this.editor.on('paste', () => this.updateText());
    }
    updateText() {
        const newVal = this.editor.getValue();
        if (newVal === this.oldText) {
            return;
        }
        this.text = newVal;
        this.onChange(newVal);
        this.oldText = newVal;
    }
    setText(text) {
        if (Helpers.isBlank(text)) {
            text = '';
        }
        if (this.text !== text) {
            this.text = text;
            this.editor.setValue(text);
            this.onChange(text);
            this.editor.clearSelection();
        }
    }
    setOptions(options) {
        this._options = options;
        this.editor.setOptions(options || {});
    }
    setTheme(theme) {
        this._theme = theme;
        this.editor.setTheme(`ace/theme/${theme}`);
    }
    setMode(mode) {
        this._mode = mode;
        this.editor.getSession().setMode(`ace/mode/${this._mode}`);
    }
    writeValue(value) {
        this.setText(value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
NovoAceEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAceEditor, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NovoAceEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAceEditor, selector: "novo-ace-editor", inputs: { theme: "theme", options: "options", mode: "mode", name: "name" }, outputs: { blur: "blur", focus: "focus" }, providers: [ACE_VALUE_ACCESSOR], ngImport: i0, template: '', isInline: true, styles: [":host{display:block;width:100%;min-height:200px}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAceEditor, decorators: [{
            type: Component,
            args: [{ selector: 'novo-ace-editor', template: '', providers: [ACE_VALUE_ACCESSOR], styles: [":host{display:block;width:100%;min-height:200px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { theme: [{
                type: Input
            }], options: [{
                type: Input
            }], mode: [{
                type: Input
            }], name: [{
                type: Input
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }] } });

class NovoAceEditorFormTemplate {
}
NovoAceEditorFormTemplate.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAceEditorFormTemplate, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAceEditorFormTemplate.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAceEditorFormTemplate, selector: "internal-novo-code-editor-template", viewQueries: [{ propertyName: "template", first: true, predicate: NovoTemplate, descendants: true }], ngImport: i0, template: `<ng-template novoTemplate="ace-editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-ace-editor
          [name]="control.key"
          [formControlName]="control.key"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        ></novo-ace-editor>
      </div>
    </ng-template>`, isInline: true, components: [{ type: NovoAceEditor, selector: "novo-ace-editor", inputs: ["theme", "options", "mode", "name"], outputs: ["blur", "focus"] }], directives: [{ type: i2.NovoTemplate, selector: "[novoTemplate]", inputs: ["type", "novoTemplate"] }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAceEditorFormTemplate, decorators: [{
            type: Component,
            args: [{
                    template: `<ng-template novoTemplate="ace-editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-ace-editor
          [name]="control.key"
          [formControlName]="control.key"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        ></novo-ace-editor>
      </div>
    </ng-template>`,
                    selector: 'internal-novo-code-editor-template'
                }]
        }], propDecorators: { template: [{
                type: ViewChild,
                args: [NovoTemplate]
            }] } });

// NG2
class NovoAceEditorModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { NovoAceEditor, NovoAceEditorModule };
//# sourceMappingURL=novo-elements-addons-ace-editor.mjs.map
