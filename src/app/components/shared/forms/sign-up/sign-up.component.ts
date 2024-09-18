import { Component, ElementRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fromEvent, map } from "rxjs"
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ButtonStyleDirective],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  protected level: number = 1;
  private elRef = inject(ElementRef)
  private inputPhoto: HTMLInputElement;
  private chosenImage: HTMLImageElement;
  
  
  async changePhoto() {
    this.inputPhoto = this.elRef.nativeElement.querySelector('#inputFoto') as HTMLInputElement;
    this.chosenImage = this.elRef.nativeElement.querySelector('#chosenImage') as HTMLImageElement;
    this.inputPhoto.click();

    fromEvent(this.inputPhoto, "change").pipe(
      map(e => {
        const file = this.inputPhoto.files[0];
        const urlImage = URL.createObjectURL(file);
        this.chosenImage.src = urlImage;
      })
    ).subscribe()
  }
}


