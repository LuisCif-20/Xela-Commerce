import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.isLoggedIn().pipe(
    filter(status => status !== AuthStatus.checking),
    take(1),
    map((status) => {
      if (status === AuthStatus.authenticated) return true;
      router.navigateByUrl('/auth/sign-in');
      return false;
    })
  );
};
