import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthResponse } from './IAuthResponse';
import { IAuthUser } from './IAuthUser';
import { IToken } from './IToken';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http: HttpClient = inject(HttpClient);

  private readonly API_URL: string = 'https://dummyjson.com/auth';

  loginUser(login: string, password: string): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.API_URL}/login`, {
      username: login,
      password: password,
    });
  }

  getUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${this.API_URL}/me`);
  }

  refreshTokens(refreshToken: string): Observable<IToken> {
    return this.http.post<IToken>(`${this.API_URL}/refresh`, {
      refreshToken: refreshToken,
    });
  }
}
