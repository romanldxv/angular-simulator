import { Directive, ElementRef, HostBinding, HostListener, inject, Input, Renderer2 } from '@angular/core';
import { IGradientConfiguration } from '../../interfaces/IGradientConfiguration';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[hoverGradientBorder]',
})
export class HoverGradientBorderDirective {

  @Input() gradientConfiguration: IGradientConfiguration = {
    delay: 1000,
    colors: ['#FF0000', 'green', '#FFF000'],
    thickness: 5
  };

  @HostBinding('style.--border-thickness') borderThickness: string = `${this.gradientConfiguration.thickness}px`;
  @HostBinding('style.--gradient-colors') gradientColors: string = this.gradientConfiguration.colors!.join(', ');

  private renderer: Renderer2 = inject(Renderer2);
  private elementRef: ElementRef = inject(ElementRef);
  
  private enterSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private leaveSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isHovered: boolean = false;

  @HostListener('mouseenter')
  onEnter() {
    this.isHovered = true;
    if (this.isHovered) {
      this.renderer.addClass(this.elementRef.nativeElement, 'gradient-border');
    }
  }

  @HostListener('mouseleave')
  onLeave() {
    this.isHovered = false;
    this.renderer.removeClass(this.elementRef.nativeElement, 'gradient-border');
  }

}
