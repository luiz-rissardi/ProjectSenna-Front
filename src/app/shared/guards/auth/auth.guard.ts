import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { UserState } from '../../../core/states/User/user.state';
import { User } from '../../interfaces/user';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ResponseHttp } from '../../interfaces/ResponseType';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
    const authService = inject(AuthService);
    const userState = inject(UserState);
    const routerService = inject(Router);
    const platformId = inject(PLATFORM_ID);

    // Verifica se está no navegador antes de acessar o localStorage
    if (!isPlatformBrowser(platformId)) {
        return of(false);
    }

    const token = localStorage.getItem("XXX-token-auth");
    
    // Se não há token, redireciona para login
    if (!token) {
        routerService.navigate(["/auth/sign-in"]);
        return of(false);
    }

    return authService.verifyAuthenticate(token).pipe(
        map((data: ResponseHttp<User>) => {
            const user = data.value;
            if (user?.isActive) {
                // Atualiza o estado do usuário apenas se ainda não estiver definido
                if (!userState.userSignal()) {
                    userState.userSignal.set(user);
                }
                return true;
            } else {
                routerService.navigate(["/auth/sign-in"]);
                return false;
            }
        }),
        catchError(() => {
            routerService.navigate(["/auth/sign-in"]);
            return of(false);
        })
    );
};
