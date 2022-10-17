import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFieldInteractionEvent } from './form-interfaces';
export declare class NovoFormGroup extends FormGroup {
    fieldInteractionEvents: EventEmitter<IFieldInteractionEvent>;
    layout: string;
    edit: boolean;
    currentEntity: string;
    currentEntityId: string;
    associations: object;
    fieldsets: any[];
    _value: any;
    controls: {
        [key: string]: any;
    };
    novoControls: any[];
    enableAllControls(): void;
    disableAllControls(): void;
}
