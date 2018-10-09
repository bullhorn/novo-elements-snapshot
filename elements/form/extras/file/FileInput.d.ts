import { ElementRef, OnInit, OnDestroy, OnChanges, ViewContainerRef, TemplateRef, SimpleChanges, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { NovoDragulaService } from '../../../../elements/dragula/DragulaService';
export declare class NovoFileInputElement implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    private element;
    labels: NovoLabelService;
    private dragula;
    fileInput: TemplateRef<any>;
    fileOutput: TemplateRef<any>;
    container: ViewContainerRef;
    name: string;
    multiple: boolean;
    disabled: boolean;
    placeholder: string;
    layoutOptions: {
        order?: string;
        download?: boolean;
        removable?: boolean;
        edit?: boolean;
        labelStyle?: string;
        draggable?: boolean;
    };
    value: Array<any>;
    edit: EventEmitter<any>;
    save: EventEmitter<any>;
    delete: EventEmitter<any>;
    upload: EventEmitter<any>;
    elements: Array<any>;
    files: Array<any>;
    model: any;
    active: boolean;
    commands: any;
    visible: boolean;
    target: any;
    fileOutputBag: string;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(element: ElementRef, labels: NovoLabelService, dragula: NovoDragulaService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    updateLayout(): void;
    insertTemplatesBasedOnLayout(): any;
    initializeDragula(): void;
    setInitialFileList(): void;
    dragEnterHandler(event: any): void;
    dragLeaveHandler(event: any): void;
    dragOverHandler(event: any): void;
    dropHandler(event: any): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    check(event: any): void;
    process(filelist: any): void;
    download(file: any): void;
    remove(file: any): void;
    readFile(file: any): Promise<{}>;
    customEdit(file: any): void;
    customSave(file: any): void;
    customDelete(file: any): void;
    customCheck(event: any): void;
    setDisabledState(disabled: boolean): void;
}
