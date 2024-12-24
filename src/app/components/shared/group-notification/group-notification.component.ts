import { AfterViewInit, Component, effect, ElementRef, inject, input, signal, ViewChild } from '@angular/core';
import { SocketService } from '../../../core/services/socket/socket.service';
import { ChatState } from '../../../core/states/chat/chat.state';
import { UserState } from '../../../core/states/User/user.state';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.state';
import { Group } from '../../../shared/interfaces/groupData';
import { DOMManipulation } from '../../../shared/operators/DomManipulation';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-group-notification',
  imports: [ButtonIconComponent, NgxSkeletonLoaderModule],
  templateUrl: './group-notification.component.html',
  styleUrl: './group-notification.component.scss'
})
export class GroupNotificationComponent extends DOMManipulation implements AfterViewInit {


  chatData = input<Group>();
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

  async ngAfterViewInit() {
    if (typeof Worker !== 'undefined') {

      if (typeof this.chatData().groupPhoto == "string") {
        this.show.set(true);
        return;
      }

      if (this.chatData().groupPhoto instanceof Blob) {
        this.show.set(true)
        this.chatData().groupPhoto = URL.createObjectURL(this.chatData().groupPhoto)
      } else {
        const worker = new Worker(new URL("../../../workers/photo-process.worker", import.meta.url));
        worker.onmessage = ({ data }) => {
          this.chatData().groupPhoto = data
          this.show.set(true)
        };
        worker.postMessage(this.chatData()?.groupPhoto);
      }

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
        userName: this.chatData().groupName,
        photo: this.chatData().groupPhoto,
        description: this.chatData().groupDescription,
        dateOfBlocking: undefined,
        isActive: this.chatData().isActive,
        chatId: this.chatData().chatId,
        userId: ''
      }
    })

    this.addClassToElement(el, "active")
    this.notificationsCont.set(0);
  }

  protected openUserDetail = () => {
    this.userDetailState.userDetailSignal.set({
      show: true,
      data: {
        userName: this.chatData().groupName,
        photo: this.chatData().groupPhoto,
        description: this.chatData().groupDescription,
        dateOfBlocking: undefined,
        isActive: this.chatData().isActive,
        chatId: this.chatData().chatId,
        userId: ''
      }
    })
  }
}
