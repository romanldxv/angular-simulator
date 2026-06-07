import { DestroyRef, Directive, ElementRef, HostBinding, HostListener, inject, Input, OnInit, Renderer2 } from '@angular/core';
import { IGradientConfiguration } from '../../interfaces/IGradientConfiguration';
import { Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[hoverGradientBorder]',
})
export class HoverGradientBorderDirective implements OnInit {

  @Input() gradientConfiguration: IGradientConfiguration = {
    delay: 1000,
    colors: ['#FF0000', 'green', '#FFF000'],
    thickness: 5
  };

  @HostBinding('style.--border-thickness') borderThickness: string = `${ this.gradientConfiguration.thickness }px`;
  @HostBinding('style.--gradient-colors') gradientColors: string = this.gradientConfiguration.colors!.join(', ');

  private renderer: Renderer2 = inject(Renderer2);
  private elementRef: ElementRef = inject(ElementRef);
  private destroyRef: DestroyRef = inject(DestroyRef);
  
  private enterSubject: Subject<void> = new Subject<void>();
  private leaveSubject: Subject<void> = new Subject<void>();

  @HostListener('mouseenter')
  onEnter() {
    this.enterSubject.next();
  }

  @HostListener('mouseleave')
  onLeave() {
    this.leaveSubject.next();
  }

  ngOnInit(): void {
    this.enterSubject.pipe(
      switchMap(() =>
        timer(this.gradientConfiguration.delay!).pipe(
          takeUntil(this.leaveSubject),
          tap(() => {
            this.renderer.addClass(this.elementRef.nativeElement, 'gradient-border');
          })
        )
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();

    this.leaveSubject.pipe(
      tap(() => this.renderer.removeClass(this.elementRef.nativeElement, 'gradient-border')),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

}
