import { Router } from '@angular/router';
export declare class BreadcrumbService {
    private router;
    constructor(router: Router);
    navigateTo($event: any, item: any): void;
}
