import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAuth } from './IAuth';
import { IUser } from './IUser';
import { LocalStorageService } from '../../app/services/local-storage.service';
import { IToken } from './IToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private authApiService: AuthApiService = inject(AuthApiService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private userSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  user$: Observable<IUser | null> = this.userSubject.asObservable();
  private tokens: IToken | null = null;
  private readonly TOKENS_KEY: string = 'tokens';

  loginUser(login: string, password: string): Observable<IUser> {
    const tokensFromLocalStorage: IToken | null = this.localStorageService.getItem(this.TOKENS_KEY);

    if (tokensFromLocalStorage) {
      return this.authApiService.getUser(tokensFromLocalStorage.accessToken)
        .pipe(
          tap((user: IUser) => {
            console.log(`get user: ${user}`)
            console.log(`get user: ${tokensFromLocalStorage}`)
            this.setUser(user);
            this.tokens = tokensFromLocalStorage;
          })
        );
      } else {
        return this.authApiService.loginUser(login, password)
        .pipe(
          tap((auth: IAuth) => {
            console.log(`login user: ${auth}`)
            this.setUser(auth);
            this.saveToken({ accessToken: auth.accessToken, refreshToken: auth.refreshToken });
          })
        );
    }
  }

  saveToken(newTokens: IToken): void {
    this.tokens = newTokens;
    this.localStorageService.setItem(this.TOKENS_KEY, this.tokens);
  }

  getTokens(): IToken | null {
    return this.tokens;
  }

  refreshTokens(refreshToken: string): Observable<IToken> {
    return this.authApiService.refreshTokens(refreshToken)
      .pipe(
        tap((tokens: IToken) => this.saveToken(tokens))
      );
  }

  setUser(newUser: IUser): void {
    this.userSubject.next(newUser);
  }

  logout(): void {
    this.localStorageService.removeItem(this.TOKENS_KEY);
    this.userSubject.next(null);
    this.tokens = null;
  }

}
