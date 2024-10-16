import { inject, Injectable } from '@angular/core';
import { UserService } from '../../core/services/User/user.service';
import { UserState } from '../../core/states/User/userState.service';
import { ResponseHttp } from '../../interfaces/ResponseType';
import { WarningState } from '../../core/states/warning/warning.service';
import { User } from '../../core/entity/user';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {

  private userState = inject(UserState);
  private userService = inject(UserService)
  private warningState = inject(WarningState)

  login(email: string, password: string) {
    try {
      this.userService.login(email, password)
        .subscribe((data: ResponseHttp<User>) => {
          if (data.isSuccess == true) {

            const photoArrayBlob = data.value?.photo?.data;
            if (photoArrayBlob.length == 0) {
              data.value.photo = "../../../assets/icons/do-utilizador.png"
            } else {
              const photoBuffer = Buffer.from(photoArrayBlob);
              data.value.photo = URL.createObjectURL(new Blob([photoBuffer]))
            }

            this.userState.userSignal.set(data.value)

          } else {
            this.warningState.warnigSignal.set({ IsSucess: data.isSuccess, error: data.error })
          }
        })
    } catch (error) {
      this.warningState.warnigSignal.set({ IsSucess: false, error: { message: "Unable to login" } })
    }
  }

  createUser(userName: string, userDescription: string, email: string, arrayBuffer: null | Blob, language: string, password: string) {
    try {
      this.userService.createUser(userName, userDescription, email, arrayBuffer, language, password)
        .subscribe((data: ResponseHttp<User>) => {
          if (data.isSuccess == true) {

            const photoArrayBlob = data.value?.photo?.data;
            if (photoArrayBlob.length == 0) {
              data.value.photo = "../../../assets/icons/do-utilizador.png"
            } else {
              const photoBuffer = Buffer.from(photoArrayBlob);
              data.value.photo = URL.createObjectURL(new Blob([photoBuffer]))
            }

            this.userState.userSignal.set(data.value)
          } else {
            this.warningState.warnigSignal.set({ IsSucess: data.isSuccess, error: data.error })
          }
        })
    } catch (error) {
      this.warningState.warnigSignal.set({ IsSucess: false, error: { message: "It was not possible to register" } })
    }
  }

  updateUser(user: User) {
    try {
      this.userService.updateUser(user)
        .subscribe((data: ResponseHttp<User>) => {
          if (data.isSuccess == true) {
            console.log(data);
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
              console.log(value);
              return value;
            })
            // this.warningState.warnigSignal.set({ IsSucess: true, })

          } else {
            this.warningState.warnigSignal.set({ IsSucess: data.isSuccess, error: data.error })
          }
        })
    } catch (error) {
      this.warningState.warnigSignal.set({ IsSucess: false, error: { message: "It was not possible to register" } })
    }
  }


}
