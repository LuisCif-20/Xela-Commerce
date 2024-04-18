import { ResolveFn, Router } from '@angular/router';
import { Publication } from '../../shared/interfaces/publication.interface';
import { inject } from '@angular/core';
import { PublicationService } from '../../shared/services/publication.service';
import { showErrorMsg } from '../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

export const publicationByIdResolver: ResolveFn<Publication|null> = (route, state) => {
  const router = inject(Router);
  if (!route.params['id']) {
    router.navigateByUrl('/');
    return of(null);
  } else {
    const pubService = inject(PublicationService);
    return pubService.getPubById(route.params['id']);
  }
};
