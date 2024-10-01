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

  createUser(userName: string, userDescription: string, email: string, arrayBuffer: null | Blob, languages: string, password: string) {
    const body = { userName, userDescription, arrayBuffer, languages, email, password };
    return this.http.post(this.uri + "/user", body, this.options)
  }

  updateUser(user:User){
    return this.http.patch(this.uri+`/user/${user.userId}`,user,this.options)
  }
  
  getAllContacts(contactId:string){
    return this.http.get(this.uri+`/user/contact/${contactId}`,this.options)
  }
}
