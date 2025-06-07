import { inject, Injectable } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { UserState } from '../../core/states/User/user.state';
import { ResponseHttp } from '../../shared/interfaces/ResponseType';
import { WarningState } from '../../core/states/warning/warning.state';
import { User } from '../../shared/interfaces/user';
import { Buffer } from 'buffer';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../../core/services/auth/auth.service';
import { EmailService } from '../../core/services/email/email.service';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {

  private userState = inject(UserState);
  private warningState = inject(WarningState);
  private userService = inject(UserService);
  private emailService = inject(EmailService);
  private authService = inject(AuthService);

  login(email: string, password: string) {
    try {
      this.authService.login(email, password)
        .subscribe((response: HttpResponse<any>) => {
          const data: ResponseHttp<User | any> = response.body as ResponseHttp<User | any>;
          if (data.isSuccess == true) {

            const photoArrayBlob = data.value?.photo?.data;
            if (photoArrayBlob?.length == 0 || photoArrayBlob == undefined) {
              data.value.photo = "../../../assets/icons/do-utilizador.png"
            } else {
              const photoBuffer = Buffer.from(photoArrayBlob);
              data.value.photo = URL.createObjectURL(new Blob([photoBuffer]))
            }

            this.userState.userSignal.set(data.value)

          } else {
            this.warningState.warnigSignal.set({ IsSucess: data.isSuccess, data: data.error })
          }
        })
    } catch (error) {
      this.warningState.warnigSignal.set({ IsSucess: false, data: { message: "Unable to login" } })
    }
  }

  createUser(userName: string, userDescription: string, email: string, arrayBuffer: null | Blob, languages: string, password: string) {
    try {
      this.userService.createUser(userName, userDescription, email, arrayBuffer, languages, password)
        .subscribe((data: ResponseHttp<User>) => {
          if (data.isSuccess == true) {

            const photoArrayBlob = data.value?.photo?.data;
            if (photoArrayBlob?.length == 0) {
              data.value.photo = "../../../assets/icons/do-utilizador.png"
            } else {
              const photoBuffer = Buffer.from(photoArrayBlob);
              data.value.photo = URL.createObjectURL(new Blob([photoBuffer]))
            }

            this.emailService.sendConfirmationEmail(data.value);
          } else {
            this.warningState.warnigSignal.set({ IsSucess: data.isSuccess, data: data.error })
          }
        })
    } catch (error) {
      this.warningState.warnigSignal.set({ IsSucess: false, data: { message: "It was not possible to register" } })
    }
  }

  updateUser(user: User) {
    try {
      this.userService.updateUser(user)
        .subscribe((data: ResponseHttp<User>) => {
          if (data.isSuccess == true) {
            const photoArrayBlob = data.value?.photo?.data;
            if (photoArrayBlob.length == 0) {
              data.value.photo = "../../../assets/icons/do-utilizador.png"
            } else {
              const photoBuffer = Buffer.from(photoArrayBlob);
              data.value.photo = URL.createObjectURL(new Blob([photoBuffer]))
            }

            this.userState.userSignal.update((value: User) => {
              Object.keys(value).map(key => {
                value[key] = user[key];
              })
              return value;
            })
            this.warningState.warnigSignal.set({ IsSucess: true, data: { message: "update user successfully" } })

          } else {
            this.warningState.warnigSignal.set({ IsSucess: data.isSuccess, data: data.error })
          }
        })
    } catch (error) {
      this.warningState.warnigSignal.set({ IsSucess: false, data: { message: "It was not possible to register" } })
    }
  }

  changePassword(email: string, password: string) {
    try {
      this.userService.changePassword(email, password)
        .subscribe((data: ResponseHttp<User>) => {
          if (data.isSuccess == true) {
            setTimeout(() => {
              this.warningState.warnigSignal.set({ IsSucess: true, data: { message: "senha alterada com sucesso!" } })
            }, 200);
          } else {
            this.warningState.warnigSignal.set({ IsSucess: false, data: data.error })
          }
        })
    } catch (error) {
      this.warningState.warnigSignal.set({ IsSucess: false, data: { message: "It was not possible to register" } })
    }
  }

  findUsersByQuery(query: string,pagination:number) {
    try {
      this.userService.getUsersByQuery(query,pagination)
    } catch (error) {
      this.warningState.warnigSignal.set({ IsSucess: false, data: { message: "It was not possible find users" } })
    }
  }

}
