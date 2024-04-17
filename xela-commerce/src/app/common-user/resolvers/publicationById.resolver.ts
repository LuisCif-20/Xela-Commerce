import { ResolveFn } from '@angular/router';
import { Publication } from '../../shared/interfaces/publication.interface';
import { inject } from '@angular/core';
import { PublicationService } from '../../shared/services/publication.service';

export const publicationByIdResolver: ResolveFn<Publication> = (route, state) => {
  const pubService = inject(PublicationService);
  return pubService.getPubById(route.params['id']);
};
