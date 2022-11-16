export interface NovoFieldset {
    title?: string;
    icon?: string;
    key?: string;
    controls: any[];
    isEmbedded?: boolean;
    isInlineEmbedded?: boolean;
    hidden?: boolean;
}
export interface IFieldInteractionEvent {
    controlKey: string;
    prop: string;
    value: any;
}
export interface FormField {
    dataSpecialization: string;
    inputType: string;
    options: string;
    multiValue: boolean;
    dataType: string;
    type: string;
    associatedEntity?: {
        entity: string;
    };
    optionsUrl?: string;
    optionsType?: string;
    parentEntity?: string;
}
export declare type ResultsTemplateType = 'entity-picker';
export interface NovoControlGroupAddConfig {
    label: string;
}
export declare enum EditState {
    EDITING = "editing",
    NOT_EDITING = "notediting"
}
export interface NovoControlGroupRowConfig {
    edit: boolean;
    remove: boolean;
    state: EditState;
}
