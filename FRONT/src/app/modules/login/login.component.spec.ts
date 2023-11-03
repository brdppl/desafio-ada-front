import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../../core/material.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from '../../shared/services/login.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ILogin } from '../../shared/models/login.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertMsg } from '../../shared/models/messages.enum';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let router: Router;
  let _snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    _snackBar = TestBed.inject(MatSnackBar);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    const payload: ILogin = <ILogin>{
      login: 'letscode',
      senha: 'lets@123'
    };

    beforeEach(() => {
      component.form = new FormGroup({
        login: new FormControl('', [Validators.required]),
        senha: new FormControl('', [Validators.required])
      });
    });

    it('should login with success', () => {
      const { login, senha } = payload;
      component.form.patchValue({ login, senha });
      jest.spyOn(loginService, 'login').mockReturnValue(of('token'));
      jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

      component.login();

      expect(loginService.login).toHaveBeenCalledWith(payload);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });

    it('should not login', () => {
      const { login = 'abc', senha = '321' } = payload;
      component.form.patchValue({ login, senha });
      jest.spyOn(loginService, 'login').mockReturnValue(of(''));
      jest.spyOn<LoginComponent, any>(component, 'handleToast').mockImplementation();

      component.login();

      expect(loginService.login).toHaveBeenCalledWith(payload);
      expect(component['handleToast']).toHaveBeenCalledWith(AlertMsg.INVALID_USER);
    });

    it('should not login and throw error', () => {
      const { login = 'abc', senha = '321' } = payload;
      component.form.patchValue({ login, senha });
      jest.spyOn(loginService, 'login').mockReturnValue(throwError(() => null));
      jest.spyOn<LoginComponent, any>(component, 'handleToast').mockImplementation();

      component.login();

      expect(loginService.login).toHaveBeenCalledWith(payload);
      expect(component['handleToast']).toHaveBeenCalledWith(AlertMsg.INVALID_USER);
    });

    it('should form is invalid', () => {
      component.form.reset();
      jest.spyOn<LoginComponent, any>(component, 'handleToast').mockImplementation();

      component.login();

      expect(component['handleToast']).toHaveBeenCalledWith(AlertMsg.FILL_REQUIRED_FIELDS);
    });
  });

  describe('handleToast', () => {
    it('shuold handle toast', () => {
      const msg = 'some message';
      jest.spyOn(_snackBar, 'open').mockImplementation();

      component['handleToast'](msg);

      expect(_snackBar.open).toHaveBeenCalledWith(msg, '', { duration: 5000 });
    });
  });
});
