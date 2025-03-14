import { Injectable } from '@angular/core';
import { Service } from '../base/baseService';
import { ResponseHttp } from '../../../shared/interfaces/ResponseType';
import { User } from '../../../shared/interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Service {

  constructor() {
    super();
  }

  login(email: string, password: string) {
    const object = { email, password };
    const body = this.toFormData(object)
    return this.http.post(this.uri + "/user/login", body, this.options)
  }

  verifyAuthenticate(token: string):Observable< User| any> {

    const body = this.toFormData({
      token
    })

    return this.http.post(this.uri + "/user/auth", body)
  }

}
