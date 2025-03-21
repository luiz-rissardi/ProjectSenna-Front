import { Injectable } from '@angular/core';
import { Service } from '../base/baseService';
import { User } from '../../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class EmailService extends Service {

  constructor() {
    super("http://localhost:8728");
  }

  sendConfirmationEmail(user: User) {
    try {
      return this.http.post(this.uri + `/api/email/confirmation/${user.userId}`, {
        user
      }).subscribe()
    } catch (error) {
      return null;
    }
  }

  // integrar com botões
  sendChangePasswordEmail(userEmail: string) {
    try {
      return this.http.post(this.uri + `/api/email/change-password`, {
        email: userEmail
      }).subscribe()
    } catch (error) {
      return null;
    }
  }
}
