// NG2
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
// Vendor
import { from } from 'rxjs';
import { NovoLabelService } from '../../../../services/novo-label-service';
// APP
import { Helpers } from '../../../../utils/Helpers';
import { PickerResults } from '../../../picker/extras/picker-results/PickerResults';
export class QuickNoteResults extends PickerResults {
    constructor(element, labels, ref) {
        super(element, labels, ref);
        this.labels = labels;
        // Mode that the quick note is in for tagging
        this.taggingMode = '';
    }
    get term() {
        return this._term;
    }
    set term(value) {
        this._term = value.searchTerm;
        this.taggingMode = value.taggingMode;
        this.hasError = false;
        this.isLoading = true;
        this.search(value, this.taggingMode).subscribe((results) => {
            this.matches = this.isStatic ? this.filterData(results) : results;
            this.isLoading = false;
        }, () => {
            this.hasError = true;
            this.isLoading = false;
        });
    }
    search(term, taggingMode) {
        const searchCall = this.config.options[taggingMode];
        return from(new Promise((resolve, reject) => {
            // Check if there is match data
            if (searchCall) {
                // Resolve the data
                if (Array.isArray(searchCall)) {
                    this.isStatic = true;
                    // Arrays are returned immediately
                    resolve(this.structureArray(searchCall));
                }
                else if ((searchCall.hasOwnProperty('reject') && searchCall.hasOwnProperty('resolve')) ||
                    Object.getPrototypeOf(searchCall).hasOwnProperty('then')) {
                    this.isStatic = false;
                    // Promises (ES6 or Deferred) are resolved whenever they resolve
                    searchCall.then(this.structureArray.bind(this)).then(resolve, reject);
                }
                else if (typeof searchCall === 'function') {
                    this.isStatic = false;
                    // Promises (ES6 or Deferred) are resolved whenever they resolve
                    searchCall(term).then(this.structureArray.bind(this)).then(resolve, reject);
                }
                else {
                    // All other kinds of data are rejected
                    reject('The data provided is not an array or a promise');
                    throw new Error('The data provided is not an array or a promise');
                }
            }
            else {
                // No data gets rejected
                reject('error');
            }
        }));
    }
    /**
     * @name structureArray
     * @param collection - the data once getData resolves it
     *
     * @description This function structures an array of nodes into an array of objects with a
     * 'name' field by default.
     */
    structureArray(collection) {
        if (collection && (typeof collection[0] === 'string' || typeof collection[0] === 'number')) {
            return collection.map((item) => {
                return {
                    value: item,
                    label: item,
                };
            });
        }
        return collection.map((data) => {
            const value = this.config.field ? data[this.config.field[this.taggingMode]] : data.value || data;
            const label = this.config.format ? Helpers.interpolate(this.config.format[this.taggingMode], data) : data.label || String(value);
            return { value, label, data };
        });
    }
    /**
     * @name selectMatch
     * @param event
     *
     * @description
     */
    selectMatch(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        const selected = this.activeMatch;
        if (selected) {
            this.parent.onSelected(this.taggingMode, selected);
            this.parent.hideResults();
        }
        return false;
    }
}
QuickNoteResults.decorators = [
    { type: Component, args: [{
                selector: 'quick-note-results',
                host: {
                    class: 'active',
                },
                template: `
    <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
    <novo-list *ngIf="matches.length > 0">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
      >
        <item-content>
          <p [innerHtml]="highlight(match.label, term)"></p>
        </item-content>
      </novo-list-item>
    </novo-list>
    <p class="picker-error" *ngIf="hasError">{{ labels.quickNoteError }}</p>
    <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.quickNoteEmpty }}</p>
  `
            },] }
];
QuickNoteResults.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoLabelService },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVpY2tOb3RlUmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9xdWljay1ub3RlL2V4dHJhcy9xdWljay1ub3RlLXJlc3VsdHMvUXVpY2tOb3RlUmVzdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekUsU0FBUztBQUNULE9BQU8sRUFBRSxJQUFJLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDeEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDM0UsTUFBTTtBQUNOLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scURBQXFELENBQUM7QUF5QnBGLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxhQUFhO0lBSWpELFlBQVksT0FBbUIsRUFBUyxNQUF3QixFQUFFLEdBQXNCO1FBQ3RGLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRFUsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFIaEUsNkNBQTZDO1FBQzdDLGdCQUFXLEdBQVcsRUFBRSxDQUFDO0lBSXpCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQVU7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtB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QixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLFFBQVE7aUJBQ2hCO2dCQUNELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCVDthQUNGOzs7WUE5QnNDLFVBQVU7WUFHeEMsZ0JBQWdCO1lBSGhCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbi8vIEFQUFxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuaW1wb3J0IHsgUGlja2VyUmVzdWx0cyB9IGZyb20gJy4uLy4uLy4uL3BpY2tlci9leHRyYXMvcGlja2VyLXJlc3VsdHMvUGlja2VyUmVzdWx0cyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3F1aWNrLW5vdGUtcmVzdWx0cycsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FjdGl2ZScsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIiAqbmdJZj1cImlzTG9hZGluZyAmJiAhbWF0Y2hlcy5sZW5ndGhcIj48L25vdm8tbG9hZGluZz5cbiAgICA8bm92by1saXN0ICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPiAwXCI+XG4gICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgKm5nRm9yPVwibGV0IG1hdGNoIG9mIG1hdGNoZXNcIlxuICAgICAgICAoY2xpY2spPVwic2VsZWN0TWF0Y2goJGV2ZW50KVwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwibWF0Y2ggPT09IGFjdGl2ZU1hdGNoXCJcbiAgICAgICAgKG1vdXNlZW50ZXIpPVwic2VsZWN0QWN0aXZlKG1hdGNoKVwiXG4gICAgICA+XG4gICAgICAgIDxpdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgPHAgW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2gubGFiZWwsIHRlcm0pXCI+PC9wPlxuICAgICAgICA8L2l0ZW0tY29udGVudD5cbiAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgPC9ub3ZvLWxpc3Q+XG4gICAgPHAgY2xhc3M9XCJwaWNrZXItZXJyb3JcIiAqbmdJZj1cImhhc0Vycm9yXCI+e3sgbGFiZWxzLnF1aWNrTm90ZUVycm9yIH19PC9wPlxuICAgIDxwIGNsYXNzPVwicGlja2VyLW51bGxcIiAqbmdJZj1cIiFpc0xvYWRpbmcgJiYgIW1hdGNoZXMubGVuZ3RoICYmICFoYXNFcnJvclwiPnt7IGxhYmVscy5xdWlja05vdGVFbXB0eSB9fTwvcD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgUXVpY2tOb3RlUmVzdWx0cyBleHRlbmRzIFBpY2tlclJlc3VsdHMge1xuICAvLyBNb2RlIHRoYXQgdGhlIHF1aWNrIG5vdGUgaXMgaW4gZm9yIHRhZ2dpbmdcbiAgdGFnZ2luZ01vZGU6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihlbGVtZW50LCBsYWJlbHMsIHJlZik7XG4gIH1cblxuICBnZXQgdGVybSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGVybTtcbiAgfVxuXG4gIHNldCB0ZXJtKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl90ZXJtID0gdmFsdWUuc2VhcmNoVGVybTtcbiAgICB0aGlzLnRhZ2dpbmdNb2RlID0gdmFsdWUudGFnZ2luZ01vZGU7XG4gICAgdGhpcy5oYXNFcnJvciA9IGZhbHNlO1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnNlYXJjaCh2YWx1ZSwgdGhpcy50YWdnaW5nTW9kZSkuc3Vic2NyaWJlKFxuICAgICAgKHJlc3VsdHMpID0+IHtcbiAgICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5pc1N0YXRpYyA/IHRoaXMuZmlsdGVyRGF0YShyZXN1bHRzKSA6IHJlc3VsdHM7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIHNlYXJjaCh0ZXJtOiBzdHJpbmcsIHRhZ2dpbmdNb2RlKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBzZWFyY2hDYWxsID0gdGhpcy5jb25maWcub3B0aW9uc1t0YWdnaW5nTW9kZV07XG4gICAgcmV0dXJuIGZyb20oXG4gICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIG1hdGNoIGRhdGFcbiAgICAgICAgaWYgKHNlYXJjaENhbGwpIHtcbiAgICAgICAgICAvLyBSZXNvbHZlIHRoZSBkYXRhXG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VhcmNoQ2FsbCkpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdGF0aWMgPSB0cnVlO1xuICAgICAgICAgICAgLy8gQXJyYXlzIGFyZSByZXR1cm5lZCBpbW1lZGlhdGVseVxuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnN0cnVjdHVyZUFycmF5KHNlYXJjaENhbGwpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgKHNlYXJjaENhbGwuaGFzT3duUHJvcGVydHkoJ3JlamVjdCcpICYmIHNlYXJjaENhbGwuaGFzT3duUHJvcGVydHkoJ3Jlc29sdmUnKSkgfHxcbiAgICAgICAgICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihzZWFyY2hDYWxsKS5oYXNPd25Qcm9wZXJ0eSgndGhlbicpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RhdGljID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBQcm9taXNlcyAoRVM2IG9yIERlZmVycmVkKSBhcmUgcmVzb2x2ZWQgd2hlbmV2ZXIgdGhleSByZXNvbHZlXG4gICAgICAgICAgICBzZWFyY2hDYWxsLnRoZW4odGhpcy5zdHJ1Y3R1cmVBcnJheS5iaW5kKHRoaXMpKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VhcmNoQ2FsbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5pc1N0YXRpYyA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gUHJvbWlzZXMgKEVTNiBvciBEZWZlcnJlZCkgYXJlIHJlc29sdmVkIHdoZW5ldmVyIHRoZXkgcmVzb2x2ZVxuICAgICAgICAgICAgc2VhcmNoQ2FsbCh0ZXJtKS50aGVuKHRoaXMuc3RydWN0dXJlQXJyYXkuYmluZCh0aGlzKSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBBbGwgb3RoZXIga2luZHMgb2YgZGF0YSBhcmUgcmVqZWN0ZWRcbiAgICAgICAgICAgIHJlamVjdCgnVGhlIGRhdGEgcHJvdmlkZWQgaXMgbm90IGFuIGFycmF5IG9yIGEgcHJvbWlzZScpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBwcm92aWRlZCBpcyBub3QgYW4gYXJyYXkgb3IgYSBwcm9taXNlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE5vIGRhdGEgZ2V0cyByZWplY3RlZFxuICAgICAgICAgIHJlamVjdCgnZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbmFtZSBzdHJ1Y3R1cmVBcnJheVxuICAgKiBAcGFyYW0gY29sbGVjdGlvbiAtIHRoZSBkYXRhIG9uY2UgZ2V0RGF0YSByZXNvbHZlcyBpdFxuICAgKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzdHJ1Y3R1cmVzIGFuIGFycmF5IG9mIG5vZGVzIGludG8gYW4gYXJyYXkgb2Ygb2JqZWN0cyB3aXRoIGFcbiAgICogJ25hbWUnIGZpZWxkIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBzdHJ1Y3R1cmVBcnJheShjb2xsZWN0aW9uOiBBcnJheTxhbnk+KSB7XG4gICAgaWYgKGNvbGxlY3Rpb24gJiYgKHR5cGVvZiBjb2xsZWN0aW9uWzBdID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgY29sbGVjdGlvblswXSA9PT0gJ251bWJlcicpKSB7XG4gICAgICByZXR1cm4gY29sbGVjdGlvbi5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogaXRlbSxcbiAgICAgICAgICBsYWJlbDogaXRlbSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbi5tYXAoKGRhdGEpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5jb25maWcuZmllbGQgPyBkYXRhW3RoaXMuY29uZmlnLmZpZWxkW3RoaXMudGFnZ2luZ01vZGVdXSA6IGRhdGEudmFsdWUgfHwgZGF0YTtcbiAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5jb25maWcuZm9ybWF0ID8gSGVscGVycy5pbnRlcnBvbGF0ZSh0aGlzLmNvbmZpZy5mb3JtYXRbdGhpcy50YWdnaW5nTW9kZV0sIGRhdGEpIDogZGF0YS5sYWJlbCB8fCBTdHJpbmcodmFsdWUpO1xuICAgICAgcmV0dXJuIHsgdmFsdWUsIGxhYmVsLCBkYXRhIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG5hbWUgc2VsZWN0TWF0Y2hcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2VsZWN0TWF0Y2goZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuYWN0aXZlTWF0Y2g7XG4gICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnBhcmVudC5vblNlbGVjdGVkKHRoaXMudGFnZ2luZ01vZGUsIHNlbGVjdGVkKTtcbiAgICAgIHRoaXMucGFyZW50LmhpZGVSZXN1bHRzKCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19