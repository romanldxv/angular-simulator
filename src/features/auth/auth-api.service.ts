import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuth } from './IAuth';
import { IUser } from './IUser';
import { IToken } from './IToken';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  
  private http: HttpClient = inject(HttpClient);

  private readonly API_URL: string = 'https://dummyjson.com/auth';

  loginUser(login: string, password: string): Observable<IAuth> {
    return this.http.post<IAuth>(
      `${ this.API_URL }/login`,
      { username: login, password: password, expiresInMins: 1 }
    );
  }

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${ this.API_URL }/me`);
  }

  refreshTokens(refreshToken: string): Observable<IToken> {
    return this.http.post<IToken>(
      `${ this.API_URL }/refresh`,
      { refreshToken: refreshToken }
    );
  }

}
