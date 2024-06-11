import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-icon',
  standalone: true,
  imports: [],
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.scss'
})
export class ButtonIconComponent {
  @Input({ required: true }) image: string | undefined;
  @Input({ required: true }) alt: string | undefined;
  @Input({ required: false }) execute: Function | undefined;

  protected executeFn() {
    if (typeof this.execute == "function") {
      this.execute();
    }
  }
}
