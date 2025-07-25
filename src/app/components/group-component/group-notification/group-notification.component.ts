import { AfterViewInit, Component, effect, ElementRef, inject, input, linkedSignal, signal, ViewChild } from '@angular/core';
import { SocketService } from '../../../core/services/socket/socket.service';
import { ChatState } from '../../../core/states/chat/chat.state';
import { UserState } from '../../../core/states/User/user.state';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.state';
import { Group } from '../../../shared/interfaces/groupData';
import { DOMManipulation } from '../../../shared/operators/DomManipulation';
import { ButtonIconComponent } from '../../shared/button-icon/button-icon.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Buffer } from 'buffer';
import { BufferToUrl } from '../../../workers/teste';

@Component({
  selector: 'app-group-notification',
  imports: [ButtonIconComponent, NgxSkeletonLoaderModule],
  templateUrl: './group-notification.component.html',
  styleUrl: './group-notification.component.scss'
})
export class GroupNotificationComponent extends DOMManipulation implements AfterViewInit {


  chatDataInput = input<Group>();
  protected chatData = linkedSignal(() => this.chatDataInput())
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
      const urlImage = BufferToUrl(this.chatData()?.groupPhoto)
      this.chatData.update(dataSignal => ({ ...dataSignal, groupPhoto: urlImage }))
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
