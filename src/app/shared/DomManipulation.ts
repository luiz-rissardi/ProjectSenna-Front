
import { ElementRef, Injectable, Renderer2, inject } from '@angular/core';

@Injectable({
    providedIn: "root"
  })
export class DOMManipulation {

    private el = inject(ElementRef)
    private dom = inject(Renderer2)

    protected removeClassToElement(el: HTMLElement, className: string): void {
        this.dom.removeClass(el, className);
    }

    protected addClassToElement(el: HTMLElement, className: string): void {
        this.dom.addClass(el, className);
    }

    protected elementContais(el: HTMLElement, className: string): boolean {
        const contais = el.classList.contains(className);
        return contais
    }

    protected setProperty(elementParent: HTMLElement, styleProperty: any, value:any) {
        this.dom.setProperty(elementParent,styleProperty,value);
    }

    protected findElement(elementId: string) {
        return this.el.nativeElement.querySelector(`#${elementId}`);
    }

    protected createElement(tag: string) {
        return this.dom.createElement(tag)
    }

    protected getElementsByClass(className: string) {
        return this.el.nativeElement.querySelectorAll(`.${className}`)
    }

}