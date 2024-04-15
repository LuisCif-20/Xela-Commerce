import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs';
import { redirectTo } from '../../shared/utilities/redirect';

export const checkRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.currentUser().pipe(
    filter(user => user !== null),
    take(1),
    map((user) => {
      if (user!.role.name === route.data['role']) return true;
      router.navigateByUrl(redirectTo(user!.role.name));
      return false;
    })
  );
};
