import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Publication } from '../../../shared/interfaces/publication.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Reason } from '../../../shared/interfaces/report.interface';
import { environment } from '../../../../environments/environment';
import { PublicationService } from '../../../shared/services/publication.service';
import { showError, showSuccess } from '../../../shared/utilities/showSnackBar';
import { States } from '../../../common-user/interfaces/state.enum';

@Component({
  selector: 'app-reasons-page',
  templateUrl: './reasons-page.component.html',
  styles: ``
})
export class ReasonsPageComponent implements OnInit, OnDestroy {

  private readonly imgBase = `${environment.IMAGES_URL}/profile-pictures`

  private router = inject(Router);
  private actRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private pubService = inject(PublicationService);

  private pub?: Subscription;

  public publication?: Publication;
  public reasons: Reason[] = [];

  ngOnInit(): void {
    this.pub = this.actRoute.data.subscribe(({publication, reasons}) => {
      console.log(publication, reasons)
      if (publication && reasons) {
        this.publication = publication;
        this.reasons = reasons;
      }
    });
  }

  ngOnDestroy(): void {
      this.pub?.unsubscribe();
  }

  returnPD(date: string) {
    return new Date(date).toISOString().split('T')[0];
  }

  returnAvatar(image: string): string {
    return `${this.imgBase}/${image}`;
  }

  restore(pub_id: number) {
    this.pubService.setState(pub_id, States.approved).subscribe({
      next: () => {
        showSuccess(this.snackBar, 'Publicacion aprovada.');
        this.router.navigateByUrl('/admin/reported-publications');
      },
      error: (err) => showError(this.snackBar, err)
    })
  }

  delete(pub_id: number) {
    this.pubService.deletePublication(pub_id).subscribe({
      next: () => {
        showSuccess(this.snackBar, 'Publicacion eliminada.');
        this.router.navigateByUrl('/admin/reported-publications');
      },
      error: (err) => showError(this.snackBar, err)
    });
  }

}
