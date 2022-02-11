import { EmbeddedViewRef, QueryList, TemplateRef, ViewContainerRef } from '@angular/core';
export declare class NovoLoadingElement {
    /**
     * **deprecated** please use `color`.
     * @deprecated
     **/
    set theme(value: string);
    get theme(): string;
    color: string;
    size: string;
    get hb_class(): string;
}
export declare class NovoSpinnerElement {
    /**
     * **deprecated** please use `color`.
     * @deprecated
     **/
    set theme(value: string);
    get theme(): string;
    color: string;
    size: string;
    private _inverse;
    get inverse(): boolean;
    set inverse(value: boolean);
    get hb_class(): string;
}
export declare class NovoSkeletonDirective {
    skeleton: boolean;
}
export declare class NovoLoadedDirective {
}
export declare class NovoIsLoadingDirective {
    private viewContainer;
    skeletonTemplates: QueryList<TemplateRef<any>>;
    loadedTemplates: QueryList<TemplateRef<any>>;
    private hasView;
    private skeletonViews;
    private loadedViews;
    constructor(viewContainer: ViewContainerRef);
    set isLoading(condition: boolean);
    createViews(templates: QueryList<TemplateRef<any>>): EmbeddedViewRef<any>[];
    destroyViews(views: EmbeddedViewRef<any>[]): void;
}
