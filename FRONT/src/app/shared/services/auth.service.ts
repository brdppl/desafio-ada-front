import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  get authToken(): string {
    return window.localStorage.getItem(Auth.TOKEN) || '';
  }

  set authToken(token: string) {
    window.localStorage.setItem(Auth.TOKEN, token);
  }
}
