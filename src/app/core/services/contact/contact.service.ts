import { Injectable } from '@angular/core';
import { Service } from '../base/baseService';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends Service {

  constructor() {
    super()
  }

  getContactsByContactId(contactId: string) {
    return this.http.get(`/contact/${contactId}`);
  }

  addContact(contactId: string, userId: string) {
    return this.http.post(`/contact/${contactId}`, {
      userId
    })
  }

  removeContact(contactId: string, userId: string) {
    return this.http.delete(`/contact/${contactId}/remove/${userId}`)
  }

}
