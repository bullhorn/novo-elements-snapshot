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
                        http.get(`${field.optionsUrl}?filter=${query || ''}`).subscribe(resolve, reject);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3B0aW9uc1NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL29wdGlvbnMvT3B0aW9uc1NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxNQUFNO0FBR04sTUFBTSxPQUFPLGNBQWM7SUFDekIsZ0JBQWdCLENBQUM7SUFFakIsZ0JBQWdCLENBQUMsSUFBZ0IsRUFBRSxLQUFVLEVBQUUsTUFBZ0U7UUFDN0csT0FBTztZQUNMLEtBQUssRUFBRSxPQUFPO1lBQ2QsTUFBTSxFQUFFLFFBQVE7WUFDaEIsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2pCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0JBQ3JDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7d0JBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxXQUFXLEtBQUssSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7cUJBQ2xGO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDYjtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBbEJGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBBcHBcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE9wdGlvbnNTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBnZXRPcHRpb25zQ29uZmlnKGh0dHA6IEh0dHBDbGllbnQsIGZpZWxkOiBhbnksIGNvbmZpZzogeyB0b2tlbj86IHN0cmluZzsgcmVzdFVybD86IHN0cmluZzsgbWlsaXRhcnk/OiBib29sZWFuIH0pOiBhbnkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZmllbGQ6ICd2YWx1ZScsXHJcbiAgICAgIGZvcm1hdDogJyRsYWJlbCcsXHJcbiAgICAgIG9wdGlvbnM6IChxdWVyeSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICBpZiAocXVlcnkgJiYgcXVlcnkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGh0dHAuZ2V0KGAke2ZpZWxkLm9wdGlvbnNVcmx9P2ZpbHRlcj0ke3F1ZXJ5IHx8ICcnfWApLnN1YnNjcmliZShyZXNvbHZlLCByZWplY3QpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShbXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=