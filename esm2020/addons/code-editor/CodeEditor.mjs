// NG2
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { Annotation, EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import * as i0 from "@angular/core";
// organize-imports-ignore
// APP
const CODE_EDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCodeEditor),
    multi: true,
};
// CodeMirror transaction annotation to show changes that came in through writeValue (FormControl value) as opposed to UI editing
const FormControlCodeWriter = Annotation.define();
// (This is a replacement for the "novo-ace-editor". Notably, we are no longer naming it based on the underlying component. It is possible, in the future,
// we decide there is another code editing component that better fits our use case - in which situation we should replace the implementation here, but keep its name)
export class NovoCodeEditor {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.theme = 'default';
        this.lineNumbers = true;
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this.changed = new EventEmitter();
        this.mode = 'javascript';
        this.initialValue = '';
        this.disabled = false;
    }
    ngOnInit() {
    }
    ngOnDestroy() {
    }
    ngAfterViewInit() {
        this.createEditorView();
    }
    createEditorView() {
        const extensions = [
            basicSetup,
            keymap.of(defaultKeymap)
        ];
        if (this.mode === 'javascript') {
            extensions.push(javascript());
        }
        const initialEditorState = EditorState.create({
            doc: this.initialValue,
            extensions,
        });
        this.editorView = new EditorView({
            state: initialEditorState,
            parent: this.elementRef.nativeElement,
            dispatch: (transaction, view) => {
                // Prevent changes if the form is disabled - unless the change came from writeValue function
                if (transaction.annotation(FormControlCodeWriter) || !(this.disabled && transaction.docChanged)) {
                    view.update([transaction]);
                }
                if (transaction.docChanged) {
                    this.changed.emit(view.state.doc.toString());
                }
            }
        });
    }
    onFocus() {
        this.focus.emit();
    }
    onBlur() {
        this.blur.emit();
    }
    // ControlValueAccessor forward implementation
    writeValue(value) {
        if (this.editorView) {
            this.editorView.dispatch({
                changes: {
                    from: 0,
                    to: this.editorView.state.doc.length,
                    insert: value,
                },
                annotations: FormControlCodeWriter.of({}),
            });
        }
        else if (value != null) {
            this.initialValue = value;
        }
    }
    registerOnChange(fn) {
        this.changed.subscribe(fn);
    }
    registerOnTouched(fn) {
        this.blur.subscribe(fn);
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
NovoCodeEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoCodeEditor, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NovoCodeEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: NovoCodeEditor, selector: "novo-code-editor", inputs: { theme: "theme", lineNumbers: "lineNumbers", name: "name", mode: "mode" }, outputs: { blur: "blur", focus: "focus" }, host: { listeners: { "focus": "onFocus()", "blur": "onBlur()" }, properties: { "class.editor-disabled": "this.disabled" } }, providers: [CODE_EDITOR_VALUE_ACCESSOR], viewQueries: [{ propertyName: "editorRoot", first: true, predicate: ["editorRoot"], descendants: true }], ngImport: i0, template: '', isInline: true, styles: [":host{height:200px;display:block;overflow:auto}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoCodeEditor, decorators: [{
            type: Component,
            args: [{ selector: 'novo-code-editor', template: '', providers: [CODE_EDITOR_VALUE_ACCESSOR], styles: [":host{height:200px;display:block;overflow:auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { theme: [{
                type: Input
            }], lineNumbers: [{
                type: Input
            }], name: [{
                type: Input
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], mode: [{
                type: Input
            }], editorRoot: [{
                type: ViewChild,
                args: ['editorRoot']
            }], disabled: [{
                type: HostBinding,
                args: ['class.editor-disabled']
            }], onFocus: [{
                type: HostListener,
                args: ['focus']
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZUVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2FkZG9ucy9jb2RlLWVkaXRvci9Db2RlRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2SyxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsU0FBUztBQUNULE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7O0FBRXhDLDBCQUEwQjtBQUUxQixNQUFNO0FBQ04sTUFBTSwwQkFBMEIsR0FBRztJQUNqQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO0lBQzdDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLGlJQUFpSTtBQUNqSSxNQUFNLHFCQUFxQixHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVsRCwwSkFBMEo7QUFDMUoscUtBQXFLO0FBT3JLLE1BQU0sT0FBTyxjQUFjO0lBNEJ6QixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBMUIxQyxVQUFL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QUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQzdCLENBQUM7OzJHQXhHVSxjQUFjOytGQUFkLGNBQWMsdVNBRmQsQ0FBQywwQkFBMEIsQ0FBQyxvSUFGN0IsRUFBRTsyRkFJRCxjQUFjO2tCQU4xQixTQUFTOytCQUNFLGtCQUFrQixZQUNsQixFQUFFLGFBRUQsQ0FBQywwQkFBMEIsQ0FBQztpR0FJdkMsS0FBSztzQkFESixLQUFLO2dCQUlOLFdBQVc7c0JBRFYsS0FBSztnQkFJTixJQUFJO3NCQURILEtBQUs7Z0JBSU4sSUFBSTtzQkFESCxNQUFNO2dCQUdQLEtBQUs7c0JBREosTUFBTTtnQkFLRSxJQUFJO3NCQUFaLEtBQUs7Z0JBR04sVUFBVTtzQkFEVCxTQUFTO3VCQUFDLFlBQVk7Z0JBT2YsUUFBUTtzQkFEZixXQUFXO3VCQUFDLHVCQUF1QjtnQkE0Q3BDLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPO2dCQU1yQixNQUFNO3NCQURMLFlBQVk7dUJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgZGVmYXVsdEtleW1hcCB9IGZyb20gJ0Bjb2RlbWlycm9yL2NvbW1hbmRzJztcbmltcG9ydCB7IGphdmFzY3JpcHQgfSBmcm9tICdAY29kZW1pcnJvci9sYW5nLWphdmFzY3JpcHQnO1xuaW1wb3J0IHsgQW5ub3RhdGlvbiwgRWRpdG9yU3RhdGUgfSBmcm9tICdAY29kZW1pcnJvci9zdGF0ZSc7XG5pbXBvcnQgeyBFZGl0b3JWaWV3LCBrZXltYXAgfSBmcm9tICdAY29kZW1pcnJvci92aWV3JztcbmltcG9ydCB7IGJhc2ljU2V0dXAgfSBmcm9tICdjb2RlbWlycm9yJztcblxuLy8gb3JnYW5pemUtaW1wb3J0cy1pZ25vcmVcblxuLy8gQVBQXG5jb25zdCBDT0RFX0VESVRPUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9Db2RlRWRpdG9yKSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG4vLyBDb2RlTWlycm9yIHRyYW5zYWN0aW9uIGFubm90YXRpb24gdG8gc2hvdyBjaGFuZ2VzIHRoYXQgY2FtZSBpbiB0aHJvdWdoIHdyaXRlVmFsdWUgKEZvcm1Db250cm9sIHZhbHVlKSBhcyBvcHBvc2VkIHRvIFVJIGVkaXRpbmdcbmNvbnN0IEZvcm1Db250cm9sQ29kZVdyaXRlciA9IEFubm90YXRpb24uZGVmaW5lKCk7XG5cbi8vIChUaGlzIGlzIGEgcmVwbGFjZW1lbnQgZm9yIHRoZSBcIm5vdm8tYWNlLWVkaXRvclwiLiBOb3RhYmx5LCB3ZSBhcmUgbm8gbG9uZ2VyIG5hbWluZyBpdCBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBjb21wb25lbnQuIEl0IGlzIHBvc3NpYmxlLCBpbiB0aGUgZnV0dXJlLFxuLy8gd2UgZGVjaWRlIHRoZXJlIGlzIGFub3RoZXIgY29kZSBlZGl0aW5nIGNvbXBvbmVudCB0aGF0IGJldHRlciBmaXRzIG91ciB1c2UgY2FzZSAtIGluIHdoaWNoIHNpdHVhdGlvbiB3ZSBzaG91bGQgcmVwbGFjZSB0aGUgaW1wbGVtZW50YXRpb24gaGVyZSwgYnV0IGtlZXAgaXRzIG5hbWUpXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNvZGUtZWRpdG9yJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBzdHlsZVVybHM6IFsnLi9Db2RlRWRpdG9yLnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbQ09ERV9FRElUT1JfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Db2RlRWRpdG9yIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZyA9ICdkZWZhdWx0JztcblxuICBASW5wdXQoKVxuICBsaW5lTnVtYmVycyA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKVxuICBibHVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgZm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBjaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgQElucHV0KCkgbW9kZTogc3RyaW5nID0gJ2phdmFzY3JpcHQnO1xuXG4gIEBWaWV3Q2hpbGQoJ2VkaXRvclJvb3QnKVxuICBlZGl0b3JSb290OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBlZGl0b3JWaWV3OiBFZGl0b3JWaWV3O1xuICBpbml0aWFsVmFsdWUgPSAnJztcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmVkaXRvci1kaXNhYmxlZCcpXG4gIHByaXZhdGUgZGlzYWJsZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNyZWF0ZUVkaXRvclZpZXcoKTtcbiAgfVxuXG4gIGNyZWF0ZUVkaXRvclZpZXcoKTogdm9pZCB7XG4gICAgY29uc3QgZXh0ZW5zaW9ucyA9IFtcbiAgICAgIGJhc2ljU2V0dXAsXG4gICAgICBrZXltYXAub2YoZGVmYXVsdEtleW1hcClcbiAgICBdO1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdqYXZhc2NyaXB0Jykge1xuICAgICAgZXh0ZW5zaW9ucy5wdXNoKGphdmFzY3JpcHQoKSk7XG4gICAgfVxuICAgIGNvbnN0IGluaXRpYWxFZGl0b3JTdGF0ZSA9IEVkaXRvclN0YXRlLmNyZWF0ZSh7XG4gICAgICBkb2M6IHRoaXMuaW5pdGlhbFZhbHVlLFxuICAgICAgZXh0ZW5zaW9ucyxcbiAgICB9KTtcbiAgICB0aGlzLmVkaXRvclZpZXcgPSBuZXcgRWRpdG9yVmlldyh7XG4gICAgICBzdGF0ZTogaW5pdGlhbEVkaXRvclN0YXRlLFxuICAgICAgcGFyZW50OiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgIGRpc3BhdGNoOiAodHJhbnNhY3Rpb24sIHZpZXcpID0+IHtcbiAgICAgICAgLy8gUHJldmVudCBjaGFuZ2VzIGlmIHRoZSBmb3JtIGlzIGRpc2FibGVkIC0gdW5sZXNzIHRoZSBjaGFuZ2UgY2FtZSBmcm9tIHdyaXRlVmFsdWUgZnVuY3Rpb25cbiAgICAgICAgaWYgKHRyYW5zYWN0aW9uLmFubm90YXRpb24oRm9ybUNvbnRyb2xDb2RlV3JpdGVyKSB8fCAhKHRoaXMuZGlzYWJsZWQgJiYgdHJhbnNhY3Rpb24uZG9jQ2hhbmdlZCkpIHtcbiAgICAgICAgICB2aWV3LnVwZGF0ZShbdHJhbnNhY3Rpb25dKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNhY3Rpb24uZG9jQ2hhbmdlZCkge1xuICAgICAgICAgIHRoaXMuY2hhbmdlZC5lbWl0KHZpZXcuc3RhdGUuZG9jLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIG9uRm9jdXMoKSB7XG4gICAgdGhpcy5mb2N1cy5lbWl0KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgb25CbHVyKCkge1xuICAgIHRoaXMuYmx1ci5lbWl0KCk7XG4gIH1cblxuICAvLyBDb250cm9sVmFsdWVBY2Nlc3NvciBmb3J3YXJkIGltcGxlbWVudGF0aW9uXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLmVkaXRvclZpZXcpIHtcbiAgICAgIHRoaXMuZWRpdG9yVmlldy5kaXNwYXRjaCh7XG4gICAgICAgIGNoYW5nZXM6IHtcbiAgICAgICAgICBmcm9tOiAwLFxuICAgICAgICAgIHRvOiB0aGlzLmVkaXRvclZpZXcuc3RhdGUuZG9jLmxlbmd0aCxcbiAgICAgICAgICBpbnNlcnQ6IHZhbHVlLFxuICAgICAgICB9LFxuICAgICAgICBhbm5vdGF0aW9uczogRm9ybUNvbnRyb2xDb2RlV3JpdGVyLm9mKHt9KSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgdGhpcy5pbml0aWFsVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLmNoYW5nZWQuc3Vic2NyaWJlKGZuKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLmJsdXIuc3Vic2NyaWJlKGZuKTtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG59XG4iXX0=