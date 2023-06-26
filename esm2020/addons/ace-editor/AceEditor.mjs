// NG2
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
// organize-imports-ignore
import 'brace/index';
import 'brace/mode/javascript';
import 'brace/theme/chrome';
import 'brace/ext/language_tools.js';
// APP
import { Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
const ACE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoAceEditor),
    multi: true,
};
export class NovoAceEditor {
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
NovoAceEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAceEditor, selector: "novo-ace-editor", inputs: { theme: "theme", options: "options", mode: "mode", name: "name" }, outputs: { blur: "blur", focus: "focus" }, providers: [ACE_VALUE_ACCESSOR], ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAceEditor, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-ace-editor',
                    template: '',
                    providers: [ACE_VALUE_ACCESSOR],
                }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNlRWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvYWRkb25zL2FjZS1lZGl0b3IvQWNlRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxTQUFTO0FBQ1QsMEJBQTBCO0FBQzFCLE9BQU8sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLDZCQUE2QixDQUFDO0FBQ3JDLE1BQU07QUFDTixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBSTlDLE1BQU0sa0JBQWtCLEdBQUc7SUFDekIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUM1QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFPRixNQUFNLE9BQU8sYUFBYTtJQXFDeEIsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQWxCMUMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFMUIsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkIsYUFBUSxHQUFRO1lBQ3RCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLG1CQUFtQixFQUFFLElBQUk7U0FDMUIsQ0FBQztRQUNNLFdBQU0sR0FBVyxRQUFRLENBQUM7UUFDMUIsVUFBSyxHQUFXLFlBQVksQ0FBQztRQUU3QixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBSWxCLGFBQVEs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a0IsQ0FBQztpQkFDaEM7aUdBR0ssS0FBSztzQkFEUixLQUFLO2dCQU1GLE9BQU87c0JBRFYsS0FBSztnQkFNRixJQUFJO3NCQURQLEtBQUs7Z0JBTU4sSUFBSTtzQkFESCxLQUFLO2dCQUdOLElBQUk7c0JBREgsTUFBTTtnQkFHUCxLQUFLO3NCQURKLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gVmVuZG9yXG4vLyBvcmdhbml6ZS1pbXBvcnRzLWlnbm9yZVxuaW1wb3J0ICdicmFjZS9pbmRleCc7XG5pbXBvcnQgJ2JyYWNlL21vZGUvamF2YXNjcmlwdCc7XG5pbXBvcnQgJ2JyYWNlL3RoZW1lL2Nocm9tZSc7XG5pbXBvcnQgJ2JyYWNlL2V4dC9sYW5ndWFnZV90b29scy5qcyc7XG4vLyBBUFBcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuZGVjbGFyZSB2YXIgYWNlOiBhbnk7XG5cbmNvbnN0IEFDRV9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9BY2VFZGl0b3IpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tYWNlLWVkaXRvcicsXG4gIHRlbXBsYXRlOiAnJyxcbiAgcHJvdmlkZXJzOiBbQUNFX1ZBTFVFX0FDQ0VTU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0FjZUVkaXRvciBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIHNldCB0aGVtZSh0aGVtZTogYW55KSB7XG4gICAgdGhpcy5zZXRUaGVtZSh0aGVtZSk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgb3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcbiAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbW9kZShtb2RlOiBhbnkpIHtcbiAgICB0aGlzLnNldE1vZGUobW9kZSk7XG4gIH1cblxuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmc7XG4gIEBPdXRwdXQoKVxuICBibHVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgZm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfb3B0aW9uczogYW55ID0ge1xuICAgIHNob3dQcmludE1hcmdpbjogZmFsc2UsXG4gICAgZGlzcGxheUluZGVudEd1aWRlczogdHJ1ZSxcbiAgfTtcbiAgcHJpdmF0ZSBfdGhlbWU6IHN0cmluZyA9ICdjaHJvbWUnO1xuICBwcml2YXRlIF9tb2RlOiBzdHJpbmcgPSAnamF2YXNjcmlwdCc7XG5cbiAgcHJpdmF0ZSB0ZXh0OiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBvbGRUZXh0OiBzdHJpbmc7XG4gIHByaXZhdGUgZWRpdG9yOiBhbnk7XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5lZGl0b3IpIHtcbiAgICAgIHRoaXMuZWRpdG9yLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVFZGl0b3IoKTtcbiAgICB0aGlzLmluaXRpYWxpemVPcHRpb25zKCk7XG4gICAgdGhpcy5pbml0aWFsaXplRXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVFZGl0b3IoKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmVkaXRvciA9IGFjZS5lZGl0KGVsKTtcbiAgICB0aGlzLmVkaXRvci4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZU9wdGlvbnMoKSB7XG4gICAgdGhpcy5zZXRPcHRpb25zKHRoaXMuX29wdGlvbnMgfHwge30pO1xuICAgIHRoaXMuc2V0VGhlbWUodGhpcy5fdGhlbWUpO1xuICAgIHRoaXMuc2V0TW9kZSh0aGlzLl9tb2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUV2ZW50cygpIHtcbiAgICB0aGlzLmVkaXRvci5vbignZm9jdXMnLCAoZXZlbnQpID0+IHRoaXMuZm9jdXMuZW1pdChldmVudCkpO1xuICAgIHRoaXMuZWRpdG9yLm9uKCdibHVyJywgKGV2ZW50KSA9PiB0aGlzLmZvY3VzLmVtaXQoZXZlbnQpKTtcbiAgICB0aGlzLmVkaXRvci5vbignY2hhbmdlJywgKCkgPT4gdGhpcy51cGRhdGVUZXh0KCkpO1xuICAgIHRoaXMuZWRpdG9yLm9uKCdwYXN0ZScsICgpID0+IHRoaXMudXBkYXRlVGV4dCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVGV4dCgpIHtcbiAgICBjb25zdCBuZXdWYWwgPSB0aGlzLmVkaXRvci5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKG5ld1ZhbCA9PT0gdGhpcy5vbGRUZXh0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy50ZXh0ID0gbmV3VmFsO1xuICAgIHRoaXMub25DaGFuZ2UobmV3VmFsKTtcbiAgICB0aGlzLm9sZFRleHQgPSBuZXdWYWw7XG4gIH1cblxuICBwcml2YXRlIHNldFRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgaWYgKEhlbHBlcnMuaXNCbGFuayh0ZXh0KSkge1xuICAgICAgdGV4dCA9ICcnO1xuICAgIH1cbiAgICBpZiAodGhpcy50ZXh0ICE9PSB0ZXh0KSB7XG4gICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgdGhpcy5lZGl0b3Iuc2V0VmFsdWUodGV4dCk7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRleHQpO1xuICAgICAgdGhpcy5lZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldE9wdGlvbnMob3B0aW9uczogYW55KSB7XG4gICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9ucyhvcHRpb25zIHx8IHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VGhlbWUodGhlbWU6IHN0cmluZykge1xuICAgIHRoaXMuX3RoZW1lID0gdGhlbWU7XG4gICAgdGhpcy5lZGl0b3Iuc2V0VGhlbWUoYGFjZS90aGVtZS8ke3RoZW1lfWApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRNb2RlKG1vZGU6IGFueSkge1xuICAgIHRoaXMuX21vZGUgPSBtb2RlO1xuICAgIHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKGBhY2UvbW9kZS8ke3RoaXMuX21vZGV9YCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnNldFRleHQodmFsdWUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cbn1cbiJdfQ==