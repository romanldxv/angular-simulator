import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { IToken } from './IToken';
import { AuthService } from './auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService: AuthService = inject(AuthService);

  const tokens: IToken | null = authService.getTokens();
  let newReq: HttpRequest<unknown> = req;

  if (tokens && (req.url.includes('/login') || req.url.includes('/refresh'))) {
    newReq = req.clone({ 
      setHeaders: { Authorization: `Bearer ${ tokens.accessToken }` } 
    });
  }

  return next(newReq)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          authService.refreshTokens(tokens!.refreshToken);
        }
        return throwError(() => error);
      })
    );
};
