// NG2
import { Injectable, Pipe } from '@angular/core';
// App
import { Helpers } from '../../utils/Helpers';
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
DecodeURIPipe.ɵfac = function DecodeURIPipe_Factory(t) { return new (t || DecodeURIPipe)(); };
DecodeURIPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "decodeURI", type: DecodeURIPipe, pure: true });
DecodeURIPipe.ɵprov = i0.ɵɵdefineInjectable({ token: DecodeURIPipe, factory: DecodeURIPipe.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DecodeURIPipe, [{
        type: Pipe,
        args: [{ name: 'decodeURI' }]
    }, {
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjb2RlVVJJLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbInBpcGVzL2RlY29kZS11cmkvRGVjb2RlVVJJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDaEUsTUFBTTtBQUNOLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFJOUMsTUFBTSxPQUFPLGFBQWE7SUFDeEIsU0FBUyxDQUFDLGFBQXFCO1FBQzdCLElBQUksYUFBYSxHQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUU7WUFDeEUsYUFBYSxHQUFHLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQzs7MEVBUFUsYUFBYTtpRUFBYixhQUFhO3FEQUFiLGFBQWEsV0FBYixhQUFhO2tEQUFiLGFBQWE7Y0FGekIsSUFBSTtlQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTs7Y0FDMUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQXBwXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG5cbkBQaXBlKHsgbmFtZTogJ2RlY29kZVVSSScgfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNvZGVVUklQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShlbmNvZGVkU3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBkZWNvZGVkU3RyaW5nOiBzdHJpbmcgPSAnJztcbiAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayhlbmNvZGVkU3RyaW5nKSAmJiB0eXBlb2YgZW5jb2RlZFN0cmluZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRlY29kZWRTdHJpbmcgPSBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZFN0cmluZyk7XG4gICAgfVxuICAgIHJldHVybiBkZWNvZGVkU3RyaW5nO1xuICB9XG59XG4iXX0=