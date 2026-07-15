import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { first, map } from 'rxjs';
import { IAuthUser } from './IAuthUser';
import { UserRole } from '../../enums/UserRole';

export const adminGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.user$.pipe(
    first(),
    map((user: IAuthUser | null) => user?.role === UserRole.ADMIN ? true : router.parseUrl('/404'))
  );
};