import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const responseInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        const authToken = event.headers.get("XXX-token-auth")
        localStorage.setItem("XXX-token-auth",authToken);
      }
    })
  );
};
