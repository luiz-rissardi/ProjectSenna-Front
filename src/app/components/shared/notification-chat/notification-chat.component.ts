import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, effect, inject, input, signal } from '@angular/core';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { ChatStatesService } from '../../../core/states/chat/chat-states.service';
import { DOMManipulation } from '../../../shared/DomManipulation';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'notification-chat',
  standalone: true,
  imports: [ButtonIconComponent,NgxSkeletonLoaderModule],
  templateUrl: './notification-chat.component.html',
  styleUrl: './notification-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationChatComponent extends DOMManipulation implements AfterViewInit {

  @ViewChild('notification') notificationElement!: ElementRef;

  userName = input<string>();
  userPhoto = input<string | undefined | Blob>();
  chatId = input<string | undefined>();
  userId = input<string | undefined>();
  userDescription = input<string | undefined>();
  dateOfBlocking = input<Date | undefined>();
  isActive = input<boolean | string | undefined>();

  photoURL = signal(undefined);

  private chatState = inject(ChatStatesService);
  private isSetted = false

  constructor(private userDetailState: UserDetailState) {
    super();
    effect(() => {
      if (this.chatState.state() != null && this.isSetted == false) {
        this.removeClassToElement(this.notificationElement.nativeElement, "active")
      } else {
        this.isSetted = false;
      }
    })
  }

  ngAfterViewInit(): void {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL("../../../workers/photo-process.worker", import.meta.url));
      worker.onmessage = ({ data }) => {
        this.photoURL.set(data)
      };
      worker.postMessage(this.userPhoto());
    } 
  }

  protected stopPropagation(event: Event){
    event.stopPropagation();
  }

  protected openChat(el: HTMLElement) {
    this.isSetted = true
    this.chatState.setState(this.chatId())
    this.addClassToElement(el, "active")
  }

  protected openUserDetail = ()=> {
    this.userDetailState.userDetailSignal.set({
      show:true,
      data:{
        userName:this.userName(),
        description:this.userDescription(),
        photo:this.photoURL(),
        dateOfBlocking:this.dateOfBlocking(),
        userId:this.userId(),
        chatId:this.chatId(),
        isActive:this.isActive()
      }
    })
  }
}
