import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAreaComponent } from "../user-area/user-area.component";

@Component({
    selector: 'chat-data',
    imports: [RouterOutlet, UserAreaComponent],
    templateUrl: './chat-data.component.html',
    styleUrl: './chat-data.component.scss'
})
export class ChatDataComponent {

}
