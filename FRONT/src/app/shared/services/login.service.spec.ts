import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ILogin } from '../models/login.model';
import { Router } from '@angular/router';

const httpMock = {
  post: jest.fn()
};

describe('LoginService', () => {
  let service: LoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: HttpClient, useValue: httpMock }
      ]
    });
    service = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    const payload: ILogin = <ILogin>{};

    it('should make login post method', () => {
      const res = 'token';
      jest.spyOn(httpMock, 'post').mockReturnValue(of(res));

      service.login(payload).subscribe(data => {
        expect(data).toBeDefined();
      });
    });
  });

  describe('logout', () => {
    it('should make logout', () => {
      jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

      service.logout();

      expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });
});
