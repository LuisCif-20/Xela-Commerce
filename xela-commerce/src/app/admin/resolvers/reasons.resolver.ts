import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { PublicationService } from '../../shared/services/publication.service';
import { Observable, of } from 'rxjs';
import { Reason } from '../../shared/interfaces/report.interface';

export const reasonsResolver: ResolveFn<Reason[]> = (route, state) => {
  const router = inject(Router);
  if (!route.params['id']) {
    router.navigateByUrl('/');
    return of([]);
  } else {
    const pubService = inject(PublicationService);
    return pubService.getReasons(route.params['id']);
  }
};
