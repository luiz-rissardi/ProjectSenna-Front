import { inject, Injectable } from '@angular/core';
import { ContactService } from '../../core/services/contact/contact.service';
import { ResponseHttp } from '../../shared/interfaces/ResponseType';
import { Contact } from '../../shared/interfaces/contact';
import { ContactsState } from '../../core/states/contacts/contacts.state';
import { WarningState } from '../../core/states/warning/warning.state';

@Injectable({
  providedIn: 'root'
})
export class ContactFacade {

  private contactService = inject(ContactService);
  private contactsState = inject(ContactsState);
  private warnigState = inject(WarningState);

  findContactsOfUser(contactId: string) {
    try {
      this.contactService.getContactsByContactId(contactId)
        .subscribe((result: ResponseHttp<Contact[]>) => {
          if (result.isSuccess) {
            this.contactsState.contactSignal.set(result.value)
          } else {
            this.warnigState.warnigSignal.set({
              IsSucess: false,
              data: result.error
            })
          }
        })
    } catch (error) {
      this.warnigState.warnigSignal.set({
        IsSucess: false,
        data: {
          message: "It was not possible find contacts"
        }
      })
    }
  }

  addContact(contactId: string, userId: string, photo: Blob | string, userName: string) {
    try {
      this.contactService.addContact(contactId, userId)
        .subscribe((result: ResponseHttp<Contact[]>) => {
          if (result.isSuccess) {
            this.contactsState.contactSignal.update(contacts => {
              const contact: Contact = {
                userId, photo, userName
              }
              contacts.push(contact);
              return [...contacts]
            })
            this.warnigState.warnigSignal.set({
              IsSucess: true,
              data: { message: "contact added successfully" }
            })
          } else {
            this.warnigState.warnigSignal.set({
              IsSucess: false,
              data: result.error
            })
          }
        })
    } catch (error) {
      this.warnigState.warnigSignal.set({
        IsSucess: false,
        data: {
          message: "It was not possible add contact"
        }
      })
    }
  }

  removeContact(contactId: string, userId: string) {
    try {
      this.contactService.removeContact(contactId, userId)
        .subscribe((result: ResponseHttp<Contact[]>) => {
          if (result.isSuccess) {
            const teste = this.contactsState.contactSignal().filter(el => el.userId != userId);
            this.contactsState.contactSignal.set(teste)
            
            this.warnigState.warnigSignal.set({
              IsSucess: true,
              data: { message:"contact deleted with success" }
            })
          } else {
            this.warnigState.warnigSignal.set({
              IsSucess: false,
              data: result.error
            })
          }
        })
    } catch (error) {
      this.warnigState.warnigSignal.set({
        IsSucess: false,
        data: {
          message: "It was not possible remove the contact"
        }
      })

    }
  }
}
