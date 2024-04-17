import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PublicationService } from '../../../shared/services/publication.service';
import { Subscription, filter, switchMap, take } from 'rxjs';
import { Publication } from '../../../shared/interfaces/publication.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/auth.interface';
import { Router } from '@angular/router';
import { showError, showSuccess } from '../../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'common-my-publications-page',
  templateUrl: './my-publications-page.component.html',
  styles: ``
})
export class MyPublicationsPageComponent implements OnInit, OnDestroy {

  private pubsService = inject(PublicationService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private pubsSubs?: Subscription;
  private userSubs?: Subscription;
  private userId?: number;

  public publications: Publication[] = [];
  public groups: string[] = [
    'Venta',
    'Compra',
    'Voluntariado'
  ];

  ngOnInit(): void {
    this.pubsSubs = this.authService.currentUser().pipe(
      filter(user => user !== null),
      take(1),
      switchMap((user) => {
        this.userId = user?.id;
        return this.pubsService.publications();
      })
    ).subscribe((pubs: Publication[]) => {
      this.publications = pubs.filter(pub => pub.user.id === this.userId);
    });
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.pubsSubs?.unsubscribe();
  }

  editPublication(pub: Publication) {
    this.router.navigateByUrl(`/common/edit/${pub.id}`);
  }

  onDeletePublication(id: number) {
    this.pubsService.deletePublication(id).subscribe({
      next: () => showSuccess(this.snackBar, 'Publicacion eliminada correctamente.'),
      error: (err) => showError(this.snackBar, err)
    });
  }

  classifyPubs(category: string): Publication[] {
    return this.publications.filter(pub => pub.category.name === category);
  }

}
