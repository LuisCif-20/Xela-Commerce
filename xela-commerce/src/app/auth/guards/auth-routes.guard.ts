import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, of, switchMap, take } from 'rxjs';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { redirectTo } from '../../shared/utilities/redirect';

export const authRoutesGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.isLoggedIn().pipe(
    filter(status => status !== AuthStatus.checking),
    take(1),
    switchMap((status) => {
      if (status !== AuthStatus.authenticated) return of(true);
      return authService.currentUser().pipe(
        filter(user => user !== null),
        take(1),
        map((user) => {
          router.navigateByUrl(redirectTo(user!.role.name));
          return false;
        })
      )
    })
  );
};
