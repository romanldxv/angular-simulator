import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IToken } from './IToken';
import { AuthService } from './auth.service';
import { IUser } from './IUser';
import { first, map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.user$.pipe(
    first(),
    map((user: IUser | null) => user !== null ? true : router.parseUrl('/login'))
  );
};
