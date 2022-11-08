import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
OptionsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: OptionsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OptionsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: OptionsService, providedIn: `root` });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: OptionsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: `root`,
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvc2VydmljZXMvb3B0aW9ucy9vcHRpb25zLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLGNBQWM7SUFDekIsZ0JBQWUsQ0FBQztJQUVoQixnQkFBZ0IsQ0FBQyxJQUFnQixFQUFFLEtBQVUsRUFBRSxNQUFnRTtRQUM3RyxPQUFPO1lBQ0wsS0FBSyxFQUFFLE9BQU87WUFDZCxNQUFNLEVBQUUsUUFBUTtZQUNoQixPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDakIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDckMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTt3QkFDekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQy9DLElBQUksUUFBUSxDQUFDO3dCQUNiLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7NEJBQzlCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDdEMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQzs0QkFDNUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt5QkFDM0I7NkJBQU07NEJBQ0wsa0ZBQWtGOzRCQUNsRixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQywwQkFBMEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7NEJBQ2xFLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7NEJBQzVDLFFBQVEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO3lCQUMzQzt3QkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7cUJBQy9DO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDYjtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7U0FDRixDQUFDO0lBQ0osQ0FBQzs7NEdBN0JVLGNBQWM7Z0hBQWQsY0FBYyxjQUZiLE1BQU07NEZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46IGByb290YCxcbn0pXG5leHBvcnQgY2xhc3MgT3B0aW9uc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ2V0T3B0aW9uc0NvbmZpZyhodHRwOiBIdHRwQ2xpZW50LCBmaWVsZDogYW55LCBjb25maWc6IHsgdG9rZW4/OiBzdHJpbmc7IHJlc3RVcmw/OiBzdHJpbmc7IG1pbGl0YXJ5PzogYm9vbGVhbiB9KTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgZmllbGQ6ICd2YWx1ZScsXG4gICAgICBmb3JtYXQ6ICckbGFiZWwnLFxuICAgICAgb3B0aW9uczogKHF1ZXJ5KSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgaWYgKHF1ZXJ5ICYmIHF1ZXJ5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgZXhwID0gbmV3IFJlZ0V4cCgnXig/OlthLXpdKzopPy8vJywgJ2knKTtcbiAgICAgICAgICAgIGxldCBlbmRwb2ludDtcbiAgICAgICAgICAgIGlmIChleHAudGVzdChmaWVsZC5vcHRpb25zVXJsKSkge1xuICAgICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGZpZWxkLm9wdGlvbnNVcmwpO1xuICAgICAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgnZmlsdGVyJywgcXVlcnkgfHwgJycpO1xuICAgICAgICAgICAgICBlbmRwb2ludCA9IHVybC50b1N0cmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gQ29uc3RydWN0IHJlbGF0aXZlIHVybCAoaG9zdCB3aWxsIG5vdCBiZSB1c2VkIGJ1dCBpcyByZXF1aXJlZCBmb3IgY29uc3RydWN0aW9uKVxuICAgICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGBodHRwOi8vcGxhY2Vob2xkZXIuY29tLyR7ZmllbGQub3B0aW9uc1VybH1gKTtcbiAgICAgICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2ZpbHRlcicsIHF1ZXJ5IHx8ICcnKTtcbiAgICAgICAgICAgICAgZW5kcG9pbnQgPSBgJHt1cmwucGF0aG5hbWV9JHt1cmwuc2VhcmNofWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodHRwLmdldChlbmRwb2ludCkuc3Vic2NyaWJlKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cbiJdfQ==