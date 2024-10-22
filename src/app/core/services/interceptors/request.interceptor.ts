import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("XXX-token-auth");
  // Clonar a requisição para adicionar o cabeçalho de autorização, se o token existir
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Passa a requisição para o próximo handler
  return next(req);
};
