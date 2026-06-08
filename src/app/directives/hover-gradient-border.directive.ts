import { DestroyRef, Directive, ElementRef, HostBinding, HostListener, inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { IGradientConfiguration } from '../../interfaces/IGradientConfiguration';
import { Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[hoverGradientBorder]',
})
export class HoverGradientBorderDirective implements OnDestroy {

  @Input() gradientConfiguration: IGradientConfiguration = {
    delay: 1000,
    colors: ['#FF0000', 'green', '#FFF000'],
    thickness: 5
  };

  @HostBinding('style.--border-thickness') borderThickness: string = `${ this.gradientConfiguration.thickness }px`;
  @HostBinding('style.--gradient-colors') gradientColors: string = this.gradientConfiguration.colors!.join(', ');

  private renderer: Renderer2 = inject(Renderer2);
  private elementRef: ElementRef = inject(ElementRef);
  
  private timerId!: number;
  private isHover: boolean = false;

  @HostListener('mouseenter')
  onEnter() {
    this.isHover = true;
    this.timerId = setTimeout(() => {
      if (this.isHover) {
        this.renderer.addClass(this.elementRef.nativeElement, 'gradient-border');
      }
    }, this.gradientConfiguration.delay);
  }

  @HostListener('mouseleave')
  onLeave() {
    this.isHover = false;
    clearTimeout(this.timerId);
    this.renderer.removeClass(this.elementRef.nativeElement, 'gradient-border');
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

}
