import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../models/login.model';
import { environment } from '../../../environments/environment';
import { Auth } from '../models/auth.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login(payload: ILogin): Observable<string> {
    return this.http.post<string>(`${environment.baseUrl}/login`, payload, { headers: this.headers });
  }

  public logout(): void {
    window.localStorage.removeItem(Auth.TOKEN);
    this.router.navigateByUrl('/login');
  }
}
