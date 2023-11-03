import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

export const authGuard: CanActivateFn = (router, state) => {
  const authService = inject(AuthService);
  const route = inject(Router);

  if (!authService.authToken && state.url !== '/login') {
    route.navigateByUrl('/login');
    return false;
  }

  if (authService.authToken && state.url === '/login') {
    route.navigateByUrl('/');
    return true;
  }

  return true;
};
