import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { EditorView } from '@codemirror/view';
import * as i0 from "@angular/core";
export declare class NovoCodeEditor implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {
    private elementRef;
    theme: string;
    lineNumbers: boolean;
    name: string;
    blur: EventEmitter<any>;
    focus: EventEmitter<any>;
    private changed;
    mode: string;
    editorRoot: ElementRef<HTMLElement>;
    editorView: EditorView;
    initialValue: string;
    private disabled;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    createEditorView(): void;
    onFocus(): void;
    onBlur(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCodeEditor, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoCodeEditor, "novo-code-editor", never, { "theme": "theme"; "lineNumbers": "lineNumbers"; "name": "name"; "mode": "mode"; }, { "blur": "blur"; "focus": "focus"; }, never, never>;
}