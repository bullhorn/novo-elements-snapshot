import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
export class NovoAsideRef {
    constructor(component, params, overlayRef) {
        this.component = component;
        this.params = params;
        this.overlayRef = overlayRef;
        this._beforeClose = new Subject();
        this._afterClosed = new Subject();
        this.isClosed = false;
    }
    // Gets a promise that is resolved when the dialog is closed.
    get onClosed() {
        return this._afterClosed.toPromise();
    }
    afterClosed() {
        return this._afterClosed.asObservable();
    }
    beforeClose() {
        return this._beforeClose.asObservable();
    }
    close(result) {
        // Listen for animation 'start' events
        this.componentInstance.animationStateChanged
            .pipe(filter((event) => event.phaseName === 'start'), take(1))
            .subscribe(() => {
            this._beforeClose.next(result);
            this._beforeClose.complete();
            this.overlayRef.detachBackdrop();
        });
        // Listen for animation 'done' events
        this.componentInstance.animationStateChanged
            .pipe(filter((event) => event.phaseName === 'done' && event.toState === 'leave'), take(1))
            .subscribe(() => {
            this.isClosed = true;
            this.overlayRef.dispose();
            this._afterClosed.next(result);
            this._afterClosed.complete();
            // Make sure to also clear the reference to the
            // component instance to avoid memory leaks
            this.componentInstance = null;
        });
        // Start exit animation
        this.componentInstance.startExitAnimation();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNpZGUtcmVmLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2FzaWRlL2FzaWRlLXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUMsTUFBTSxPQUFPLFlBQVk7SUFDdkIsWUFBbUIsU0FBYyxFQUFTLE1BQVMsRUFBVSxVQUFzQjtRQUFoRSxjQUFTLEdBQVQsU0FBUyxDQUFLO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBRztRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFFM0UsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBSyxDQUFDO1FBQ2hDLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQUssQ0FBQztRQUN4QyxhQUFRLEdBQVksS0FBSyxDQUFDO0lBSjRELENBQUM7SUFPdkYsNkRBQTZEO0lBQzdELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQVU7UUFDZCxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQjthQUN6QyxJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxFQUM5QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1I7YUFDQSxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUwscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUI7YUFDekMsSUFBSSxDQUNILE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsRUFDMUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSO2FBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUU3QiwrQ0FBK0M7WUFDL0MsMkNBQTJDO1lBQzNDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFFTCx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFzaWRlQ29tcG9uZW50IH0gZnJvbSAnLi9hc2lkZS5jb21wb25lbnQnO1xuXG5leHBvcnQgY2xhc3MgTm92b0FzaWRlUmVmPFQgPSBhbnksIFIgPSBhbnk+IHtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudDogYW55LCBwdWJsaWMgcGFyYW1zOiBULCBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYpIHt9XG5cbiAgcHJpdmF0ZSBfYmVmb3JlQ2xvc2UgPSBuZXcgU3ViamVjdDxSPigpO1xuICBwcml2YXRlIF9hZnRlckNsb3NlZCA9IG5ldyBTdWJqZWN0PFI+KCk7XG4gIGlzQ2xvc2VkOiBib29sZWFuID0gZmFsc2U7XG4gIGNvbXBvbmVudEluc3RhbmNlOiBBc2lkZUNvbXBvbmVudDtcblxuICAvLyBHZXRzIGEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gdGhlIGRpYWxvZyBpcyBjbG9zZWQuXG4gIGdldCBvbkNsb3NlZCgpOiBQcm9taXNlPFI+IHtcbiAgICByZXR1cm4gdGhpcy5fYWZ0ZXJDbG9zZWQudG9Qcm9taXNlKCk7XG4gIH1cblxuICBhZnRlckNsb3NlZCgpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICByZXR1cm4gdGhpcy5fYWZ0ZXJDbG9zZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBiZWZvcmVDbG9zZSgpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICByZXR1cm4gdGhpcy5fYmVmb3JlQ2xvc2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBjbG9zZShyZXN1bHQ/OiBSKTogdm9pZCB7XG4gICAgLy8gTGlzdGVuIGZvciBhbmltYXRpb24gJ3N0YXJ0JyBldmVudHNcbiAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLmFuaW1hdGlvblN0YXRlQ2hhbmdlZFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoZXZlbnQpID0+IGV2ZW50LnBoYXNlTmFtZSA9PT0gJ3N0YXJ0JyksXG4gICAgICAgIHRha2UoMSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fYmVmb3JlQ2xvc2UubmV4dChyZXN1bHQpO1xuICAgICAgICB0aGlzLl9iZWZvcmVDbG9zZS5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoQmFja2Ryb3AoKTtcbiAgICAgIH0pO1xuXG4gICAgLy8gTGlzdGVuIGZvciBhbmltYXRpb24gJ2RvbmUnIGV2ZW50c1xuICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQucGhhc2VOYW1lID09PSAnZG9uZScgJiYgZXZlbnQudG9TdGF0ZSA9PT0gJ2xlYXZlJyksXG4gICAgICAgIHRha2UoMSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pc0Nsb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX2FmdGVyQ2xvc2VkLm5leHQocmVzdWx0KTtcbiAgICAgICAgdGhpcy5fYWZ0ZXJDbG9zZWQuY29tcGxldGUoKTtcblxuICAgICAgICAvLyBNYWtlIHN1cmUgdG8gYWxzbyBjbGVhciB0aGUgcmVmZXJlbmNlIHRvIHRoZVxuICAgICAgICAvLyBjb21wb25lbnQgaW5zdGFuY2UgdG8gYXZvaWQgbWVtb3J5IGxlYWtzXG4gICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UgPSBudWxsO1xuICAgICAgfSk7XG5cbiAgICAvLyBTdGFydCBleGl0IGFuaW1hdGlvblxuICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2Uuc3RhcnRFeGl0QW5pbWF0aW9uKCk7XG4gIH1cbn1cbiJdfQ==