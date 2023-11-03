import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../shared/services/auth.service';

describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;

  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should redirect to home when make login with success', () => {
    const route: ActivatedRouteSnapshot = <ActivatedRouteSnapshot>{};
    const state: RouterStateSnapshot = <RouterStateSnapshot>{
      url: '/login'
    };
    authService.authToken = 'hasToken';
    jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    const result = TestBed.runInInjectionContext(() => authGuard(route, state));

    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    expect(result).toBeTruthy();
  });

  it('should has token at the protected routes', () => {
    const route: ActivatedRouteSnapshot = <ActivatedRouteSnapshot>{};
    const state: RouterStateSnapshot = <RouterStateSnapshot>{
      url: '/'
    };
    authService.authToken = 'hasToken';

    const result = TestBed.runInInjectionContext(() => authGuard(route, state));

    expect(result).toBeTruthy();
  });

  it('should hasnt token and keep at the login page', () => {
    const route: ActivatedRouteSnapshot = <ActivatedRouteSnapshot>{};
    const state: RouterStateSnapshot = <RouterStateSnapshot>{
      url: '/'
    };
    authService.authToken = '';
    jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    const result = TestBed.runInInjectionContext(() => authGuard(route, state));

    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    expect(result).toBeFalsy();
  });
});
