// NG2
import { Component, EventEmitter, forwardRef, Input, NgZone, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
// Value accessor for the component (supports ngModel)
const CKEDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCKEditorElement),
    multi: true,
};
/**
 * CKEditor component
 * Usage :
 *  <novo-editor [(ngModel)]="data" [config]="{...}" debounce="500"></novo-editor>
 */
export class NovoCKEditorElement {
    constructor(zone) {
        this.zone = zone;
        this.startupFocus = false;
        this.fileBrowserImageUploadUrl = '';
        this.disabled = false;
        this.change = new EventEmitter();
        this.ready = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this.paste = new EventEmitter();
        this.loaded = new EventEmitter();
        this._value = '';
    }
    get value() {
        return this._value;
    }
    set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }
    ngOnDestroy() {
        if (this.instance) {
            this.instance.focusManager.blur(true); // Remove focus from editor
            setTimeout(() => {
                this.instance.removeAllListeners();
                const aInstance = CKEDITOR.instances[this.instance.name];
                if (aInstance) {
                    aInstance.destroy();
                }
                this.instance.destroy();
                this.instance = null;
            });
        }
    }
    ngAfterViewInit() {
        const config = Object.assign(this.getBaseConfig(), this.config);
        if (this.startupFocus) {
            config.startupFocus = true;
        }
        if (this.disabled) {
            config.readOnly = true;
        }
        this.ckeditorInit(config);
    }
    updateValue(value) {
        this.zone.run(() => {
            this.value = value;
            this.onChange(value);
            this.onTouched();
            this.change.emit(value);
        });
    }
    ckeditorInit(config) {
        if (!CKEDITOR) {
            console.error('Make sure to include CKEditor sources in your dependencies!');
            return;
        }
        // CKEditor replace textarea
        this.instance = CKEDITOR.replace(this.host.nativeElement, config);
        // Set initial value
        this.instance.setData(this.value);
        // listen for instanceReady event
        this.instance.on('instanceReady', (evt) => {
            // send the evt to the EventEmitter
            this.ready.emit(evt);
        });
        // CKEditor change event
        this.instance.on('change', () => {
            this.onTouched();
            const value = this.instance.getData();
            // Debounce update
            if (this.debounce) {
                if (this.debounceTimeout) {
                    clearTimeout(this.debounceTimeout);
                }
                this.debounceTimeout = setTimeout(() => {
                    this.updateValue(value);
                    this.debounceTimeout = null;
                }, parseInt(this.debounce, 10));
            }
            else {
                this.updateValue(value);
            }
        });
        this.instance.on('blur', (event) => {
            this.blur.emit(event);
        });
        this.instance.on('focus', (event) => {
            this.focus.emit(event);
        });
        this.instance.on('paste', (event) => {
            this.paste.emit(event);
        });
        this.instance.on('loaded', (event) => {
            this.loaded.emit(event);
        });
    }
    getBaseConfig() {
        const baseConfig = {
            enterMode: CKEDITOR.ENTER_BR,
            shiftEnterMode: CKEDITOR.ENTER_P,
            disableNativeSpellChecker: false,
            removePlugins: 'liststyle,tabletools,contextmenu',
            extraAllowedContent: '*(*){*};table tbody tr td th[*];',
            font_names: 'Arial/Arial, Helvetica, sans-serif;' +
                'Calibri/Calibri, Verdana, Geneva, sans-serif;' +
                'Comic Sans MS/Comic Sans MS, cursive;' +
                'Courier New/Courier New, Courier, monospace;' +
                'Georgia/Georgia, serif;' +
                'Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;' +
                'Tahoma/Tahoma, Geneva, sans-serif;' +
                'Times New Roman/Times New Roman, Times, serif;' +
                'Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;' +
                'Verdana/Verdana, Geneva, sans-serif',
        };
        const minimalConfig = {
            toolbar: [
                {
                    name: 'basicstyles',
                    items: [
                        'Styles',
                        'FontSize',
                        'Bold',
                        'Italic',
                        'Underline',
                        'TextColor',
                        '-',
                        'NumberedList',
                        'BulletedList',
                        'Outdent',
                        'Indent',
                        'Link',
                    ],
                },
            ],
        };
        const extendedConfig = {
            toolbar: [
                { name: 'clipboard', items: ['Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Redo'] },
                {
                    name: 'paragraph',
                    items: [
                        'NumberedList',
                        'BulletedList',
                        'Outdent',
                        'Indent',
                        'Blockquote',
                        'JustifyLeft',
                        'JustifyCenter',
                        'JustifyRight',
                        'JustifyBlock',
                        'BidiLtr',
                        'BidiRtl',
                    ],
                },
                { name: 'links', items: ['Link'] },
                { name: 'insert', items: ['Image', 'Table', 'HorizontalRule'] },
                { name: 'tools', items: ['Maximize', 'Source'] },
                '/',
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
                { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] },
            ],
            filebrowserImageUploadUrl: this.fileBrowserImageUploadUrl,
        };
        return Object.assign(baseConfig, this.minimal ? minimalConfig : extendedConfig);
    }
    writeValue(value) {
        this._value = value;
        if (this.instance) {
            this.instance.setData(value);
        }
    }
    onChange(value) { }
    onTouched(event) { }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
        if (this.instance) {
            CKEDITOR.instances[this.instance.name].setReadOnly(disabled);
        }
    }
    insertText(text) {
        const trimmedText = text.trim();
        this.instance.insertText(trimmedText);
    }
}
NovoCKEditorElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoCKEditorElement, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
NovoCKEditorElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoCKEditorElement, selector: "novo-editor", inputs: { config: "config", debounce: "debounce", name: "name", minimal: "minimal", startupFocus: "startupFocus", fileBrowserImageUploadUrl: "fileBrowserImageUploadUrl", disabled: "disabled", value: "value" }, outputs: { change: "change", ready: "ready", blur: "blur", focus: "focus", paste: "paste", loaded: "loaded" }, providers: [CKEDITOR_CONTROL_VALUE_ACCESSOR], viewQueries: [{ propertyName: "host", first: true, predicate: ["host"], descendants: true }], ngImport: i0, template: '<textarea [name]="name" [id]="name" #host></textarea>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoCKEditorElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-editor',
                    providers: [CKEDITOR_CONTROL_VALUE_ACCESSOR],
                    template: '<textarea [name]="name" [id]="name" #host></textarea>',
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }]; }, propDecorators: { config: [{
                type: Input
            }], debounce: [{
                type: Input
            }], name: [{
                type: Input
            }], minimal: [{
                type: Input
            }], startupFocus: [{
                type: Input
            }], fileBrowserImageUploadUrl: [{
                type: Input
            }], disabled: [{
                type: Input
            }], change: [{
                type: Output
            }], ready: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], paste: [{
                type: Output
            }], loaded: [{
                type: Output
            }], host: [{
                type: ViewChild,
                args: ['host']
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ0tFZGl0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9ja2VkaXRvci9DS0VkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEksT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUV6RSxzREFBc0Q7QUFDdEQsTUFBTSwrQkFBK0IsR0FBRztJQUN0QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBU0Y7Ozs7R0FJRztBQU1ILE1BQU0sT0FBTyxtQkFBbUI7SUFtQzlCLFlBQW9CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBekJoQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUU5Qiw4QkFBeUIsR0FBVyxFQUFFLENBQUM7UUFFdkMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUcxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU1QixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUzQixTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUxQixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUzQixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUzQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUk1QixXQUFNLEdBQVcsRUFBRSxDQUFDO0lBSWUsQ0FBQztJQUVwQyxJQUFJLEtBQUs7UUFDUCxPQUFP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Z0JBR1AsTUFBTTtzQkFETCxNQUFNO2dCQUdQLElBQUk7c0JBREgsU0FBUzt1QkFBQyxNQUFNO2dCQWNiLEtBQUs7c0JBRFIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBDS0VESVRPUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0NLRWRpdG9yRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuZGVjbGFyZSB2YXIgQ0tFRElUT1I6IGFueTtcbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgQ0tFRElUT1I6IGFueTtcbiAgfVxufVxuXG4vKipcbiAqIENLRWRpdG9yIGNvbXBvbmVudFxuICogVXNhZ2UgOlxuICogIDxub3ZvLWVkaXRvciBbKG5nTW9kZWwpXT1cImRhdGFcIiBbY29uZmlnXT1cInsuLi59XCIgZGVib3VuY2U9XCI1MDBcIj48L25vdm8tZWRpdG9yPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWVkaXRvcicsXG4gIHByb3ZpZGVyczogW0NLRURJVE9SX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogJzx0ZXh0YXJlYSBbbmFtZV09XCJuYW1lXCIgW2lkXT1cIm5hbWVcIiAjaG9zdD48L3RleHRhcmVhPicsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DS0VkaXRvckVsZW1lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KClcbiAgY29uZmlnO1xuICBASW5wdXQoKVxuICBkZWJvdW5jZTtcbiAgQElucHV0KClcbiAgbmFtZTtcbiAgQElucHV0KClcbiAgbWluaW1hbDtcbiAgQElucHV0KClcbiAgc3RhcnR1cEZvY3VzOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIGZpbGVCcm93c2VySW1hZ2VVcGxvYWRVcmw6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKVxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKVxuICBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICByZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBmb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHBhc3RlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAVmlld0NoaWxkKCdob3N0JylcbiAgaG9zdDtcblxuICBfdmFsdWU6IHN0cmluZyA9ICcnO1xuICBpbnN0YW5jZTtcbiAgZGVib3VuY2VUaW1lb3V0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodikge1xuICAgIGlmICh2ICE9PSB0aGlzLl92YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZSh2KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xuICAgICAgdGhpcy5pbnN0YW5jZS5mb2N1c01hbmFnZXIuYmx1cih0cnVlKTsgLy8gUmVtb3ZlIGZvY3VzIGZyb20gZWRpdG9yXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgY29uc3QgYUluc3RhbmNlID0gQ0tFRElUT1IuaW5zdGFuY2VzW3RoaXMuaW5zdGFuY2UubmFtZV07XG4gICAgICAgIGlmIChhSW5zdGFuY2UpIHtcbiAgICAgICAgICBhSW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2V0QmFzZUNvbmZpZygpLCB0aGlzLmNvbmZpZyk7XG4gICAgaWYgKHRoaXMuc3RhcnR1cEZvY3VzKSB7XG4gICAgICBjb25maWcuc3RhcnR1cEZvY3VzID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIGNvbmZpZy5yZWFkT25seSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuY2tlZGl0b3JJbml0KGNvbmZpZyk7XG4gIH1cblxuICB1cGRhdGVWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNrZWRpdG9ySW5pdChjb25maWcpIHtcbiAgICBpZiAoIUNLRURJVE9SKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdNYWtlIHN1cmUgdG8gaW5jbHVkZSBDS0VkaXRvciBzb3VyY2VzIGluIHlvdXIgZGVwZW5kZW5jaWVzIScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENLRWRpdG9yIHJlcGxhY2UgdGV4dGFyZWFcbiAgICB0aGlzLmluc3RhbmNlID0gQ0tFRElUT1IucmVwbGFjZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgY29uZmlnKTtcblxuICAgIC8vIFNldCBpbml0aWFsIHZhbHVlXG4gICAgdGhpcy5pbnN0YW5jZS5zZXREYXRhKHRoaXMudmFsdWUpO1xuXG4gICAgLy8gbGlzdGVuIGZvciBpbnN0YW5jZVJlYWR5IGV2ZW50XG4gICAgdGhpcy5pbnN0YW5jZS5vbignaW5zdGFuY2VSZWFkeScsIChldnQpID0+IHtcbiAgICAgIC8vIHNlbmQgdGhlIGV2dCB0byB0aGUgRXZlbnRFbWl0dGVyXG4gICAgICB0aGlzLnJlYWR5LmVtaXQoZXZ0KTtcbiAgICB9KTtcblxuICAgIC8vIENLRWRpdG9yIGNoYW5nZSBldmVudFxuICAgIHRoaXMuaW5zdGFuY2Uub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaW5zdGFuY2UuZ2V0RGF0YSgpO1xuXG4gICAgICAvLyBEZWJvdW5jZSB1cGRhdGVcbiAgICAgIGlmICh0aGlzLmRlYm91bmNlKSB7XG4gICAgICAgIGlmICh0aGlzLmRlYm91bmNlVGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRlYm91bmNlVGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWJvdW5jZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgICB0aGlzLmRlYm91bmNlVGltZW91dCA9IG51bGw7XG4gICAgICAgIH0sIHBhcnNlSW50KHRoaXMuZGVib3VuY2UsIDEwKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmluc3RhbmNlLm9uKCdibHVyJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmJsdXIuZW1pdChldmVudCk7XG4gICAgfSk7XG4gICAgdGhpcy5pbnN0YW5jZS5vbignZm9jdXMnLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuZm9jdXMuZW1pdChldmVudCk7XG4gICAgfSk7XG4gICAgdGhpcy5pbnN0YW5jZS5vbigncGFzdGUnLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucGFzdGUuZW1pdChldmVudCk7XG4gICAgfSk7XG4gICAgdGhpcy5pbnN0YW5jZS5vbignbG9hZGVkJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmxvYWRlZC5lbWl0KGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEJhc2VDb25maWcoKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG4gICAgY29uc3QgYmFzZUNvbmZpZyA9IHtcbiAgICAgIGVudGVyTW9kZTogQ0tFRElUT1IuRU5URVJfQlIsXG4gICAgICBzaGlmdEVudGVyTW9kZTogQ0tFRElUT1IuRU5URVJfUCxcbiAgICAgIGRpc2FibGVOYXRpdmVTcGVsbENoZWNrZXI6IGZhbHNlLFxuICAgICAgcmVtb3ZlUGx1Z2luczogJ2xpc3RzdHlsZSx0YWJsZXRvb2xzLGNvbnRleHRtZW51JywgLy8gYWxsb3dzIGJyb3dzZXIgYmFzZWQgc3BlbGwgY2hlY2tpbmdcbiAgICAgIGV4dHJhQWxsb3dlZENvbnRlbnQ6ICcqKCopeyp9O3RhYmxlIHRib2R5IHRyIHRkIHRoWypdOycsIC8vIGFsbG93cyBjbGFzcyBuYW1lcyAoKikgYW5kIGlubGluZSBzdHlsZXMgeyp9IGZvciBhbGwgYW5kIGF0dHJpYnV0ZXMgWypdIG9uIHRhYmxlc1xuICAgICAgZm9udF9uYW1lczpcbiAgICAgICAgJ0FyaWFsL0FyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7JyArXG4gICAgICAgICdDYWxpYnJpL0NhbGlicmksIFZlcmRhbmEsIEdlbmV2YSwgc2Fucy1zZXJpZjsnICtcbiAgICAgICAgJ0NvbWljIFNhbnMgTVMvQ29taWMgU2FucyBNUywgY3Vyc2l2ZTsnICtcbiAgICAgICAgJ0NvdXJpZXIgTmV3L0NvdXJpZXIgTmV3LCBDb3VyaWVyLCBtb25vc3BhY2U7JyArXG4gICAgICAgICdHZW9yZ2lhL0dlb3JnaWEsIHNlcmlmOycgK1xuICAgICAgICAnTHVjaWRhIFNhbnMgVW5pY29kZS9MdWNpZGEgU2FucyBVbmljb2RlLCBMdWNpZGEgR3JhbmRlLCBzYW5zLXNlcmlmOycgK1xuICAgICAgICAnVGFob21hL1RhaG9tYSwgR2VuZXZhLCBzYW5zLXNlcmlmOycgK1xuICAgICAgICAnVGltZXMgTmV3IFJvbWFuL1RpbWVzIE5ldyBSb21hbiwgVGltZXMsIHNlcmlmOycgK1xuICAgICAgICAnVHJlYnVjaGV0IE1TL1RyZWJ1Y2hldCBNUywgSGVsdmV0aWNhLCBzYW5zLXNlcmlmOycgK1xuICAgICAgICAnVmVyZGFuYS9WZXJkYW5hLCBHZW5ldmEsIHNhbnMtc2VyaWYnLFxuICAgIH07XG5cbiAgICBjb25zdCBtaW5pbWFsQ29uZmlnID0ge1xuICAgICAgdG9vbGJhcjogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2Jhc2ljc3R5bGVzJyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgJ1N0eWxlcycsXG4gICAgICAgICAgICAnRm9udFNpemUnLFxuICAgICAgICAgICAgJ0JvbGQnLFxuICAgICAgICAgICAgJ0l0YWxpYycsXG4gICAgICAgICAgICAnVW5kZXJsaW5lJyxcbiAgICAgICAgICAgICdUZXh0Q29sb3InLFxuICAgICAgICAgICAgJy0nLFxuICAgICAgICAgICAgJ051bWJlcmVkTGlzdCcsXG4gICAgICAgICAgICAnQnVsbGV0ZWRMaXN0JyxcbiAgICAgICAgICAgICdPdXRkZW50JyxcbiAgICAgICAgICAgICdJbmRlbnQnLFxuICAgICAgICAgICAgJ0xpbmsnLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG5cbiAgICBjb25zdCBleHRlbmRlZENvbmZpZyA9IHtcbiAgICAgIHRvb2xiYXI6IFtcbiAgICAgICAgeyBuYW1lOiAnY2xpcGJvYXJkJywgaXRlbXM6IFsnUGFzdGUnLCAnUGFzdGVUZXh0JywgJ1Bhc3RlRnJvbVdvcmQnLCAnVW5kbycsICdSZWRvJ10gfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdwYXJhZ3JhcGgnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnTnVtYmVyZWRMaXN0JyxcbiAgICAgICAgICAgICdCdWxsZXRlZExpc3QnLFxuICAgICAgICAgICAgJ091dGRlbnQnLFxuICAgICAgICAgICAgJ0luZGVudCcsXG4gICAgICAgICAgICAnQmxvY2txdW90ZScsXG4gICAgICAgICAgICAnSnVzdGlmeUxlZnQnLFxuICAgICAgICAgICAgJ0p1c3RpZnlDZW50ZXInLFxuICAgICAgICAgICAgJ0p1c3RpZnlSaWdodCcsXG4gICAgICAgICAgICAnSnVzdGlmeUJsb2NrJyxcbiAgICAgICAgICAgICdCaWRpTHRyJyxcbiAgICAgICAgICAgICdCaWRpUnRsJyxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7IG5hbWU6ICdsaW5rcycsIGl0ZW1zOiBbJ0xpbmsnXSB9LFxuICAgICAgICB7IG5hbWU6ICdpbnNlcnQnLCBpdGVtczogWydJbWFnZScsICdUYWJsZScsICdIb3Jpem9udGFsUnVsZSddIH0sXG4gICAgICAgIHsgbmFtZTogJ3Rvb2xzJywgaXRlbXM6IFsnTWF4aW1pemUnLCAnU291cmNlJ10gfSxcbiAgICAgICAgJy8nLCAvLyBsaW5lIGJyZWFrXG4gICAgICAgIHsgbmFtZTogJ2Jhc2ljc3R5bGVzJywgaXRlbXM6IFsnQm9sZCcsICdJdGFsaWMnLCAnVW5kZXJsaW5lJywgJ1N0cmlrZScsICdTdWJzY3JpcHQnLCAnU3VwZXJzY3JpcHQnXSB9LFxuICAgICAgICB7IG5hbWU6ICdzdHlsZXMnLCBpdGVtczogWydTdHlsZXMnLCAnRm9ybWF0JywgJ0ZvbnQnLCAnRm9udFNpemUnXSB9LFxuICAgICAgICB7IG5hbWU6ICdjb2xvcnMnLCBpdGVtczogWydUZXh0Q29sb3InLCAnQkdDb2xvciddIH0sXG4gICAgICBdLFxuICAgICAgZmlsZWJyb3dzZXJJbWFnZVVwbG9hZFVybDogdGhpcy5maWxlQnJvd3NlckltYWdlVXBsb2FkVXJsLFxuICAgIH07XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihiYXNlQ29uZmlnLCB0aGlzLm1pbmltYWwgPyBtaW5pbWFsQ29uZmlnIDogZXh0ZW5kZWRDb25maWcpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuaW5zdGFuY2Uuc2V0RGF0YSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgb25DaGFuZ2UodmFsdWU/OiBhbnkpIHt9XG5cbiAgb25Ub3VjaGVkKGV2ZW50Pykge31cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xuICAgICAgQ0tFRElUT1IuaW5zdGFuY2VzW3RoaXMuaW5zdGFuY2UubmFtZV0uc2V0UmVhZE9ubHkoZGlzYWJsZWQpO1xuICAgIH1cbiAgfVxuXG4gIGluc2VydFRleHQodGV4dCkge1xuICAgIGNvbnN0IHRyaW1tZWRUZXh0ID0gdGV4dC50cmltKCk7XG4gICAgdGhpcy5pbnN0YW5jZS5pbnNlcnRUZXh0KHRyaW1tZWRUZXh0KTtcbiAgfVxufVxuIl19