import { Injectable } from '@angular/core';
import { Service } from '../base/baseService';
import { Observable } from 'rxjs';
import { User } from '../../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Service {

  login(email: string, password: string): Observable<User | any> {
    const body = { email, password };
    return this.http.post(this.uri + "/user/login", body, this.options)
  }

  createUser(userName: string, userDescription: string, email: string, arrayBuffer: null | Blob = new Blob(), language: string, password: string, fileName = "") {
    const formData = new FormData()
    
    formData.append("userName", userName)
    formData.append("userDescription", userDescription)
    formData.append("language", language)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("arrayBuffer", arrayBuffer, fileName)

    return this.http.post(this.uri + "/user", formData)
  }

  updateUser(user: User) {
    return this.http.patch(this.uri + `/user/${user.userId}`, user, this.options)
  }

  getAllContacts(contactId: string) {
    return this.http.get(this.uri + `/user/contact/${contactId}`, this.options)
  }
}
