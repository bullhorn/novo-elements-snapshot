import { animate, state, style, transition, trigger } from '@angular/animations';
/**
 * Animations used by the Material drawers.
 * @docs-private
 */
export const novoSidenavAnimations = {
    /** Animation that slides a drawer in and out. */
    transformDrawer: trigger('transform', [
        // We remove the `transform` here completely, rather than setting it to zero, because:
        // 1. Having a transform can cause elements with ripples or an animated
        //    transform to shift around in Chrome with an RTL layout (see #10023).
        // 2. 3d transforms causes text to appear blurry on IE and Edge.
        state('open, open-instant', style({
            transform: 'none',
            visibility: 'visible',
        })),
        state('void', style({
            // Avoids the shadow showing up when closed in SSR.
            'box-shadow': 'none',
            visibility: 'hidden',
        })),
        transition('void => open-instant', animate('0ms')),
        transition('void <=> open, open-instant => void', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ]),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2xheW91dC9zaWRlbmF2L3NpZGVuYXYuYW5pbWF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUE0QixLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUUzRzs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FFOUI7SUFDRixpREFBaUQ7SUFDakQsZUFBZSxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUU7UUFDcEMsc0ZBQXNGO1FBQ3RGLHVFQUF1RTtRQUN2RSwwRUFBMEU7UUFDMUUsZ0VBQWdFO1FBQ2hFLEtBQUssQ0FDSCxvQkFBb0IsRUFDcEIsS0FBSyxDQUFDO1lBQ0osU0FBUyxFQUFFLE1BQU07WUFDakIsVUFBVSxFQUFFLFNBQVM7U0FDdEIsQ0FBQyxDQUNIO1FBQ0QsS0FBSyxDQUNILE1BQU0sRUFDTixLQUFLLENBQUM7WUFDSixtREFBbUQ7WUFDbkQsWUFBWSxFQUFFLE1BQU07WUFDcEIsVUFBVSxFQUFFLFFBQVE7U0FDckIsQ0FBQyxDQUNIO1FBQ0QsVUFBVSxDQUFDLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxVQUFVLENBQUMscUNBQXFDLEVBQUUsT0FBTyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7S0FDckcsQ0FBQztDQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG4vKipcbiAqIEFuaW1hdGlvbnMgdXNlZCBieSB0aGUgTWF0ZXJpYWwgZHJhd2Vycy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG5vdm9TaWRlbmF2QW5pbWF0aW9uczoge1xuICByZWFkb25seSB0cmFuc2Zvcm1EcmF3ZXI6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbn0gPSB7XG4gIC8qKiBBbmltYXRpb24gdGhhdCBzbGlkZXMgYSBkcmF3ZXIgaW4gYW5kIG91dC4gKi9cbiAgdHJhbnNmb3JtRHJhd2VyOiB0cmlnZ2VyKCd0cmFuc2Zvcm0nLCBbXG4gICAgLy8gV2UgcmVtb3ZlIHRoZSBgdHJhbnNmb3JtYCBoZXJlIGNvbXBsZXRlbHksIHJhdGhlciB0aGFuIHNldHRpbmcgaXQgdG8gemVybywgYmVjYXVzZTpcbiAgICAvLyAxLiBIYXZpbmcgYSB0cmFuc2Zvcm0gY2FuIGNhdXNlIGVsZW1lbnRzIHdpdGggcmlwcGxlcyBvciBhbiBhbmltYXRlZFxuICAgIC8vICAgIHRyYW5zZm9ybSB0byBzaGlmdCBhcm91bmQgaW4gQ2hyb21lIHdpdGggYW4gUlRMIGxheW91dCAoc2VlICMxMDAyMykuXG4gICAgLy8gMi4gM2QgdHJhbnNmb3JtcyBjYXVzZXMgdGV4dCB0byBhcHBlYXIgYmx1cnJ5IG9uIElFIGFuZCBFZGdlLlxuICAgIHN0YXRlKFxuICAgICAgJ29wZW4sIG9wZW4taW5zdGFudCcsXG4gICAgICBzdHlsZSh7XG4gICAgICAgIHRyYW5zZm9ybTogJ25vbmUnLFxuICAgICAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gICAgICB9KSxcbiAgICApLFxuICAgIHN0YXRlKFxuICAgICAgJ3ZvaWQnLFxuICAgICAgc3R5bGUoe1xuICAgICAgICAvLyBBdm9pZHMgdGhlIHNoYWRvdyBzaG93aW5nIHVwIHdoZW4gY2xvc2VkIGluIFNTUi5cbiAgICAgICAgJ2JveC1zaGFkb3cnOiAnbm9uZScsXG4gICAgICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICAgICAgfSksXG4gICAgKSxcbiAgICB0cmFuc2l0aW9uKCd2b2lkID0+IG9wZW4taW5zdGFudCcsIGFuaW1hdGUoJzBtcycpKSxcbiAgICB0cmFuc2l0aW9uKCd2b2lkIDw9PiBvcGVuLCBvcGVuLWluc3RhbnQgPT4gdm9pZCcsIGFuaW1hdGUoJzQwMG1zIGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpJykpLFxuICBdKSxcbn07XG4iXX0=