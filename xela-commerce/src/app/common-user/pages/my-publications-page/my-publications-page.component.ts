import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PublicationService } from '../../../shared/services/publication.service';
import { Subscription } from 'rxjs';
import { Publication } from '../../../shared/interfaces/publication.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/auth.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'common-my-publications-page',
  templateUrl: './my-publications-page.component.html',
  styles: ``
})
export class MyPublicationsPageComponent implements OnInit, OnDestroy {

  private pubsService = inject(PublicationService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private pubsSubs?: Subscription;
  private userSubs?: Subscription;
  private userId?: number;

  public publications: Publication[] = [];

  ngOnInit(): void {
    this.userSubs = this.authService.currentUser().subscribe((user: User|null) => {
      if (user) {
        this.userId = user.id;
      }
    });
    this.pubsSubs = this.pubsService.publications().subscribe((pubs: Publication[]) => {
      if (pubs.length !== 0) {
        this.publications = pubs.filter(pub => pub.user.id === this.userId);
        console.log()
      }
    }); 
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.pubsSubs?.unsubscribe();
  }

  editPublication(pub: Publication) {
    this.router.navigateByUrl(`/common/edit/${pub.id}`);
  }

}
