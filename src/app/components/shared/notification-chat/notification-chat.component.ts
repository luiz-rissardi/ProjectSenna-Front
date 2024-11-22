import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, effect, inject, input, signal } from '@angular/core';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { ChatState } from '../../../core/states/chat/chat.state';
import { DOMManipulation } from '../../../shared/DomManipulation';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.state';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ChatData } from '../../../interfaces/chatData';

@Component({
    selector: 'notification-chat',
    imports: [ButtonIconComponent, NgxSkeletonLoaderModule],
    templateUrl: './notification-chat.component.html',
    styleUrl: './notification-chat.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationChatComponent extends DOMManipulation implements AfterViewInit {

  chatData = input<ChatData>();
  protected show = signal(false)
  private chatState = inject(ChatState);
  private userDetailState = inject(UserDetailState);
  private isSetted = false
  @ViewChild('notification') notificationElement!: ElementRef;

  constructor() {
    super();
    effect(() => {
      if (this.chatState.chatState() != null && this.isSetted == false) {
        this.removeClassToElement(this.notificationElement.nativeElement, "active")
      } else {
        this.isSetted = false;
      }
    })
  }

  ngAfterViewInit(): void {
    if (typeof Worker !== 'undefined') {
      if (typeof this.chatData().otherUserPhoto == "string" || this.chatData().otherUserPhoto == null) {
        this.show.set(true);
        return;
      }

      const worker = new Worker(new URL("../../../workers/photo-process.worker", import.meta.url));
      worker.onmessage = ({ data }) => {
        this.chatData().otherUserPhoto = data
        this.show.set(true)
      };
      worker.postMessage(this.chatData()?.otherUserPhoto);
    }
  }

  protected stopPropagation(event: Event) {
    event.stopPropagation();
  }

  protected openChat(el: HTMLElement) {
    this.isSetted = true

    this.chatState.chatState.set({
     ...this.chatData()
    })

    this.userDetailState.userDetailSignal.set({
      show: false,
      data: {
        chatId: this.chatData().chatId,
        dateOfBlocking: this.chatData().dateOfBlocking,
        description: this.chatData().otherUserDescription,
        photo: this.chatData().otherUserPhoto,
        userId: this.chatData().otherUserId,
        userName: this.chatData().otherUserName,
        isActive: this.chatData().isActive
      }
    })

    this.addClassToElement(el, "active")
  }

  protected openUserDetail = () => {
    this.userDetailState.userDetailSignal.set({
      show: true,
      data: {
        chatId: this.chatData().chatId,
        dateOfBlocking: this.chatData().dateOfBlocking,
        description: this.chatData().otherUserDescription,
        photo: this.chatData().otherUserPhoto,
        userId: this.chatData().otherUserId,
        userName: this.chatData().otherUserName,
        isActive: this.chatData().isActive
      }
    })
  }
}
