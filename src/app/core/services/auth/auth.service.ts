import { Injectable } from '@angular/core';
import { Service } from '../base/baseService';
import { ResponseHttp } from '../../../shared/interfaces/ResponseType';
import { User } from '../../../shared/interfaces/user';

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

  async verifyAuthenticate(token: string): Promise<User | any> {

    const body = this.toFormData({
      token
    })


    return new Promise((resolve, reject) => {
      try {
        this.http.post(this.uri + "/user/auth", body).subscribe((data: ResponseHttp<User>) => {
          const user = data.value;
          resolve(user);
        })
      } catch (error) {
        reject(error);
      }
    })
  }

}
