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
DecodeURIPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DecodeURIPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
DecodeURIPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DecodeURIPipe, name: "decodeURI" });
DecodeURIPipe.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DecodeURIPipe });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DecodeURIPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'decodeURI' }]
        }, {
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjb2RlVVJJLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvcGlwZXMvZGVjb2RlLXVyaS9EZWNvZGVVUkkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNoRSxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQUk5QyxNQUFNLE9BQU8sYUFBYTtJQUN4QixTQUFTLENBQUMsYUFBcUI7UUFDN0IsSUFBSSxhQUFhLEdBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRTtZQUN4RSxhQUFhLEdBQUcsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbkQ7UUFDRCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDOzswR0FQVSxhQUFhO3dHQUFiLGFBQWE7OEdBQWIsYUFBYTsyRkFBYixhQUFhO2tCQUZ6QixJQUFJO21CQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTs7a0JBQzFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEluamVjdGFibGUsIFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFwcFxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdkZWNvZGVVUkknIH0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjb2RlVVJJUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oZW5jb2RlZFN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgZGVjb2RlZFN0cmluZzogc3RyaW5nID0gJyc7XG4gICAgaWYgKCFIZWxwZXJzLmlzQmxhbmsoZW5jb2RlZFN0cmluZykgJiYgdHlwZW9mIGVuY29kZWRTdHJpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkZWNvZGVkU3RyaW5nID0gZGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZWRTdHJpbmcpO1xuICAgIH1cbiAgICByZXR1cm4gZGVjb2RlZFN0cmluZztcbiAgfVxufVxuIl19