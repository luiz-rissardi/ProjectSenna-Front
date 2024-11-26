import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { UserState } from '../../../core/states/User/user.state';
import { User } from '../../interfaces/user';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';


export const authGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthService);
    const userState = inject(UserState);
    const routerService = inject(Router);
    const platformId = inject(PLATFORM_ID);

    // Verifica se está no ambiente do navegador
    if (isPlatformBrowser(platformId)) {

        const token = localStorage.getItem("XXX-token-auth");
        const user = await authService.verifyAuthenticate(token) as User;
        if (user?.isActive == true) {
            const alreadyDone = userState.userSignal();
            if (alreadyDone == undefined) {
                userState.userSignal.set(user)
            }
            return true
        } else {
            routerService.navigate(["/auth/sign-in"])
            return false;
        }
    }
    return false;
};
