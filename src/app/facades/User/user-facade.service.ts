import { inject, Injectable } from '@angular/core';
import { UserService } from '../../core/services/User/user.service';
import { UserState } from '../../core/states/User/userState.service';
import { ResponseHttp } from '../../interfaces/ResponseType';
import { WarningState } from '../../core/states/warning/warning.service';

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
        .subscribe((data: ResponseHttp) => {
          if (data.isSuccess == true) {
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
      this.userService.createUser(userName, userDescription, email, arrayBuffer, language, password, )
        .subscribe((data: ResponseHttp) => {
          if (data.isSuccess == true) {
            this.userState.userSignal.set(data.value)
          } else {
            this.warningState.warnigSignal.set({ IsSucess: data.isSuccess, error: data.error })
          }
        })
    } catch (error) {
      this.warningState.warnigSignal.set({ IsSucess: false, error: { message: "It was not possible to register" } })
    }
  }
}
