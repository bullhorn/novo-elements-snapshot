import { EmbeddedViewRef, QueryList, TemplateRef, ViewContainerRef } from '@angular/core';
export declare class NovoLoadingElement {
    theme: string;
}
export declare class NovoSpinnerElement {
    theme: string;
    inverse: boolean;
    baseHref: string;
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
