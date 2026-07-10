import { inject, Injectable, OnInit } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { IAuth } from './IAuth';
import { IUser } from './IUser';
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
  private userSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  user$: Observable<IUser | null> = this.userSubject.asObservable();
  private readonly TOKENS_KEY: string = 'tokens';
  private tokens: IToken | null = this.localStorageService.getItem(this.TOKENS_KEY);

  loginUser(login: string, password: string): Observable<IUser> {
    return this.authApiService.loginUser(login, password)
      .pipe(
        tap((auth: IAuth) => {
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

  setUser(newUser: IUser): void {
    this.userSubject.next(newUser);
  }

  getUser(): Observable<IUser> {
    return this.authApiService.getUser()
      .pipe(
        tap((user: IUser) => {
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

  initAuth(): Observable<IUser | null> {
    if (this.tokens) {
      return this.authApiService.getUser()
        .pipe(
          tap((user: IUser) => this.setUser(user)),
          catchError(() => {
            this.logout();
            return of();
          })
        );
    }
    return of(null);
  }

}
