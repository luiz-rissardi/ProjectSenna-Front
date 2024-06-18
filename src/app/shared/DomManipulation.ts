
import { ElementRef, Injectable, Renderer2, RendererStyleFlags2, inject } from '@angular/core';

@Injectable({
    providedIn: "root"
  })
export class DOMManipulation {

    private el = inject(ElementRef)
    private dom = inject(Renderer2)

    protected removeClassToElement(elementId: string, className: string): void {
        const el = this.el.nativeElement.querySelector(`#${elementId}`)
        this.dom.removeClass(el, className);
    }

    protected addClassToElement(elementId: string, className: string): void {
        const el = this.el.nativeElement.querySelector(`#${elementId}`);
        this.dom.addClass(el, className);
    }

    protected elementContais(elementId: string, className: string): boolean {
        const el = this.el.nativeElement.querySelector(`#${elementId}`, true);
        const contais = el.classList.contains(className);
        return contais
    }

    protected removeAttribute(elementId: string, attribute: string) {
        const el = this.el.nativeElement.querySelector(`#${elementId}`, true);
        this.dom.removeAttribute(el, attribute)
    }

    protected setAttributeStyle(elementId: string, attribute: string, newValue: string) {
        const el = this.el.nativeElement.querySelector(`#${elementId}`, true);
        console.log(el);
        this.dom.setStyle(el, attribute, newValue, RendererStyleFlags2.Important)
    }

    protected findElement(elementId: string) {
        return this.el.nativeElement.querySelector(`#${elementId}`);
    }

    protected addChild(elementParentId: string, child: any) {
        const parentEl = this.el.nativeElement.querySelector(`#${elementParentId}`);
        this.addChild(parentEl, child)
    }

    protected createElement(tag: string) {
        return this.dom.createElement(tag)
    }

}