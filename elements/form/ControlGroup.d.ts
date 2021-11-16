import { AfterContentInit, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NovoFormGroup } from './NovoFormGroup';
import { BaseControl } from './controls/BaseControl';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import * as ɵngcc0 from '@angular/core';
export interface NovoControlGroupAddConfig {
    label: string;
}
export interface NovoControlGroupRowConfig {
    edit: boolean;
    remove: boolean;
}
export declare class NovoControlGroup implements AfterContentInit, OnChanges, OnDestroy {
    private formUtils;
    private fb;
    private ref;
    set vertical(v: boolean);
    get vertical(): boolean;
    private _vertical;
    add: NovoControlGroupAddConfig;
    set remove(v: boolean);
    get remove(): boolean;
    private _remove;
    set edit(v: boolean);
    get edit(): boolean;
    private _edit;
    set collapsible(v: boolean);
    get collapsible(): boolean;
    private _collapsible;
    form: NovoFormGroup;
    controls: BaseControl[];
    key: string;
    label: string;
    description: string;
    emptyMessage: string;
    set icon(v: string);
    get icon(): string;
    private _icon;
    initialValue: {}[];
    canEdit: Function;
    canRemove: Function;
    shouldRemove: (number: any) => Promise<boolean>;
    rowTemplate: TemplateRef<any>;
    columnLabelTemplate: TemplateRef<any>;
    onRemove: EventEmitter<{
        value: any;
        index: any;
    }>;
    onEdit: EventEmitter<{
        value: any;
        index: any;
    }>;
    onAdd: EventEmitter<any>;
    change: EventEmitter<any>;
    controlLabels: {
        value: string;
        width: number;
        required: boolean;
        key: string;
    }[];
    toggled: boolean;
    disabledArray: {
        edit: boolean;
        remove: boolean;
    }[];
    currentIndex: number;
    constructor(formUtils: FormUtils, fb: FormBuilder, ref: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    onChange(): void;
    resetAddRemove(): void;
    addNewControl(value?: {}): void;
    /**
     * Will remove the control, and optionally, if the event is to be publicized (emitEvent = true) and there is a
     * shouldRemove callback, then call the shouldRemove() callback to determine if the doRemoveControl should be called.
     */
    removeControl(index: number, emitEvent?: boolean): void;
    private doRemoveControl;
    editControl(index: number): void;
    toggle(event: MouseEvent): void;
    private buildNestedFormGroup;
    private clearControls;
    private checkCanEdit;
    private checkCanRemove;
    private getNewControls;
    private assignIndexes;
    private onFieldInteractionEvent;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoControlGroup, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoControlGroup, "novo-control-group", never, { "vertical": "vertical"; "remove": "remove"; "edit": "edit"; "collapsible": "collapsible"; "icon": "icon"; "add": "add"; "form": "form"; "controls": "controls"; "key": "key"; "label": "label"; "description": "description"; "emptyMessage": "emptyMessage"; "initialValue": "initialValue"; "canEdit": "canEdit"; "canRemove": "canRemove"; "shouldRemove": "shouldRemove"; "rowTemplate": "rowTemplate"; "columnLabelTemplate": "columnLabelTemplate"; }, { "onRemove": "onRemove"; "onEdit": "onEdit"; "onAdd": "onAdd"; "change": "change"; }, never, never>;
}

//# sourceMappingURL=ControlGroup.d.ts.map