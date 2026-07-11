import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, finalize, of, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { IToken } from './IToken';
import { AuthService } from './auth.service';
import { ToastService } from '../../app/services/toast.service';

let isRefresh: boolean = false;

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService: AuthService = inject(AuthService);
  const toastService: ToastService = inject(ToastService);

  const tokens: IToken | null = authService.getTokens();
  
  function addAccessToken(newToken: string): HttpRequest<unknown> {
    return req.clone({ 
      setHeaders: { Authorization: `Bearer ${ newToken }` } 
    });
  }
  
  if (!tokens) {
    return next(req);
  }

  if (isRefresh) {
    return next(req)
      .pipe(
        catchError(() => {
          isRefresh = false;
          authService.logout();
          return of();
        })
      );
  }

  const newReq: HttpRequest<unknown> = addAccessToken(tokens!.accessToken);

  return next(newReq)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (!isRefresh) {
            isRefresh = true;
            return authService.refreshTokens()
              .pipe(
                switchMap((tokens: IToken) => {
                  const newReq: HttpRequest<unknown> = addAccessToken(tokens.accessToken);
                  return next(newReq);
                }),
                finalize(() => isRefresh = false)
              );
          }
          const newReq: HttpRequest<unknown> = addAccessToken(tokens!.accessToken);
          return next(newReq);
        } else {
          toastService.showError('Не удалось выполнить запрос');
          return throwError(() => error);
        }
      })
    );
};
