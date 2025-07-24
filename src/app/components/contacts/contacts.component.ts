import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { ContactsState } from '../../core/states/contacts/contacts.state';
import { ContactComponent } from '../shared/contact/contact.component';
import { ChatArrayState } from '../../core/states/chats/chats.state';
import { ChatData } from '../../shared/interfaces/chatData';
import { Contact } from '../../shared/interfaces/contact';

@Component({
  selector: 'app-contacts',
  imports: [ContactComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  private contactState = inject(ContactsState);
  private chatsArrayState = inject(ChatArrayState);
  protected data: WritableSignal<{ contact: Contact, chatData: ChatData }[]> = signal([]);
  private cache: WritableSignal<{ contact: Contact, chatData: ChatData }[]> = signal([])

  constructor() {

    // refazer a lista quando um novo contato é add ou removido
    effect(() => {
      if (this.contactState.contactSignal()?.length > 0) {
        this.initializeData()
      }
    })
  }

  private initializeData() {
    // Cria um mapa de contatos para buscas rápidas
    const contactMap = new Map(
      this.contactState.contactSignal()?.map(contact => [contact.userId, contact])
    );

    // Associa `chatData` com `contact` correspondente
    const contacts = this.chatsArrayState.chatsArrayState()
      ?.map(chatData => {
        const contact = contactMap.get(chatData.otherUserId);
        return contact ? { chatData, contact } : null;
      })
      ?.filter(Boolean); // Remove valores nulos
    this.data.set(contacts)
    this.cache.set(contacts)

  }

  protected filtercontacts(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    if (query == "") {
      this.data.set(this.cache());
      return;
    }

    this.data.update(() => {
      return this.cache().filter(chatData => chatData.contact.userName.toLowerCase().includes(query.toLowerCase()));
    })
  }

}
