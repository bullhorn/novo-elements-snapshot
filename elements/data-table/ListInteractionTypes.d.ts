import { NovoDataTable } from './data-table.component';
export declare type ListInteractionEvent = 'init' | 'change';
export declare type ListInteraction = {
    script: (novoDataTable: NovoDataTable<any>, columnId: string) => void;
    action: string;
    event: ListInteractionEvent[];
};
export declare type ListInteractionDictionary = {
    [key: string]: ListInteraction[];
};
