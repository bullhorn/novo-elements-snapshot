// NG2
import { Injectable, Pipe } from '@angular/core';
import { Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export class DecodeURIPipe {
    transform(encodedString) {
        let decodedString = '';
        if (!Helpers.isBlank(encodedString) && typeof encodedString === 'string') {
            decodedString = decodeURIComponent(encodedString);
        }
        return decodedString;
    }
}
DecodeURIPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DecodeURIPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
DecodeURIPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DecodeURIPipe, name: "decodeURI" });
DecodeURIPipe.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DecodeURIPipe });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DecodeURIPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'decodeURI' }]
        }, {
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb2RlLXVyaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL3BpcGVzL2RlY29kZS11cmkvZGVjb2RlLXVyaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFJOUMsTUFBTSxPQUFPLGFBQWE7SUFDeEIsU0FBUyxDQUFDLGFBQXFCO1FBQzdCLElBQUksYUFBYSxHQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUU7WUFDeEUsYUFBYSxHQUFHLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQzs7MkdBUFUsYUFBYTt5R0FBYixhQUFhOytHQUFiLGFBQWE7NEZBQWIsYUFBYTtrQkFGekIsSUFBSTttQkFBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7O2tCQUMxQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbkBQaXBlKHsgbmFtZTogJ2RlY29kZVVSSScgfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNvZGVVUklQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShlbmNvZGVkU3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBkZWNvZGVkU3RyaW5nOiBzdHJpbmcgPSAnJztcbiAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayhlbmNvZGVkU3RyaW5nKSAmJiB0eXBlb2YgZW5jb2RlZFN0cmluZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRlY29kZWRTdHJpbmcgPSBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZFN0cmluZyk7XG4gICAgfVxuICAgIHJldHVybiBkZWNvZGVkU3RyaW5nO1xuICB9XG59XG4iXX0=