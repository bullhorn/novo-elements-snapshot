import { Injectable } from '@angular/core';
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
OptionsService.decorators = [
    { type: Injectable }
];
OptionsService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3B0aW9uc1NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvb3B0aW9ucy9PcHRpb25zU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE1BQU07QUFHTixNQUFNLE9BQU8sY0FBYztJQUN6QixnQkFBZSxDQUFDO0lBRWhCLGdCQUFnQixDQUFDLElBQWdCLEVBQUUsS0FBVSxFQUFFLE1BQWdFO1FBQzdHLE9BQU87WUFDTCxLQUFLLEVBQUUsT0FBTztZQUNkLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNqQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO29CQUNyQyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO3dCQUN6QixNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDL0MsSUFBSSxRQUFRLENBQUM7d0JBQ2IsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDOUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUN0QyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDOzRCQUM1QyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO3lCQUMzQjs2QkFBTTs0QkFDTCxrRkFBa0Y7NEJBQ2xGLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLDBCQUEwQixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDbEUsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQzs0QkFDNUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7eUJBQzNDO3dCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDL0M7eUJBQU07d0JBQ0wsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNiO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztTQUNGLENBQUM7SUFDSixDQUFDOzs7WUE5QkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFwcFxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3B0aW9uc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ2V0T3B0aW9uc0NvbmZpZyhodHRwOiBIdHRwQ2xpZW50LCBmaWVsZDogYW55LCBjb25maWc6IHsgdG9rZW4/OiBzdHJpbmc7IHJlc3RVcmw/OiBzdHJpbmc7IG1pbGl0YXJ5PzogYm9vbGVhbiB9KTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgZmllbGQ6ICd2YWx1ZScsXG4gICAgICBmb3JtYXQ6ICckbGFiZWwnLFxuICAgICAgb3B0aW9uczogKHF1ZXJ5KSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgaWYgKHF1ZXJ5ICYmIHF1ZXJ5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgZXhwID0gbmV3IFJlZ0V4cCgnXig/OlthLXpdKzopPy8vJywgJ2knKTtcbiAgICAgICAgICAgIGxldCBlbmRwb2ludDtcbiAgICAgICAgICAgIGlmIChleHAudGVzdChmaWVsZC5vcHRpb25zVXJsKSkge1xuICAgICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGZpZWxkLm9wdGlvbnNVcmwpO1xuICAgICAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgnZmlsdGVyJywgcXVlcnkgfHwgJycpO1xuICAgICAgICAgICAgICBlbmRwb2ludCA9IHVybC50b1N0cmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gQ29uc3RydWN0IHJlbGF0aXZlIHVybCAoaG9zdCB3aWxsIG5vdCBiZSB1c2VkIGJ1dCBpcyByZXF1aXJlZCBmb3IgY29uc3RydWN0aW9uKVxuICAgICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGBodHRwOi8vcGxhY2Vob2xkZXIuY29tLyR7ZmllbGQub3B0aW9uc1VybH1gKTtcbiAgICAgICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2ZpbHRlcicsIHF1ZXJ5IHx8ICcnKTtcbiAgICAgICAgICAgICAgZW5kcG9pbnQgPSBgJHt1cmwucGF0aG5hbWV9JHt1cmwuc2VhcmNofWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodHRwLmdldChlbmRwb2ludCkuc3Vic2NyaWJlKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cbiJdfQ==