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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvbW9kYWwvbW9kYWwtcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVU5QyxNQUFNLE9BQU8sZUFBZTtDQUEwQjtBQUV0RCxNQUFNLE9BQU8sWUFBWTtJQUN2QixZQUFtQixTQUFjLEVBQVMsTUFBUyxFQUFVLFVBQXNCO1FBQWhFLGNBQVMsR0FBVCxTQUFTLENBQUs7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFHO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUUzRSxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFLLENBQUM7UUFDaEMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBSyxDQUFDO1FBR3hDLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFONEQsQ0FBQztJQVF2Riw2REFBNkQ7SUFDN0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBVTtRQUNkLHNDQUFzQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLENBQUMscUJBQXFCO2FBQ3pDLElBQUksQ0FDSCxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLEVBQzlDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUjthQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFTCxxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQjthQUN6QyxJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxFQUMxRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1I7YUFDQSxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzdCLCtDQUErQztZQUMvQywyQ0FBMkM7WUFDM0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUVMLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTm92b01vZGFsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1jb250YWluZXIuY29tcG9uZW50JztcblxuLyoqXG4gKiBQYXJhbXMgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIHRoZSBNb2RhbFxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxQYXJhbXMge1xuICBbcHJvcE5hbWU6IHN0cmluZ106IGFueTtcbn1cbmV4cG9ydCBjbGFzcyBOb3ZvTW9kYWxQYXJhbXMgaW1wbGVtZW50cyBNb2RhbFBhcmFtcyB7fVxuXG5leHBvcnQgY2xhc3MgTm92b01vZGFsUmVmPFQgPSBhbnksIFIgPSBhbnk+IHtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudDogYW55LCBwdWJsaWMgcGFyYW1zOiBULCBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYpIHt9XG5cbiAgcHJpdmF0ZSBfYmVmb3JlQ2xvc2UgPSBuZXcgU3ViamVjdDxSPigpO1xuICBwcml2YXRlIF9hZnRlckNsb3NlZCA9IG5ldyBTdWJqZWN0PFI+KCk7XG5cbiAgY29tcG9uZW50SW5zdGFuY2U6IE5vdm9Nb2RhbENvbnRhaW5lckNvbXBvbmVudDtcbiAgaXNDbG9zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBHZXRzIGEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gdGhlIGRpYWxvZyBpcyBjbG9zZWQuXG4gIGdldCBvbkNsb3NlZCgpOiBQcm9taXNlPFI+IHtcbiAgICByZXR1cm4gdGhpcy5fYWZ0ZXJDbG9zZWQudG9Qcm9taXNlKCk7XG4gIH1cblxuICBhZnRlckNsb3NlZCgpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICByZXR1cm4gdGhpcy5fYWZ0ZXJDbG9zZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBiZWZvcmVDbG9zZSgpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICByZXR1cm4gdGhpcy5fYmVmb3JlQ2xvc2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBjbG9zZShyZXN1bHQ/OiBSKTogdm9pZCB7XG4gICAgLy8gTGlzdGVuIGZvciBhbmltYXRpb24gJ3N0YXJ0JyBldmVudHNcbiAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLmFuaW1hdGlvblN0YXRlQ2hhbmdlZFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoZXZlbnQpID0+IGV2ZW50LnBoYXNlTmFtZSA9PT0gJ3N0YXJ0JyksXG4gICAgICAgIHRha2UoMSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fYmVmb3JlQ2xvc2UubmV4dChyZXN1bHQpO1xuICAgICAgICB0aGlzLl9iZWZvcmVDbG9zZS5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoQmFja2Ryb3AoKTtcbiAgICAgIH0pO1xuXG4gICAgLy8gTGlzdGVuIGZvciBhbmltYXRpb24gJ2RvbmUnIGV2ZW50c1xuICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQucGhhc2VOYW1lID09PSAnZG9uZScgJiYgZXZlbnQudG9TdGF0ZSA9PT0gJ2xlYXZlJyksXG4gICAgICAgIHRha2UoMSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pc0Nsb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX2FmdGVyQ2xvc2VkLm5leHQocmVzdWx0KTtcbiAgICAgICAgdGhpcy5fYWZ0ZXJDbG9zZWQuY29tcGxldGUoKTtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRvIGFsc28gY2xlYXIgdGhlIHJlZmVyZW5jZSB0byB0aGVcbiAgICAgICAgLy8gY29tcG9uZW50IGluc3RhbmNlIHRvIGF2b2lkIG1lbW9yeSBsZWFrc1xuICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlID0gbnVsbDtcbiAgICAgIH0pO1xuXG4gICAgLy8gU3RhcnQgZXhpdCBhbmltYXRpb25cbiAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnN0YXJ0RXhpdEFuaW1hdGlvbigpO1xuICB9XG59XG4iXX0=