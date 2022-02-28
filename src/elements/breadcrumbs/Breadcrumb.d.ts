import { TemplateRef } from '@angular/core';
import { BreadcrumbService } from './Breadcrumb.service';
import { SourceConfig } from './Breadcrumb.types';
export declare class BreadcrumbElement {
    private breadcrumbService;
    separatorIcon: TemplateRef<any>;
    source: Array<SourceConfig>;
    constructor(breadcrumbService: BreadcrumbService);
    navigateTo($event: any, item: any): void;
}
