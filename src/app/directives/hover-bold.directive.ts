import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hoverBold]',
})
export class HoverBoldDirective {

  private renderer: Renderer2 = inject(Renderer2);
  private elementRef: ElementRef = inject(ElementRef);

  @HostListener('mouseenter')
  onEnter() {
    if (!this.elementRef.nativeElement.disabled)
      this.renderer.setStyle(this.elementRef.nativeElement, 'font-weight', 'bold');
  }

  @HostListener('mouseleave')
  onLeave() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-weight', null);
  }

}
