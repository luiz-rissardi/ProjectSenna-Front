import { Component, ElementRef, input, Input, InputSignal, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'button-icon',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.scss'
})
export class ButtonIconComponent {
  image: InputSignal<string | undefined> = input("");
  alt:InputSignal<string | undefined> = input("");
  execute:InputSignal<Function | undefined> = input();

  @ViewChild("buttonImage") private buttonImage: ElementRef<any>

  loadAlternativeImage() {
    this.buttonImage.nativeElement.src = "../../../../assets/icons/do-utilizador.png"
  }

  protected executeFn() {
    if (typeof this.execute == "function") {
      this.execute();
    }
  }
}
