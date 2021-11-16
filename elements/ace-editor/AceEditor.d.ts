import { EventEmitter, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import 'brace/index';
import 'brace/theme/chrome';
import 'brace/mode/javascript';
import 'brace/ext/language_tools.js';
import * as ɵngcc0 from '@angular/core';
export declare class NovoAceEditor implements ControlValueAccessor, OnInit, OnDestroy {
    private elementRef;
    set theme(theme: any);
    set options(options: any);
    set mode(mode: any);
    name: string;
    blur: EventEmitter<any>;
    focus: EventEmitter<any>;
    private _options;
    private _theme;
    private _mode;
    private text;
    private oldText;
    private editor;
    private onChange;
    private onTouched;
    constructor(elementRef: ElementRef);
    ngOnDestroy(): void;
    ngOnInit(): void;
    private initializeEditor;
    private initializeOptions;
    private initializeEvents;
    private updateText;
    private setText;
    private setOptions;
    private setTheme;
    private setMode;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoAceEditor, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoAceEditor, "novo-ace-editor", never, { "theme": "theme"; "options": "options"; "mode": "mode"; "name": "name"; }, { "blur": "blur"; "focus": "focus"; }, never, never>;
}

//# sourceMappingURL=AceEditor.d.ts.map