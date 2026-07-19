import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { IAuthUser } from './IAuthUser';
import { first, map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.user$.pipe(
    first(),
    map((user: IAuthUser | null) =>
      user ? true : router.createUrlTree(['/login']),
    ),
  );
};
