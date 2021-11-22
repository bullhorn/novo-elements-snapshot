// NG2
import { Component, EventEmitter, forwardRef, Input, NgZone, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
NovoCKEditorElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-editor',
                providers: [CKEDITOR_CONTROL_VALUE_ACCESSOR],
                template: '<textarea [name]="name" [id]="name" #host></textarea>'
            },] }
];
NovoCKEditorElement.ctorParameters = () => [
    { type: NgZone }
];
NovoCKEditorElement.propDecorators = {
    config: [{ type: Input }],
    debounce: [{ type: Input }],
    name: [{ type: Input }],
    minimal: [{ type: Input }],
    startupFocus: [{ type: Input }],
    fileBrowserImageUploadUrl: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ready: [{ type: Output }],
    blur: [{ type: Output }],
    focus: [{ type: Output }],
    paste: [{ type: Output }],
    loaded: [{ type: Output }],
    host: [{ type: ViewChild, args: ['host',] }],
    value: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ0tFZGl0b3IuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvY2tlZGl0b3IvQ0tFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxzREFBc0Q7QUFDdEQsTUFBTSwrQkFBK0IsR0FBRztJQUN0QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBU0Y7Ozs7R0FJRztBQU1ILE1BQU0sT0FBTyxtQkFBbUI7SUFtQzlCLFlBQW9CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBekJoQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUU5Qiw4QkFBeUIsR0FBVyxFQUFFLENBQUM7UUFFdkMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUcxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU1QixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUzQixTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUxQixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUzQixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUzQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUk1QixXQUFNLEdBQVcsRUFBRSxDQUFDO0lBSWUsQ0FB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QyxLQUFNLElBQUcsQ0FBQztJQUVwQixnQkFBZ0IsQ0FBQyxFQUFFO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFFO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxRQUFpQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5RDtJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsSUFBSTtRQUNiLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7WUFuUEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztnQkFDNUMsUUFBUSxFQUFFLHVEQUF1RDthQUNsRTs7O1lBMUJtRSxNQUFNOzs7cUJBNEJ2RSxLQUFLO3VCQUVMLEtBQUs7bUJBRUwsS0FBSztzQkFFTCxLQUFLOzJCQUVMLEtBQUs7d0NBRUwsS0FBSzt1QkFFTCxLQUFLO3FCQUdMLE1BQU07b0JBRU4sTUFBTTttQkFFTixNQUFNO29CQUVOLE1BQU07b0JBRU4sTUFBTTtxQkFFTixNQUFNO21CQUVOLFNBQVMsU0FBQyxNQUFNO29CQWFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IENLRURJVE9SX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvQ0tFZGl0b3JFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5kZWNsYXJlIHZhciBDS0VESVRPUjogYW55O1xuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBDS0VESVRPUjogYW55O1xuICB9XG59XG5cbi8qKlxuICogQ0tFZGl0b3IgY29tcG9uZW50XG4gKiBVc2FnZSA6XG4gKiAgPG5vdm8tZWRpdG9yIFsobmdNb2RlbCldPVwiZGF0YVwiIFtjb25maWddPVwiey4uLn1cIiBkZWJvdW5jZT1cIjUwMFwiPjwvbm92by1lZGl0b3I+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZWRpdG9yJyxcbiAgcHJvdmlkZXJzOiBbQ0tFRElUT1JfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiAnPHRleHRhcmVhIFtuYW1lXT1cIm5hbWVcIiBbaWRdPVwibmFtZVwiICNob3N0PjwvdGV4dGFyZWE+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NLRWRpdG9yRWxlbWVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKVxuICBjb25maWc7XG4gIEBJbnB1dCgpXG4gIGRlYm91bmNlO1xuICBASW5wdXQoKVxuICBuYW1lO1xuICBASW5wdXQoKVxuICBtaW5pbWFsO1xuICBASW5wdXQoKVxuICBzdGFydHVwRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgZmlsZUJyb3dzZXJJbWFnZVVwbG9hZFVybDogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpXG4gIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpXG4gIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHJlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgYmx1ciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgcGFzdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBWaWV3Q2hpbGQoJ2hvc3QnKVxuICBob3N0O1xuXG4gIF92YWx1ZTogc3RyaW5nID0gJyc7XG4gIGluc3RhbmNlO1xuICBkZWJvdW5jZVRpbWVvdXQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHYpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XG4gICAgICB0aGlzLmluc3RhbmNlLmZvY3VzTWFuYWdlci5ibHVyKHRydWUpOyAvLyBSZW1vdmUgZm9jdXMgZnJvbSBlZGl0b3JcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmluc3RhbmNlLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICBjb25zdCBhSW5zdGFuY2UgPSBDS0VESVRPUi5pbnN0YW5jZXNbdGhpcy5pbnN0YW5jZS5uYW1lXTtcbiAgICAgICAgaWYgKGFJbnN0YW5jZSkge1xuICAgICAgICAgIGFJbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24odGhpcy5nZXRCYXNlQ29uZmlnKCksIHRoaXMuY29uZmlnKTtcbiAgICBpZiAodGhpcy5zdGFydHVwRm9jdXMpIHtcbiAgICAgIGNvbmZpZy5zdGFydHVwRm9jdXMgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgY29uZmlnLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5ja2VkaXRvckluaXQoY29uZmlnKTtcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2tlZGl0b3JJbml0KGNvbmZpZykge1xuICAgIGlmICghQ0tFRElUT1IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ01ha2Ugc3VyZSB0byBpbmNsdWRlIENLRWRpdG9yIHNvdXJjZXMgaW4geW91ciBkZXBlbmRlbmNpZXMhJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ0tFZGl0b3IgcmVwbGFjZSB0ZXh0YXJlYVxuICAgIHRoaXMuaW5zdGFuY2UgPSBDS0VESVRPUi5yZXBsYWNlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCBjb25maWcpO1xuXG4gICAgLy8gU2V0IGluaXRpYWwgdmFsdWVcbiAgICB0aGlzLmluc3RhbmNlLnNldERhdGEodGhpcy52YWx1ZSk7XG5cbiAgICAvLyBsaXN0ZW4gZm9yIGluc3RhbmNlUmVhZHkgZXZlbnRcbiAgICB0aGlzLmluc3RhbmNlLm9uKCdpbnN0YW5jZVJlYWR5JywgKGV2dCkgPT4ge1xuICAgICAgLy8gc2VuZCB0aGUgZXZ0IHRvIHRoZSBFdmVudEVtaXR0ZXJcbiAgICAgIHRoaXMucmVhZHkuZW1pdChldnQpO1xuICAgIH0pO1xuXG4gICAgLy8gQ0tFZGl0b3IgY2hhbmdlIGV2ZW50XG4gICAgdGhpcy5pbnN0YW5jZS5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5pbnN0YW5jZS5nZXREYXRhKCk7XG5cbiAgICAgIC8vIERlYm91bmNlIHVwZGF0ZVxuICAgICAgaWYgKHRoaXMuZGVib3VuY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVib3VuY2VUaW1lb3V0KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZGVib3VuY2VUaW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlYm91bmNlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUodmFsdWUpO1xuICAgICAgICAgIHRoaXMuZGVib3VuY2VUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfSwgcGFyc2VJbnQodGhpcy5kZWJvdW5jZSwgMTApKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUodmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuaW5zdGFuY2Uub24oJ2JsdXInLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuYmx1ci5lbWl0KGV2ZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLmluc3RhbmNlLm9uKCdmb2N1cycsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5mb2N1cy5lbWl0KGV2ZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLmluc3RhbmNlLm9uKCdwYXN0ZScsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5wYXN0ZS5lbWl0KGV2ZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLmluc3RhbmNlLm9uKCdsb2FkZWQnLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMubG9hZGVkLmVtaXQoZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0QmFzZUNvbmZpZygpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcbiAgICBjb25zdCBiYXNlQ29uZmlnID0ge1xuICAgICAgZW50ZXJNb2RlOiBDS0VESVRPUi5FTlRFUl9CUixcbiAgICAgIHNoaWZ0RW50ZXJNb2RlOiBDS0VESVRPUi5FTlRFUl9QLFxuICAgICAgZGlzYWJsZU5hdGl2ZVNwZWxsQ2hlY2tlcjogZmFsc2UsXG4gICAgICByZW1vdmVQbHVnaW5zOiAnbGlzdHN0eWxlLHRhYmxldG9vbHMsY29udGV4dG1lbnUnLCAvLyBhbGxvd3MgYnJvd3NlciBiYXNlZCBzcGVsbCBjaGVja2luZ1xuICAgICAgZXh0cmFBbGxvd2VkQ29udGVudDogJyooKil7Kn07dGFibGUgdGJvZHkgdHIgdGQgdGhbKl07JywgLy8gYWxsb3dzIGNsYXNzIG5hbWVzICgqKSBhbmQgaW5saW5lIHN0eWxlcyB7Kn0gZm9yIGFsbCBhbmQgYXR0cmlidXRlcyBbKl0gb24gdGFibGVzXG4gICAgICBmb250X25hbWVzOlxuICAgICAgICAnQXJpYWwvQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjsnICtcbiAgICAgICAgJ0NhbGlicmkvQ2FsaWJyaSwgVmVyZGFuYSwgR2VuZXZhLCBzYW5zLXNlcmlmOycgK1xuICAgICAgICAnQ29taWMgU2FucyBNUy9Db21pYyBTYW5zIE1TLCBjdXJzaXZlOycgK1xuICAgICAgICAnQ291cmllciBOZXcvQ291cmllciBOZXcsIENvdXJpZXIsIG1vbm9zcGFjZTsnICtcbiAgICAgICAgJ0dlb3JnaWEvR2VvcmdpYSwgc2VyaWY7JyArXG4gICAgICAgICdMdWNpZGEgU2FucyBVbmljb2RlL0x1Y2lkYSBTYW5zIFVuaWNvZGUsIEx1Y2lkYSBHcmFuZGUsIHNhbnMtc2VyaWY7JyArXG4gICAgICAgICdUYWhvbWEvVGFob21hLCBHZW5ldmEsIHNhbnMtc2VyaWY7JyArXG4gICAgICAgICdUaW1lcyBOZXcgUm9tYW4vVGltZXMgTmV3IFJvbWFuLCBUaW1lcywgc2VyaWY7JyArXG4gICAgICAgICdUcmVidWNoZXQgTVMvVHJlYnVjaGV0IE1TLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7JyArXG4gICAgICAgICdWZXJkYW5hL1ZlcmRhbmEsIEdlbmV2YSwgc2Fucy1zZXJpZicsXG4gICAgfTtcblxuICAgIGNvbnN0IG1pbmltYWxDb25maWcgPSB7XG4gICAgICB0b29sYmFyOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnYmFzaWNzdHlsZXMnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAnU3R5bGVzJyxcbiAgICAgICAgICAgICdGb250U2l6ZScsXG4gICAgICAgICAgICAnQm9sZCcsXG4gICAgICAgICAgICAnSXRhbGljJyxcbiAgICAgICAgICAgICdVbmRlcmxpbmUnLFxuICAgICAgICAgICAgJ1RleHRDb2xvcicsXG4gICAgICAgICAgICAnLScsXG4gICAgICAgICAgICAnTnVtYmVyZWRMaXN0JyxcbiAgICAgICAgICAgICdCdWxsZXRlZExpc3QnLFxuICAgICAgICAgICAgJ091dGRlbnQnLFxuICAgICAgICAgICAgJ0luZGVudCcsXG4gICAgICAgICAgICAnTGluaycsXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcblxuICAgIGNvbnN0IGV4dGVuZGVkQ29uZmlnID0ge1xuICAgICAgdG9vbGJhcjogW1xuICAgICAgICB7IG5hbWU6ICdjbGlwYm9hcmQnLCBpdGVtczogWydQYXN0ZScsICdQYXN0ZVRleHQnLCAnUGFzdGVGcm9tV29yZCcsICdVbmRvJywgJ1JlZG8nXSB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3BhcmFncmFwaCcsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICdOdW1iZXJlZExpc3QnLFxuICAgICAgICAgICAgJ0J1bGxldGVkTGlzdCcsXG4gICAgICAgICAgICAnT3V0ZGVudCcsXG4gICAgICAgICAgICAnSW5kZW50JyxcbiAgICAgICAgICAgICdCbG9ja3F1b3RlJyxcbiAgICAgICAgICAgICdKdXN0aWZ5TGVmdCcsXG4gICAgICAgICAgICAnSnVzdGlmeUNlbnRlcicsXG4gICAgICAgICAgICAnSnVzdGlmeVJpZ2h0JyxcbiAgICAgICAgICAgICdKdXN0aWZ5QmxvY2snLFxuICAgICAgICAgICAgJ0JpZGlMdHInLFxuICAgICAgICAgICAgJ0JpZGlSdGwnLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgbmFtZTogJ2xpbmtzJywgaXRlbXM6IFsnTGluayddIH0sXG4gICAgICAgIHsgbmFtZTogJ2luc2VydCcsIGl0ZW1zOiBbJ0ltYWdlJywgJ1RhYmxlJywgJ0hvcml6b250YWxSdWxlJ10gfSxcbiAgICAgICAgeyBuYW1lOiAndG9vbHMnLCBpdGVtczogWydNYXhpbWl6ZScsICdTb3VyY2UnXSB9LFxuICAgICAgICAnLycsIC8vIGxpbmUgYnJlYWtcbiAgICAgICAgeyBuYW1lOiAnYmFzaWNzdHlsZXMnLCBpdGVtczogWydCb2xkJywgJ0l0YWxpYycsICdVbmRlcmxpbmUnLCAnU3RyaWtlJywgJ1N1YnNjcmlwdCcsICdTdXBlcnNjcmlwdCddIH0sXG4gICAgICAgIHsgbmFtZTogJ3N0eWxlcycsIGl0ZW1zOiBbJ1N0eWxlcycsICdGb3JtYXQnLCAnRm9udCcsICdGb250U2l6ZSddIH0sXG4gICAgICAgIHsgbmFtZTogJ2NvbG9ycycsIGl0ZW1zOiBbJ1RleHRDb2xvcicsICdCR0NvbG9yJ10gfSxcbiAgICAgIF0sXG4gICAgICBmaWxlYnJvd3NlckltYWdlVXBsb2FkVXJsOiB0aGlzLmZpbGVCcm93c2VySW1hZ2VVcGxvYWRVcmwsXG4gICAgfTtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGJhc2VDb25maWcsIHRoaXMubWluaW1hbCA/IG1pbmltYWxDb25maWcgOiBleHRlbmRlZENvbmZpZyk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xuICAgICAgdGhpcy5pbnN0YW5jZS5zZXREYXRhKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBvbkNoYW5nZSh2YWx1ZT86IGFueSkge31cblxuICBvblRvdWNoZWQoZXZlbnQ/KSB7fVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbikge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XG4gICAgICBDS0VESVRPUi5pbnN0YW5jZXNbdGhpcy5pbnN0YW5jZS5uYW1lXS5zZXRSZWFkT25seShkaXNhYmxlZCk7XG4gICAgfVxuICB9XG5cbiAgaW5zZXJ0VGV4dCh0ZXh0KSB7XG4gICAgY29uc3QgdHJpbW1lZFRleHQgPSB0ZXh0LnRyaW0oKTtcbiAgICB0aGlzLmluc3RhbmNlLmluc2VydFRleHQodHJpbW1lZFRleHQpO1xuICB9XG59XG4iXX0=