import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { ICard } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private readonly headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.authToken}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getCards(): Observable<ICard[]> {
    return this.http.get<ICard[]>(`${environment.baseUrl}/cards`, { headers: this.headers });
  }

  public addCard(payload: ICard): Observable<ICard> {
    return this.http.post<ICard>(`${environment.baseUrl}/cards`, payload, { headers: this.headers });
  }

  public editCard(payload: ICard): Observable<ICard> {
    return this.http.put<ICard>(`${environment.baseUrl}/cards/${payload.id}`, payload, { headers: this.headers });
  }

  public removeCard(id: string): Observable<ICard[]> {
    return this.http.delete<ICard[]>(`${environment.baseUrl}/cards/${id}`, { headers: this.headers });
  }
}
