import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PublicationService } from '../../../shared/services/publication.service';
import { Publication } from '../../../shared/interfaces/publication.interface';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'common-publications-page',
  templateUrl: './publications-page.component.html',
  styles: `
    .group-content {
      overflow-y: auto;
    }
  `
})
export class PublicationsPageComponent implements OnInit, OnDestroy {

  private pubsService = inject(PublicationService);
  private authService = inject(AuthService);
  private pubsSubs?: Subscription;
  private userSubs?: Subscription;
  private user_id?: number;

  public publications: Publication[] = [];
  public groups: string[] = [
    'Venta',
    'Compra',
    'Voluntariado'
  ];

  ngOnInit(): void {
    this.userSubs = this.authService.currentUser().subscribe((user: User|null) => {
      if (user) {
        this.user_id = user.id;
      }
    });
    this.pubsSubs = this.pubsService.publications().subscribe((pubs: Publication[]) => {
      this.publications = pubs.filter(pub => pub.state === 'approved');
      if (this.user_id) {
        this.publications = this.publications.filter(pub => pub.user.id !== this.user_id)
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.pubsSubs?.unsubscribe();
  }

  classifyPubs(category: string): Publication[] {
    return this.publications.filter(pub => pub.category.name === category);
  }

}
