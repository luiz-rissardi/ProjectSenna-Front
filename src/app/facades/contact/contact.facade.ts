import { inject, Injectable } from '@angular/core';
import { ContactService } from '../../core/services/contact/contact.service';
import { ResponseHttp } from '../../interfaces/ResponseType';
import { Contact } from '../../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactFacade {

  private contactService = inject(ContactService)

  findContactsOfUser(contactId:string){
    this.contactService.getContactsByContactId(contactId)
      .subscribe((result:ResponseHttp<Contact[]>)=>{

      })
  }

}
