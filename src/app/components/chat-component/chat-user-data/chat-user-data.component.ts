import { Component, ElementRef, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.state';
import { MessagesState } from '../../../core/states/messages/messages.state';
import { ChatState } from '../../../core/states/chat/chat.state';
import { UserState } from '../../../core/states/User/user.state';
import { SwitchTranslationState } from '../../../core/states/switchTranslation/switch-translation.state';
import { RouterLink } from '@angular/router';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { ButtonIconComponent } from '../../shared/button-icon/button-icon.component';
import { ButtonIconDirective } from '../../../directives/buttonIcon/button-icon.directive';
import { ChatFacade } from '../../../facades/chat/chat.facade';
import { ContactFacade } from '../../../facades/contact/contact.facade';

@Component({
  selector: 'app-chat-user-data',
  imports: [RouterLink, ButtonIconComponent, ButtonIconDirective],
  templateUrl: './chat-user-data.component.html',
  styleUrl: './chat-user-data.component.scss'
})
export class ChatUserDataComponent implements OnDestroy{

  private chatFacade = inject(ChatFacade);
  private contactFacade = inject(ContactFacade);
  protected userDetailState = inject(UserDetailState);
  protected messagesState = inject(MessagesState);
  protected chatState = inject(ChatState);
  private userState = inject(UserState);
  protected switchTranslation = inject(SwitchTranslationState);
  protected source = signal(null);
  protected sourceName = signal(null);
  protected sourceType = signal(null);
  protected sourceBlob = signal(null);
  protected isRecording = false;
  protected isStoped = false;
  protected timeAudio = 0;
  protected showEditMessage = false;
  protected messageTextOrigin = "";
  private destroy = new Subject();

  @ViewChild('dropdown', { static: false }) private dropdown: ElementRef;

  ngOnDestroy(): void {
    this.destroy.complete()
    this.destroy.next(null)
  }

  constructor() {
    fromEvent(document, "click")
      .pipe(takeUntil(this.destroy))
      .subscribe((event: Event) => {
        const el = event.target as HTMLElement

        if (this.dropdown?.nativeElement.contains(el) == false && el.classList.contains("dropdownBtn") == false) {
          this.dropdown.nativeElement.style.display = "none";
        }
      })
  }

  protected closeChat() {
    this.chatState.chatState.set(null);
  }

  protected openUserDetail = () => {
    if (this.dropdown.nativeElement) {
      this.dropdown.nativeElement.style.display = 'none';
    }

    this.userDetailState.userDetailSignal.update((data) => {
      data.show = true;
      return data;
    });
  }

  protected toggleDropdown() {
    const dropdownStyle = this.dropdown.nativeElement.style;
    dropdownStyle.display = dropdownStyle.display === 'block' ? 'none' : 'block';
  }

  protected blockChat() {
    this.toggleDropdown();
    this.chatFacade.blockChat(
      this.userState.userSignal().userId,
      this.userDetailState.userDetailSignal().data.chatId
    );
  }

  protected unlockedChat() {
    this.toggleDropdown();
    this.chatFacade.deblockChat(
      this.userState.userSignal().userId,
      this.userDetailState.userDetailSignal().data.chatId
    );
  }

  protected addContact() {
    this.toggleDropdown()
    const { userName, userId, photo } = this.userDetailState.userDetailSignal().data;
    const user = this.userState.userSignal();
    this.contactFacade.addContact(user.contactId, userId, photo, userName);
  }

  protected deleteMessages() {
    this.toggleDropdown()
    this.chatFacade.clearMessagesOfChat(this.userState.userSignal()?.userId)
  }

}
