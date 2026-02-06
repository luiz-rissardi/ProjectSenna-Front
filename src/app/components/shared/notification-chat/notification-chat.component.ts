import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, effect, inject, input, linkedSignal, signal } from '@angular/core';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { ChatState } from '../../../core/states/chat/chat.state';
import { DOMManipulation } from '../../../shared/operators/DomManipulation';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.state';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ChatData } from '../../../shared/interfaces/chatData';
import { UserState } from '../../../core/states/User/user.state';
import { SocketService } from '../../../core/services/socket/socket.service';
import { BufferToUrl } from '../../../workers/teste';

@Component({
  selector: 'notification-chat',
  imports: [ButtonIconComponent, NgxSkeletonLoaderModule],
  templateUrl: './notification-chat.component.html',
  styleUrl: './notification-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationChatComponent extends DOMManipulation implements AfterViewInit {

  chatDataInput = input<ChatData>()
  protected chatData = linkedSignal(() => this.chatDataInput());
  protected show = signal(false)
  private chatState = inject(ChatState);
  private userState = inject(UserState);
  private userDetailState = inject(UserDetailState);
  private socketService = inject(SocketService);
  private isSetted = false;
  protected notificationsCont = signal(0);
  @ViewChild('notification') notificationElement!: ElementRef;

  constructor() {

    super();
    effect(() => {
      if (this.chatState.chatState() != null && this.isSetted == false) {
        if (this.notificationElement != undefined) {
          this.removeClassToElement(this.notificationElement?.nativeElement, "active")
        }
      } else {
        this.isSetted = false;
      }
    })

    this.socketService.on("message", (data: any) => {
      if (
        (data?.chatId == this.chatData()?.chatId) &&
        (data.userId != this.userState.userSignal()?.userId) &&
        (this.chatState.chatState()?.chatId != data?.chatId)
      ) {
        this.notificationsCont.update(count => {
          return count + 1
        })
      }
    })
  }


  ngAfterViewInit(): void {
    const urlImage = BufferToUrl(this.chatData()?.otherUserPhoto)
    this.chatData.update(dataSignal => ({ ...dataSignal, otherUserPhoto: urlImage }))
    this.show.set(true)
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
    this.notificationsCont.set(0);
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
