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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9sYXlvdXQvc2lkZW5hdi9zaWRlbmF2LmFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBNEIsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFM0c7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBRTlCO0lBQ0YsaURBQWlEO0lBQ2pELGVBQWUsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFO1FBQ3BDLHNGQUFzRjtRQUN0Rix1RUFBdUU7UUFDdkUsMEVBQTBFO1FBQzFFLGdFQUFnRTtRQUNoRSxLQUFLLENBQ0gsb0JBQW9CLEVBQ3BCLEtBQUssQ0FBQztZQUNKLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLFVBQVUsRUFBRSxTQUFTO1NBQ3RCLENBQUMsQ0FDSDtRQUNELEtBQUssQ0FDSCxNQUFNLEVBQ04sS0FBSyxDQUFDO1lBQ0osbURBQW1EO1lBQ25ELFlBQVksRUFBRSxNQUFNO1lBQ3BCLFVBQVUsRUFBRSxRQUFRO1NBQ3JCLENBQUMsQ0FDSDtRQUNELFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsVUFBVSxDQUFDLHFDQUFxQyxFQUFFLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0tBQ3JHLENBQUM7Q0FDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuLyoqXG4gKiBBbmltYXRpb25zIHVzZWQgYnkgdGhlIE1hdGVyaWFsIGRyYXdlcnMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBub3ZvU2lkZW5hdkFuaW1hdGlvbnM6IHtcbiAgcmVhZG9ubHkgdHJhbnNmb3JtRHJhd2VyOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG59ID0ge1xuICAvKiogQW5pbWF0aW9uIHRoYXQgc2xpZGVzIGEgZHJhd2VyIGluIGFuZCBvdXQuICovXG4gIHRyYW5zZm9ybURyYXdlcjogdHJpZ2dlcigndHJhbnNmb3JtJywgW1xuICAgIC8vIFdlIHJlbW92ZSB0aGUgYHRyYW5zZm9ybWAgaGVyZSBjb21wbGV0ZWx5LCByYXRoZXIgdGhhbiBzZXR0aW5nIGl0IHRvIHplcm8sIGJlY2F1c2U6XG4gICAgLy8gMS4gSGF2aW5nIGEgdHJhbnNmb3JtIGNhbiBjYXVzZSBlbGVtZW50cyB3aXRoIHJpcHBsZXMgb3IgYW4gYW5pbWF0ZWRcbiAgICAvLyAgICB0cmFuc2Zvcm0gdG8gc2hpZnQgYXJvdW5kIGluIENocm9tZSB3aXRoIGFuIFJUTCBsYXlvdXQgKHNlZSAjMTAwMjMpLlxuICAgIC8vIDIuIDNkIHRyYW5zZm9ybXMgY2F1c2VzIHRleHQgdG8gYXBwZWFyIGJsdXJyeSBvbiBJRSBhbmQgRWRnZS5cbiAgICBzdGF0ZShcbiAgICAgICdvcGVuLCBvcGVuLWluc3RhbnQnLFxuICAgICAgc3R5bGUoe1xuICAgICAgICB0cmFuc2Zvcm06ICdub25lJyxcbiAgICAgICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBzdGF0ZShcbiAgICAgICd2b2lkJyxcbiAgICAgIHN0eWxlKHtcbiAgICAgICAgLy8gQXZvaWRzIHRoZSBzaGFkb3cgc2hvd2luZyB1cCB3aGVuIGNsb3NlZCBpbiBTU1IuXG4gICAgICAgICdib3gtc2hhZG93JzogJ25vbmUnLFxuICAgICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICAgIH0pLFxuICAgICksXG4gICAgdHJhbnNpdGlvbigndm9pZCA9PiBvcGVuLWluc3RhbnQnLCBhbmltYXRlKCcwbXMnKSksXG4gICAgdHJhbnNpdGlvbigndm9pZCA8PT4gb3Blbiwgb3Blbi1pbnN0YW50ID0+IHZvaWQnLCBhbmltYXRlKCc0MDBtcyBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKScpKSxcbiAgXSksXG59O1xuIl19