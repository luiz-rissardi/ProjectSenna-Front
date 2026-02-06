import { Directive, ElementRef, HostListener, inject, Renderer2, PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[ButtonIcon]',
  standalone: true
})
export class ButtonIconDirective {

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    // SSR-safe: executa manipulação de DOM apenas após render no browser
    afterNextRender(() => {
      this.setStyles();
    });
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

      // SSR-safe: media query só existe no browser
      if (isPlatformBrowser(this.platformId)) {
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
  }

  @HostListener('mousedown') onMouseDown() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(0.9)');
  }

  @HostListener('mouseup') onMouseUp() {
    this.renderer.removeStyle(this.el.nativeElement, 'transform');
  }
}
