// NG2
import { Component, Input, Output, ViewChild, EventEmitter, NgZone, forwardRef } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ0tFZGl0b3IuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NrZWRpdG9yL0NLRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUNoSSxPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsc0RBQXNEO0FBQ3RELE1BQU0sK0JBQStCLEdBQUc7SUFDdEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUlGOzs7O0dBSUc7QUFNSCxNQUFNLE9BQU8sbUJBQW1CO0lBbUM5QixZQUFvQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQXpCaEMsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFFOUIsOEJBQXlCLEdBQVcsRUFBRSxDQUFDO1FBRXZDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFHMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFNUIsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFM0IsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFMUIsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFM0IsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFM0IsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFJNUIsV0FBTSxHQUFXLEVBQUUsQ0FBQztJQUllLENBQUM7SUFFcEMsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUNJLEtBQUssQ0FBQyxDQUFDO1FBQ1QsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsMkJBQTJCO1lBQ2xFLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUNuQyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pELElBQUksU0FBUyxFQUFFO29CQUNiLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDckI7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUM1QjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN4QjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLFlBQVksQ0FBQyxNQUFNO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLDZEQUE2RCxDQUFDLENBQUM7WUFDN0UsT0FBTztTQUNSO1FBRUQsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVsRSxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWxDLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN4QyxtQ0FBbUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFFSCx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUM5QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV0QyxrQkFBa0I7WUFDbEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQ3hCLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ3BDO2dCQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7Z0JBQzlCLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGFBQWE7UUFDWCxNQUFNLFVBQVUsR0FBRztZQUNqQixTQUFTLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDNUIsY0FBYyxFQUFFLFFBQVEsQ0FBQyxPQUFPO1lBQ2hDLHlCQUF5QixFQUFFLEtBQUs7WUFDaEMsYUFBYSxFQUFFLGtDQUFrQztZQUNqRCxtQkFBbUIsRUFBRSxrQ0FBa0M7WUFDdkQsVUFBVSxFQUNSLHFDQUFxQztnQkFDckMsK0NBQStDO2dCQUMvQyx1Q0FBdUM7Z0JBQ3ZDLDhDQUE4QztnQkFDOUMseUJBQXlCO2dCQUN6QixxRUFBcUU7Z0JBQ3JFLG9DQUFvQztnQkFDcEMsZ0RBQWdEO2dCQUNoRCxtREFBbUQ7Z0JBQ25ELHFDQUFxQztTQUN4QyxDQUFDO1FBRUYsTUFBTSxhQUFhLEdBQUc7WUFDcEIsT0FBTyxFQUFFO2dCQUNQO29CQUNFLElBQUksRUFBRSxhQUFhO29CQUNuQixLQUFLLEVBQUU7d0JBQ0wsUUFBUTt3QkFDUixVQUFVO3dCQUNWLE1BQU07d0JBQ04sUUFBUTt3QkFDUixXQUFXO3dCQUNYLFdBQVc7d0JBQ1gsR0FBRzt3QkFDSCxjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsU0FBUzt3QkFDVCxRQUFRO3dCQUNSLE1BQU07cUJBQ1A7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7UUFFRixNQUFNLGNBQWMsR0FBRztZQUNyQixPQUFPLEVBQUU7Z0JBQ1AsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDckY7b0JBQ0UsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLEtBQUssRUFBRTt3QkFDTCxjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsU0FBUzt3QkFDVCxRQUFRO3dCQUNSLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxTQUFTO3dCQUNULFNBQVM7cUJBQ1Y7aUJBQ0Y7Z0JBQ0QsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNsQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUMvRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUNoRCxHQUFHO2dCQUNILEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQyxFQUFFO2dCQUNyRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQUU7Z0JBQ25FLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLEVBQUU7YUFDcEQ7WUFDRCx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCO1NBQzFELENBQUM7UUFFRixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFLO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFXLElBQUcsQ0FBQztJQUV4QixTQUFTLENBQUMsS0FBTSxJQUFHLENBQUM7SUFFcEIsZ0JBQWdCLENBQUMsRUFBRTtRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBRTtRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsUUFBaUI7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUQ7SUFDSCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQUk7UUFDYixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7O1lBblBGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7Z0JBQzVDLFFBQVEsRUFBRSx1REFBdUQ7YUFDbEU7OztZQXJCMkQsTUFBTTs7O3FCQXVCL0QsS0FBSzt1QkFFTCxLQUFLO21CQUVMLEtBQUs7c0JBRUwsS0FBSzsyQkFFTCxLQUFLO3dDQUVMLEtBQUs7dUJBRUwsS0FBSztxQkFHTCxNQUFNO29CQUVOLE1BQU07bUJBRU4sTUFBTTtvQkFFTixNQUFNO29CQUVOLE1BQU07cUJBRU4sTUFBTTttQkFFTixTQUFTLFNBQUMsTUFBTTtvQkFhaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBOZ1pvbmUsIGZvcndhcmRSZWYsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcclxuY29uc3QgQ0tFRElUT1JfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvQ0tFZGl0b3JFbGVtZW50KSxcclxuICBtdWx0aTogdHJ1ZSxcclxufTtcclxuXHJcbmRlY2xhcmUgdmFyIENLRURJVE9SOiBhbnk7XHJcblxyXG4vKipcclxuICogQ0tFZGl0b3IgY29tcG9uZW50XHJcbiAqIFVzYWdlIDpcclxuICogIDxub3ZvLWVkaXRvciBbKG5nTW9kZWwpXT1cImRhdGFcIiBbY29uZmlnXT1cInsuLi59XCIgZGVib3VuY2U9XCI1MDBcIj48L25vdm8tZWRpdG9yPlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWVkaXRvcicsXHJcbiAgcHJvdmlkZXJzOiBbQ0tFRElUT1JfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgdGVtcGxhdGU6ICc8dGV4dGFyZWEgW25hbWVdPVwibmFtZVwiIFtpZF09XCJuYW1lXCIgI2hvc3Q+PC90ZXh0YXJlYT4nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0NLRWRpdG9yRWxlbWVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIEBJbnB1dCgpXHJcbiAgY29uZmlnO1xyXG4gIEBJbnB1dCgpXHJcbiAgZGVib3VuY2U7XHJcbiAgQElucHV0KClcclxuICBuYW1lO1xyXG4gIEBJbnB1dCgpXHJcbiAgbWluaW1hbDtcclxuICBASW5wdXQoKVxyXG4gIHN0YXJ0dXBGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgZmlsZUJyb3dzZXJJbWFnZVVwbG9hZFVybDogc3RyaW5nID0gJyc7XHJcbiAgQElucHV0KClcclxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpXHJcbiAgcmVhZHkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpXHJcbiAgYmx1ciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KClcclxuICBmb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KClcclxuICBwYXN0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KClcclxuICBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQFZpZXdDaGlsZCgnaG9zdCcpXHJcbiAgaG9zdDtcclxuXHJcbiAgX3ZhbHVlOiBzdHJpbmcgPSAnJztcclxuICBpbnN0YW5jZTtcclxuICBkZWJvdW5jZVRpbWVvdXQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lKSB7fVxyXG5cclxuICBnZXQgdmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCB2YWx1ZSh2KSB7XHJcbiAgICBpZiAodiAhPT0gdGhpcy5fdmFsdWUpIHtcclxuICAgICAgdGhpcy5fdmFsdWUgPSB2O1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHYpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICB0aGlzLmluc3RhbmNlLmZvY3VzTWFuYWdlci5ibHVyKHRydWUpOyAvLyBSZW1vdmUgZm9jdXMgZnJvbSBlZGl0b3JcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcclxuICAgICAgICBjb25zdCBhSW5zdGFuY2UgPSBDS0VESVRPUi5pbnN0YW5jZXNbdGhpcy5pbnN0YW5jZS5uYW1lXTtcclxuICAgICAgICBpZiAoYUluc3RhbmNlKSB7XHJcbiAgICAgICAgICBhSW5zdGFuY2UuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluc3RhbmNlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2V0QmFzZUNvbmZpZygpLCB0aGlzLmNvbmZpZyk7XHJcbiAgICBpZiAodGhpcy5zdGFydHVwRm9jdXMpIHtcclxuICAgICAgY29uZmlnLnN0YXJ0dXBGb2N1cyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICBjb25maWcucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ja2VkaXRvckluaXQoY29uZmlnKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2tlZGl0b3JJbml0KGNvbmZpZykge1xyXG4gICAgaWYgKCFDS0VESVRPUikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdNYWtlIHN1cmUgdG8gaW5jbHVkZSBDS0VkaXRvciBzb3VyY2VzIGluIHlvdXIgZGVwZW5kZW5jaWVzIScpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ0tFZGl0b3IgcmVwbGFjZSB0ZXh0YXJlYVxyXG4gICAgdGhpcy5pbnN0YW5jZSA9IENLRURJVE9SLnJlcGxhY2UodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIGNvbmZpZyk7XHJcblxyXG4gICAgLy8gU2V0IGluaXRpYWwgdmFsdWVcclxuICAgIHRoaXMuaW5zdGFuY2Uuc2V0RGF0YSh0aGlzLnZhbHVlKTtcclxuXHJcbiAgICAvLyBsaXN0ZW4gZm9yIGluc3RhbmNlUmVhZHkgZXZlbnRcclxuICAgIHRoaXMuaW5zdGFuY2Uub24oJ2luc3RhbmNlUmVhZHknLCAoZXZ0KSA9PiB7XHJcbiAgICAgIC8vIHNlbmQgdGhlIGV2dCB0byB0aGUgRXZlbnRFbWl0dGVyXHJcbiAgICAgIHRoaXMucmVhZHkuZW1pdChldnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ0tFZGl0b3IgY2hhbmdlIGV2ZW50XHJcbiAgICB0aGlzLmluc3RhbmNlLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5pbnN0YW5jZS5nZXREYXRhKCk7XHJcblxyXG4gICAgICAvLyBEZWJvdW5jZSB1cGRhdGVcclxuICAgICAgaWYgKHRoaXMuZGVib3VuY2UpIHtcclxuICAgICAgICBpZiAodGhpcy5kZWJvdW5jZVRpbWVvdXQpIHtcclxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRlYm91bmNlVGltZW91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGVib3VuY2VUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHZhbHVlKTtcclxuICAgICAgICAgIHRoaXMuZGVib3VuY2VUaW1lb3V0ID0gbnVsbDtcclxuICAgICAgICB9LCBwYXJzZUludCh0aGlzLmRlYm91bmNlLCAxMCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuaW5zdGFuY2Uub24oJ2JsdXInLCAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5ibHVyLmVtaXQoZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmluc3RhbmNlLm9uKCdmb2N1cycsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLmZvY3VzLmVtaXQoZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmluc3RhbmNlLm9uKCdwYXN0ZScsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLnBhc3RlLmVtaXQoZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmluc3RhbmNlLm9uKCdsb2FkZWQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5sb2FkZWQuZW1pdChldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldEJhc2VDb25maWcoKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICBjb25zdCBiYXNlQ29uZmlnID0ge1xyXG4gICAgICBlbnRlck1vZGU6IENLRURJVE9SLkVOVEVSX0JSLFxyXG4gICAgICBzaGlmdEVudGVyTW9kZTogQ0tFRElUT1IuRU5URVJfUCxcclxuICAgICAgZGlzYWJsZU5hdGl2ZVNwZWxsQ2hlY2tlcjogZmFsc2UsXHJcbiAgICAgIHJlbW92ZVBsdWdpbnM6ICdsaXN0c3R5bGUsdGFibGV0b29scyxjb250ZXh0bWVudScsIC8vIGFsbG93cyBicm93c2VyIGJhc2VkIHNwZWxsIGNoZWNraW5nXHJcbiAgICAgIGV4dHJhQWxsb3dlZENvbnRlbnQ6ICcqKCopeyp9O3RhYmxlIHRib2R5IHRyIHRkIHRoWypdOycsIC8vIGFsbG93cyBjbGFzcyBuYW1lcyAoKikgYW5kIGlubGluZSBzdHlsZXMgeyp9IGZvciBhbGwgYW5kIGF0dHJpYnV0ZXMgWypdIG9uIHRhYmxlc1xyXG4gICAgICBmb250X25hbWVzOlxyXG4gICAgICAgICdBcmlhbC9BcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmOycgK1xyXG4gICAgICAgICdDYWxpYnJpL0NhbGlicmksIFZlcmRhbmEsIEdlbmV2YSwgc2Fucy1zZXJpZjsnICtcclxuICAgICAgICAnQ29taWMgU2FucyBNUy9Db21pYyBTYW5zIE1TLCBjdXJzaXZlOycgK1xyXG4gICAgICAgICdDb3VyaWVyIE5ldy9Db3VyaWVyIE5ldywgQ291cmllciwgbW9ub3NwYWNlOycgK1xyXG4gICAgICAgICdHZW9yZ2lhL0dlb3JnaWEsIHNlcmlmOycgK1xyXG4gICAgICAgICdMdWNpZGEgU2FucyBVbmljb2RlL0x1Y2lkYSBTYW5zIFVuaWNvZGUsIEx1Y2lkYSBHcmFuZGUsIHNhbnMtc2VyaWY7JyArXHJcbiAgICAgICAgJ1RhaG9tYS9UYWhvbWEsIEdlbmV2YSwgc2Fucy1zZXJpZjsnICtcclxuICAgICAgICAnVGltZXMgTmV3IFJvbWFuL1RpbWVzIE5ldyBSb21hbiwgVGltZXMsIHNlcmlmOycgK1xyXG4gICAgICAgICdUcmVidWNoZXQgTVMvVHJlYnVjaGV0IE1TLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7JyArXHJcbiAgICAgICAgJ1ZlcmRhbmEvVmVyZGFuYSwgR2VuZXZhLCBzYW5zLXNlcmlmJyxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbWluaW1hbENvbmZpZyA9IHtcclxuICAgICAgdG9vbGJhcjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdiYXNpY3N0eWxlcycsXHJcbiAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAnU3R5bGVzJyxcclxuICAgICAgICAgICAgJ0ZvbnRTaXplJyxcclxuICAgICAgICAgICAgJ0JvbGQnLFxyXG4gICAgICAgICAgICAnSXRhbGljJyxcclxuICAgICAgICAgICAgJ1VuZGVybGluZScsXHJcbiAgICAgICAgICAgICdUZXh0Q29sb3InLFxyXG4gICAgICAgICAgICAnLScsXHJcbiAgICAgICAgICAgICdOdW1iZXJlZExpc3QnLFxyXG4gICAgICAgICAgICAnQnVsbGV0ZWRMaXN0JyxcclxuICAgICAgICAgICAgJ091dGRlbnQnLFxyXG4gICAgICAgICAgICAnSW5kZW50JyxcclxuICAgICAgICAgICAgJ0xpbmsnLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBleHRlbmRlZENvbmZpZyA9IHtcclxuICAgICAgdG9vbGJhcjogW1xyXG4gICAgICAgIHsgbmFtZTogJ2NsaXBib2FyZCcsIGl0ZW1zOiBbJ1Bhc3RlJywgJ1Bhc3RlVGV4dCcsICdQYXN0ZUZyb21Xb3JkJywgJ1VuZG8nLCAnUmVkbyddIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ3BhcmFncmFwaCcsXHJcbiAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAnTnVtYmVyZWRMaXN0JyxcclxuICAgICAgICAgICAgJ0J1bGxldGVkTGlzdCcsXHJcbiAgICAgICAgICAgICdPdXRkZW50JyxcclxuICAgICAgICAgICAgJ0luZGVudCcsXHJcbiAgICAgICAgICAgICdCbG9ja3F1b3RlJyxcclxuICAgICAgICAgICAgJ0p1c3RpZnlMZWZ0JyxcclxuICAgICAgICAgICAgJ0p1c3RpZnlDZW50ZXInLFxyXG4gICAgICAgICAgICAnSnVzdGlmeVJpZ2h0JyxcclxuICAgICAgICAgICAgJ0p1c3RpZnlCbG9jaycsXHJcbiAgICAgICAgICAgICdCaWRpTHRyJyxcclxuICAgICAgICAgICAgJ0JpZGlSdGwnLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgbmFtZTogJ2xpbmtzJywgaXRlbXM6IFsnTGluayddIH0sXHJcbiAgICAgICAgeyBuYW1lOiAnaW5zZXJ0JywgaXRlbXM6IFsnSW1hZ2UnLCAnVGFibGUnLCAnSG9yaXpvbnRhbFJ1bGUnXSB9LFxyXG4gICAgICAgIHsgbmFtZTogJ3Rvb2xzJywgaXRlbXM6IFsnTWF4aW1pemUnLCAnU291cmNlJ10gfSxcclxuICAgICAgICAnLycsIC8vIGxpbmUgYnJlYWtcclxuICAgICAgICB7IG5hbWU6ICdiYXNpY3N0eWxlcycsIGl0ZW1zOiBbJ0JvbGQnLCAnSXRhbGljJywgJ1VuZGVybGluZScsICdTdHJpa2UnLCAnU3Vic2NyaXB0JywgJ1N1cGVyc2NyaXB0J10gfSxcclxuICAgICAgICB7IG5hbWU6ICdzdHlsZXMnLCBpdGVtczogWydTdHlsZXMnLCAnRm9ybWF0JywgJ0ZvbnQnLCAnRm9udFNpemUnXSB9LFxyXG4gICAgICAgIHsgbmFtZTogJ2NvbG9ycycsIGl0ZW1zOiBbJ1RleHRDb2xvcicsICdCR0NvbG9yJ10gfSxcclxuICAgICAgXSxcclxuICAgICAgZmlsZWJyb3dzZXJJbWFnZVVwbG9hZFVybDogdGhpcy5maWxlQnJvd3NlckltYWdlVXBsb2FkVXJsLFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihiYXNlQ29uZmlnLCB0aGlzLm1pbmltYWwgPyBtaW5pbWFsQ29uZmlnIDogZXh0ZW5kZWRDb25maWcpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2Uuc2V0RGF0YSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZSh2YWx1ZT86IGFueSkge31cclxuXHJcbiAgb25Ub3VjaGVkKGV2ZW50Pykge31cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XHJcbiAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICBDS0VESVRPUi5pbnN0YW5jZXNbdGhpcy5pbnN0YW5jZS5uYW1lXS5zZXRSZWFkT25seShkaXNhYmxlZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbnNlcnRUZXh0KHRleHQpIHtcclxuICAgIGNvbnN0IHRyaW1tZWRUZXh0ID0gdGV4dC50cmltKCk7XHJcbiAgICB0aGlzLmluc3RhbmNlLmluc2VydFRleHQodHJpbW1lZFRleHQpO1xyXG4gIH1cclxufVxyXG4iXX0=