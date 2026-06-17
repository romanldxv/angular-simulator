import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const toastService: ToastService = inject(ToastService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status >= 500) {
        toastService.showError("Ошибка со стороны сервера");
      }
      return throwError(() => error);
    })
  );
};
