import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PublicationService } from '../../../shared/services/publication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Publication } from '../../../shared/interfaces/publication.interface';
import { Subscription } from 'rxjs';
import { showError, showSuccess } from '../../../shared/utilities/showSnackBar';

@Component({
  selector: 'admin-reported-publications-page',
  templateUrl: './reported-publications-page.component.html',
  styles: ``
})
export class ReportedPublicationsPageComponent implements OnInit, OnDestroy {

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
        this.publications = pubs.filter(pub => pub.state === 'reported');
      }
    });
  }

  ngOnDestroy(): void {
    this.pubsSubs?.unsubscribe();
  }

  returnLink(id: number) {
    return `/admin/reasons/${id}`;
  }

  classifyPubs(category: string): Publication[] {
    return this.publications.filter(pub => pub.category.name === category);
  }

}
