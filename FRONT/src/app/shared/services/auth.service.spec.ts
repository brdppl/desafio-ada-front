import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getters and setters', () => {
    it('should get and set authToken', () => {
      service.authToken = 'hasToken';

      expect(service.authToken).toBe('hasToken');
    });

    it('should hasnt token', () => {
      service.authToken = '';

      expect(service.authToken).toBe('');
    });
  });
});
