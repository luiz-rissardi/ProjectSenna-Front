import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';
import { UserState } from '../core/states/User/userState.service';
import { User } from '../core/entity/user';

export const authGuard: CanActivateFn = async (route, state) => {

    const authService = inject(AuthService);
    const userState = inject(UserState);
    const routerService = inject(Router);

    const token = localStorage.getItem("XXX-token-auth");
    const user = await authService.verifyAuthenticate(token) as User;
    if(user?.isActive == true){
        const alreadyDone = userState.userSignal();
        if(alreadyDone == undefined){
            userState.userSignal.set(user)
        }
        return true
    }else{
        routerService.navigate(["/auth/sign-in"])
        return false;
    }
};
