import { Injectable } from '@angular/core';
import { Service } from '../base/baseService';
import { ResponseHttp } from '../../../interfaces/ResponseType';
import { User } from '../../entity/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Service {

  constructor() {
    super();
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

  sendConfirmationEmail(user:User){
    try {
      return this.http.post(`http://localhost:8729/api/email/confirmation/${user.userId}`,{
        user
      }).subscribe()
    } catch (error) {
      return null;
    }
  }

}
