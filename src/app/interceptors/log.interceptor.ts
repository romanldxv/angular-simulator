import { HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs';

export const logInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap(event => {
      console.log(`
        HTTP method: ${ req.method }\n
        url: ${ req.url }\n
        status request: ${ event.type }\n
        response: ${ event.type }\n
      `);
    })
  );
};
