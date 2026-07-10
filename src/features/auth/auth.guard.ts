import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { IAuthUser } from './IAuthUser';
import { catchError, map, of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.user$.pipe(
    switchMap((user: IAuthUser | null) => {
      if (user) {
        return of(true);
      } else {
        return authService.getUser()
          .pipe(
            map(() => true),
            catchError(() => of(router.createUrlTree(['/login'])))
          );
      }
    })
  );
};