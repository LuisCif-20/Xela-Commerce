import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { filter, map, of, switchMap, take } from 'rxjs';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { redirectTo } from '../../shared/utilities/redirect';

export const denyRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.isLoggedIn().pipe(
    filter(status => status !== AuthStatus.checking),
    take(1),
    switchMap((status) => {
      if (status === AuthStatus.notAuthenticated) return of(true);
      return authService.currentUser().pipe(
        filter(user => user !== null),
        take(1),
        map((user) => {
          if (user!.role.name !== route.data['role']) return true;
          router.navigateByUrl(redirectTo(route.data['role']));
          return false;
        })
      );
    })
  );
};
