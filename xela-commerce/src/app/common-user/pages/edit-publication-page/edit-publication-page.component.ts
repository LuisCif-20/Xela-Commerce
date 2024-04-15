import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { PublicationService } from '../../../shared/services/publication.service';
import { Publication } from '../../../shared/interfaces/publication.interface';
import { showError, showSuccess } from '../../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-publication-page',
  templateUrl: './edit-publication-page.component.html',
  styles: ``
})
export class EditPublicationPageComponent implements OnInit {

  private router = inject(Router);
  private pubsService = inject(PublicationService);
  private snackBar = inject(MatSnackBar);
  private actRoute = inject(ActivatedRoute);
  public publication?: Publication;
  private formData: FormData | null = null;
  public isValid: boolean = false;

  ngOnInit(): void {
    this.actRoute.data.subscribe(({ publication }) => {
      this.publication = publication;
    });
  }

  monitorForm(formData: FormData | null) {
    if (formData) {
      this.formData = formData;
      this.isValid = true;
    } else {
      this.formData = null;
      this.isValid = false;
    }
  }

  onEditPublication() {
    if (this.isValid && this.formData) {
      this.pubsService.editPublicatino(this.publication!.id, this.formData).subscribe({
        next: () => {
          this.router.navigateByUrl('/common/my-publications')
          showSuccess(this.snackBar, 'Publicacion editada correctamente.');
        },
        error: (err) => showError(this.snackBar, err)
      });
    }
  }

  onCancel() {
    this.router.navigateByUrl('/common/my-publications');
  }

}
