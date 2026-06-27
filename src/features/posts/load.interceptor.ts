import { HttpInterceptorFn } from '@angular/common/http';
import { finalize, tap } from 'rxjs';
import { LoaderService } from '../../app/services/loader.service';
import { inject } from '@angular/core';

export const loadInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService: LoaderService = inject(LoaderService);

  loaderService.showLoader();
  return next(req).pipe(
    finalize(() => loaderService.hideLoader())
  );
};
