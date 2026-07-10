import { inject, Injectable, OnInit } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { IAuthResponse } from './IAuthResponse';
import { IAuthUser } from './IAuthUser';
import { LocalStorageService } from '../../app/services/local-storage.service';
import { IToken } from './IToken';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private authApiService: AuthApiService = inject(AuthApiService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);

  isRefresh: boolean = false;
  private userSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  user$: Observable<IAuthUser | null> = this.userSubject.asObservable();
  private readonly TOKENS_KEY: string = 'tokens';
  private tokens: IToken | null = this.localStorageService.getItem(this.TOKENS_KEY);

  loginUser(login: string, password: string): Observable<IAuthUser> {
    return this.authApiService.loginUser(login, password)
      .pipe(
        tap((auth: IAuthResponse) => {
          this.setUser(auth);
          this.saveTokens({ accessToken: auth.accessToken, refreshToken: auth.refreshToken });
        })
      );
  }

  saveTokens(newTokens: IToken): void {
    this.tokens = newTokens;
    this.localStorageService.setItem(this.TOKENS_KEY, this.tokens);
  }

  getTokens(): IToken | null {
    if (!this.tokens) {
      this.tokens = this.localStorageService.getItem(this.TOKENS_KEY);
    }
    return this.tokens;
  }

  refreshTokens(): Observable<IToken> {
    return this.authApiService.refreshTokens(this.tokens!.refreshToken)
      .pipe(
        tap((tokens: IToken) => this.saveTokens(tokens))
      );
  }

  setUser(newUser: IAuthUser): void {
    this.userSubject.next(newUser);
  }

  getUser(): Observable<IAuthUser> {
    return this.authApiService.getUser()
      .pipe(
        tap((user: IAuthUser) => {
          this.setUser(user);
        })
      );
  }

  logout(): void {
    this.localStorageService.removeItem(this.TOKENS_KEY);
    this.userSubject.next(null);
    this.tokens = null;
    this.router.navigate(['/login']);
  }

  initAuth(): Observable<IAuthUser | null> {
    if (this.tokens) {
      return this.authApiService.getUser()
        .pipe(
          tap((user: IAuthUser) => this.setUser(user)),
          catchError(() => {
            this.logout();
            return of();
          })
        );
    }
    return of(null);
  }

}
