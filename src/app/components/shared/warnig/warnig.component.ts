import { Component, inject, ViewChild, ElementRef, ChangeDetectionStrategy, computed } from '@angular/core';
import { WarningState } from '../../../core/states/warning/warning.service';
import { DOMManipulation } from '../../../shared/DomManipulation';

@Component({
  selector: 'app-warnig',
  standalone: true,
  imports: [],
  templateUrl: './warnig.component.html',
  styleUrl: './warnig.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarnigComponent extends DOMManipulation {

  protected warnigState = inject(WarningState);
  protected signal: any;
  // protected isSucess: boolean;

  @ViewChild("warningContainer") private container!: ElementRef;
  constructor() {
    super()
    this.signal = computed(() => {
      if (this.warnigState.warnigSignal()?.IsSucess != undefined) {
        this.changeVisibleWarnig()
      }
      return this.warnigState.warnigSignal()
    })
    
  }

  private changeVisibleWarnig() {
    if(this.container != undefined){
      this.addClassToElement(this.container.nativeElement, "show")
      this.removeClassToElement(this.container.nativeElement, "hidden")
  
      const idTimeOut = setTimeout(() => {
        this.removeClassToElement(this.container.nativeElement, "show")
        this.addClassToElement(this.container.nativeElement, "hidden")
        clearTimeout(idTimeOut);
      }, 2000)
    }
  }
}
