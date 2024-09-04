import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ButtonIcon]',
  standalone: true
})
export class ButtonIconDirective {


  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setStyles();
  }

  private setStyles() {
    // Estilos para o elemento host
    const hostStyles = {
      width: '60px',
      height: '60px',
      color: 'white',
      backgroundColor: 'transparent',
      margin: 'auto',
      border: 'none'
    };

    for (const [key, value] of Object.entries(hostStyles)) {
      this.renderer.setStyle(this.el.nativeElement, key, value);
    }

    // Estilos para o elemento <i> dentro do host
    const icon = this.el.nativeElement.querySelector('i');
    if (icon) {
      this.renderer.setStyle(icon, 'fontSize', '2rem');

      // Adiciona media query usando JavaScript
      const mediaQueryList = window.matchMedia('(max-width: 600px)');
      const applyIconStyles = (e: MediaQueryListEvent | MediaQueryList) => {
        if (e.matches) {
          this.renderer.setStyle(icon, 'fontSize', '1.5rem');
        } else {
          this.renderer.setStyle(icon, 'fontSize', '2rem');
        }
      };
      // Listener para mudanças na media query
      mediaQueryList.addEventListener('change', applyIconStyles);
      // Aplica estilos baseados no estado atual da media query
      applyIconStyles(mediaQueryList);
    }
  }

  @HostListener('mousedown') onMouseDown() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(0.9)');
  }

  @HostListener('mouseup') onMouseUp() {
    this.renderer.removeStyle(this.el.nativeElement, 'transform');
  }
}
