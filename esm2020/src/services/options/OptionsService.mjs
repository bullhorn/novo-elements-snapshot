import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
// App
export class OptionsService {
    constructor() { }
    getOptionsConfig(http, field, config) {
        return {
            field: 'value',
            format: '$label',
            options: (query) => {
                return new Promise((resolve, reject) => {
                    if (query && query.length) {
                        const exp = new RegExp('^(?:[a-z]+:)?//', 'i');
                        let endpoint;
                        if (exp.test(field.optionsUrl)) {
                            const url = new URL(field.optionsUrl);
                            url.searchParams.set('filter', query || '');
                            endpoint = url.toString();
                        }
                        else {
                            // Construct relative url (host will not be used but is required for construction)
                            const url = new URL(`http://placeholder.com/${field.optionsUrl}`);
                            url.searchParams.set('filter', query || '');
                            endpoint = `${url.pathname}${url.search}`;
                        }
                        http.get(endpoint).subscribe(resolve, reject);
                    }
                    else {
                        resolve([]);
                    }
                });
            },
        };
    }
}
OptionsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: OptionsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OptionsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: OptionsService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: OptionsService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3B0aW9uc1NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9zZXJ2aWNlcy9vcHRpb25zL09wdGlvbnNTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBQzNDLE1BQU07QUFHTixNQUFNLE9BQU8sY0FBYztJQUN6QixnQkFBZSxDQUFDO0lBRWhCLGdCQUFnQixDQUFDLElBQWdCLEVBQUUsS0FBVSxFQUFFLE1BQWdFO1FBQzdHLE9BQU87WUFDTCxLQUFLLEVBQUUsT0FBTztZQUNkLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNqQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO29CQUNyQyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO3dCQUN6QixNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDL0MsSUFBSSxRQUFRLENBQUM7d0JBQ2IsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDOUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUN0QyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDOzRCQUM1QyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO3lCQUMzQjs2QkFBTTs0QkFDTCxrRkFBa0Y7NEJBQ2xGLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLDBCQUEwQixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDbEUsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQzs0QkFDNUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7eUJBQzNDO3dCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDL0M7eUJBQU07d0JBQ0wsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNiO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztTQUNGLENBQUM7SUFDSixDQUFDOzsyR0E3QlUsY0FBYzsrR0FBZCxjQUFjOzJGQUFkLGNBQWM7a0JBRDFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBcHBcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9wdGlvbnNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldE9wdGlvbnNDb25maWcoaHR0cDogSHR0cENsaWVudCwgZmllbGQ6IGFueSwgY29uZmlnOiB7IHRva2VuPzogc3RyaW5nOyByZXN0VXJsPzogc3RyaW5nOyBtaWxpdGFyeT86IGJvb2xlYW4gfSk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpZWxkOiAndmFsdWUnLFxuICAgICAgZm9ybWF0OiAnJGxhYmVsJyxcbiAgICAgIG9wdGlvbnM6IChxdWVyeSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGlmIChxdWVyeSAmJiBxdWVyeS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4cCA9IG5ldyBSZWdFeHAoJ14oPzpbYS16XSs6KT8vLycsICdpJyk7XG4gICAgICAgICAgICBsZXQgZW5kcG9pbnQ7XG4gICAgICAgICAgICBpZiAoZXhwLnRlc3QoZmllbGQub3B0aW9uc1VybCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChmaWVsZC5vcHRpb25zVXJsKTtcbiAgICAgICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2ZpbHRlcicsIHF1ZXJ5IHx8ICcnKTtcbiAgICAgICAgICAgICAgZW5kcG9pbnQgPSB1cmwudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIENvbnN0cnVjdCByZWxhdGl2ZSB1cmwgKGhvc3Qgd2lsbCBub3QgYmUgdXNlZCBidXQgaXMgcmVxdWlyZWQgZm9yIGNvbnN0cnVjdGlvbilcbiAgICAgICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChgaHR0cDovL3BsYWNlaG9sZGVyLmNvbS8ke2ZpZWxkLm9wdGlvbnNVcmx9YCk7XG4gICAgICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdmaWx0ZXInLCBxdWVyeSB8fCAnJyk7XG4gICAgICAgICAgICAgIGVuZHBvaW50ID0gYCR7dXJsLnBhdGhuYW1lfSR7dXJsLnNlYXJjaH1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHR0cC5nZXQoZW5kcG9pbnQpLnN1YnNjcmliZShyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKFtdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9O1xuICB9XG59XG4iXX0=