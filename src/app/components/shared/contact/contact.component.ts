import { AfterViewInit, Component, ElementRef, HostListener, inject, input, InputSignal, linkedSignal, ViewChild } from '@angular/core';
import { Contact } from '../../../shared/interfaces/contact';
import { ChatData } from '../../../shared/interfaces/chatData';
import { ChatState } from '../../../core/states/chat/chat.state';
import { UserDetailState } from '../../../core/states/userDetail/user-detail.state';
import { RouterLink } from '@angular/router';
import { DOMManipulation } from '../../../shared/operators/DomManipulation';
import { ContactFacade } from '../../../facades/contact/contact.facade';
import { UserState } from '../../../core/states/User/user.state';
import { BufferToUrl } from '../../../workers/teste';

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent extends DOMManipulation implements AfterViewInit {

  contactInput: InputSignal<Contact> = input({ photo: "../../../../assets/icons/do-utilizador.png", userId: "", userName: "" });
  chatData: InputSignal<ChatData> = input();
  protected contact = linkedSignal(()=> this.contactInput())
  protected isVisibleDropDown = false;

  private chatState = inject(ChatState);
  private contactFacade = inject(ContactFacade);
  private userDetailState = inject(UserDetailState);
  private userState = inject(UserState);
  @ViewChild("dropdown") private dropDown !: ElementRef

  protected loadAlternativeImage() {
    this.contact().photo = "../../../../assets/icons/do-utilizador.png"
  }

  ngAfterViewInit(): void {
    if(typeof this.contactInput().photo == "object"){
      const urlImage = BufferToUrl(this.contactInput().photo)
      this.contact.update(dataSignal => ({ ...dataSignal, photo: urlImage }))
    }
  }

  protected openChat() {

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
  }

  protected openDropDown(event: MouseEvent): void {
    event.stopPropagation();

    // Fecha todos os outros dropdowns
    const parentElement = this.dropDown.nativeElement.parentElement.parentElement.parentElement; // Obtém o elemento pai
    const allDropdowns = parentElement.querySelectorAll('.dropdown.visible');

    allDropdowns.forEach((dropdown) => {
      this.removeClassToElement(dropdown, 'visible');
    });
    // Alterna a visibilidade do dropdown atual
    this.isVisibleDropDown = true;

    // Aplica a classe 'visible' ao dropdown atual, se necessário
    if (this.isVisibleDropDown) {
      this.dropDown.nativeElement.classList.add('visible');
    }
  }

  protected deleteContact() {
    this.contactFacade.removeContact(this.userState.userSignal().contactId, this.contact().userId);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Fecha o dropdown se o clique não for nele ou em seus filhos
    if (this.dropDown && !this.dropDown.nativeElement.contains(target)) {
      this.isVisibleDropDown = false;
      this.dropDown.nativeElement.classList.remove('visible');
    }
  }

}

