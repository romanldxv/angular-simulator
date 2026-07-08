import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { IToken } from './IToken';
import { AuthService } from './auth.service';
import { ToastService } from '../../app/services/toast.service';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService: AuthService = inject(AuthService);
  const toastService: ToastService = inject(ToastService);

  const tokens: IToken | null = authService.getTokens();
  let newReq: HttpRequest<unknown> = req;

  function setAccessToken(newToken: string): HttpRequest<unknown> {
    return req.clone({ 
      setHeaders: { Authorization: `Bearer ${ newToken }` } 
    });
  }

  if (tokens && !(req.url.includes('/login') || req.url.includes('/refresh'))) {
    setAccessToken(tokens.accessToken);
  }

  return next(newReq)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return authService.refreshTokens(tokens!.refreshToken)
            .pipe(
              switchMap((tokens: IToken) => {
                setAccessToken(tokens.accessToken);
                return next(newReq);
              }),
              catchError((error: HttpErrorResponse) => {
                authService.logout();
                return throwError(() => error);
              })
            );
        } else {
          toastService.showError('Не удалось выполнить запрос');
          return throwError(() => error);
        }
      })
    );
};
