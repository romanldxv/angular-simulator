import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { finalize, tap } from 'rxjs';
import { IAppConfiguration } from '../../interfaces/IAppConfiguration';
import { inject } from '@angular/core';
import { APP_CONFIGURATION } from '../app-configuration.token';

export const logInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const appConfig: IAppConfiguration = inject(APP_CONFIGURATION);

  if (appConfig.enableLogs) {
    const startedTime: number = Date.now();
    let responseStatus: number = 0;
    return next(req).pipe(
      tap(
        (event: HttpEvent<any>) =>
          event.type === HttpEventType.Response
            ? (responseStatus = event.status)
            : responseStatus,
        (error: HttpErrorResponse) => (responseStatus = error.status),
      ),
      finalize(() => {
        console.log(`
          HTTP method: ${req.method}\n
          url: ${req.url}\n
          status request: ${responseStatus}\n
          response time: ${Date.now() - startedTime} ms\n
        `);
      }),
    );
  } else {
    return next(req);
  }
};
