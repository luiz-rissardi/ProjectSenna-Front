import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WarnigComponent } from "../../components/shared/warnig/warnig.component";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    standalone:true,
    imports:[RouterOutlet, WarnigComponent]
})
export class AuthComponent {
  

}
