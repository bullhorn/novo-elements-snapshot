import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
export class NovoModalParams {
}
export class NovoModalRef {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9tb2RhbC9tb2RhbC1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBVTlDLE1BQU0sT0FBTyxlQUFlO0NBQTBCO0FBRXRELE1BQU0sT0FBTyxZQUFZO0lBQ3ZCLFlBQW1CLFNBQWMsRUFBUyxNQUFTLEVBQVUsVUFBc0I7UUFBaEUsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUFTLFdBQU0sR0FBTixNQUFNLENBQUc7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBRTNFLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQUssQ0FBQztRQUNoQyxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFLLENBQUM7UUFHeEMsYUFBUSxHQUFZLEtBQUssQ0FBQztJQU40RCxDQUFDO0lBUXZGLDZEQUE2RDtJQUM3RCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFVO1FBQ2Qsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUI7YUFDekMsSUFBSSxDQUNILE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsRUFDOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSO2FBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVMLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMscUJBQXFCO2FBQ3pDLElBQUksQ0FDSCxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLEVBQzFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUjthQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDN0IsK0NBQStDO1lBQy9DLDJDQUEyQztZQUMzQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBRUwsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOb3ZvTW9kYWxDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWNvbnRhaW5lci5jb21wb25lbnQnO1xuXG4vKipcbiAqIFBhcmFtcyB0aGF0IGNhbiBiZSBwYXNzZWQgdG8gdGhlIE1vZGFsXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBNb2RhbFBhcmFtcyB7XG4gIFtwcm9wTmFtZTogc3RyaW5nXTogYW55O1xufVxuZXhwb3J0IGNsYXNzIE5vdm9Nb2RhbFBhcmFtcyBpbXBsZW1lbnRzIE1vZGFsUGFyYW1zIHt9XG5cbmV4cG9ydCBjbGFzcyBOb3ZvTW9kYWxSZWY8VCA9IGFueSwgUiA9IGFueT4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50OiBhbnksIHB1YmxpYyBwYXJhbXM6IFQsIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZikge31cblxuICBwcml2YXRlIF9iZWZvcmVDbG9zZSA9IG5ldyBTdWJqZWN0PFI+KCk7XG4gIHByaXZhdGUgX2FmdGVyQ2xvc2VkID0gbmV3IFN1YmplY3Q8Uj4oKTtcblxuICBjb21wb25lbnRJbnN0YW5jZTogTm92b01vZGFsQ29udGFpbmVyQ29tcG9uZW50O1xuICBpc0Nsb3NlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIEdldHMgYSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiB0aGUgZGlhbG9nIGlzIGNsb3NlZC5cbiAgZ2V0IG9uQ2xvc2VkKCk6IFByb21pc2U8Uj4ge1xuICAgIHJldHVybiB0aGlzLl9hZnRlckNsb3NlZC50b1Byb21pc2UoKTtcbiAgfVxuXG4gIGFmdGVyQ2xvc2VkKCk6IE9ic2VydmFibGU8Uj4ge1xuICAgIHJldHVybiB0aGlzLl9hZnRlckNsb3NlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGJlZm9yZUNsb3NlKCk6IE9ic2VydmFibGU8Uj4ge1xuICAgIHJldHVybiB0aGlzLl9iZWZvcmVDbG9zZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGNsb3NlKHJlc3VsdD86IFIpOiB2b2lkIHtcbiAgICAvLyBMaXN0ZW4gZm9yIGFuaW1hdGlvbiAnc3RhcnQnIGV2ZW50c1xuICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQucGhhc2VOYW1lID09PSAnc3RhcnQnKSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9iZWZvcmVDbG9zZS5uZXh0KHJlc3VsdCk7XG4gICAgICAgIHRoaXMuX2JlZm9yZUNsb3NlLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2hCYWNrZHJvcCgpO1xuICAgICAgfSk7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIGFuaW1hdGlvbiAnZG9uZScgZXZlbnRzXG4gICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZS5hbmltYXRpb25TdGF0ZUNoYW5nZWRcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKGV2ZW50KSA9PiBldmVudC5waGFzZU5hbWUgPT09ICdkb25lJyAmJiBldmVudC50b1N0YXRlID09PSAnbGVhdmUnKSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmlzQ2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fYWZ0ZXJDbG9zZWQubmV4dChyZXN1bHQpO1xuICAgICAgICB0aGlzLl9hZnRlckNsb3NlZC5jb21wbGV0ZSgpO1xuICAgICAgICAvLyBNYWtlIHN1cmUgdG8gYWxzbyBjbGVhciB0aGUgcmVmZXJlbmNlIHRvIHRoZVxuICAgICAgICAvLyBjb21wb25lbnQgaW5zdGFuY2UgdG8gYXZvaWQgbWVtb3J5IGxlYWtzXG4gICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UgPSBudWxsO1xuICAgICAgfSk7XG5cbiAgICAvLyBTdGFydCBleGl0IGFuaW1hdGlvblxuICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2Uuc3RhcnRFeGl0QW5pbWF0aW9uKCk7XG4gIH1cbn1cbiJdfQ==