import { CanActivateFn } from '@angular/router';

export const referrerGuard: CanActivateFn = (route, state) => {
  const referrer = document.referrer;

  console.log("referrer:",document.referrer);
  // Verifica se o acesso veio de outro domínio
  if (referrer && !referrer.includes(window.location.hostname)) {
    console.warn("Acesso negado: a rota foi acessada de outro site.");
    // Redireciona para uma página de erro ou qualquer outra rota
    return false;
  }

  // Permite o acesso caso a origem seja a mesma aplicação
  return true;
};
