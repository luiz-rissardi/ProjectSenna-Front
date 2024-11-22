import { Component, ElementRef, input, InputSignal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'button-icon',
    imports: [RouterModule],
    templateUrl: './button-icon.component.html',
    styleUrl: './button-icon.component.scss'
})
export class ButtonIconComponent {
  image: InputSignal<string | Blob |  undefined> = input("");
  alt:InputSignal<string | undefined> = input("");

  @ViewChild("buttonImage") private buttonImage: ElementRef<any>

  loadAlternativeImage() {
    this.buttonImage.nativeElement.src = "../../../../assets/icons/do-utilizador.png"
  }
}
