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
OptionsService.ɵfac = function OptionsService_Factory(t) { return new (t || OptionsService)(); };
OptionsService.ɵprov = i0.ɵɵdefineInjectable({ token: OptionsService, factory: OptionsService.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(OptionsService, [{
        type: Injectable
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3B0aW9uc1NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsic2VydmljZXMvb3B0aW9ucy9PcHRpb25zU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUMzQyxNQUFNO0FBR04sTUFBTSxPQUFPLGNBQWM7SUFDekIsZ0JBQWUsQ0FBQztJQUVoQixnQkFBZ0IsQ0FBQyxJQUFnQixFQUFFLEtBQVUsRUFBRSxNQUFnRTtRQUM3RyxPQUFPO1lBQ0wsS0FBSyxFQUFFLE9BQU87WUFDZCxNQUFNLEVBQUUsUUFBUTtZQUNoQixPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDakIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDckMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTt3QkFDekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQy9DLElBQUksUUFBUSxDQUFDO3dCQUNiLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7NEJBQzlCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDdEMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQzs0QkFDNUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt5QkFDM0I7NkJBQU07NEJBQ0wsa0ZBQWtGOzRCQUNsRixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQywwQkFBMEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7NEJBQ2xFLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7NEJBQzVDLFFBQVEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO3lCQUMzQzt3QkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7cUJBQy9DO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDYjtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7U0FDRixDQUFDO0lBQ0osQ0FBQzs7NEVBN0JVLGNBQWM7c0RBQWQsY0FBYyxXQUFkLGNBQWM7a0RBQWQsY0FBYztjQUQxQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQXBwXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcHRpb25zU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBnZXRPcHRpb25zQ29uZmlnKGh0dHA6IEh0dHBDbGllbnQsIGZpZWxkOiBhbnksIGNvbmZpZzogeyB0b2tlbj86IHN0cmluZzsgcmVzdFVybD86IHN0cmluZzsgbWlsaXRhcnk/OiBib29sZWFuIH0pOiBhbnkge1xuICAgIHJldHVybiB7XG4gICAgICBmaWVsZDogJ3ZhbHVlJyxcbiAgICAgIGZvcm1hdDogJyRsYWJlbCcsXG4gICAgICBvcHRpb25zOiAocXVlcnkpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpZiAocXVlcnkgJiYgcXVlcnkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBleHAgPSBuZXcgUmVnRXhwKCdeKD86W2Etel0rOik/Ly8nLCAnaScpO1xuICAgICAgICAgICAgbGV0IGVuZHBvaW50O1xuICAgICAgICAgICAgaWYgKGV4cC50ZXN0KGZpZWxkLm9wdGlvbnNVcmwpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZmllbGQub3B0aW9uc1VybCk7XG4gICAgICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdmaWx0ZXInLCBxdWVyeSB8fCAnJyk7XG4gICAgICAgICAgICAgIGVuZHBvaW50ID0gdXJsLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBDb25zdHJ1Y3QgcmVsYXRpdmUgdXJsIChob3N0IHdpbGwgbm90IGJlIHVzZWQgYnV0IGlzIHJlcXVpcmVkIGZvciBjb25zdHJ1Y3Rpb24pXG4gICAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoYGh0dHA6Ly9wbGFjZWhvbGRlci5jb20vJHtmaWVsZC5vcHRpb25zVXJsfWApO1xuICAgICAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgnZmlsdGVyJywgcXVlcnkgfHwgJycpO1xuICAgICAgICAgICAgICBlbmRwb2ludCA9IGAke3VybC5wYXRobmFtZX0ke3VybC5zZWFyY2h9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0dHAuZ2V0KGVuZHBvaW50KS5zdWJzY3JpYmUocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxufVxuIl19