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
    return this.http.get(this.uri + `/contact/${contactId}`);
  }

  addContact(contactId: string, userId: string) {
    const body = this.toFormData({userId})
    return this.http.post(this.uri + `/contact/${contactId}`, body)
  }

  removeContact(contactId: string, userId: string) {
    return this.http.delete(this.uri + `/contact/${contactId}/remove/${userId}`)
  } 

}
