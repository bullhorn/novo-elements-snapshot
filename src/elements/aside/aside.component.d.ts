import { AnimationEvent } from '@angular/animations';
import { Portal } from '@angular/cdk/portal';
import { EventEmitter, Injector } from '@angular/core';
import { NovoAsideRef } from './aside-ref';
export declare class AsideComponent {
    private injector;
    private asideRef;
    animationStateChanged: EventEmitter<AnimationEvent>;
    animationState: 'void' | 'enter' | 'leave';
    component: Portal<any>;
    constructor(injector: Injector, asideRef: NovoAsideRef);
    onAnimationStart(event: AnimationEvent): void;
    onAnimationDone(event: AnimationEvent): void;
    startExitAnimation(): void;
}
