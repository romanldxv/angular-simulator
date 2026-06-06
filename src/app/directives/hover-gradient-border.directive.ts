import { Directive, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';
import { IGradientConfiguration } from '../../interfaces/IGradientConfiguration';

@Directive({
  selector: '[hoverGradientBorder]',
})
export class HoverGradientBorderDirective {

  @Input() gradientConfiguration: IGradientConfiguration = {
    delay: 1000,
    colors: ['#1A3E3E', '#F2BE22', '#D4A373'],
    thickness: 2
  };

  private renderer: Renderer2 = inject(Renderer2);
  private elementRef: ElementRef = inject(ElementRef);
  private isHovered: boolean = false;

  @HostListener('mouseenter')
  onEnter() {
    this.isHovered = true;
    if (this.isHovered) {
      this.renderer.addClass(this.elementRef.nativeElement, 'gradient-border');
      this.renderer.setStyle(this.elementRef.nativeElement, '--border-thickness', this.gradientConfiguration.thickness);
      this.renderer.setStyle(this.elementRef.nativeElement, '--gradient-colors', this.gradientConfiguration.colors?.join(', '));
      // setTimeout(() => {
        
      // }, this.gradientConfiguration.delay)
    }
  }

  @HostListener('mouseleave')
  onLeave() {
    this.isHovered = false;
    this.renderer.removeClass(this.elementRef.nativeElement, 'gradient-border');
  }

}
