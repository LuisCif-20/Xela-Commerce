import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PublicationService } from '../../../shared/services/publication.service';
import { Subscription } from 'rxjs';
import { Publication } from '../../../shared/interfaces/publication.interface';
import { States } from '../../../common-user/interfaces/state.enum';
import { showError, showSuccess } from '../../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'admin-review-publications-page',
  templateUrl: './review-publications-page.component.html',
  styles: ``
})
export class ReviewPublicationsPageComponent implements OnInit, OnDestroy {

  private snackBar = inject(MatSnackBar);
  private pubsService = inject(PublicationService);
  private pubsSubs?: Subscription;

  public publications: Publication[] = [];
  public groups: string[] = [
    'Venta',
    'Compra',
    'Voluntariado'
  ];

  ngOnInit(): void {
    this.pubsSubs = this.pubsService.publications().subscribe((pubs: Publication[]) => {
      if (pubs.length !== 0) {
        this.publications = pubs.filter(pub => pub.state === 'pending');
      }
    });
  }

  ngOnDestroy(): void {
    this.pubsSubs?.unsubscribe();
  }

  onApproved(pub_id: number) {
    this.pubsService.setState(pub_id, States.approved).subscribe({
      next: () => showSuccess(this.snackBar, 'Publicacion aprovada.'),
      error: (err) => showError(this.snackBar, err)
    })
  }

  reject(pub_id: number) {
    this.pubsService.deletePublication(pub_id).subscribe({
      next: () => showSuccess(this.snackBar, 'Publicacion rechazada y eliminada.'),
      error: (err) => showError(this.snackBar, err)
    });
  }

  classifyPubs(category: string): Publication[] {
    return this.publications.filter(pub => pub.category.name === category);
  }

  
}
