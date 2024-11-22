import { Component, inject } from '@angular/core';
import { ContactsState } from '../../core/states/contacts/contacts.state';
import { ContactComponent } from '../shared/contact/contact.component';
import { ChatArrayState } from '../../core/states/chats/chats.state';
import { ChatData } from '../../interfaces/chatData';
import { Contact } from '../../interfaces/contact';

@Component({
    selector: 'app-contacts',
    imports: [ContactComponent],
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  private contactState = inject(ContactsState);
  private chatsArrayState = inject(ChatArrayState);
  protected data: { contact: Contact, chatData: ChatData }[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Cria um mapa de contatos para buscas rápidas
    const contactMap = new Map(
      this.contactState.contactSignal()?.map(contact => [contact.userId, contact])
    );

    // Associa `chatData` com `contact` correspondente
    this.data = this.chatsArrayState.chatsArrayState()
      ?.map(chatData => {
        const contact = contactMap.get(chatData.otherUserId);
        return contact ? { chatData, contact } : null;
      })
      ?.filter(Boolean); // Remove valores nulos
  }
}
