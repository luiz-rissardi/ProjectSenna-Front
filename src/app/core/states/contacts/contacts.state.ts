import { Injectable, signal, WritableSignal } from '@angular/core';
import { Contact } from '../../../shared/interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsState {

  public contactSignal: WritableSignal<Contact[]> = signal(null);
}
