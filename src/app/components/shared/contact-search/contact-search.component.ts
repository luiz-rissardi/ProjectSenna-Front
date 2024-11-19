import { AfterViewInit, Component, input, InputSignal, signal } from '@angular/core';
import { LimitTextPipe } from '../../../pipes/limit-text.pipe';


@Component({
  selector: 'app-contact-search',
  standalone: true,
  imports: [LimitTextPipe],
  templateUrl: './contact-search.component.html',
  styleUrl: './contact-search.component.scss'
})
export class ContactSearchComponent implements AfterViewInit {

  userName: InputSignal<string> = input("");
  userId: InputSignal<string> = input("");
  photo: InputSignal<any> = input(null);
  description: InputSignal<string> = input("");
  protected photoImage = signal(null);
  protected clicked: boolean = false;


  ngAfterViewInit(): void {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL("../../../workers/photo-process.worker", import.meta.url));
      worker.onmessage = ({ data }) => {
        this.photoImage.set(data)
      };
      worker.postMessage(this.photo());
    }
  }

  teste(){
    console.log("object");
  }

  loadAlternativeImage() {
    this.photoImage.set("../../../../assets/icons/do-utilizador.png")
  }
}
