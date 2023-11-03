import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.authToken && state.url !== '/login') {
    router.navigateByUrl('/login');
    return false;
  }

  if (authService.authToken && state.url === '/login') {
    router.navigateByUrl('/');
    return true;
  }

  return true;
};
