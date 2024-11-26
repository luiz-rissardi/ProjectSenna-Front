import { Component, ElementRef, ViewChild, effect, inject } from '@angular/core';
import { DOMManipulation } from '../../../shared/operators/DomManipulation';
import { MessageComponent } from '../message/message.component';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { ChatState } from '../../../core/states/chat/chat.state';
import { ButtonIconDirective } from '../../../directives/buttonIcon/button-icon.directive';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.state';
import { UserState } from '../../../core/states/User/user.state';
import { ChatFacade } from '../../../facades/chat/chat.facade';
import { ContactFacade } from '../../../facades/contact/contact.facade';
import { MessageFacade } from '../../../facades/message/message.facade';
import { MessagesState } from '../../../core/states/messages/messages.state';
import { Message } from '../../../shared/interfaces/message';

@Component({
    selector: 'chat',
    imports: [MessageComponent, ButtonIconComponent, ButtonIconDirective],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss'
})
export class ChatComponent extends DOMManipulation {

  protected imageSrc: any = ""
  protected userDetailState: UserDetailState = inject(UserDetailState);
  protected chatState = inject(ChatState);
  private userState = inject(UserState);
  protected messageState = inject(MessagesState);
  private chatFacade = inject(ChatFacade);
  private messageFacade = inject(MessageFacade);
  private contactFacade = inject(ContactFacade);
  private skipMessagges = 0;
  @ViewChild("dropdown") private dropdown: ElementRef
  @ViewChild("inputText") private inputText: ElementRef

  constructor() {
    super();

    effect(()=>{
      const chatId = this.chatState.chatState()?.chatId;
      if(chatId != undefined){
        this.messageFacade.getMessagesByChatId(chatId,this.skipMessagges)
      }
    })
  }


  protected openUserDetail = () => {
    if (this.dropdown.nativeElement != null) {
      this.dropdown.nativeElement.style.display = "none"
    }

    this.userDetailState.userDetailSignal.update(data => {
      data.show = true;
      return data
    })
  }

  protected chosenFile() {
    const inputFile = document.getElementById("file");
    inputFile.click()

  }

  protected closeChat() {
    this.chatState.chatState.set(null)
  }

  protected toogleDroptDown() {
    if (this.dropdown.nativeElement.style.display != "none") {
      this.dropdown.nativeElement.style.display = "none"
    } else {
      this.dropdown.nativeElement.style.display = "block"
    }
  }

  protected blockChat() {
    this.toogleDroptDown();
    //Chama o método para bloquear o chat
    this.chatFacade.blockChat(
      this.userState.userSignal().userId,
      this.userDetailState.userDetailSignal().data.chatId
    );
  }

  protected unlockedChat() {
    this.toogleDroptDown();
    // Chama o método para desbloquear o chat
    this.chatFacade.deblockChat(
      this.userState.userSignal().userId,
      this.userDetailState.userDetailSignal().data.chatId
    );
  }

  protected addContact() {
    const { userName, userId, photo } = this.userDetailState.userDetailSignal().data;
    const user = this.userState.userSignal()
    this.contactFacade.addContact(user.contactId, userId, photo, userName);
  }


  protected sendMessage(){
    const messageText = this.inputText.nativeElement.value;
    const message:Partial<Message> = {
      message:messageText,
      userId:this.userState.userSignal().userId,
      chatId:this.chatState.chatState().chatId,
      dateSender:new Date(),
      language:this.userState.userSignal().languages,
      messageType:"text"
    }

    // console.log(message);
    this.messageFacade.sendMessage(message);
  }

}
