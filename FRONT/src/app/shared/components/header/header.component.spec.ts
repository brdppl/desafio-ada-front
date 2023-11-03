import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeaderComponent } from './header.component';
import { LoginService } from '../../services/login.service';
import { MaterialModule } from '../../../core/material.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule
      ]
    });
    loginService = TestBed.inject(LoginService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('should call logout method', () => {
      jest.spyOn(loginService, 'logout').mockImplementation();

      component.logout();

      expect(loginService.logout).toHaveBeenCalled();
    });
  });
});
