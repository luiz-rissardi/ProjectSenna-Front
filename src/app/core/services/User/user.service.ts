import { Injectable } from '@angular/core';
import { Service } from '../base/baseService';
import { Observable } from 'rxjs';
import { User } from '../../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Service {

  login(email: string, password: string): Observable<User | any> {
    const object = { email, password };
    const body = this.toFormData(object)
    return this.http.post(this.uri + "/user/login", body)
  }

  createUser(userName: string, userDescription: string, email: string, arrayBuffer: null | Blob = new Blob(), language: string, password: string) {
    const object = { userDescription, userName, email, arrayBuffer, language, password }
    const body = this.toFormData(object)

    return this.http.post(this.uri + "/user", body);
  }

  updateUser(user: User) {
    const body = this.toFormData(user);
    return this.http.post(this.uri + `/user/${user.userId}`, body)
  }

  getAllContacts(contactId: string) {
    return this.http.get(this.uri + `/user/contact/${contactId}`, this.options)
  }
}
